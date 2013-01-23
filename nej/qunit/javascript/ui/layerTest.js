var f = function(){
    //定义测试模块
    module("layer");
    var _  = NEJ.P,
        _e = _('nej.e'),
        _p = _('nej.ui');
        
    //开始单元测试
    test('layer',function(){
        _p._$$Layer._$allocate({
            destroyable:false,
            oncontentready:function(){
                
            },
            content:''
        });
    });
}
module('依赖模块');
test('define',function(){
    define('{pro}layerTest.js',['{lib}ui/layer/layer.js','{pro}log.js'],f);
});