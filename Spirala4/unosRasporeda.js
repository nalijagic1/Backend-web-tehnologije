const fs = require('fs');
const url = require('url');
const express = require('express');
const db = require('./base.js')
const bodyParser = require('body-parser');
const app = express();
//{force:true}
db.sequelize.sync().then(function(){
    init().then(function(){
       console.log("Kreirana baza i ubačeni defaultni podaci");
    });
})
async function init(){
    var listaPromisaTip = [];
    var listaPromisaDan = [];
    var listaPromisaPred = [];
    var listaPromisaStud = [];
    var listaPromisaGrupe = [];
    var listaPromisaAktivnosti = [];
    return new Promise(async function(resolve,reject){
        //ubacivanje tipa - predavanje ili vjezbbe
        listaPromisaTip.push(db.tip.findOrCreate({where:{naziv:"predavanje"}}));
        listaPromisaTip.push(db.tip.findOrCreate({where:{naziv:"vjezbe"}}));
        await Promise.all(listaPromisaTip);
        //ubacivanje dana- samo radni dani
        listaPromisaDan.push(db.dan.findOrCreate({where:{naziv:"ponedjeljak"}}));
        listaPromisaDan.push(db.dan.findOrCreate({where:{naziv:"utorak"}}));
        listaPromisaDan.push(db.dan.findOrCreate({where:{naziv:"srijeda"}}));
        listaPromisaDan.push(db.dan.findOrCreate({where:{naziv:"cetvrtak"}}));
        listaPromisaDan.push(db.dan.findOrCreate({where:{naziv:"petak"}}));
        await Promise.all(listaPromisaDan);
        //ubacivanje predmeta
        listaPromisaPred.push(db.predmet.findOrCreate({where:{naziv:"WT"}}));
        listaPromisaPred.push(db.predmet.findOrCreate({where:{naziv:"RMA"}}));
        listaPromisaPred.push(db.predmet.findOrCreate({where:{naziv:"MUR1"}}));
        await Promise.all(listaPromisaPred);
        //ubacivanje studenta
        listaPromisaStud.push(db.student.findOrCreate({where:{ime:"Neko Nekic",index:"12345"}}));
        listaPromisaStud.push(db.student.findOrCreate({where:{ime:"Cetvrti Neko",index:"18009"}}));
        await Promise.all(listaPromisaStud);
        //ubacivanje grupa
        let wt = await db.predmet.findOne({where:{naziv:"WT"}});
        let rma = await db.predmet.findOne({where:{naziv:"RMA"}});
        let mur = await db.predmet.findOne({where:{naziv:"MUR1"}}); 
        listaPromisaGrupe.push(db.grupa.findOrCreate({where:{naziv:"WTgrupa1",PredmetId:wt.id}}));
        listaPromisaGrupe.push(db.grupa.findOrCreate({where:{naziv:"WTgrupa2",PredmetId:wt.id}}));
        listaPromisaGrupe.push(db.grupa.findOrCreate({where:{naziv:"RMAgrupa1",PredmetId:rma.id}}));
        listaPromisaGrupe.push(db.grupa.findOrCreate({where:{naziv:"RMAgrupa2",PredmetId:rma.id}}));
        listaPromisaGrupe.push(db.grupa.findOrCreate({where:{naziv:"MUR1grupa1",PredmetId:mur.id}}));
        listaPromisaGrupe.push(db.grupa.findOrCreate({where:{naziv:"MUR1grupa2",PredmetId:mur.id}}));
        await Promise.all(listaPromisaGrupe);
        //ubacivanje aktivnosti
        let srijeda = await db.dan.findOne({where:{naziv:"srijeda"}});
        let ponedjeljak = await db.dan.findOne({where:{naziv:"ponedjeljak"}});
        let predavanja = await db.tip.findOne({where:{naziv:"predavanje"}}); 
        let vjezbe = await db.tip.findOne({where:{naziv:"vjezbe"}}); 
        var grupaWT1 = await db.grupa.findOne({where:{naziv:"WTgrupa1"}});
        listaPromisaAktivnosti.push(db.aktivnost.findOrCreate({where:{naziv:"RMA predavanje",pocetak:"9.0",kraj:"12.0",PredmetId:rma.id,DanId:srijeda.id,TipId:predavanja.id}}));
        listaPromisaAktivnosti.push(db.aktivnost.findOrCreate({where:{naziv:"WT vjezbe",pocetak:"9.0",kraj:"10.5",PredmetId:wt.id,DanId:ponedjeljak.id,TipId:vjezbe.id,GrupaId:grupaWT1.id}}));
        await Promise.all(listaPromisaAktivnosti);
        //kreiranje veze između tabeala student i grupa
        var grupaRMA1 = await db.grupa.findOne({where:{naziv:"RMAgrupa1"}});
        var Neko = await db.student.findOne({where:{ime:"Neko Nekic",index:"12345"}});
        var Cetvrti = await db.student.findOne({where:{ime:"Cetvrti Neko",index:"18009"}});
        Neko.addGrupe(grupaWT1);
        Cetvrti.addGrupe(grupaRMA1);
    });
}

