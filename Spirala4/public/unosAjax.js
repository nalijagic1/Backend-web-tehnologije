var predmeti,predmet,subject,activ,day,start,end,aktivnosti,grupa;
var idDodatogPredmeta; 
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
    dajGrupe();
}
function pretvoriuString(vrijemeFloat){
    var vrijeme = ""
    var sati = Math.floor(vrijemeFloat);
    if(sati.toString().length==1)vrijeme+="0";
    vrijeme+=sati+":";
    var minute = ((vrijemeFloat-sati)*60).toFixed(0);
    if(minute.toString().length==1)vrijeme+="0";
    vrijeme+=minute;
    return vrijeme;
}
function dajPredmete(){
    $.ajax({
        type: "GET",
        url: `http://localhost:8080/v2/predmet`,
        success: (data) => {
            predmeti = data;
            //console.log(data);
            let write = "";
            for(let p of data){
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
        url: `http://localhost:8080/v2/aktivnost`,
        success: (data) => {
          aktivnosti = data;
          //console.log(aktivnosti)
          let tabela = "<tr id ='headers'><th id ='1'>Naziv </th><th id ='2'>Predmet </th><th id = '3'>Grupa</td><th id ='4'>Tip</th><th id ='5'>Dan</th><th id='4'>Pocetak</th><th id = '5'>Kraj</th></tr>";
          for(let i =0; i < aktivnosti.length;i++){
              //console.log("petlja");
              console.log(aktivnosti[i].grupa);
              var grupa="";
              if(aktivnosti[i].grupa != null)grupa = aktivnosti[i].grupa.naziv;
              else grupa="/"
              tabela += "<tr><td>" + aktivnosti[i].naziv+ "</td><td>" + aktivnosti[i].predmet.naziv+ "</td><td>"+ grupa+ "</td><td>" + aktivnosti[i].tip.naziv +  "</td><td>"+aktivnosti[i].dan.naziv+ "</td><td>"+pretvoriuString(aktivnosti[i].pocetak) + "</td><td>"+pretvoriuString(aktivnosti[i].kraj)+"</td></tr>";
          }
          var ispisTabele = document.getElementById("aktivnost");
          ispisTabele.innerHTML = tabela;  
        },
        error: (err) => console.log(err),
    });
}
function dajGrupe(){
    $.ajax({
        type: "GET",
        url: `http://localhost:8080/v2/grupa`,
        success: (data) => {
            let write ="<option value='null'>Odaberite grupu (ukoliko su vjezbe)</option>";;
            for(let p of data){
                write+="<option value='"+p.id+"'>"+p.naziv+"</option>";
            }
            let sub = document.getElementById("groups");
            sub.innerHTML = write;

        },
        error: (err) => console.log(err),
    });
}
function obrisiPredmet(){
    $.ajax({
        type: "DELETE",
        url: `http://localhost:8080/v2/predmet/`+idDodatogPredmeta,
        //šalje se data jer se u post metodi uzima req.body
        success: (data) => console.log(data),
        error: (err) => console.log(err),
      });
    }
function dodatAktivnost(){
    $.ajax({
        type: "POST",
        url: `http://localhost:8080/v2/raspored`,
        //šalje se data jer se u post metodi uzima req.body
        data:{naziv:naziv,predmeta:subject,grupa:grupa,aktivnost:activ,dan:day,pocetak:start,kraj:end},
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
        naziv = document.getElementById("akctname").value      
        subject = document.getElementById("name").value;
        activ = document.getElementById("activity").value;
        day = document.getElementById("day").value;
        start = document.getElementById("start").value;
        end = document.getElementById("end").value;
        grupa = document.getElementById("groups").value;
        //found varijable predstavlja index na kojem se nalazi nađeni predmet pomoću metode findIndex
        //ukoliko je vraćeno -1, to znači da taj predmet ne postoji u listi
        var found = predmeti.findIndex(element => element.naziv.toLowerCase() == subject.toLowerCase());
        //ukoliko predmet ne postoji, prvo se poziva jquery ajax  post metoda za dodavanje predmeta
        // u suprotnom se odmah poziva jquery ajax post metoda za dodavanje aktivnosti
        if(found==-1){
            $.ajax({
                type: "POST",
                url: `http://localhost:8080/v2/predmet`,
                //šalje se data jer se u post metodi uzima req.body
                data:{naziv:subject},
                success: (data) =>{
                   idDodatogPredmeta = data.split("=")[1];
                   dodatAktivnost() 
                } ,
                error: (err) => console.log(err),
            });
        }else{
            $.ajax({
                type: "POST",
                url: `http://localhost:8080/v2/raspored`,
                //šalje se data jer se u post metodi uzima req.body
                data:{naziv:naziv,predmeta:subject,grupa:grupa,aktivnost:activ,dan:day,pocetak:start,kraj:end},
                success: (data) => {
                    //ukoliko je uspješno dolaženje do servera, poruka će s eispisati putem alerta, a tabela aktivnosti će se ažurirati pozivom dajAktivnosti()
                    alert(data);
                    dajAktivnosti();
                },
                error: (err) => console.log(err),
            });
        }    
    }
    

 