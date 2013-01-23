var f = function(){
    //定义测试模块
    module("touch");
    //开始单元测试
    test('touch',function(){
        var _box = document.getElementById('id-box');
        stop();
        var _cbf = function(_event){
            ok(true,'touchdown事件触发,type=touchdown');
            start();            
        }
        nej.v._$addEvent(_box,'touchdown',_cbf);
    });
    
    test('dispatch touch event',function(){
        var _box = document.getElementById('id-box');
        stop();
        var _cbf = function(_event){
            ok(true,'touch事件触发,type=touch');
            start();            
        }
        nej.v._$addEvent(_box,'touch',_cbf);
        nej.v._$dispatchEvent(_box,'touch');
    });
}
module('依赖模块');
test('define',function(){
    define('{pro}touchTest.js',['{lib}util/gesture/touch.js','{pro}log.js'],f);
});