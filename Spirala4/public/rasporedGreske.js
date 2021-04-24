class Raspored{
    constructor(raspored){
        var predmeti = raspored.split("\n");
        this.raspored = [];
        for(let element of predmeti){
            let podaci = element.split(",");
            let pr = {naziv : podaci[0], aktivnost : podaci[1], dan: podaci[2], start: podaci[3], end: podaci[4]};
            this.raspored.push(pr);
        }
    }
       vrijemeUMinute(v){
        var s = v.split(':'); 
        //greska 1, stavili smo - umjesto +
        var minutes = (+s[0]) * 60 - (+s[1]);
        return minutes;
    }
    dajTrenutnuAktivnost(vrijeme,grupa){
      var ti = vrijeme.split("T")
      //greška:uzima se datum koji ce biti u formatu mm-dd-yyyy
      var dan = new Date(vrijeme.replaceAll("T"," "));
      var day = dan.getDay();
      var danRijeci ="";
      switch(day){
          case 1:
              danRijeci="ponedjeljak";
              break;
          case 2:
                danRijeci ="utorak";
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
            let h = ti[1].substring(0,5); 
            for(let cas of this.raspored){
                if(danRijeci.localeCompare(cas.dan)==0){
                    //console.log(this.vrijemeUMinute(cas.start)+" i "+this.vrijemeUMinute(h)+" i "+this.vrijemeUMinute(cas.end));
                    //greska 3, obrusali smo znakove =
                    	if(this.vrijemeUMinute(h)>this.vrijemeUMinute(cas.start) && this.vrijemeUMinute(h)<this.vrijemeUMinute(cas.end)){
                            if(cas.aktivnost.localeCompare("predavanje")==0 ||grupa.localeCompare(cas.naziv.split("-")[1])==0){
                                let ostalo = this.vrijemeUMinute(cas.end) - this.vrijemeUMinute(h);
                                let s = `${cas.naziv} ${ostalo}`;
                                return s;
                            }
                            
                        }
                }
            }
     return "Nema aktivnosti";

  }
  dajSljedecuAktivnost(vrijeme,grupa){
    var ti = vrijeme.split("T")
    var dan = new Date(vrijeme.replaceAll("T"," "));
    var day = dan.getDay();
    var daniUSedmici=["ponedjeljak","utorak","srijeda","četvrtak","petak"];
    var danRijeci =daniUSedmici[day-1];
          let h = ti[1].substring(0,5);
          let index = 0;
          let sada = -1;
          let najblize =  this.vrijemeUMinute("23:59");
          for(let cas of this.raspored){
              sada++;
              if(danRijeci.localeCompare(cas.dan)==0){
                      if(this.vrijemeUMinute(h)>=this.vrijemeUMinute(cas.start) && this.vrijemeUMinute(h)<=this.vrijemeUMinute(cas.end))continue;
                      if(this.vrijemeUMinute(h)<this.vrijemeUMinute(cas.start) && this.vrijemeUMinute(cas.start)<najblize){
                          //console.log(cas.naziv.split("-")[1]+"="+grupa);
                          if(cas.aktivnost==="predavanje" || grupa===(cas.naziv.split("-")[1])){
                              index = sada;
                            najblize = this.vrijemeUMinute(cas.start);
                          }
                            
                      }
                }
            }
            //greska 2, dodali smo tacku na kraj
    if(najblize==this.vrijemeUMinute("23:59"))return "Nastava je gotova za danas.";
    else return this.raspored[index].naziv.split("-")[0]+" "+ (this.vrijemeUMinute(this.raspored[index].start)-this.vrijemeUMinute(h));
}

dajPrethodnuAktivnost(vrijeme,grupa){
    var ti = vrijeme.split("T")
    var dan = new Date(vrijeme.replaceAll("T"," "));
    var day = dan.getDay();
    var daniUSedmici=["ponedjeljak","utorak","srijeda","cetvrtak","petak"];
    var indexDana = day-1;
    var danRijeci =daniUSedmici[indexDana];
    let h = ti[1].substring(0,5);
    let index = 0;
    let najblize =  this.vrijemeUMinute("00:00");
    let krozPetlju = 0;
    do{
        //console.log(indexDana +" "+danRijeci+ krozPetlju);
        let sada = -1
        for(let cas of this.raspored){
              sada++;
              if(danRijeci.localeCompare(cas.dan)==0){
                  //greska 4:nepotpun uslov
                  if(krozPetlju){
                      if(this.vrijemeUMinute(h)>=this.vrijemeUMinute(cas.start) && this.vrijemeUMinute(h)<=this.vrijemeUMinute(cas.end))continue;
                      if(this.vrijemeUMinute(h)>this.vrijemeUMinute(cas.start) && this.vrijemeUMinute(cas.start)>najblize){
                          if(cas.aktivnost==="predavanje" || grupa===(cas.naziv.split("-")[1])){
                            index = sada;
                            najblize = this.vrijemeUMinute(cas.start);
                            
                        }
                }
            }else{ //console.log(cas.naziv+" "+cas.start);
                if(this.vrijemeUMinute(cas.start)>najblize){
                   
                    if(cas.aktivnost==="predavanje" || grupa===(cas.naziv.split("-")[1])){
                      index = sada;
                      najblize = this.vrijemeUMinute(cas.start);
                  }
            }}
                      
            }
        }   krozPetlju=krozPetlju+1;
            if(najblize==this.vrijemeUMinute("00:00")){
                indexDana--;
                if(indexDana<0)indexDana=daniUSedmici.length-1;
                danRijeci=daniUSedmici[indexDana];
            }
            else{
                
                return this.raspored[index].naziv;
                
            }
    }while(true);
          


}
  

}