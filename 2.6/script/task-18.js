/**
 * Created by w on 2016/10/12.
 */
var queue = [];
var numInput = document.getElementById("num-input");
var display = document.getElementById("display");

function leftIn() {
    var num = Number(numInput.value);
    if (isNaN(num) || numInput.value == "") {
        alert(numInput.value + "不是数字");
        return;
    }
    queue.unshift(setStyle(num));
    render();
}

function leftOut() {
    if (queue.length != 0) {
        queue.shift();
        render();
    }
}

function rightIn() {
    var num = Number(numInput.value);
    if (isNaN(num)) {
        alert(num + "不是数字");
        return;
    }
    queue.push(setStyle(num));
    render();
}

function rightOut() {
    if (queue.length != 0) {
        queue.pop();
        render();
    }
}

function setStyle(num) {
    return "<span class='num' " +
        "style='padding:20px;margin:5px;display:inline-block;background:red;color:white;font-size:20px;'>" +
        num + "</span>";
}

function clickDelete(index) {
    if (queue.length != 0) {
        queue.splice(index, 1);
        render();
    }
}

function render() {
    display.innerHTML = '';
    for (var i = 0; i < queue.length; i++)
        display.innerHTML += queue[i];
    addSpanEvent();
}

function addSpanEvent() {
    for (var i = 0; i < display.getElementsByTagName("span").length; i++) {
        (function (num) {
            display.getElementsByTagName("span")[num].onclick = function () {
                clickDelete(num);
            }
        })(i);//若闭包则i值始终为addspanEvent返回时的最终值，length的大小
    }
}

function init() {
    document.getElementById("left-in").onclick = function () {
        leftIn();
    };

    document.getElementById("left-out").onclick = function () {
        leftOut();
    };

    document.getElementById("right-in").onclick = function () {
        rightIn();
    };
    document.getElementById("right-out").onclick = function () {
        rightOut();
    };
}

init();


