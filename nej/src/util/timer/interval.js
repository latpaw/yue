/*
 * ------------------------------------------
 * 统一处理间隔时钟实现文件
 * @version  1.0
 * @author   genify(caijf@corp.netease.com)
 * ------------------------------------------
 */
var f = function(){
    // variable declaration
    var _u = NEJ.P('nej.u'),
        _p = window,
        _tcache = {}; // interval:{tm:timer,fn:[{id:23,cb:function} ...]}
                      // timer_id:interval
    /**
     * 请求定时器操作
     * @api    {window.requestInterval}
     * @param  {Function} 回调函数
     * @param  {Number}   时钟间隔
     * @return {String}   时钟ID
     */
    _p.requestInterval = (function(){
        var _doCallback = function(_item){
            try{_item.cb(+new Date);}catch(ex){}
        };
        var _doTimerTrigger = function(_interval){
            var _cache = _tcache[_interval];
            if (!_cache) return;
            _u._$forEach(_cache.fn,_doCallback);
        };
        return function(_callback,_interval){
            if (!_u._$isFunction(_callback)) return;
            var _cache = _tcache[_interval];
            if (!_cache){
                _cache = {fn:[]};
                _tcache[_interval] = _cache;
            }
            var _id = 't-'+_u._$randNumberString();
            _tcache[_id] = _interval;
            _cache.fn.push({id:_id,cb:_callback});
            if (_cache.tm==null)
                _cache.tm = window.setInterval
                           (_doTimerTrigger._$bind
                           (null,_interval),_interval);
            return _id;
        };
    })();
    /**
     * 取消时钟操作
     * @api    {window.cancelInterval}
     * @param  {String} 时钟ID
     * @return {window}
     */
    _p.cancelInterval = function(_tid){
        var _interval = _tcache[_tid],
            _cache = _tcache[_interval];
        if (!_cache) return this;
        var _list = _cache.fn;
        _u._$reverseEach(_list,
            function(_item,_index,_list){
                if (_item.id==_tid){
                    _list.splice(_index,1);
                    return !0;
                }
            });
        if (!_list.length){
            window.clearInterval(_cache.tm);
            delete _tcache[_tid];
            delete _tcache[_interval];
        }
        return this;
    };
};
define('{lib}util/timer/interval.js',
      ['{lib}base/util.js'],f);