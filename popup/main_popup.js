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

function updateControls(event)
{
    switch (event.target.classList.value) {
        case "form-control first":
            alert("1");
        break;
    
        case "form-control second":
            alert("2");
        break;

        case "dropdown first":
            alert("3");
        break;

        case "dropdown second":
            alert("4");
        break;

        default:
            break;
    }
}

function calcConversion()
{
    var from = first_dropdown.value;
    var to = second_dropdown.value;
    
}

function searchJson(json, property, value)
{
    for (var i=0; i < json.length; i++) {
        if (json[i][property] === value) {
            return json[i];
        }
    }
    return null;
}

const fiat = ["EUR", "USD", "GBP", "KRW"];
var conversion = 1.0;


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

var xhr = new XMLHttpRequest();
xhr.open("GET", "https://api.coinmarketcap.com/v1/ticker/?limit=250", false);
xhr.setRequestHeader("Content-type", "application/json");
xhr.send();
var response = JSON.parse(xhr.responseText);

var first_dropdown = document.getElementById("first_dropdown");
var second_dropdown = document.getElementById("second_dropdown");

var first_recent = document.getElementById("first_recent");
var first_top = document.getElementById("first_top");
var second_recent = document.getElementById("second_recent");
var second_top = document.getElementById("second_top");
var first_fiat = document.getElementById("first_fiat");
var second_fiat = document.getElementById("second_fiat");

var first_input = document.getElementById("first_input");
var second_input = document.getElementById("second_input");

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