class Raspored {
    constructor(raspored) {
        var predmeti = raspored.split("\n");//razvdajamo string na zasebne predmete 
        this.raspored = [];
        for (let element of predmeti) {
            let podaci = element.split(",");//razdajamo predemte na njegove osobine
            let pr = { naziv: podaci[0], aktivnost: podaci[1], dan: podaci[2], start: podaci[3], end: podaci[4] };
            this.raspored.push(pr);
        }
    }
    vrijemeUMinute(v) {
        var s = v.split(':'); //razdajaju se sati i minute
        var minutes = (+s[0]) * 60 + (+s[1]);
        return minutes;
    }

    dajTrenutnuAktivnost(vrijeme, grupa) {
        var ti = vrijeme.split("T")//razdvaja se datum i vrijeme
        var vr = ti[0].split("-");
        var dan = new Date(vr[2],vr[1]-1,vr[0]);
        var day = dan.getDay();//uzima se dan koji ce biti int u ovom slucaju
        var danRijeci = "";
        switch (day) {//pretrazuje se koji je dan kako bi se mogao zapisati rijecima
            case 1:
                danRijeci = "ponedjeljak";
                break;
            case 2:
                danRijeci = "utorak";
                break;
            case 3:
                danRijeci = "srijeda";
                break;
            case 4:
                danRijeci = "četvrtak";
                break;
            case 5:
                danRijeci = "petak";
                break;
            default:
                break;
        }
        let h = ti[1].substring(0, 5);
        for (let cas of this.raspored) {
            if (danRijeci.localeCompare(cas.dan) == 0) {//provjerava se da li je aktivnost u danasnjem danu
                if (this.vrijemeUMinute(h) >= this.vrijemeUMinute(cas.start) && this.vrijemeUMinute(h) < this.vrijemeUMinute(cas.end)) {//provjerava se da li je trenutno vrijeme izmedju pocetka i krja casa
                    if (cas.aktivnost.localeCompare("predavanje") == 0 || grupa.localeCompare(cas.naziv.split("-")[1]) == 0) {//provjeraca se da li je predavanje ili vjezba prve grupe
                        let ostalo = this.vrijemeUMinute(cas.end) - this.vrijemeUMinute(h);
                        let s = `${cas.naziv.split("-")[0]} ${ostalo}`;
                        return s;
                    }

                }
            }
        }
        return "Trenutno nema aktivnosti";

    }
    dajSljedecuAktivnost(vrijeme, grupa) {
        var ti = vrijeme.split("T")
        var vr = ti[0].split("-");
        var dan = new Date(vr[2],vr[1]-1,vr[0])
        var day = dan.getDay();
        var daniUSedmici = ["ponedjeljak", "utorak", "srijeda", "četvrtak", "petak"];
        var danRijeci = daniUSedmici[day - 1];
        let h = ti[1].substring(0, 5);
        let index = 0;
        let sada = -1;
        let najblize = this.vrijemeUMinute("23:59");//max minuta u jednom danu
        for (let cas of this.raspored) {
            sada++;
            if (danRijeci.localeCompare(cas.dan) == 0) {
                if (this.vrijemeUMinute(h) >= this.vrijemeUMinute(cas.start) && this.vrijemeUMinute(h) < this.vrijemeUMinute(cas.end)) continue;//ukoliko trenutno traje predavanje preskocit ce ga
                if (this.vrijemeUMinute(h) < this.vrijemeUMinute(cas.start) && this.vrijemeUMinute(cas.start) < najblize) {//gledamo da mi cas pocinje nakon trenutnog vremena i da li je blize od trenutnog najblieg vremena
                    if (cas.aktivnost === "predavanje" || grupa === (cas.naziv.split("-")[1])) {
                        index = sada;//pamtimo index na kojem se nalazi predmet
                        najblize = this.vrijemeUMinute(cas.start);//mijenjamo vrijednost najblizeg
                    }

                }
            }
        }
        if (najblize == this.vrijemeUMinute("23:59")) return "Nastava je gotova za danas";
        else return this.raspored[index].naziv.split("-")[0] + " " + (this.vrijemeUMinute(this.raspored[index].start) - this.vrijemeUMinute(h));
    }

    dajPrethodnuAktivnost(vrijeme, grupa) {
        var ti = vrijeme.split("T")
        var vr = ti[0].split("-");
        var dan = new Date(vr[2],vr[1]-1,vr[0])
        var day = dan.getDay();
        var daniUSedmici = ["ponedjeljak", "utorak", "srijeda", "cetvrtak", "petak"];
        var indexDana = day - 1;
        var danRijeci = daniUSedmici[indexDana];
        let h = ti[1].substring(0, 5);
        let index = 0;
        let najblize = this.vrijemeUMinute("00:00");
        let krozPetlju = 0;
        do {

            let sada = -1
            for (let cas of this.raspored) {
                sada++;
                if (danRijeci.localeCompare(cas.dan) == 0) {
                    if (krozPetlju == 0) {//desit ce se samo prvi put kada smo na trenutnom danu
                        if (this.vrijemeUMinute(h) >= this.vrijemeUMinute(cas.start) && this.vrijemeUMinute(h) < this.vrijemeUMinute(cas.end)) continue;
                        if (this.vrijemeUMinute(h) > this.vrijemeUMinute(cas.end) && this.vrijemeUMinute(cas.start) > najblize) {
                            if (cas.aktivnost === "predavanje" || grupa === (cas.naziv.split("-")[1])) {
                                index = sada;
                                najblize = this.vrijemeUMinute(cas.start);

                            }
                        }
                    } else {
                        if (this.vrijemeUMinute(cas.start) > najblize) {

                            if (cas.aktivnost === "predavanje" || grupa === (cas.naziv.split("-")[1])) {
                                index = sada;
                                najblize = this.vrijemeUMinute(cas.start);
                            }
                        }
                    }

                }
            } krozPetlju = krozPetlju + 1;
            if (najblize == this.vrijemeUMinute("00:00")) {
                indexDana--;//vracamo se dan unazad
                if (indexDana < 0) indexDana = daniUSedmici.length - 1;//ukoliko smo nalazimo na ponedjeljku(0) vracamo se na petak (4)
                danRijeci = daniUSedmici[indexDana];
            }
            else {
                return this.raspored[index].naziv.split("-")[0];

            }
        } while (true);
    }


}