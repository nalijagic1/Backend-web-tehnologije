var predmeti,predmet,subject,activ,day,start,end,aktivnosti;
var ajax; 
window.onload=function(){
    predmet="";
    subject = "";
    activ = "";
    day ="";
    start="";
    end="";
    //pozivaju se funkcije koje će uzeti predmete i aktivnosti sa servera te ih ispisati u html-u
    dajPredmete();
    dajAktivnosti();
}
function dajPredmete(){
    $.ajax({
        type: "GET",
        url: `http://localhost:8080/predmeti`,
        success: (data) => {
            predmeti = JSON.parse(data);
            let write = "";
            for(let p of predmeti){
                write+="<li>"+p.naziv+"</li>";
            }
            let sub = document.getElementById("predmet");
            sub.innerHTML = write;

        },
        error: (err) => console.log(err),
    });
}
function dajAktivnosti(){
    $.ajax({
        type: "GET",
        url: `http://localhost:8080/raspored`,
        success: (data) => {
          aktivnosti = data;
          let tabela = "<tr id ='headers'><th id ='1'>Naziv</th><th id = '2'>Aktivnost</td><th id ='3'>Dan</th><th id='4'>Pocetak</th><th id = '5'>Kraj</th></tr>";
          for(let i of data){
              tabela += "<tr><td>" + i.naziv+ "</td><td>" + i.aktivnost +  "</td><td>"+i.dan+ "</td><td>"+i.pocetak+ "</td><td>"+i.kraj+"</td></tr>";
          }
          var ispisTabele = document.getElementById("aktivnost");
          ispisTabele.innerHTML = tabela;  
        },
        error: (err) => console.log(err),
    });
}
function obrisiPredmet(){
    $.ajax({
        type: "DELETE",
        url: `http://localhost:8080/predmeti`,
        //šalje se data jer se u post metodi uzima req.body
        data:{naziv:predmet},
        success: (data) => console.log(data),
        error: (err) => console.log(err),
      });
    }
function dodatAktivnost(){
    $.ajax({
        type: "POST",
        url: `http://localhost:8080/raspored`,
        //šalje se data jer se u post metodi uzima req.body
        data:{naziv:subject,aktivnost:activ,dan:day,pocetak:start,kraj:end},
        success: (data) => {
            //ispisuje se poruka koju server vrati putem alerta
            alert(data);
            //ukoliko je poruka bila da aktivnos tu tom terminu postoj,poziva  se obrisiPredmet te će se obriati predmet koji je dodat(funkciaj dodatAktivnost se poziva samo ukoliko je predmet prije toga dodat)
            //u suprotnom se auzruraju lista sa predmetima i tabela sa aktivnostima pozivom funkcija
            if(data==="Vec postoji aktivnost u tom terminu!"){
                obrisiPredmet();
            }else{
                dajPredmete();
                dajAktivnosti();
            }  
        },
        error: (err) => console.log(err),
      });
}
function raspored(){ 
        predmet = document.getElementById("name").value.split("-")[0];        
        subject = document.getElementById("name").value;
        activ = document.getElementById("activity").value;
        day = document.getElementById("day").value;
        start = document.getElementById("start").value;
        end = document.getElementById("end").value;
        //found varijable predstavlja index na kojem se nalazi nađeni predmet pomoću metode findIndex
        //ukoliko je vraćeno -1, to znači da taj predmet ne postoji u listi
        var found = predmeti.findIndex(element => element.naziv.toLowerCase() == predmet.toLowerCase());
        //ukoliko predmet ne postoji, prvo se poziva jquery ajax  post metoda za dodavanje predmeta
        // u suprotnom se odmah poziva jquery ajax post metoda za dodavanje aktivnosti
        if(found==-1){
            $.ajax({
                type: "POST",
                url: `http://localhost:8080/predmeti`,
                //šalje se data jer se u post metodi uzima req.body
                data:{naziv:predmet},
                success: (data) => dodatAktivnost(),
                error: (err) => console.log(err),
            });
        }else{
            $.ajax({
                type: "POST",
                url: `http://localhost:8080/raspored`,
                //šalje se data jer se u post metodi uzima req.body
                data:{naziv:subject,aktivnost:activ,dan:day,pocetak:start,kraj:end},
                success: (data) => {
                    //ukoliko je uspješno dolaženje do servera, poruka će s eispisati putem alerta, a tabela aktivnosti će se ažurirati pozivom dajAktivnosti()
                    alert(data);
                    dajAktivnosti();
                },
                error: (err) => console.log(err),
            });
        }    
    }
    

 