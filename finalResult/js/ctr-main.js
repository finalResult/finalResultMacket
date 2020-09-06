function randomNumber(F, T){
    return Math.floor(Math.random() * (T - F) + F);
}

function get3DEnty(dot){

    return {
        "nx":dot["nx"] * Math.cos(dot["cor"] + cor),
        "ny":dot["ny"] + viewY * Math.sin(dot["cor"] + cor),
        "color":dot["color"],
        "r":Math.sin(dot["cor"] + cor) * 0.5 + 2
    };

}

var getPixelRatio = function(context) {
    var backingStore = context.backingStorePixelRatio ||
        context.webkitBackingStorePixelRatio ||
        context.mozBackingStorePixelRatio ||
        context.msBackingStorePixelRatio ||
        context.oBackingStorePixelRatio ||
        context.backingStorePixelRatio || 1;
    return (window.devicePixelRatio || 1) / backingStore;
};

function main(ctr, dots) {
    var dot = {};

    ctr.save();
    ctr.beginPath();
    ctr.scale(r, r);
    ctr.save();
    ctr.beginPath();
    ctr.globalAlpha = 0.2;
    ctr.fillStyle = "#000";
    ctr.rect(0, 0, w, h);
    ctr.fill();
    ctr.closePath();
    ctr.restore();

    ctr.save();
    for (var i = 0; i < dots.length; dot = get3DEnty(dots[i]), i++){
        ctr.save();
        ctr.beginPath();
        ctr.globalAlpha = 0.2 + (Math.sin(dots[i]["cor"] + cor) + 1) * 0.4;
        ctr.fillStyle = dot["color"];
        ctr.arc((w / 2 + dot["nx"] * size * 0.4), (h / 2 - dot["ny"] * size * 0.4), dot["r"], 0, Math.PI * 2);
        ctr.fill();
        ctr.closePath();
        ctr.restore();

        ctr.save();
        ctr.beginPath();
        ctr.setTransform(1.0, 0, 0, 0.5, (w / 2 + dot["nx"] * size * 0.4), h - 50 - 2 * viewY * Math.sin(dots[i]["cor"] + cor));
        ctr.fillStyle = "rgba(80, 80, 80, 0.07)";
        ctr.arc(0, 0, dot["r"], 0, Math.PI * 2);
        ctr.fill();
        ctr.closePath();
        ctr.restore();


        dots[i]["nx"] += (dots[i]["x"] - dots[i]["nx"]) * dots[i]["speed"];
        dots[i]["ny"] += (dots[i]["y"] - dots[i]["ny"]) * dots[i]["speed"];
        if(Math.abs(dots[i]["corspeed"]) <= 0.015) {
            if (dots[i]["tcor"] > dots[i]["cor"]) {
                dots[i]["corspeed"] += 0.0001;
            } else if (dots[i]["tcor"] < dots[i]["cor"]) {
                dots[i]["corspeed"] -= 0.0001;
            }
        }else{
                dots[i]["corspeed"] += (0 - dots[i]["corspeed"]) * 0.01;
        }
        dots[i]["cor"] += dots[i]["corspeed"];
    }
    ctr.restore();
    ctr.closePath();
    ctr.restore();
}

function Sum(list){
    var sum = 0;
    for(var i = 0;i < list.length;i++){
        sum += list[i];
    }
    return sum;
}

function toCir(){
    var i = 0;
    var j = 0;
    var s = 0;
    var e = 0;
    var d = 0;
    for(;i < cir.length;i++){
        e += cir[i];
        d = cir[i] * 3.5 / Math.PI;
        for(j = s;j < e;j++){
            dots[j]["x"] = d / 2;
            dots[j]["y"] = -125 + i * 16;
            dots[j]["tcor"] = 2 * Math.PI * (j - s) / (e - s);
            dots[j]["speed"] = 0.008;
        }
        s = e;
    }
}


var dots = [];
var cor = 0;
var viewY = -10;
var Hex = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "A", "B", "C", "D", "E", "F"];

var cir = [1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, 233];

for(var i = 0; i < Sum(cir); i++){
    dots.push({
        "x":randomNumber(0, 540),
        "y":randomNumber(-130, 280),
        "cor":0,
        "tcor":Math.random() * Math.PI * 2,
        "nx":0,
        "ny":0,
        "color":"#" + Hex[randomNumber(0, 15)] + Hex[randomNumber(0, 15)] + Hex[randomNumber(0, 15)],
        "speed":0.013,
        "corspeed":0
    });
}


var ctrs = document.getElementById("ctr");

var r = getPixelRatio(ctrs.getContext("2d"));

var size = 5.1;

ctrs.style.width = size * r * ctrs.width;
ctrs.style.height = size * r * ctrs.height;
ctrs.width = size * ctrs.width * r;
ctrs.height = size * ctrs.height * r;

ctrs = ctrs.getContext("2d");

var w = document.getElementById("ctr").width;
var h = document.getElementById("ctr").height;

ctrs.clearRect(0, 0, w, h);

window.setInterval(function () {
    main(ctrs, dots);
    cor += 0.003;
    cor = cor % (Math.PI * 2);
}, 0);