app.use(express.static('public'));
// metoda koja pretvara prosljeđeni dan u broj
function danUBroj(dan){
    if(dan==="ponedjeljak")return 1;
    else if(dan==="utorak")return 2;
    else if(dan==="srijeda")return 3;
    else if(dan==="cetvrtak")return 4;
    else if(dan ==="petak")return 5;
}
//metoda koja pretvara float broj u string vremena sa dvotačkom
function pretvoriuString(vrijemeFloat){
    var sati = Math.floor(vrijemeFloat);
    var minute = (vrijemeFloat-sati)*60;
    var vrijeme = sati+":"+minute;
    return vrijeme;
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
//metoda koja će vatiti predmet ovisno od proslijeđenog id-a
 async function getPredmetFromId(id){
    const result = await db.predmet.findByPk(id);;
        if(result === null)return;
        var pr = {id:result.id,naziv:result.naziv};
        return pr ;  
}
//metoda koja će vatiti grupu ovisno od proslijeđenog id-a
async function getGrupaFromId(id){
    const result = await db.grupa.findByPk(id);;
        if(result === null)return;
        var gr = {id:result.id,naziv:result.naziv,predmetId:result.PredmetId};
        return gr ;  
}
//metoda koja će vatiti dan ovisno od proslijeđenog id-a
async function getDanFromId(id){
    const result = await db.dan.findByPk(id);;
        if(result === null)return;
        var dan = {id:result.id,naziv:result.naziv};
        return dan;  
}
//metoda koja će vatiti tip ovisno od proslijeđenog id-a
async function getTipFromId(id){
    const result = await db.tip.findByPk(id);;
        if(result === null)return;
        var tip = {id:result.id,naziv:result.naziv};
        return tip;  
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
//metoda koja pretvara vrijeme sa dvoračkom u float broj
function vrijemeUFloatu(v) {
    var s = v.split(':'); //razdajaju se sati i minute
    //console.log(s[1]/60);
    var minutes = (+s[0]) + (+s[1]/60);
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

//metoda kojom provjeravamo da li je unesena forma tačna ( izmenjena kao bi se prilagodila zadatuku 3 spirala 4 sa bazom)
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
//metoda sa spirala 2
app.post('/v1/raspored',function (req, res) {
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
//metoda sa spitale 2
app.get('/v1/raspored',function (req, res) {
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
//metode sa spirale 3
app.get('/v1/predmeti',function (req, res) {
    var predmetiSaZarezom = fs.readFileSync('public/predmeti.csv');
    var predmeti = predmetiSaZarezom.toString().split(",");
    var imenaPredmeta =[];
    for(let i of predmeti){
        var object ={naziv:i};
        imenaPredmeta.push(object);
    }
    res.end(JSON.stringify(imenaPredmeta));
});
app.post('/v1/predmeti',function (req, res) {
    //console.log(req.body);
    var predmetiSaZarezom = fs.readFileSync('public/predmeti.csv');
    var predmeti = predmetiSaZarezom.toString()+","+req.body.naziv;
    fs.writeFileSync('public/predmeti.csv', predmeti);
    res.end("Dodat predmet "+ req.body.naziv);
});
app.delete('/v1/predmeti',function (req, res) {
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

//PREDMET CRUD
app.get('/v2/predmet',function (req, res) {
    db.predmet.findAll().then(function(result){
        var predmeti = [];
        for(var i = 0; i < result.length;i++){
            var predmet = {id:result[i].id,naziv:result[i].naziv};
            predmeti.push(predmet)
        }
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(predmeti));
    });  
});
app.get('/v2/predmet/:id',function (req, res) {
    db.predmet.findAll({where:{id:req.params.id}}).then(function(result){
        var predmeti = [];
        for(var i = 0; i < result.length;i++){
            var predmet = {id:result[i].id,naziv:result[i].naziv};
            predmeti.push(predmet)
        }
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(predmeti));
    });  
});
//potrebno je da ulazni podaci imaju isti key kao imena naziva kolona u bazi(naziv kao key)
app.post('/v2/predmet',function (req, res) {
    db.predmet.create(req.body).then(function(result){
        res.end("Dodat predmet "+ req.body.naziv+" i njegov id ="+result.id);
    });    
});
app.delete('/v2/predmet/:id',function (req, res) {
    db.predmet.destroy({where:{id:req.params.id}}).then(function(result){
        if(result!=0)res.end("Predmet obrisan");
        else res.end("Predmet sa id "+ req.params.id+" ne postoji u bazi.");
    });    
});
app.put('/v2/predmet/:id',function (req, res) {
    db.predmet.update(req.body,{where:{id:req.params.id}}).then(function(result){
        if(result == 0)res.end("Predmet sa id "+ req.params.id+" ne postoji u bazi.");
        else res.end("Predmet sa id "+ req.params.id+" je uređen");   
    });    
});

//DAN CRUD
app.get('/v2/dan',function (req, res) {
    db.dan.findAll().then(function(result){
        var dani = [];
        for(var i = 0; i < result.length;i++){
            var dan = {id:result[i].id,naziv:result[i].naziv};
            dani.push(dan)
        }
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(dani));
    });
    ;   
});
app.get('/v2/dan/:id',function (req, res) {
    db.dan.findAll({where:{id:req.params.id}}).then(function(result){
        var dani = [];
        for(var i = 0; i < result.length;i++){
            var dan = {id:result[i].id,naziv:result[i].naziv};
            dani.push(dan)
        }
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(dani));
    });
    ;   
});
//potrebno je da ulazni podaci imaju isti key kao imena naziva kolona u bazi(naziv kao key)
app.post('/v2/dan',function (req, res) {
    db.dan.create(req.body).then(function(result){
        res.end("Dodat dan "+ req.body.naziv);
    });    
});
app.delete('/v2/dan/:id',function (req, res) {
    db.dan.destroy({where:{id:req.params.id}}).then(function(result){
        if(result!=0)res.end("Dan obrisan");
        else res.end("Dan sa id "+ req.params.id+" ne postoji u bazi.");
    });    
});
app.put('/v2/dan/:id',function (req, res) {
    db.dan.update(req.body,{where:{id:req.params.id}}).then(function(result){
        if(result == 0)res.end("Dan sa id "+ req.params.id+" ne postoji u bazi.");
        else res.end("Dan sa id "+ req.params.id+" je uređen");   
    });    
});

//TIP CRUD
app.get('/v2/tip',function (req, res) {
    db.tip.findAll().then(function(result){
        var tipovi = [];
        for(var i = 0; i < result.length;i++){
            var tip = {id:result[i].id,naziv:result[i].naziv};
            tipovi.push(tip)
        }
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(tipovi));
    });
});
app.get('/v2/tip/:id',function (req, res) {
    db.tip.findAll({where:{id:req.params.id}}).then(function(result){
        var tipovi = [];
        for(var i = 0; i < result.length;i++){
            var tip = {id:result[i].id,naziv:result[i].naziv};
            tipovi.push(tip)
        }
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(tipovi));
    });
});
//potrebno je da ulazni podaci imaju isti key kao imena naziva kolona u bazi(naziv kao key)
app.post('/v2/tip',function (req, res) {
    db.tip.create(req.body).then(function(result){
        res.end("Dodat tip "+ req.body.naziv);
    });    
});
app.delete('/v2/tip/:id',function (req, res) {
    db.tip.destroy({where:{id:req.params.id}}).then(function(result){
        if(result!=0)res.end("Dan tip");
        else res.end("Tip sa id "+ req.params.id+" ne postoji u bazi.");
    });    
});
app.put('/v2/tip/:id',function (req, res) {
    db.tip.update(req.body,{where:{id:req.params.id}}).then(function(result){
        if(result == 0)res.end("Tip sa id "+ req.params.id+" ne postoji u bazi.");
        else res.end("Tip sa id "+ req.params.id+" je uređen");   
    });    
});

//STUDENT CRUD
app.get('/v2/student',function (req, res) {
    db.student.findAll().then(function(result){
        var studenti = [];
        for(var i = 0; i < result.length;i++){
            var student = {id:result[i].id,ime:result[i].ime,index:result[i].index};
            studenti.push(student)
        }
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(studenti));
    });
});
app.get('/v2/student/:id',function (req, res) {
    db.student.findAll({where:{id:req.params.id}}).then(function(result){
        var studenti = [];
        for(var i = 0; i < result.length;i++){
            var student = {id:result[i].id,ime:result[i].ime,index:result[i].index};
            studenti.push(student)
        }
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(studenti));
    });   
});
//potrebno je da ulazni podaci imaju isti key kao imena naziva kolona u bazi(ime i index kao key)
app.post('/v2/student',function (req, res) {
    db.student.create(req.body).then(function(result){
        res.end("Dodat student "+ req.body.ime);
    });    
});
app.delete('/v2/student/:id',function (req, res) {
    db.student.destroy({where:{id:req.params.id}}).then(function(result){
        if(result!=0)res.end("Student obrisan");
        else res.end("Student sa id "+ req.params.id+" ne postoji u bazi.");
    });    
});
app.put('/v2/student/:id',function (req, res) {
    db.student.update(req.body,{where:{id:req.params.id}}).then(function(result){
        if(result == 0)res.end("Student sa id "+ req.params.id+" ne postoji u bazi.");
        else res.end("Student sa id "+ req.params.id+" je uređen");   
    });    
});

//Grupa CRUD
app.get('/v2/grupa', function (req, res) {
    db.grupa.findAll().then(async function(result){
        var grupe = [];
        for(var i = 0; i < result.length;i++){
            let pr = await getPredmetFromId(result[i].PredmetId);
            var grupa = {id:result[i].id,naziv:result[i].naziv,predmet:pr};
            grupe.push(grupa);
        }
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(grupe));
    });    
});
app.get('/v2/grupa/:id', function (req, res) {
    db.grupa.findAll({where:{id:req.params.id}}).then(async function(result){
        var grupe = [];
        for(var i = 0; i < result.length;i++){
            let pr = await getPredmetFromId(result[i].PredmetId);
            var grupa = {id:result[i].id,naziv:result[i].naziv,predmet:pr};
            grupe.push(grupa);
        }
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(grupe));
    });    
});
//potrebno je da ulazni podaci imaju isti key kao imena naziva kolona u bazi(naziv i PredmetId kao key)
app.post('/v2/grupa',function (req, res) {
    db.grupa.create(req.body).then(function(result){
        res.end("Dodata grupa "+ req.body.naziv);
    }).catch(function(err){
        res.end("PredmetId ne smije biti null");
    });    
});
app.delete('/v2/grupa/:id',function (req, res) {
    db.grupa.destroy({where:{id:req.params.id}}).then(function(result){
        if(result!=0)res.end("Grupa obrisana");
        else res.end("Grupa sa id "+ req.params.id+" ne postoji u bazi.");
    });    
});
app.put('/v2/grupa/:id',function (req, res) {
    db.grupa.update(req.body,{where:{id:req.params.id}}).then(function(result){
        if(result == 0)res.end("Grupa sa id "+ req.params.id+" ne postoji u bazi.");
        else res.end("Grupa sa id "+ req.params.id+" je uređen");   
    });    
});

