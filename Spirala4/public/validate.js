function vrijemeUMinute(v) {
    var s = v.split(':'); //razdajaju se sati i minute
    var minutes = (+s[0]) * 60 + (+s[1]);
    return minutes;
}
function validiraj(){
    var na=document.getElementById("akctname").value.toLowerCase();
    var n=document.getElementById("name").value.toLowerCase();
    var a=document.getElementById("activity").value.toLowerCase();
    var d = document.getElementById("day").value.toLowerCase();
    var pocetak =document.getElementById("start").value;
    var kraj=document.getElementById("end").value;
    var grupa = document.getElementById("groups").value;
    //provjera da li je aktivnost popunjeno i ako jeste da provjeri da li je uneseno predavanje ili vjezbe jer samo imaju te dvije opcije
        if ((a != "predavanje" && a != "vjezbe") || a === "") {
            alert("Aktivnost vam treba biti predavanje ili vjezbe!");
            return false;
        }
    //provjera da li je polje naziv prazno
        if (n === "") {
            alert("Polje naziva predemta Vam je prazno!");
            return false;
        }
        if (na === "") {
            alert("Polje naziva aktivnosti Vam je prazno!");
            return false;
        }
    //provjera da li u nazivu ima ime grupe ukoliko su vjezbe
        if (a === "vjezbe") {
            if(grupa =="null"){
                alert("Potrebno je odabrati grupu na dropdown listi!");
                return false;
            }
        }else{
            if(grupa !="null"){
                alert("Grupa nije potrebna ukoliko je predavanje, vratite na defalutnu vrijednost");
                return false;
            }
        }
    //provjera da li je dan u sedmici ispravan
        if ((d != "ponedjeljak" && d != "utorak" && d != "srijeda" && d != "cetvrtak" && d != "petak") || d === "") {
            if (d === "subota" || d == "nedjeljak") alert("Nema nastave vikendom!");
            else alert("Unijeli ste nepostojeći dan!");
            return false;
        }
    //provjera da li vrijeme ima dva dijela tj da li ima sate i minute
        if (!pocetak.includes(":") || !kraj.includes(":")) {
            alert("Vrijeme Vam mora sadržiti :");
            return false;
        }
    //provjera da li su u vremenu samo brojevi
    if (!pocetak.match(/^[0-9\:]+$/) || !kraj.match(/^[0-9\:]+$/)) {
        alert("Vrijeme Vam mora imati u sebi samo brojeve i :");
        return false;
    }
    //provjerava se da li su sati i minute pravili brojevi(pozitivni od 24 i 60)
        var poc = pocetak.split(":");
        var kr = kraj.split(":");
        if ((+poc[0] < 0 || +poc[0] >= 24) || (+kr[0] < 0 || +kr[0] >= 24)) {
            alert("Sati trebaju biti između 0 i 24!");
            return false;
        }
        if ((+poc[1] < 0 || +poc[1] >= 60) || (+kr[1] < 0 || +kr[1] >= 60)) {
            alert("Minute trebaju biti između 0 i 60!");
            return false;
        }
        //provjerava se da li je pocetak prije kraja
        var p = vrijemeUMinute(pocetak);
        var k = vrijemeUMinute(kraj);
        if (p > k) {
            alert("Vrijeme početka treba biti prije vremena kraja!");
            return false;
        }
        return true;
    }
