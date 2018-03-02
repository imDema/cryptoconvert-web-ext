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

const fiatList = ["EUR", "USD", "GBP", "KRW"];

var xhr = new XMLHttpRequest();
xhr.open("GET", "https://api.coinmarketcap.com/v1/ticker/?limit=250", false);
xhr.setRequestHeader("Content-type", "application/json");
xhr.send();
var json = JSON.parse(xhr.responseText);

var fiat = [];

for (let i = 0; i < fiatList.length; i++)
{
    let item = {id:fiatList[i], price:0};
    fiat.push(item);
}