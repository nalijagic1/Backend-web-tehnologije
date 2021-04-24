const fs = require('fs');
const url = require('url');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
app.use(express.static('public'));
// metoda koja pretvara prosljeđeni dan u broj
function danUBroj(dan){
    if(dan==="ponedjeljak")return 1;
    else if(dan==="utorak")return 2;
    else if(dan==="srijeda")return 3;
    else if(dan==="cetvrtak")return 4;
    else if(dan ==="petak")return 5;
}

//metoda koja cita iz csv fajla i pretvara csv u json
function toJSON() {
    var a = [];
    var data = fs.readFileSync('public/raspored.csv');
    var array = data.toString().split("\n");
    for (var l = 0; l < array.length ; l++) {
        var info = array[l].split(",");
        var user = { naziv: info[0], aktivnost: info[1], dan: info[2], pocetak: info[3], kraj: info[4] };
        a.push(user);
    }
    return a;
}

//metoda koja iz rasporeda uzima samo predmete koji su u određenom danu
function rasporedFilter(raspored,dan){
    var izdvoj=[];
    for(let i of raspored){
        if(i.dan===dan){
            izdvoj.push(i);
        }
    }
    return izdvoj;
}

//metoda koja pretvara string u minute
function vrijemeUMinute(v) {
    var s = v.split(':'); //razdajaju se sati i minute
    var minutes = (+s[0]) * 60 + (+s[1]);
    return minutes;
}

//metoda koja se prosljeđuje sort funkciji kako bi se niz sortirao
function uslov(sortAt){
    return function sortiraj(a, b) {
        //pretvaramo sve u mala slova da sortiranje ne bude case sensitive
        a=a[sortAt].toLowerCase();
        b=b[sortAt].toLowerCase();

        if(sortAt=='dan'){//ukoliko se sortira po danu, dane pretvorimo u brojeve kako se ne bi abecedno sortiralo
            a=danUBroj(a);
            b=danUBroj(b);
        //ukoliko se sortira po početku ili kraju, pretvaramo sve u minute
        }else if(sortAt==='pocetak' || sortAt=='kraj'){
            a=vrijemeUMinute(a);
            b=vrijemeUMinute(b);
        } 
        let c = 0;
        if (a > b) {
          c = 1;
        } else if (a < b) {
          c = -1;
        }
        return c;
      };
}

