
function ucitajSortirano(dan,atribut,callback){
   var ajax = new XMLHttpRequest();
   ajax.onreadystatechange = function() {
       if (ajax.readyState == 4 && ajax.status == 200){
        callback(JSON.parse(ajax.responseText),null);
       }
       else if (ajax.readyState == 4){
           callback(null,"Došlo je do greške");
       }
           
   }
//provjera koji će se url slati za ajax.open jer url zavisi od datih atributa   
   if(dan=="" || dan == null){
        if(atribut=="" || atribut == null){
            ajax.open("GET","http://localhost:8080/raspored",true);
        }else{
            ajax.open("GET","http://localhost:8080/raspored?sort="+atribut,true); 
        }
   }else if(atribut=="" || atribut == null){
        if(dan=="" || dan == null){
            ajax.open("GET","http://localhost:8080/raspored",true);
        }else{
            ajax.open("GET","http://localhost:8080/raspored?dan="+dan,true); 
        }
    }else ajax.open("GET","http://localhost:8080/raspored?dan="+ dan +"&sort="+atribut,true);
     ajax.send();
}