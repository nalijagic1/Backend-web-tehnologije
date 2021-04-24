var sort;
var thid;
var sortiranje,dani;
window.onload=function(){
    sortiranje ="";
    dani = "";
    sort = true;
    thid=0;
    ucitajSortirano(dani,sortiranje,ispisiTabelu);
    
}

function ispisiTabelu(data,error){
    if(error==null){
        var strelica="";
        //bilježi se da li strelica treba biti prema gore ili prema gole
        //ukoliko je sort == false, to znači da su se aktivnosti sortirale u raspućem poretku i treba ići strečica prema dole
        //ukoliko je sort == true, to znači da su aktivnosti poredanu u opadajućem poretku(jer će se vrijednsot sa false promijeniti u true unutar listenera) i treba se staviti trelica prema gore
        if(sort == false){
           strelica = " &darr;";
        }else{
           strelica = " &uarr;";
        }
        let tabela = '<table>';
        tabela += "<tr id ='headers'><th id ='1'>Naziv</th><th id = '2'>Aktivnost</td><th id ='3'>Dan</th><th id='4'>Pocetak</th><th id = '5'>Kraj</th></tr>";
        for(let i of data){
            tabela += "<tr><td>" + i.naziv+ "</td><td>" + i.aktivnost +  "</td><td>"+i.dan+ "</td><td>"+i.pocetak+ "</td><td>"+i.kraj+"</td></tr>";
        }
        tabela += '</table>';
        //tabela se upisuje u html
        var ispisTabele = document.getElementById("tabela");
        ispisTabele.innerHTML = tabela;
        //thid je id naslova na koji se pritisno
        //ukoliko je 0, to znači da se tabela tek očitava i da treba biti nesortirana i nije potrebno dodavati strelice
        if(thid!=0){
           var dodati = document.getElementById(thid);
           dodati.innerHTML+=strelica; 
        }
        //listener koji prisluskuje da li je pritisnut prvi red tabele u kojem su naslovi kolona
        document.getElementById("headers").addEventListener('click', (s)=>{
            //s.target uzima ćeliju na koju je pritisnuto i bilježi se id kako bi se znalo gdje je potrebnono staviti strelicu
            thid = s.target.id;
            //sortiranje se postavlja na prazan string kako bi se poniptilo prijašnje sortiranje
            sortiranje = "";
            //ukoliko je sort true, znaci da se sortira ascending i sort postaje false jer ce se iduci put sortiradi descending
            if(sort == true){
                sortiranje +="A"
                sort = false;   
            }else{
                sortiranje +="D";
                sort = true; 
            }
            //splita se po razmaku i uzima se dio prije razmaka kako bi se izmaklo uzimanje strelice ukoliko ona postoji pored naziva
            sortiranje+=s.target.innerHTML.split(" ")[0];
            //console.log("dan = "+dani+" sortiranje = "+sortiranje);
            ucitajSortirano(dani,sortiranje,ispisiTabelu);
        });
    }else alert(error);
}
//listerer koji prisluškuje da li se desila promjena na choicebox-u u kojem se nalaze dati kako bi se mogli odvojiti samo odabrani dani
document.getElementById("day").addEventListener('change', (s)=>{
    dani = s.target.value
    ucitajSortirano(dani,sortiranje,ispisiTabelu);
});