//metoda kojom provjeravamo da li je unesena forma tačna ( ista kao i u validate.js)
function validiraj(naziv, aktivnost, dan, pocetak, kraj) {
    var n = naziv.toLowerCase();
    var a = aktivnost.toLowerCase();
    var d = dan.toLowerCase();
    if ((a != "predavanje" && a != "vjezbe") || a === "") {
        console.log("Aktivnost vam treba biti predavanje ili vjezbe!");
        return false;
    }
    if (n === "") {
        console.log("Polje predavanja Vam je prazno!");
        return false;
    }
    if(!n.match(/^[0-9a-zA-Z\-]+$/)){
        console.log("Polje predavanja posjeduje nedozvoljene znakove!");
        return false;
    }
    if (a === "vjezbe") {
        if (!n.includes("-")) {
            console.log("U nazivu vam treba biti naziv grupe!");
            return false;
        }
    }
    if ((d != "ponedjeljak" && d != "utorak" && d != "srijeda" && d != "cetvrtak" && d != "petak") || d === "") {
        if (d === "subota" || d == "nedjeljak") console.log("Nema nastave vikendom!");
        else console.log("Unijeli ste nepostojeći dan!");
        return false;
    }
    if (!pocetak.includes(":") || !kraj.includes(":")) {
        console.log("Vrijeme Vam mora sadržiti :");
        return false;
    }
    if (!pocetak.match(/^[0-9\:]+$/) || !kraj.match(/^[0-9\:]+$/)) {
        console.log("Vrijeme Vam mora imati u sebi samo brojeve i :");
        return false;
    }
    var poc = pocetak.split(":");
    var kr = kraj.split(":");
    if ((+poc[0] < 0 || +poc[0] >= 24) || (+kr[0] < 0 || +kr[0] >= 24)) {
        console.log("Sati trebaju biti između 0 i 24!")
        return false;
    }
    if ((+poc[1] < 0 || +poc[1] >= 60) || (+kr[1] < 0 || +kr[1] >= 60)) {
        console.log("Minute trebaju biti između 0 i 60!")
        return false;
    }
    var p = vrijemeUMinute(pocetak);
    var k = vrijemeUMinute(kraj);
    if (p > k) {
        console.log("Vrijeme početka treba biti prije vremena kraja!")
        return false;
    }
    return true;
}
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.post('/raspored',function (req, res) {
        //console.log(req.body);
            var searchParams = new URLSearchParams(req.body);
            var pr = "";
            var akt = "";
            var day = "";
            var start = "";
            var end = "";
            searchParams.forEach(function (value, key) {
                if (key == "naziv") pr = value;
                else if (key == "aktivnost") akt = value;
                else if (key == "dan") day = value;
                else if (key == "pocetak") start = value;
                else if (key == "kraj") end = value;
            });

            var valid = validiraj(pr, akt, day, start, end);
            if (valid == false) {
                res.writeHead(200, { 'Content-Type': 'text/plain' });
                res.end("Unesene informacije nisu validne!");
            } else {
                var json = toJSON();
                var postoji = false;
                for (var i of json) {
                    if (i.dan != day) continue;
                    if ((vrijemeUMinute(start) >= vrijemeUMinute(i.pocetak) && vrijemeUMinute(start) < vrijemeUMinute(i.kraj)) || (vrijemeUMinute(end) > vrijemeUMinute(i.pocetak) && vrijemeUMinute(end) <= vrijemeUMinute(i.kraj))){
                        if(akt==="predavanje" || i.aktivnost==="predavanje")postoji = true;
                        else{
                            var grupaUbacenog = pr.split("-")[1];
                            var grupaPostojeceg = i.naziv.split("-")[1];
                            if(grupaPostojeceg===grupaUbacenog)postoji = true;
                        }
                    } 
                }
                if (postoji == true) {
                    res.writeHead(200, { 'Content-Type': 'text/plain' });
                    res.end("Vec postoji aktivnost u tom terminu!");
                } else {
                    var dodati = "";
                    for (var i = 0; i < json.length; i++){
                        dodati += (json[i].naziv + "," + json[i].aktivnost + "," + json[i].dan + "," + json[i].pocetak + "," + json[i].kraj+"\n" );
                    }
                    dodati += (pr + "," + akt + "," + day + "," + start + "," + end);
                    fs.writeFileSync('public/raspored.csv', dodati);
                    res.writeHead(200, { 'Content-Type': 'text/plain' });
                    res.end("Uspjesno ste dodali aktivnost na raspored!");
                }
            }
});
app.get('/raspored',function (req, res) {
    if (fs.existsSync('public/raspored.csv') == false) {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        var greska = { greska: "Datoteka raspored.csv nije kreirana!" };
        res.end(JSON.stringify(greska));
    }else{
        const current = new URL('http://localhost:8080'+req.url);
        var head = JSON.stringify(req.headers.accept);
        var raspored = toJSON();
        const search_params = current.searchParams;
        if(search_params.has('sort')){
            var sort = search_params.get('sort');
            var sortAD = sort.charAt(0);
            sortAD = sortAD.toUpperCase();
            var tacno = true;
            if(!(sortAD==='A' || sortAD==='D'))tacno = false;
            var sortAt="";
            for(var i = 1;i < sort.length;i++)sortAt+=sort.charAt(i);
            sortAt=sortAt.toLowerCase();
            if(!(sortAt==='naziv' || sortAt==='aktivnost' || sortAt==='dan' || sortAt==='pocetak' || sortAt==='kraj'))tacno = false;
            if(tacno){
                raspored=raspored.sort(uslov(sortAt));
                if(sortAD==='D') raspored = raspored.reverse();
            }
        }
        if(search_params.has('dan')){
            raspored = rasporedFilter(raspored,search_params.get('dan'));
        }
        if (head === "\"text/csv\"") {
            res.writeHead(200, { 'Content-Type': 'text/csv' });
            var data = "";
            for (var i = 0; i < raspored.length; i++)data += (raspored[i].naziv + "," + raspored[i].aktivnost + "," + raspored[i].dan + "," + raspored[i].pocetak + "," + raspored[i].kraj + "\n");
            res.end(data);
        } else { 
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(raspored));

        }   

    }
})
app.get('/predmeti',function (req, res) {
    var predmetiSaZarezom = fs.readFileSync('public/predmeti.csv');
    var predmeti = predmetiSaZarezom.toString().split(",");
    var imenaPredmeta =[];
    for(let i of predmeti){
        var object ={naziv:i};
        imenaPredmeta.push(object);
    }
    res.end(JSON.stringify(imenaPredmeta));
});
app.post('/predmeti',function (req, res) {
    //console.log(req.body);
    var predmetiSaZarezom = fs.readFileSync('public/predmeti.csv');
    var predmeti = predmetiSaZarezom.toString()+","+req.body.naziv;
    fs.writeFileSync('public/predmeti.csv', predmeti);
    res.end("Dodat predmet "+ req.body.naziv);
});
app.delete('/predmeti',function (req, res) {
    var predmetiSaZarezom = fs.readFileSync('public/predmeti.csv');
    var predmeti = predmetiSaZarezom.toString().split(",");
    var imenaPredmeta ="";
    for(let i = 0; i < predmeti.length;i++){
        //kako bi poređenje bilo case sensitive, pretvaramo predmet iz liste i trazeni predmet u velika slova
        //velikop prestavlja predemte velikim slovima
        //velikot preddtsavčja trazeni predmet velikim slovima
        var velikop = predmeti[i].toUpperCase();
        var velikot = req.body.naziv.toUpperCase();
        if(velikot == velikop){
            //ukoliko je nađeni predmet posljednji predmet, zarez koji se dodao prije ovoga se uklanja
            //substing uzima sve od početka pa do zadnjeg predmeta prije zareza
            //kako se zarez ne bi uzeo u obzir ide se od imenaPredmeta.lenght-1
            if(i==predmeti.length-1){
                imenaPredmeta = imenaPredmeta.substring(0,imenaPredmeta.length-1);
            }
            continue;
        }
        imenaPredmeta+=predmeti[i];
        if(i!=predmeti.length-1){
            imenaPredmeta+=",";
        }
    }
    //podaci se upisuju u datoteku pomoću writeFile jer će prijašnji podaci prvo obrisati pa će se novi dodati
    fs.writeFileSync('public/predmeti.csv', imenaPredmeta);
    res.end("Predmet "+req.body.naziv+" je obrisan");
});
app.listen(8080);
