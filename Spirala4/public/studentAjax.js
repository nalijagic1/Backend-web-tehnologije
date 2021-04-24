window.onload=function(){
    dajGrupe();
}
function dajGrupe(){
    $.ajax({
        type: "GET",
        url: `http://localhost:8080/v2/grupa`,
        success: (data) => {
            let write = "";
            //uzimam sve grupe iz baze i stavljam ih kao opcije u drop down meni
            for(let p of data){
                write+="<option value='"+p.id+"'>"+p.predmet.naziv+"-"+p.naziv+"</option>";
            }
            let sub = document.getElementById("groups");
            sub.innerHTML = write;

        },
        error: (err) => console.log(err),
    });
}

function dodajStudente(){
    //uzimaju se studenti iz textarea razdavaju se po novom redu i pravi se json sa unesenim podacima
    var studenti = document.getElementById("studenti").value;
    var grupa = document.getElementById("groups").value;
    var object = [];
    studenti = studenti.split("\n");
    for(let s of studenti){
        s = s.split(",")
        object.push({ime:s[0],index:s[1]});
    }
    //niz studenata se salje u body-u kao vrijednost atributa niz
    //id grupe se uzima iz dropdowna i šalje se u url-u 
    $.ajax({
        type: "POST",
        url: `http://localhost:8080/v2/dodavanjeStudenata/`+grupa,
        data: {niz:object},
        success: (data) => {
            var vraceno = JSON.parse(data);
            var odgovor ="";
            for(var i = 0; i <vraceno.length;i++){
                odgovor+=vraceno[i].odg+"\n";
            }
            //console.log(odgovor);
            document.getElementById("studenti").value = odgovor;
            

        },
        error: (err) => console.log(err),
    });
} 