"use strict";
//======================================================================================//
//Sends a GET request when passed a URL and function.
function request(url, fn) {
    var ajax = new XMLHttpRequest();
    ajax.onload = fn;
    ajax.open("GET", url, true);
    ajax.send();
}
//======================================================================================//
//This is an onload function.
$(function () {
    $("#search").click(search); //This is an event handler for search button.
    request("https://api.xbeirut.com/278/resources/babynames.php?type=list", getNames);
});
//======================================================================================//
//If the GETrequest was successful, then it puts all the names in the dropdown.
function getNames() {
    var list = this.responseText.split("\n"); //splits data
    //------------------------------------------------------------------------------//
    //Adds each name to the dropdown.
    $.each(list, function (index, value) { //each value is associated with an index
        $("#allnames").append($("<option/>", {
            text: value
        }));
    });
    //------------------------------------------------------------------------------//
    $("#allnames").prop("disabled", false); //enables the list so we can choose the names
    $("#loadingnames").hide(); //hides the loading icon
}
//======================================================================================//
//When the search is click it will call the createGraph function.
function search() {
    $(".loading").show(); //shows the loading icon while searching
    $("#loadingnames").hide(); //when names are loaded remove loading icon
    $("#norankdata").hide(); //if there is data then hide error message
    $("#resultsarea").show(); //show result area
    $("#graph").empty(); //refreshes graph
    //------------------------------------------------------------------------------//
    //Gets the names associated with their gender.
    var name = $("#allnames").val();
    var gender;
    $("[name='gender']").each(function () {
        if (this.checked) {
            gender = this.value;
            return false;
        }
    });
    //------------------------------------------------------------------------------//
    request("https://api.xbeirut.com/278/resources/babynames.php?type=rank&name=%22" + name + "&gender=" + gender, createGraph);
}
//======================================================================================//
//Shows a graph with the popularity of a name for each year.
function createGraph() {
    $("#loadinggraph").hide(); //when graph is loaded remove loading icon
    //------------------------------------------------------------------------------//
    //Display error message when there's no data.
    if (this.responseXML === null) {
        $("#norankdata").show();
        return;
    }
    //------------------------------------------------------------------------------//
    //Writes year numbers as the table headers.
    var rank_data = this.responseXML.querySelectorAll("rank");
    var tr = $("<tr>");
    $("#graph").append(tr);
    $.each(rank_data, function () { //adds each year to the table
        tr.append($("<th>").html(this.getAttribute("year")));
    });
    //------------------------------------------------------------------------------//
    //Draws bars with their popularity.
    var bar_column = $("<tr>");
    $("#graph").append(bar_column);
    $.each(rank_data, function () {
        var new_bar = $("<td>");
        var popularity = parseInt(this.innerHTML, 10);
        var height;
        //-----------------------------//
        if (popularity === 0) { //bar is 0 when popularity is 0
            height = 0;
        } else {
            var height = parseInt((1000 - popularity) / 4, 10); //Height is one fourth as many pixels as the inverse for that decade.
        }
        //-----------------------------//
        //each bar has its own div
        var $bar = jQuery("<div/>", {
            height: height + "px"
        });
        //-----------------------------//
        //shows popularity in red when it's less tha 10 and greater than 0
        $bar.addClass("bar");
        if (popularity <= 10 & popularity != 0) {
            $bar.addClass("makered");
        }
        $bar.html(popularity);
        new_bar.append($bar);
        bar_column.append(new_bar);
        //-----------------------------//
    });
    //------------------------------------------------------------------------------//
}
//======================================================================================//