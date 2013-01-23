var f = function(){
    //定义测试模块
    module("audio");
    //开始单元测试
    test('audio',function(){
        var _audio = nej.ui._$$AudioPlayer._$allocate({
            parent:document.getElementById('id-box'),
            title:'Track01',
            url:'http://zhangmenshiting2.baidu.com/data2/music/1225298/1225298.mp3?xcode=022954e466a3925ed7cc566215bc9331&mid=0.30002112109163'
        });
        _audio._$play();
        _audio._$pause();
        _audio._$stop();
        _audio._$play();
    });
}
module('依赖模块');
test('define',function(){
    define('{pro}audioTest.js',['{lib}ui/audio/audio.js','{pro}log.js'],f);
});