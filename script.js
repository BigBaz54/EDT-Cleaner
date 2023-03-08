// ==UserScript==
// @name         EDT Cleaner
// @namespace    http://tampermonkey.net/
// @version      5.4.1
// @description  ça marche -pas- ptn
// @author       BigBaz
// @match        https://edt.telecomnancy.univ-lorraine.fr/*
// @icon         https://zupimages.net/up/22/25/uysi.png
// @grant        none
// ==/UserScript==


/*********************** COULEURS ***********************/

// violet : "rgb(102, 0, 102)"
// jaune : "rgb(255, 128, 0)"
// rouge : "rgb(230, 0, 0)" /!\ DANGER /!\
// bleu : "rgb(0, 102, 204)"
// vert : "rgb(0, 128, 0)"

/********************************************************/

(function() {
    'use strict';

    function setIntervalN(func, delay, repetitions) {
        var n = 0;
        var intervalID = window.setInterval(function () {
            func();
            if (++n === repetitions) {
                window.clearInterval(intervalID);
            }
        }, delay);
    }

    function clickToHide() {
        document.querySelectorAll(".fc-time-grid-event").forEach((c) => {c.onclick = () => {c.style.display = "none"}});
    }
    setTimeout(clickToHide, 1000);

    function filterByName(s) {
        document.querySelectorAll(".fc-time-grid-event").forEach((e) => {e.style.display = '';});
        document.querySelectorAll(".fc-time-grid-event").forEach((e) => {
            if (!(e.querySelector('.fc-title').innerText.toLowerCase().includes(s.toLowerCase()))) {
                e.style.display = 'none';
             }
         })
    }

    document.querySelector('.fc-prev-button').onclick = () => {setIntervalN(clickToHide, 5, 20); setIntervalN(() => filterByName(document.querySelector('#searchInput').value), 5, 20)};
    document.querySelector('.fc-next-button').onclick = () => {setIntervalN(clickToHide, 5, 20); setIntervalN(() => filterByName(document.querySelector('#searchInput').value), 5, 20)};
    document.querySelector('.fc-today-button').onclick = () => {setIntervalN(clickToHide, 5, 20); setIntervalN(() => filterByName(document.querySelector('#searchInput').value), 5, 20)};

    window.reset = () => {
        document.querySelectorAll(".fc-time-grid-event").forEach((e) => {e.style.display = '';});
        document.querySelector("#searchInput").value = "";
    }

    window.hidePast = () => {
        var columns = document.querySelector(".fc-now-indicator-line").parentNode.parentNode.parentNode.children;
        for (let i = 0; i<columns.length; i++) {
            var curCol = columns[i];
            if (curCol.querySelectorAll('.fc-now-indicator').length != 0) {break;}
            curCol.querySelectorAll(".fc-time-grid-event").forEach((e) => {e.style.display = 'none';});
        }
        var [hour, min] = new Date().toLocaleTimeString("fr-FR").split(":").slice(0,2);
        [hour, min] = [parseInt(hour), parseInt(min)];
        curCol.querySelectorAll(".fc-time-grid-event").forEach((e) => {
            var [cHour, cMin] = e.querySelector('span').innerText.split(" - ")[1].split(":");
            [cHour, cMin] = [parseInt(cHour), parseInt(cMin)];
            console.log(cHour, cMin);
            if (cHour<hour || (cHour==hour && cMin<min)) {
                e.style.display = 'none';
            }
        });
    }

    var body = document.querySelector("body");

    var options = document.createElement('div');
    options.id = "options";
    options.style.display = 'flex';
    options.style.flexDirection = 'row';
    options.style.justifyContent = 'space-between';
    options.style.alignItems = "center";
    options.style.width = '460px';

    var hide = document.createElement('div');
    hide.id = "hide";
    hide.style.display = 'flex';
    hide.style.flexDirection = 'column';
    hide.style.alignItems = "center";
    hide.style.width = '250px';

    var colors = document.createElement('div');
    colors.id = "colors";
    colors.style.display = 'flex';

    var past = document.createElement('span');
    past.id = "past";
    past.style.display = "flex";
    past.style.alignItems = "center";
    past.style.height = "20px";
    past.style.margin = "10px";
    past.style.background = "lightgrey";
    past.style.borderRadius = "5px";
    past.style.cursor = "pointer";
    past.style.padding = '5px';
    past.style.border = "solid 1px black";
    past.innerText = "Passés";
    past.style.userSelect = "none";
    past.onclick = () => {window.hidePast()};

    var optionText = document.createElement('span');
    optionText.id = "optionText";
    optionText.innerText = "Cliquer pour supprimer";
    optionText.style.textDecoration = "underline";
    optionText.style.marginRight = "22px";

    hide.appendChild(optionText);
    hide.appendChild(colors);
    hide.appendChild(past);

    var search = document.createElement('div');
    search.style.display = "flex";
    search.style.flexDirection = 'column';
    search.style.alignItems = "center";
    search.style.justifyContent = "space-between";
    search.style.height = "80px";

    var searchName = document.createElement('span');
    searchName.id = "searchName";
    searchName.innerText = 'Rechercher un cours'
    searchName.style.textDecoration = "underline";
    searchName.style.marginBottom = "20px";

    var searchBar = document.createElement('div');
    searchBar.style.display = 'flex';

    var searchInput = document.createElement('input')
    searchInput.id = "searchInput";
    searchInput.addEventListener("change", (e) => {
        filterByName(e.target.value);
    })

    var searchOK = document.createElement('span')
    searchOK.id = "searchOK";
    searchOK.style.background = "lightgrey";
    searchOK.style.borderRadius = "5px";
    searchOK.style.cursor = "pointer";
    searchOK.style.padding = '3px';
    searchOK.style.marginLeft = '2px';
    searchOK.style.border = "solid 1px black";
    searchOK.innerText = "OK";
    searchOK.style.userSelect = "none";

    search.appendChild(searchName);
    search.appendChild(searchBar);

    searchBar.appendChild(searchInput);
    searchBar.appendChild(searchOK);

    var violet = document.createElement('div');
    var jaune = document.createElement('div');
    var rouge = document.createElement('div');
    var bleu = document.createElement('div');
    var vert = document.createElement('div');
    violet.style.background = 'rgb(102, 0, 102)';
    violet.onclick = (() => {document.querySelectorAll('.fc-time-grid-event').forEach((e) => {if (e.style.backgroundColor == 'rgb(102, 0, 102)') {e.style.display = "none"}})});
    jaune.style.background = 'rgb(255, 128, 0)';
    jaune.onclick = (() => {document.querySelectorAll('.fc-time-grid-event').forEach((e) => {if (e.style.backgroundColor == 'rgb(255, 128, 0)') {e.style.display = "none"}})});
    rouge.style.background = 'rgb(230, 0, 0)';
    rouge.onclick = (() => {document.querySelectorAll('.fc-time-grid-event').forEach((e) => {if (e.style.backgroundColor == 'rgb(230, 0, 0)') {e.style.display = "none"}})});
    bleu.style.background = 'rgb(0, 102, 204)';
    bleu.onclick = (() => {document.querySelectorAll('.fc-time-grid-event').forEach((e) => {if (e.style.backgroundColor == 'rgb(0, 102, 204)') {e.style.display = "none"}})});
    vert.style.background = 'rgb(0, 128, 0)';
    vert.onclick = (() => {document.querySelectorAll('.fc-time-grid-event').forEach((e) => {if (e.style.backgroundColor == 'rgb(0, 128, 0)') {e.style.display = "none"}})});

    colors.appendChild(violet);
    colors.appendChild(jaune);
    colors.appendChild(rouge);
    colors.appendChild(bleu);
    colors.appendChild(vert);

    for (var i=0; i<colors.children.length; i++) {
        var o = colors.children[i];
        o.style.height = "20px";
        o.style.width = "20px";
        o.style.borderRadius = "100%";
        o.style.margin = "10px";
        o.style.cursor = "pointer";
    }
    colors.style.marginLeft = "20px";

    var undo = document.createElement('div');
    undo.style.height = "20px";
    undo.style.width = "20px";
    undo.style.background = "lightgrey";
    undo.style.borderRadius = "5px";
    undo.style.cursor = "pointer";
    undo.style.margin = "10px";
    undo.onclick = () => {window.reset()};
    undo.id = "undo";

    var undo1 = document.createElement('div');
    var undo2 = document.createElement('div');
    undo1.style = "top:3px;left:3px;box-sizing: border-box;position: relative;display: block;transform: scale(var(--ggs,1));width: 14px;height: 14px;border: 2px solid; border-left-color: transparent;border-radius: 100px"
    undo2.style = "content: '';display: block;box-sizing: border-box;position: relative;width: 6px;height: 6px;border-top: 2px solid;border-left: 2px solid;top: -11px;left: 3px;transform: rotate(-90deg)";
    undo.appendChild(undo1);
    undo.appendChild(undo2);

    colors.appendChild(undo);

    options.appendChild(hide);
    options.appendChild(search);

    body.insertBefore(options, document.querySelector(".columns"));



    document.addEventListener('keydown', (event) => {
        var name = event.key;
        console.log(name);
        if (name == 'ArrowRight') {
            document.querySelector('.fc-next-button').click();
        }
        if (name == 'ArrowLeft') {
            document.querySelector('.fc-prev-button').click();
        }
        if (name == 'Shift') {
            document.querySelector('.fc-today-button').click();
        }
    }, false);
})()
