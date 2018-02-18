var dd1 = document.getElementById("first-dropdown");
var dd2 = document.getElementById("second-dropdown");

for (var i = min; i<=max; i++){
    addOption(dd1, valore);
    addOption(dd2, valore);
}

function addOption(select, option)
{
    var opt = document.createElement('option');
    opt.value = option;
    opt.innerHTML = option;
    select.appendChild(select);
}