//AKTIVNOST CRUD
app.get('/v2/aktivnost',function (req, res) {
    db.aktivnost.findAll().then(async function(result){
        var aktivnosti = [];
        for(var i = 0; i < result.length;i++){
            var p = await getPredmetFromId(result[i].PredmetId);
            var g;
            if(result[i].GrupaId == null)g = null;
            else g =  await getGrupaFromId(result[i].GrupaId);
            var d = await getDanFromId(result[i].DanId);
            var t = await getTipFromId(result[i].TipId);
            var aktivnost = {id:result[i].id,naziv:result[i].naziv,pocetak:result[i].pocetak,kraj:result[i].kraj,predmet:p,grupa:g,dan:d,tip:t};
            aktivnosti.push(aktivnost)
        }
       res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(aktivnosti));
    });
});
app.get('/v2/aktivnost/:id',function (req, res) {
    db.aktivnost.findAll({where:{id:req.params.id}}).then(async function(result){
        var aktivnosti = [];
        for(var i = 0; i < result.length;i++){
            var p = await getPredmetFromId(result[i].PredmetId);
            var g;
            if(result[i].GrupaId == null)g = null;
            else g =  await getGrupaFromId(result[i].GrupaId);
            var d = await getDanFromId(result[i].DanId);
            var t = await getTipFromId(result[i].TipId);
            var aktivnost = {id:result[i].id,naziv:result[i].naziv,pocetak:result[i].pocetak,kraj:result[i].kraj,predmet:p,grupa:g,dan:d,tip:t};
            aktivnosti.push(aktivnost)
        }
       res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(aktivnosti));
    });
});
//potrebno je da ulazni podaci imaju isti key kao imena naziva kolona u bazi(naziv,pocetak,kraj,PredmetId,TipId,DanId,GrupaId kao key)
app.post('/v2/aktivnost',function (req, res) {
    db.aktivnost.create(req.body).then(function(result){
        res.end("Dodata aktivnost  "+ req.body.naziv);
    }).catch(function(error){
        res.end("Strani ključevi ne smiju biti null");
    });    
});
app.delete('/v2/aktivnost/:id',function (req, res) {
    db.aktivnost.destroy({where:{id:req.params.id}}).then(function(result){
        if(result!=0)res.end("Aktivnost obrisan");
        else res.end("Aktivnost sa id "+ req.params.id+" ne postoji u bazi.");
    });    
});
app.put('/v2/aktivnost/:id',function (req, res) {
    db.aktivnost.update(req.body,{where:{id:req.params.id}}).then(function(result){
        if(result == 0)res.end("Aktivnost sa id "+ req.params.id+" ne postoji u bazi.");
        else res.end("Aktivnost sa id "+ req.params.id+" je uređen");   
    });    
});

