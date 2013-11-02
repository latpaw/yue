/*
 * ------------------------------------------
 * 列表项控件基类实现文件
 * @version  1.0
 * @author   genify(caijf@corp.netease.com)
 * ------------------------------------------
 */
var f = function(){
    var _  = NEJ.P,
        _o = NEJ.O,
        _f = NEJ.F,
        _p = _('nej.ui'),
        _proItem;
    if(!!_p._$$Item) return;
    /**
     * 列表项控件基类
     * @class   {nej.ui._$$Item} 列表项控件基类
     * @extends {nej.ui._$$Abstract}
     * @param   {Object} 可选配置参数，已处理参数列表如下
     * @config  {Object} data 当前项绑定的数据
     * @config  {Number} index 当前项的索引
     * @config  {Number} total 总列表长度
     * @config  {Array}  range 当前项所在的列表片段方位(begin,end)
     */
    _p._$$Item = NEJ.C();
      _proItem = _p._$$Item._$extend(_p._$$Abstract);
    /**
     * 控件初始化
     * @protected
     * @method {__init}
     * @return {Void}
     */
    _proItem.__init = (function(){
        var _seed = +new Date;
        return function(){
            this.__id = 'itm-'+(++_seed);
            this.__supInit();
        };
    })();
    /**
     * 控件重置
     * @protected
     * @method {__reset}
     * @param  {Object} 可选配置参数
     * @return {Void}
     */
    _proItem.__reset = function(_options){
        this.__supReset(_options);
        this.__data  = _options.data||{};
        this.__index = _options.index;
        this.__total = _options.total;
        this.__range = _options.range;
        this.__doRefresh(this.__data);
    };
    /**
     * 控件销毁
     * @protected
     * @method {__destroy}
     * @return {Void}
     */
    _proItem.__destroy = function(){
        this.__supDestroy();
        delete this.__data;
        delete this.__index;
        delete this.__total;
        delete this.__range;
    };
    /**
     * 刷新项,子类实现具体逻辑
     * @protected
     * @method {__doRefresh}
     * @return {Void}
     */
    _proItem.__doRefresh = _f;
    /**
     * 取项标识
     * @method {_$getId}
     * @return {String} 项标识
     */
    _proItem._$getId = function(){
        return this.__id;
    };
    /**
     * 取项绑定数据
     * @method {_$getData}
     * @return {Object} 数据信息
     */
    _proItem._$getData = function(){
        return this.__data;
    };
};
define('{lib}ui/item/item.js',
      ['{lib}ui/base.js'],f);