/**
 * Created by w on 2016/10/5.
 */
/* 数据格式演示
 var aqiSourceData = {
 "北京": {
 "2016-01-01": 10,
 "2016-01-02": 10,
 "2016-01-03": 10,
 "2016-01-04": 10
 }
 };
 */

// 以下两个函数用于随机模拟生成测试数据
function getDateStr(dat) {
    var y = dat.getFullYear();
    var m = dat.getMonth() + 1;
    m = m < 10 ? '0' + m : m;
    var d = dat.getDate();
    d = d < 10 ? '0' + d : d;
    return y + '-' + m + '-' + d;
}

function randomBuildData(seed) {
    var returnData = {};
    var dat = new Date("2016-01-01");
    var datStr = '';
    for (var i = 1; i < 92; i++) {
        datStr = getDateStr(dat);
        returnData[datStr] = Math.ceil(Math.random() * seed);
        dat.setDate(dat.getDate() + 1);
    }
    return returnData;
}

var aqiSourceData = {
    "北京": randomBuildData(500),
    "上海": randomBuildData(300),
    "广州": randomBuildData(200),
    "深圳": randomBuildData(100),
    "成都": randomBuildData(300),
    "西安": randomBuildData(500),
    "福州": randomBuildData(100),
    "厦门": randomBuildData(100),
    "沈阳": randomBuildData(500)
};

// 用于渲染图表的数据
var chartData = {};

// 记录当前页面的表单选项
var pageState = {
    nowSelectCity: -1,
    nowGraTime: "day"
};

/**
 * 渲染图表
 */
function renderChart() {
    var bar = "";
    var wrapper = document.getElementById("aqi-chart-wrap");
    if (pageState.nowSelectCity >= 0) {
        var selectedData = chartData[pageState.nowGraTime][pageState.nowSelectCity];
        console.log(selectedData);
        for (var item in selectedData) {
            if (selectedData.hasOwnProperty(item))
                bar += "<div class='bar' title='" + item + ": " + selectedData[item] + "' style='" + setStyle(selectedData[item]) + "'></div>\n";
        }
        console.log(bar);
        console.log(wrapper);
        wrapper.innerHTML = bar;
    }
}

function colorRed300(aqi) {
    var r = 0;
    var g = 255;
    var b = 0;
    if (aqi > 300)return "rgb(255,0,0)";
    if (aqi > 0 && aqi <= 150)r = Math.floor(aqi / 150 * 255);
    if (aqi > 150 && aqi <= 300) {
        r = 255;
        g = Math.floor(g - (aqi - 150) / 150 * 255);
    }
    return "rgb(" + r + "," + g + "," + b + ")";
}

function setStyle(aqi) {
    var wrapperHeight = document.getElementById("aqi-chart-wrap").offsetHeight;
    var width;
    if (pageState.nowGraTime == "day") {
        width = 10;
    }
    if (pageState.nowGraTime == "week") {
        width = 30;
    }
    if (pageState.nowGraTime == "month") {
        width = 50;
    }
    return "float:left;width:" + width + "px;height:" + aqi + "px;margin-top:" + (wrapperHeight - aqi) + "px;background:" + colorRed300(aqi) + ";"
}

/**
 * 日、周、月的radio事件点击时的处理函数
 */
function graTimeChange() {
    // 确定是否选项发生了变化
    var graTimeRadio = document.getElementById("form-gra-time").getElementsByTagName("input");
    if (getRadioCheckedValue(graTimeRadio) !== pageState.nowGraTime) {
        // 设置对应数据
        pageState.nowGraTime = getRadioCheckedValue(graTimeRadio);
        // 调用图表渲染函数
        renderChart();
    }
}

function getRadioCheckedValue(graTimeRadio) {
    for (var i = 0; i < graTimeRadio.length; i++)
        if (graTimeRadio[i].checked)return graTimeRadio[i].value;
}

/**
 * select发生变化时的处理函数
 */
function citySelectChange() {
    // 确定是否选项发生了变化
    var mySelect = document.getElementById("city-select");
    var index = mySelect.selectedIndex;
    if ((index - 1) != pageState.nowSelectCity) {
        // 设置对应数据
        pageState.nowSelectCity = index - 1;
        // 调用图表渲染函数
        renderChart();
    }
}

/**
 * 初始化日、周、月的radio事件，当点击时，调用函数graTimeChange
 */
function initGraTimeForm() {
    var radio = document.getElementsByName("gra-time");
    for (var i = 0; i < radio.length; i++) {
        radio[i].addEventListener("click", function () {
            graTimeChange();
        })
    }
}

/**
 * 初始化城市Select下拉选择框中的选项
 */
function initCitySelector() {
    // 读取aqiSourceData中的城市，然后设置id为city-select的下拉列表中的选项
    var mySelect = document.getElementById("city-select");
    var cityName = Object.getOwnPropertyNames(aqiSourceData);
    for (var i = 0; i < cityName.length; i++) {
        mySelect.innerHTML += "<option>" + cityName[i] + "</option>";
    }
    // 给select设置事件，当选项发生变化时调用函数citySelectChange
    mySelect.addEventListener("change", function () {
        citySelectChange();
    });
}

/**
 * 初始化图表需要的数据格式
 */
function initAqiChartData() {
    // 将原始的源数据处理成图表需要的数据格式
    var week = {};
    var month = {};
    var day = {};
    var indexOfCity = -1;
    for (var city in aqiSourceData) {
        ++indexOfCity;
        var weekData = {};
        var monthData = {};
        var dayData = {};
        var CurDayOfWeek = 5;
        var CurMonth = "01";
        var accWeek = 0;
        var accMonth = 0;
        var weekCount = 0;
        var dateArray = Object.getOwnPropertyNames(aqiSourceData[city]);
        for (var i = 0; i < dateArray.length; i++, CurDayOfWeek++) {
            accWeek += aqiSourceData[city][dateArray[i]];
            accMonth += aqiSourceData[city][dateArray[i]];
            dayData[dateArray[i]] = aqiSourceData[city][dateArray[i]];
            if (CurDayOfWeek % 7 == 0 || dateArray[i + 1] == undefined) {
                weekData["第" + (++weekCount) + "个星期平均AQI值"] = Math.floor(accWeek / CurDayOfWeek);
                CurDayOfWeek = 0;
                accWeek = 0;
            }
            if (dateArray[i + 1] == undefined || CurMonth != dateArray[i + 1].slice(5, 7)) {
                monthData[CurMonth + "月平均AQI值"] = Math.floor(accMonth / (i + 1));
                if (dateArray[i + 1])CurMonth = dateArray[i + 1].slice(5, 7);
                accMonth = 0;
            }
        }
        week[indexOfCity] = weekData;
        month[indexOfCity] = monthData;
        day[indexOfCity] = dayData;
    }
    // 处理好的数据存到 chartData 中
    chartData.week = week;
    chartData.month = month;
    chartData.day = day;
}

/**
 * 初始化函数
 */
function init() {
    initGraTimeForm();
    initCitySelector();
    initAqiChartData();
}

init();
