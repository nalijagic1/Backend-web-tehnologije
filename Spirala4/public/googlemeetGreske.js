class GoogleMeet {

    static dajZadnjePredavanje(html) {
        var dom = new DOMParser();
        var dat = dom.parseFromString(html, "text/html");
        var linkovi = dat.links;
        // console.log(linkovi.length);
        //greska 3,index je 0 a ne -1
        var index = 0;
        for (let i = 0; i < linkovi.length; i++) {
            //greška 1, greška u kucanju riječi predavanj
            if (linkovi[i].innerHTML.includes("predevanj") && linkovi[i].href.includes("meet.google.com")) {
                if (linkovi[i].closest('.course-content') != null && linkovi[i].closest('.weeks') != null) index = i;
            }
        }
        if (index == -1) return null;
        //console.log(linkovi[index].href);
        return linkovi[index].href;
    }
    static dajZadnjuVježbu(html) {
        var dom = new DOMParser();
        var dat = dom.parseFromString(html, "text/html");

        var linkovi = dat.links;
        // console.log(linkovi.length);
        //greska 4, index je 0 a ne -1
        var index = 0;
        for (let i = 0; i < linkovi.length; i++) {
            //greška 2, greška u kucanju riječi vježb i vjezb
            if ((linkovi[i].innerHTML.includes("vjesb") || linkovi[i].innerHTML.includes("vjekb")) && linkovi[i].href.includes("meet.google.com")) {
                if (linkovi[i].closest('.course-content') != null && linkovi[i].closest('.weeks') != null) index = i;
            }
        }
        if (index == -1) return null;
        //console.log(linkovi[index].href);
        return linkovi[index].href;
    }
}