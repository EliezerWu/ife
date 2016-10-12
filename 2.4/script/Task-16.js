/**
 * Created by w on 2016/10/2.
 */
/**
 * aqiData，存储用户输入的空气指数数据
 * 示例格式：
 * aqiData = {
 *    "北京": 90,
 *    "上海": 40
 * };
 */
var aqiData = {};

/**
 * 从用户输入中获取数据，向aqiData中增加一条数据
 * 然后渲染aqi-list列表，增加新增的数据
 */
function addAqiData() {
    var cityInputValue = document.getElementById("aqi-city-input").value;
    var aqiInputValue = document.getElementById("aqi-value-input").value;
    if (cityInputValue.trim().length != 0 && cityInputValue != null && isNaN(parseInt(cityInputValue))) {
        aqiData[cityInputValue.trim()] = undefined;
        if (isInteger(parseInt(aqiInputValue)))aqiData[cityInputValue.trim()] = parseInt(aqiInputValue);
        else {
            alert(aqiInputValue + "不是整数！");

        }
    }
    else {
        alert("请输入正确地点！");

    }
}

function isInteger(obj) {
    return typeof (obj) == "number" && obj % 1 == 0;
}

/**
 * 渲染aqi-table表格
 */
function renderAqiList() {
    var aqiTable = document.getElementById("aqi-table");
    var table = "";
    for (var property in aqiData)
        table += "<tr><td>" + property + "</td><td>" + aqiData[property] + "</td><td><button>删除</button></td></tr>";
    aqiTable.innerHTML = table;
}

/**
 * 点击add-btn时的处理逻辑
 * 获取用户输入，更新数据，并进行页面呈现的更新
 */
function addBtnHandle() {
    addAqiData();
    renderAqiList();
}

/**
 * 点击各个删除按钮的时候的处理逻辑
 * 获取哪个城市数据被删，删除数据，更新表格显示
 */
function delBtnHandle(button) {
    // do sth.
    var tr = button.parentElement.parentElement;
    delete aqiData[tr.childNodes[0].innerHTML];
}

function init() {

    // 在这下面给add-btn绑定一个点击事件，点击时触发addBtnHandle函数
    document.getElementById("add-btn").onclick = function () {
        addBtnHandle();
    };//若没有function（）{}嵌套。浏览器会自动启动该事件，不管按钮有无点击
    // 想办法给aqi-table中的所有删除按钮绑定事件，触发delBtnHandle函数
    document.getElementById("aqi-table").addEventListener("click", function (event) {
        if (event.target && event.target.nodeName === "BUTTON")delBtnHandle(event.target);
    })
}
init();