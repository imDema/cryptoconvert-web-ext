function addOption(select, option)
{
    var opt = document.createElement('option');
    opt.value = option;
    opt.innerHTML = option;
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

response.forEach(element => {
    addToDict(dict, element.id, element.symbol);
});


var dd1 = document.getElementById("first-dropdown");
var dd2 = document.getElementById("second-dropdown");

dict.forEach(element => {
    addOption(dd1, element.symbol);
    addOption(dd2, element.symbol);
});