var f = function(){
    //定义测试模块
    module("chart");
    var p = NEJ.P('nej.u'),
        e = NEJ.P('nej.e');
    
    //开始单元测试
    test('chart', function() {
        var _box = e._$get('box');
        var _box2 = e._$get('box2');
        var _obj = {
                 width:500,
                 height:500,
                 box:_box,
                 data:{
                    chart:{
                    graphicType:'line',
                    showDataTips:true
                   },
                    title:{
                        text:'Flex LineChart',
                        autoSize:"center",
                        textColor:0x000000,
                        textSize:30,
                        showBackground:false,
                        backgroundColor:0xFF0000
                    } , 
                    xAxis:{
                           // datetime       category
                          axisType:'datetime',
                          //milliseconds,seconds,minutes,hours,days,weeks,months,years
                          labelUnits:'minutes'
                    },
                    series:[
                        {"1342700688036": 41.71},
                        {"1342722288036": 42.21},
                        {"1342743888036": 42.11},
                        {"1342765488036": 42.71},
                        {"1342787088036": 42.99},
                        {"1342808688036": 44},
                        {"1342830288036": 46},
                        {"1342851888036": 48},
                        {"1342873488036": 49}]
                 }
        }
        var _obj2 = {
                 width:500,
                 height:500,
                 box:_box2,
                 data:{
                    chart:{
                    graphicType:'line',
                    showDataTips:true
                   },
                    title:{
                        text:'Flex LineChart',
                        autoSize:"center",
                        textColor:0x000000,
                        textSize:30,
                        showBackground:false,
                        backgroundColor:0xFF0000
                    } , 
                    xAxis:{
                           // datetime       category
                          axisType:'datetime',
                          //milliseconds,seconds,minutes,hours,days,weeks,months,years
                          labelUnits:'minutes'
                    },
                    series:[
                        {"1342700688036": 41.71},
                        {"1342722288036": 42.21},
                        {"1342743888036": 42.11},
                        {"1342765488036": 42.71},
                        {"1342787088036": 42.99},
                        {"1342808688036": 44},
                        {"1342830288036": 46},
                        {"1342851888036": 48},
                        {"1342873488036": 49}]
                 }
        }
        e._$drawChart(_obj);
        e._$drawChart(_obj2);
    });
}
module('依赖模块');
test('define',function(){
    define('{pro}chartTest.js',
    ['{lib}util/chart/chart.js','{pro}log.js'],f);
});
