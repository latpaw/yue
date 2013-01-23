var f = function(){
    //定义测试模块
    module("darg");
    //开始单元测试
    test('drag',function(){
        var _box = document.getElementById('id-box');
        var v = NEJ.P('nej.v');
        var _i = 0,_i1 = 0,_i2 = 0;
        stop();
        var checkI = function(){
            var _b0 = _i > 0;
            var _b1 = _i1 > 0;
            var _b2 = _i2 > 0;
            ok(_b0,'dragStart被触发'+_i+'次');
            ok(_b1,'drag被触发'+_i1+'次');
            ok(_b2,'dragEnd被触发'+_i2+'次');
            start();
        }
        var dragStart = function(_event,_touch){
            _i++;
        }
        var drag = function(_event,_touch){
            var _px = _touch['pageX'];
            _box.style.left = _px;
            _i1++;
        }
        var dragEnd = function(_event,_touch){
            _i2++;
            checkI();
        }
        v._$addEvent(_box,'dragstart',dragStart);
        v._$addEvent(_box,'drag',drag);
        v._$addEvent(_box,'dragend',dragEnd);
    });
}
module('依赖模块');
test('define',function(){
    define('{pro}dargTest.js',['{lib}util/gesture/drag.js','{pro}log.js'],f);
});