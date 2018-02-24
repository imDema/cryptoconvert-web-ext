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
    document.querySelector('.dropdown.first').onchange=updateConversion;
},false);
document.addEventListener('DOMContentLoaded',function() {
    document.querySelector('.form-control.first').onchange=updateConversion;
},false);
document.addEventListener('DOMContentLoaded',function() {
    document.querySelector('.dropdown.second').onchange=updateConversion;
},false);
document.addEventListener('DOMContentLoaded',function() {
    document.querySelector('.form-control.second').onchange=updateConversion;
},false);

function updateConversion(event)
{
    alert("Change event triggered");
}

// var dict = [];

var xhr = new XMLHttpRequest();
xhr.open("GET", "https://api.coinmarketcap.com/v1/ticker/", false);
xhr.setRequestHeader("Content-type", "application/json");
xhr.send();
var response = JSON.parse(xhr.responseText);

var first_recent = document.getElementById("first_recent");
var first_top = document.getElementById("first_top");
var second_recent = document.getElementById("second_recent");
var second_top = document.getElementById("second_top");


// response.forEach(element => {
//     addToDict(dict, element.id, element.symbol);
// });

response.forEach(element => {
    addOption(first_top, element.id, element.symbol);
    addOption(second_top, element.id, element.symbol);
});
