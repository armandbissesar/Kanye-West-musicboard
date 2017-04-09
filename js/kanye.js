/*jslint browser: true, devel: true, eqeq: true, plusplus: true, sloppy: true, vars: true, white: true*/

// Voorbeeld van WESBOS: Javascript30Challenge: https://github.com/wesbos/JavaScript30/tree/master/01%20-%20JavaScript%20Drum%20Kit
// Gebruikt voor afspelen muziek aangepast naar wat we hebben geleerd in de lessen.
// Ophalen van een attribute uit html: http://stackoverflow.com/questions/27992438/javascript-get-dynamically-set-data-attribute
// Geholpen door Rick Lancee
// Gemaakt door Armand Bissesar


// Sla de titel op in een variable voor later gebruik
var title = document.querySelector('h1');
var i;

//Array van verschillende woorden die laten moeten worden, wanneer ze worden aangeroepen
var woorden = [
    'sixsixsix...',
    'uh',
    'WE IN THE HOUSE',
    'IMMA  ROBOT',
    'OKAY OKAY OKAY OKAY!',
    'ALL DAY',
    'KANYE',
    'CHILLY'
];

// Slaat alle keys uit de DOM
var keys = document.querySelectorAll('.key');

//Deze function haalt de transitieclass weg nadat hij klaar is met animeren.
//Deze heb ik gebruikt van bovenstaande bron.
function removeTransition(e) {
    'use strict';//JS lint prefereerde dit
    // Remove transition wordt uitgevoerd voor elke transitie die wordt afgespeeld
    // daarom kijken we alleen of transform wordt afgespeeld zodat hij 1x wordt uitgevoerd
    
    if (e.propertyName !== 'transform') {return; }
    e.target.classList.remove('playing');
}

//Speelt geluid af en veranderd te titel doormiddel van de eerder genoemde array
function playSound(code) {
    'use strict';//JS lint prefereerde dit
    //Zoek het audio element en de key in de DOM doormiddel van de code
    var audio = document.querySelector('audio[data-key="' + code +'"]');
    var key = document.querySelector('div[data-key="'+code+'"]');
    //Als er geen audio element is gevonden dan stopt hij en gaat de functie niet verder
    if (!audio) { return; }
    //Voegt de class voor de animatie toe en speelt het audio af
    key.classList.add('playing');
    audio.currentTime = 0;
    audio.play();
    
    //Op basis van de ingetoetste keycode wordt de titel veranderd naar wat gezegd wordt
    if (code == 65) {
        title.innerHTML = woorden[0];
    } 
    if (code == 83) {
        title.innerHTML = woorden[1];
    } 
    if (code == 68) {
        title.innerHTML = woorden[2];
    } 
    if (code == 70) {
        title.innerHTML = woorden[3];
    } 
    if (code == 71) {
        title.innerHTML = woorden[4];
    } 
    if (code == 72) {
        title.innerHTML = woorden[5];
    } 
    if (code == 74) {
        title.innerHTML = woorden[6];
    } 
    if (code == 75) {
        title.innerHTML = woorden[7];
    } 
}

//Loop voor alle key elementen om ze interactief te maken doormiddel van eventlistners, anders zou het alleen de 1e gaan
for (i = 0; i < keys.length; i += 1) {
//Voeg op elke key de event transitionend op de animatie weg te halen nadat die klaar is
//Als deze niet gebruikt wordt dan blijft de animatie 'open' staan. Hiermee wordt het reset.
//Deze heb ik gebruikt van eerste bron.
   keys[i].addEventListener('transitionend', removeTransition);
    keys[i].addEventListener('click', function () {
    // Wanneer je klikt op Key met de muis dan haalt hij de waarde van het attribuut af
    // en speelt het passende audio element af
    var code = this.getAttribute('data-key');
    playSound(code);
    });
}

//Als er een key wordt ingedrukt dan begint de audio aftespelen.
window.addEventListener('keydown', function (e) {
    playSound(e.keyCode);
});
