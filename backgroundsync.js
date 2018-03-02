var xhr = new XMLHttpRequest();
xhr.open("GET", "https://api.coinmarketcap.com/v1/ticker/?limit=250", false);
xhr.setRequestHeader("Content-type", "application/json");
xhr.send();
var json = JSON.parse(xhr.responseText);
