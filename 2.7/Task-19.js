/**
 * Created by w on 2016/10/14.
 */
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
    if (isBetween0And100(num)) {
        queue.unshift(num);
        render();
    }
    else {
        alert("请输入0~100的数字");
    }
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
    if (isBetween0And100(num)) {
        queue.push(num);
        render();
    }
    else {
        alert("请输入0~100的数字");
    }
}

function rightOut() {
    if (queue.length != 0) {
        queue.pop();
        render();
    }
}

function setStyle(num) {
    return "<div class='num' " +
        "style='width:10px;height:" + num + "px;" + "margin:1px;display:inline-block;background:red;color:white;font-size:20px;'></div>";
}

function clickDelete(index) {
    if (queue.length != 0) {
        queue.splice(index, 1);
        render();
    }
}

function isBetween0And100(num) {
    return !!(num >= 0 && num <= 100);
}

function render() {
    display.innerHTML = '';
    for (var i = 0; i < queue.length; i++)
        display.innerHTML += setStyle(queue[i]);
    addSpanEvent();
}

function bubbleSortAnim() {
    var i = 0;
    var j = queue.length - 1;
    var flag = 1;
    var timer;
    timer = setInterval(
        function () {
            if (queue[j - 1] > queue[j]) {
                var temp = queue[j];
                queue[j] = queue[j - 1];
                queue[j - 1] = temp;
                flag = 1;
            }
            j--;
            if (j == i && flag == 0) {
                console.log("排序完成");
                clearInterval(timer);
            }
            if (j == i) {
                flag = 0;
                i++;
                j = queue.length - 1;
            }
            render();
            if (i == queue.length - 1)clearInterval(timer);
        }
        , 500)
}//for循环内用sleep导致html会随时间变化但是浏览器并不会去渲染。

function addSpanEvent() {
    for (var i = 0; i < display.getElementsByTagName("div").length; i++) {
        (function (num) {
            display.getElementsByTagName("div")[num].onclick = function () {
                clickDelete(num);
            }
        })(i);//若闭包则i值始终为addSpanEvent返回时的最终值，length的大小
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
    document.getElementById("sort").onclick = function () {
        bubbleSortAnim();
    }
}

init();


