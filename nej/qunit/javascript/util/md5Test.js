var f = function(){
    //定义测试模块
    module("md5");
    var p = NEJ.P('nej.u');
    
    //开始单元测试
    test('md5', function() {
        var _numberList = ['中文中文','0','2','100','999'];
        stop();
        for(var i = 0; i < _numberList.length; i++){
            var _num = _numberList[i];
            var _str2hex = p._$str2hex(_num);
            equal(_str2hex,_num,'字符串转16进制');
            start();
        }
    });
}
module('依赖模块');
test('define',function(){
    define('{pro}md5Test.js',
    ['{lib}util/encode/sha.md5.js','{pro}log.js'],f);
});
