// =============================================================================================== //
window.onload= function(){
    document.getElementById("search").onclick = performSearch;

    var ajax = new XMLHttpRequest();
    ajax.onload = populate;
    ajax.open("GET", "https://api.xbeirut.com/278/resources/babynames.php?type=list", true);
    ajax.send(null);
}
// =============================================================================================== //
function populate(){
    loadingnames.style.visibility = "hidden";
    if (this.status == 200) {
        var response = this.responseText;
        var list = response.split("\n");
        
        var allnames = document.getElementById("allnames");
        
        for(var i=0; i < list.length; i++){
            var option = document.createElement("option");
            option.value = list[i];
            option.text = list[i];
            allnames.appendChild(option);
        }
        document.getElementById("loadingnames").style.display = "none";
        allnames.disabled = false;
    } else {
        Console.log("Error")
    }
}
// =============================================================================================== //
function performSearch(){
    document.getElementById("norankdata").style.display="none";
    document.getElementById("resultsarea").style.display="none";
    document.getElementById("graph").innerHTML="";
    var test = document.getElementById("allnames").value;
    if(test != ""){
        document.getElementById("resultsarea").style.display="block";
        var ajax = new XMLHttpRequest();
        ajax.onload = fillTable;
        ajax.onerror= function(){
                document.getElementById("norankdata").style.display="block";
        };
        var name = document.getElementById("allnames").value;
        var genderm = document.getElementById("genderm").checked;
        var gender;
        if(genderm == true){
            gender= "m";
        }
        else{
            gender= "f";
        }
        var url= "https://api.xbeirut.com/278/resources/babynames.php?type=rank&name="+name+"&gender="+gender;
        ajax.open("GET", url,true );
        ajax.send(null);
        
        
        function fillTable(){
            if(ajax.readyState == 4 && ajax.status == 410){
                document.getElementById("norankdata").style.display="block";
            }
            else if(ajax.readyState == 4 && ajax.status == 200){
                var xmlDoc= ajax.responseXML;
                var table = document.getElementById("graph");
                var Tr1= document.createElement("TR");
                table.appendChild(Tr1);
                for(var j= 1900; j<=2010; j+=10){
                    var th= document.createElement("TH");
                    var year= document.createTextNode(j);
                    th.appendChild(year);
                    Tr1.appendChild(th);
                }
                var Tr2= document.createElement("TR");
                table.appendChild(Tr2);
                for(var k=0 ; k<12; k++){
                    var Td= document.createElement("TD");
                    var rank= xmlDoc.getElementsByTagName("rank")[k].childNodes[0].nodeValue;
                    if(rank != "0"){
                        if(parseInt(rank)<11){
                            var div= document.createElement("div");
                            div.className= "special";
                            var height= (1000 -parseInt(rank)) * (1/4);
                            div.style.height= height+"px";
                            div.style.color="red";
                            var t= document.createTextNode(rank);
                            div.appendChild(t);
                            Td.appendChild(div);
                        }
                        else{
                            var div= document.createElement("div");
                            div.className= "special";
                            var height= (1000 -parseInt(rank)) * (1/4);
                            div.style.height= height+"px";
                            var t= document.createTextNode(rank);
                            div.appendChild(t);
                            Td.appendChild(div);
                        }
                    }
                    else{
                        var div1= document.createElement("div");
                        div1.height="0px";
                        div1.className= "s";
                        var t1= document.createTextNode("0");
                        div1.appendChild(t1);
                        Td.appendChild(div1);
                    }   
                    Tr2.appendChild(Td);
                }
            }
        }
    }
}
// =============================================================================================== //