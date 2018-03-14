var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
function addOption(select, id, symbol) {
    var opt = document.createElement('option');
    opt.value = id;
    opt.innerHTML = symbol;
    select.appendChild(opt);
}
function updateRecent() {
    while (first_recent.firstChild) {
        first_recent.removeChild(first_recent.firstChild);
    }
    while (second_recent.firstChild) {
        second_recent.removeChild(second_recent.firstChild);
    }
    for (var i = background.recent.length - 1; i >= 0; i--) {
        var element = background.recent[i];
        addOption(first_recent, element.id, element.value);
        addOption(second_recent, element.id, element.value);
    }
}
function updateControls(event) {
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
            background.pushRecent(first_dropdown.value, first_dropdown.selectedOptions[0].text);
            updateRecent();
            break;
        case "dropdown second":
            //Changed second currency
            updateSecondField();
            background.pushRecent(second_dropdown.value, second_dropdown.selectedOptions[0].text);
            updateRecent();
            break;
        default:
            break;
    }
}
function sleep(ms) {
    return new Promise(function (resolve) { return setTimeout(resolve, ms); });
}
function a_refreshClick(event) {
    return __awaiter(this, void 0, void 0, function () {
        var timediff;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    timediff = Date.now() - background.lastCall;
                    if (!(timediff > 8011)) return [3 /*break*/, 2];
                    void a_refresh.offsetWidth;
                    a_refresh.classList.add("animate");
                    background.getPrices();
                    updateSecondField();
                    return [4 /*yield*/, sleep(8010)];
                case 1:
                    _a.sent();
                    a_refresh.classList.remove("animate-dont");
                    a_refresh.classList.remove("animate");
                    return [3 /*break*/, 3];
                case 2:
                    a_refresh.classList.remove("animate-dont");
                    void a_refresh.offsetWidth;
                    a_refresh.classList.add("animate-dont");
                    _a.label = 3;
                case 3: return [2 /*return*/];
            }
        });
    });
}
function updateSecondField() {
    var conv = calcConversion();
    second_input.value = (+first_input.value * conv).toFixed(NDEC);
}
function updateFirstField() {
    var conv = calcConversion();
    first_input.value = (+second_input.value * (1.0 / conv)).toFixed(NDEC);
}
function Contained(fiatObj, item) {
    for (var i = 0; i < fiatObj.length; i++) {
        if (item == fiatObj[i].id)
            return true;
    }
    return false;
}
function getUsdPrice(_crypto) {
    for (var i = 0; i < background.json.length; i++) {
        var element = background.json[i];
        if (element.id === _crypto)
            return element.price_usd;
    }
    return -1;
}
function calcConversion() {
    var from = first_dropdown.value;
    var to = second_dropdown.value;
    var fc, sc;
    if (Contained(background.fiat, from) && Contained(background.fiat, to)) {
        fc = background.getFiatBtcPrice(from);
        sc = background.getFiatBtcPrice(to);
        return sc / fc;
    }
    else if (Contained(background.fiat, from)) {
        fc = background.getFiatBtcPrice(from);
        sc = getUsdPrice(to);
        return 1.0 / (fc * sc / usdbtc);
    }
    else if (Contained(background.fiat, to)) {
        fc = getUsdPrice(from);
        sc = background.getFiatBtcPrice(to);
        return (fc * sc / usdbtc);
    }
    else {
        fc = getUsdPrice(from);
        sc = getUsdPrice(to);
        return fc / sc;
    }
}
var NDEC = 8;
var conversion = 1.0;
var background = browser.extension.getBackgroundPage();
var usdbtc = getUsdPrice("bitcoin");
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
//CHANGE EVENTS
first_dropdown.onchange = updateControls;
first_input.onchange = updateControls;
second_dropdown.onchange = updateControls;
second_input.onchange = updateControls;
a_refresh.onclick = a_refreshClick;
//Populate Recent
updateRecent();
//Populate Fiat
background.fiat.forEach(function (element) {
    addOption(first_fiat, element.id, element.id);
    addOption(second_fiat, element.id, element.id);
});
//Populate Top250
background.json.forEach(function (element) {
    addOption(first_top, element.id, element.symbol);
    addOption(second_top, element.id, element.symbol);
});
first_dropdown.value = first_top.firstChild.value;
second_dropdown.value = second_fiat.firstChild.value;
background.getPrices();
