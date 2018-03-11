function addOption(select, id, symbol)
{
    let opt = document.createElement('option');
    opt.value = id;
    opt.innerHTML = symbol;
    select.appendChild(opt);
}

function updateRecent()
{
    for(var i = first_recent.length-1; i>=0; i--)
    {
        first_recent.removeChild(first_recent[i]);
        second_recent.removeChild(second_recent[i]);
    }
    background.recent.forEach(element =>
    {
        addOption(first_recent, element.id, element.id);
        addOption(second_recent, element.id, element.id);
    });
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
            background.pushRecent(first_dropdown.value , first_dropdown.selectedOptions[0].text);
            updateRecent();
        break;

        case "dropdown second":
            //Changed second currency
            updateSecondField();
            background.pushRecent(second_dropdown.value , second_dropdown.selectedOptions[0].text);
            updateRecent();
        break;

        default:
            break;
    }
}

function sleep(ms)
{
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function a_refreshClick(event)
{
    timediff = Date.now() - background.lastCall;
    if(timediff > 8011)
    {
        void a_refresh.offsetWidth;
        a_refresh.classList.add("animate");
        background.getPrices();
        updateSecondField();
        await sleep(8010);
        a_refresh.classList.remove("animate-dont");
        a_refresh.classList.remove("animate");
    }
    else
    {
        a_refresh.classList.remove("animate-dont");
        void a_refresh.offsetWidth;
        a_refresh.classList.add("animate-dont");
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

function Contained(fiatObj, item)
{
    for(let i = 0; i<fiatObj.length; i++)
    {
        if(item == fiatObj[i].id)
            return true;
    }
    return false;
}

function getUsdPrice(_crypto)
{
    for (let i=0; i < background.json.length; i++)
    {
        let element = background.json[i];
        if (element.id === _crypto)
            return element.price_usd;
    }
    return -1;
}

function calcConversion()
{
    let from = first_dropdown.value;
    let to = second_dropdown.value;
    let fc, sc;
    if(Contained(background.fiat, from) && Contained(background.fiat, to))
    {
        fc = background.getFiatBtcPrice(from);
        sc = background.getFiatBtcPrice(to);
        return sc / fc;
    }
    else if(Contained(background.fiat, from))
    {
        fc = background.getFiatBtcPrice(from);
        sc = getUsdPrice(to);
        return 1.0/(fc * sc / usdbtc);
    }
    else if(Contained(background.fiat, to))
    {
        fc = getUsdPrice(from);
        sc = background.getFiatBtcPrice(to);
        return (fc * sc / usdbtc);
    }
    else
    {
        fc = getUsdPrice(from);
        sc = getUsdPrice(to);
        return fc/sc;
    }
}

const NDEC = 8;
var conversion = 1.0;
let background = browser.extension.getBackgroundPage();

var usdbtc = getUsdPrice("bitcoin");

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
document.addEventListener('DOMContentLoaded',function() {
    document.querySelector('#a_refresh').onclick=a_refreshClick;
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

var a_refresh = document.getElementById("a_refresh");

//Populate Recent
updateRecent();

//Populate Fiat
background.fiat.forEach(element => 
{
    addOption(first_fiat, element.id, element.id);
    addOption(second_fiat, element.id, element.id);
});

//Populate Top250
background.json.forEach(element => {
    addOption(first_top, element.id, element.symbol);
    addOption(second_top, element.id, element.symbol);
});

first_dropdown.value = first_top.firstChild.value;
second_dropdown.value = second_fiat.firstChild.value;

background.getPrices()