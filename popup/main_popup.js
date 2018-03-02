function addOption(select, id, symbol)
{
    let opt = document.createElement('option');
    opt.value = id;
    opt.innerHTML = symbol;
    select.appendChild(opt);
}

function updateControls(event)
{
    switch (event.target.classList.value) {
        case "form-control first":
            //Changed first value
            updateSecondField();
        break;
    
        case "form-control second":
            //Changed second value
            updateFirstField();
        break;

        case "dropdown first":
            //Changed first currency
            updateSecondField();
        break;

        case "dropdown second":
            //Changed second currency
            updateSecondField();
        break;

        default:
            break;
    }
}

function updateSecondField()
{
    let conv = calcConversion();
    second_input.value = (first_input.value * conv).toFixed(NDEC);
}

function updateFirstField()
{
    let conv = calcConversion();
    first_input.value = (second_input.value * (1.0/conv)).toFixed(NDEC);
}

function Contained(array, item)
{
    for(let i = 0; i<array.length; i++)
    {
        if(item == array[i])
            return true;
    }
    return false;
}

function requestConv(crypto, fiatc)
{
    let req = new XMLHttpRequest();
    req.open("GET", `https://api.coinmarketcap.com/v1/ticker/${crypto}/?convert=${fiatc}`, false);
    req.setRequestHeader("Content-type", "application/json");
    req.send();
    let res = JSON.parse(req.responseText);
    return res[0][`price_${fiatc.toLowerCase()}`];
}

function calcConversion()
{
    let from = first_dropdown.value;
    let to = second_dropdown.value;
    let fc, sc;
    if(Contained(fiat, from) && Contained(fiat, to))
    {
        fc = requestConv("bitcoin", from);
        sc = requestConv("bitcoin", to);
        return sc / fc;
    }
    else if(Contained(fiat, from))
    {
        return (1.0/requestConv(to, from));
    }
    else if(Contained(fiat, to))
    {
        return requestConv(from, to);
    }
    for (let i=0; i < json.length; i++)
    {
        let element = json[i];
        if (element.id === from)
            fc = element.price_usd;
            
        if (element.id === to)
            sc = element.price_usd;
    }
    return fc/sc;
}

const NDEC = 10;
var conversion = 1.0;
let background = browser.extension.getBackgroundPage();
const fiat = ["EUR", "USD", "GBP", "KRW"];
var json = background.json;

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

//Populate Fiat
fiat.forEach(element => 
    {
        addOption(first_fiat, element, element);
        addOption(second_fiat, element, element);
    });

//Populate Top250
json.forEach(element => {
    addOption(first_top, element.id, element.symbol);
    addOption(second_top, element.id, element.symbol);
});

first_dropdown.value = first_top.firstChild.value;
second_dropdown.value = second_fiat.firstChild.value;