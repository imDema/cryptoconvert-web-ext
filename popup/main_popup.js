function addOption(select, id, symbol)
{
    var opt = document.createElement('option');
    opt.value = id;
    opt.innerHTML = symbol;
    select.appendChild(opt);
}
function addToDict(dict, key, value)
{
    dict.push({id: key, symbol: value});
}
//CHANGE EVENTS
document.addEventListener('DOMContentLoaded',function() {
    document.querySelector('.dropdown.first').onchange=updateControls;
},false);
document.addEventListener('DOMContentLoaded',function() {
    document.querySelector('.form-control.first').onchange=updateControls;
},false);
document.addEventListener('DOMContentLoaded',function() {
    document.querySelector('.dropdown.second').onchange=updateControls;
},false);
document.addEventListener('DOMContentLoaded',function() {
    document.querySelector('.form-control.second').onchange=updateControls;
},false);

const fiat = ["EUR", "USD", "GBP", "KRW"];
var conversion = 1.0;

function updateControls(event)
{
    switch (event.target.classList) {
        case ["form-control", "first"]:
            
        break;
    
        case ["form-control", "second"]:
        break;

        case ["dropdown", "first"]:
        break;

        case ["dropdown", "second"]:
        break;

        default:
            break;
    }
}

// var dict = [];

var xhr = new XMLHttpRequest();
xhr.open("GET", "https://api.coinmarketcap.com/v1/ticker/?limit=250", false);
xhr.setRequestHeader("Content-type", "application/json");
xhr.send();
var response = JSON.parse(xhr.responseText);

var first_recent = document.getElementById("first_recent");
var first_top = document.getElementById("first_top");
var second_recent = document.getElementById("second_recent");
var second_top = document.getElementById("second_top");
var first_fiat = document.getElementById("first_fiat");
var second_fiat = document.getElementById("second_fiat");



// response.forEach(element => {
//     addToDict(dict, element.id, element.symbol);
// });

//Populate Top250
response.forEach(element => {
    addOption(first_top, element.id, element.symbol);
    addOption(second_top, element.id, element.symbol);
});

//Populate Fiat
fiat.forEach(element => 
{
    addOption(first_fiat, element, element);
    addOption(second_fiat, element, element);
});