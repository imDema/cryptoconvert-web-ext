function addOption(select : HTMLOptGroupElement | HTMLSelectElement, id, symbol)
{
    let opt = document.createElement('option');
    opt.value = id;
    opt.text = symbol;
    select.appendChild(opt);
}

function addRecent(dropdown : HTMLSelectElement)
{
    background.pushRecent(dropdown.value , dropdown.selectedOptions[0].label);
    let fval = first_dropdown.selectedOptions[0].value;
    let sval = second_dropdown.selectedOptions[0].value;
    updateRecent();
    first_dropdown.value = fval;
    second_dropdown.value = sval;
}

function updateRecent()
{
    while(first_recent.firstChild)
    {
        first_recent.removeChild(first_recent.firstChild);
    }
    while(second_recent.firstChild)
    {
        second_recent.removeChild(second_recent.firstChild);
    }
    for(let i=background.recent.length-1; i>=0;i--)
    {
        let element : ICoin = background.recent[i];
        addOption(first_recent, element.id, element.symbol);
        addOption(second_recent, element.id, element.symbol);
    }
}

function first_dropdown_onchange(event: Event)
{
    updateSecondField();
    addRecent(first_dropdown);
}

function second_dropdown_onchange(event: Event)
{
    updateSecondField();
    addRecent(second_dropdown);
}


function updateSecondField()
{
    let conv = calcConversion();
    second_input.value = (+first_input.value * conv).toFixed(NDEC);
}

function updateFirstField()
{
    let conv = calcConversion();
    first_input.value = (+second_input.value * (1.0/conv)).toFixed(NDEC);
}


function sleep(ms)
{
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function a_refreshClick(event)
{
    let timediff = Date.now() - background.lastCall;
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
let conversion = 1.0;
let background = browser.extension.getBackgroundPage();

let usdbtc = getUsdPrice("bitcoin");

let first_dropdown = <HTMLSelectElement>document.getElementById("first_dropdown");
let second_dropdown =  <HTMLSelectElement>document.getElementById("second_dropdown");

let first_recent = <HTMLOptGroupElement>document.getElementById("first_recent");
let first_top = <HTMLOptGroupElement>document.getElementById("first_top");
let second_recent = <HTMLOptGroupElement>document.getElementById("second_recent");
let second_top = <HTMLOptGroupElement>document.getElementById("second_top");
let first_fiat = <HTMLOptGroupElement>document.getElementById("first_fiat");
let second_fiat = <HTMLOptGroupElement>document.getElementById("second_fiat");

let first_input = <HTMLInputElement>document.getElementById("first_input");
let second_input = <HTMLInputElement>document.getElementById("second_input");

let a_refresh = <HTMLInputElement>document.getElementById("a_refresh");

//CHANGE EVENTS
first_dropdown.onchange = first_dropdown_onchange;
first_input.onchange = updateSecondField;
second_dropdown.onchange=second_dropdown_onchange;
second_input.onchange=updateFirstField;
a_refresh.onclick=a_refreshClick;


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

first_dropdown.value = background.json[0].id;
second_dropdown.value = background.fiat[0].id;

background.getPrices()