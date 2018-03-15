function getFiatBtcPrice(_fiat)
{
    for(let i=0; i<fiat.length; i++)
    {
        if(_fiat == fiat[i].id)
        {
            if(fiat[i].price == 0)
            {
                let req = new XMLHttpRequest();
                req.open("GET", `https://api.coinmarketcap.com/v1/ticker/bitcoin/?convert=${fiat[i].id}`, false);
                req.setRequestHeader("Content-type", "application/json");
                req.send();
                let res = JSON.parse(req.responseText);
                fiat[i].price = res[0][`price_${fiat[i].id.toLowerCase()}`];
            }
            return fiat[i].price;
        }
    }
}

function getPrices()
{
    if((Date.now() - lastCall) > 6000)
    {
        let xhr = new XMLHttpRequest();
        xhr.open("GET", "https://api.coinmarketcap.com/v1/ticker/?limit=250", false);
        xhr.setRequestHeader("Content-type", "application/json");
        xhr.send();
        json = JSON.parse(xhr.responseText);
        lastCall = Date.now();
    }
}

function setRecent(list)
{
    //browser.storage.local.set(recent);
}
function getRecent(list)
{
    //browser.storage.local.get(recent);
}

function bubbleUp(pos, list)
{
    var temp = list[pos];
    for (var i = pos; i<list.length-1; i++)
    {
        list[i] = list[i+1];
    }
    list[list.length-1] = temp;
}

function pushRecent(_id, _value)
{
    //Check if already in recent
    for (var i=0, nf=true; i<recent.length && nf; i++)
    {
        if(recent[i].id == _id)
        {
            nf = false;
            bubbleUp(i, recent);
        }
    }
    //If not in list add it
    if(nf)
    {
        var item = {id:_id, value:_value};
        recent.push(item);
        if(recent.length > MAXLREC)
            recent.shift();
    }
    //Save changes
    setRecent(recent);
}

const MAXLREC = 5;
const fiatList = ["EUR", "USD", "GBP","AUD", "KRW", "JPY"];

var lastCall: number = 0;
var json : JSON;
getPrices();

var fiat = [];

for (let i = 0; i < fiatList.length; i++)
{
    let item = {id:fiatList[i], price:0};
    fiat.push(item);
}

var recent = [];
getRecent();