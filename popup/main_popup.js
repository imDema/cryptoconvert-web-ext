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

var dict = [];

var xhr = new XMLHttpRequest();
xhr.open("GET", "https://api.coinmarketcap.com/v1/ticker/", false);
xhr.setRequestHeader("Content-type", "application/json");
xhr.send();
var response = JSON.parse(xhr.responseText);

var first_recent = document.getElementById("first_recent");
var first_alphabetical = document.getElementById("first_alphabetical");
var second_recent = document.getElementById("second_recent");
var second_alphabetical = document.getElementById("second_alphabetical");


response.forEach(element => {
    addToDict(dict, element.id, element.symbol);
});

response.forEach(element => {
    addOption(first_alphabetical, element.id, element.symbol);
    addOption(second_alphabetical, element.id, element.symbol);
});