//student-grupa
app.put('/v2/student/:sid/grupa/:gid',function(req,res){
    db.student.findByPk(req.params.sid).then(function(stud){
        db.grupa.findByPk(req.params.gid).then(function(gru){
            stud.addGrupe([gru]);
            res.end("Veza između studenta i grupe uspostavljena.")
        ;})
    });
});

//Zadatak 2
app.post('/v2/dodavanjeStudenata/:gid', async function(req,res){
    //uzimamo niz studenata koji se poslao kao json
    var nizStudenata = req.body.niz;
    //tražimo infomraicje o odabranoj grupi
    var grupa = await db.grupa.findByPk(req.params.gid);
    var odgovor = [];
    //prolazimo kroz niz studenata
    for(var i = 0; i < nizStudenata.length;i++){
        //pronalazimo sve studente kojima je index isti kao studentu sa indexom i iz niza
        var pronadjen = await db.student.findAll({where:{index:nizStudenata[i].index}});
        //ukoliko je duzina 0, to znači da ne postoji 
        //dodajemo studenta, a zatim dodajemo vezu sa grupom
        if(pronadjen.length == 0){
            db.student.create(nizStudenata[i]).then(function(result){
                result.addGrupe([grupa]);
            });
        }else{//ukoliko je nađen student sa istim indexom, prvo se provjerava da li je isto ime studenta tj da li je isti student
            if(pronadjen[0].ime.toLowerCase() === nizStudenata[i].ime.toLowerCase()){
                //ukoliko je isti student kao u bazi, uzimamo sve grupe tog studenta
                //ukoliko je length 0 to znači da student nije ni u jednoj grupi i dodajemo mu grupu
                var grupeStudenta = await pronadjen[0].getGrupe();
                if(grupeStudenta.length == 0){
                    await pronadjen[0].addGrupe([grupa]);
                }else{
                    var istiId=[];
                    //ukoliko se se pronađe ista grupa kao grupa odabrana u html-u
                    //ne radi se nista i prelazi se na idućeg studenta
                    if(grupeStudenta.find(e => (e.id ==grupa.id)))continue;
                    //pronalaze se sve grupe u kojima je studenat da je isti predmet, ali različita gurpa od proslijeđene
                    //ukoliko se ne nađe takva grupa, samo se dodaje veza studenta i grupe
                    //u suprotnom briše se grupa istog predemta u kojem je studen, a dodaje se nov veza sa odabrnaom grupom(tj mijenja se grupa)
                    istiId = grupeStudenta.find(e => (e.PredmetId == grupa.PredmetId && e.id !=grupa.id));
                    if(!istiId){
                        await pronadjen[0].addGrupe([grupa]);
                    }else{
                        await pronadjen[0].removeGrupe(istiId.id);
                        await pronadjen[0].addGrupe(grupa);
                    }
                }
            }else{//ukoliko nije isto ime, ubacujemo poruku
                var odg ="Student "+nizStudenata[i].ime+" nije kreiran jer postoji student "+pronadjen[0].ime+" sa istim indexom "+nizStudenata[i].index;
                odgovor.push({odg:odg});
            }
        }
    }
    res.end(JSON.stringify(odgovor));
    
});

