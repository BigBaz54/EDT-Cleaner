// ==UserScript==
// @name         EDT Cleaner
// @namespace    http://tampermonkey.net/
// @version      3.0
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


    setTimeout(test, 1000);
    window.reset = () => {
        document.querySelectorAll(".fc-time-grid-event").forEach((e) => {e.style.display = '';})
    }

    document.querySelector('.fc-prev-button').onclick = () => {setTimeout(test, 100)};
    document.querySelector('.fc-next-button').onclick = () => {setTimeout(test, 100)};
    var body = document.querySelector("body");
    var options = document.createElement('div');
    options.id = "options";
    options.style.display = 'flex';
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
    options.appendChild(violet);
    options.appendChild(jaune);
    options.appendChild(rouge);
    options.appendChild(bleu);
    options.appendChild(vert);
    for (var i=0; i<options.children.length; i++) {
        var o = options.children[i];
        o.style.height = "20px";
        o.style.width = "20px";
        o.style.borderRadius = "100%";
        o.style.margin = "10px";
        o.style.cursor = "pointer";
    }
    options.style.marginLeft = "20px";
    var optionText = document.createElement('span');
    optionText.innerText = "Cliquer pour supprimer";
    optionText.style.textDecoration = "underline";
    optionText.style.marginLeft = "37px";
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
    options.appendChild(undo);
    body.insertBefore(options, document.querySelector(".columns"));
    body.insertBefore(optionText, options);

    function test() {
        document.querySelectorAll(".fc-time-grid-event").forEach((c) => {c.onclick = () => {c.style.display = "none"}});
    }
})()