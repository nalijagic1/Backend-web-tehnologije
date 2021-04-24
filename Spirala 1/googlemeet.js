class GoogleMeet {

    static dajZadnjePredavanje(html) {
        //parsiranje stringa u HTML
        var dom = new DOMParser();
        var dat = dom.parseFromString(html, "text/html");
        //uzimaju se svi a tagovi iz HTML-a
        var linkovi = dat.links;
        // console.log(linkovi.length);

        var index = -1;
        for (let i = 0; i < linkovi.length; i++) {//prolazi se kroz sve linkove u niz
            if (linkovi[i].innerHTML.includes("predavanj") && linkovi[i].href.includes("meet.google.com")) {//provjerava se da li je link google.meet.com i da li je naziv linka predavanje
                if (linkovi[i].closest('.course-content') != null && linkovi[i].closest('.weeks') != null) index = i;//provjerava se da li se link nalazi u course-contetn divu i weeks ul-u
            }
        }
        if (index == -1) return null;
        //console.log(linkovi[index].href);
        return linkovi[index].href;
    }
    static dajZadnjuVježbu(html) {
        //parsiranje stringa u HTML
        var dom = new DOMParser();
        var dat = dom.parseFromString(html, "text/html");
        //uzimaju se svi a tagovi iz HTML-a
        var linkovi = dat.links;
        // console.log(linkovi.length);
        var index = -1;
        for (let i = 0; i < linkovi.length; i++) {//prolazi se kroz sve linkove u niz
            if ((linkovi[i].innerHTML.includes("vjezb") || linkovi[i].innerHTML.includes("vježb")) && linkovi[i].href.includes("meet.google.com")) {//provjerava se da li je link google.meet.com i da li je naziv linka vježba
                if (linkovi[i].closest('.course-content') != null && linkovi[i].closest('.weeks') != null) index = i;//provjerava se da li se link nalazi u course-contetn divu i weeks ul-u
            }
        }
        if (index == -1) return null;
        //console.log(linkovi[index].href);
        return linkovi[index].href;
    }
}