//zadatak 3(kod slikčan kao sa druge spirale)
app.post('/v2/raspored',async function (req, res) {
    //console.log(req.body);
        var searchParams = new URLSearchParams(req.body);
        var pr = "";
        var name = "";
        var akt = "";
        var day = "";
        var start = "";
        var end = "";
        var gr = "";
        //uzimamo vrijednost svakog proslijeđenog parametra
        searchParams.forEach(function (value, key) {
            if (key == "predmeta") pr = value;
            else if(key == "naziv") name = value;
            else if (key == "aktivnost") akt = value;
            else if (key == "dan") day = value;
            else if (key == "pocetak") start = value;
            else if (key == "kraj") end = value;
            else if (key == "grupa") gr = value;
        });
        var valid = validiraj(pr, akt, day, start, end);
        if (valid == false) {
            res.writeHead(200, { 'Content-Type': 'text/plain' });
            res.end("Unesene informacije nisu validne!");
        } else {
            //uzimamo id dana koj je unesen na osnovu naziva
            var danId = await db.dan.findAll({where:{naziv:day}});
            danId = danId[0].id
            //uzimamo id tipa koj je unesen na osnovu naziva
            var tipId = await db.tip.findAll({where:{naziv:akt}});
            tipId = tipId[0].id
            //uzimamo id tipa predavanje kako bismo ga mogli pporediti dole u provjeri poklapaja
            var predavanje = await db.tip.findAll({where:{naziv:"predavanje"}});
            ////uzimamo id predmeta koj je unesen na osnovu naziva
            var predmetId = await db.predmet.findAll({where:{naziv:pr}});
            var predmetId = predmetId[0].id;
            ////uzimamo id grupe koj je unesen, ukoliko je aktivnost bila predavanje, grupa je null, u suprotnom je proslijeđena vrijednost
            var grupaId = null;
            if(akt.toLowerCase()!=="predavanje"){
                grupaId = gr;
            };
            //uzimaju se sve aktivnosti koje imaju DanId proslijeđenog dana
            var json = await db.aktivnost.findAll({where:{DanId:danId}});
            var postoji = false;
            for (var i of json) {
                //provjerava se da li se početak i kraj poklapaj sa pocetkom i krajem iz niza
                if ((vrijemeUMinute(start) >= vrijemeUMinute(pretvoriuString(i.pocetak)) && vrijemeUMinute(start) < vrijemeUMinute(pretvoriuString(i.kraj))) || (vrijemeUMinute(end) > vrijemeUMinute(pretvoriuString(i.pocetak)) && vrijemeUMinute(end) <= vrijemeUMinute(pretvoriuString(i.kraj)))){
                    //ukoliko je nasa aktivnost predavanje ili tip aktivnosti iz niza je predavanje, pokpapanje je sigurno i varijablu psotoji stavljamo na true
                    //u suprotnom znaci da su vjezbe u pitanju i gledamo da li su vjezbe istih grupa, ako nisu nema pokpanaja
                    if(akt.toLowerCase()==="predavanje" || i.AktivnostId==predavanje.id)postoji = true;
                    else{
                        if(grupaId==i.GrupaId)postoji = true;
                    }
                } 
            }
            //ukoliko je nađena aktivnost u tom terminu, ispisuje se poruka da tada postoji aktivnost
            //u suprotom se aktivnost dodaje u bazu i šalje se odgovor da je usoješno dodata
            if (postoji == true) {
                res.writeHead(200, { 'Content-Type': 'text/plain' });
                res.end("Vec postoji aktivnost u tom terminu!");
            } else {
                db.aktivnost.create({naziv:name,pocetak:vrijemeUFloatu(start),kraj:vrijemeUFloatu(end),PredmetId:predmetId,GrupaId:grupaId,DanId:danId,TipId:tipId}).then(function(result){
                    res.end("Uspjesno ste dodali aktivnost na raspored!");
                });
                
            }
        }
});
app.listen(8080);
