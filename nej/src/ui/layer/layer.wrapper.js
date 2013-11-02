/*
 * ------------------------------------------
 * 弹出层封装基类实现文件
 * @version  1.0
 * @author   genify(caijf@corp.netease.com)
 * ------------------------------------------
 */
var f = function(){
    var _  = NEJ.P,
        _f = NEJ.F,
        _u = _('nej.u'),
        _e = _('nej.e'),
        _p = _('nej.ui'),
        _proLayerWrapper,
        _supLayerWrapper;
    if(!!_p._$$LayerWrapper) return;
    /**
     * 弹出层封装基类对象，主要实现层里面内容部分的业务逻辑
     * @class   {nej.ui._$$LayerWrapper} 弹出层封装基类对象
     * @extends {nej.ui._$$Abstract}
     * @param   {Object} 可选配置参数，已处理参数列表如下
     * 
     */
    _p._$$LayerWrapper = NEJ.C();
      _proLayerWrapper = _p._$$LayerWrapper._$extend(_p._$$Abstract);
      _supLayerWrapper = _p._$$LayerWrapper._$supro;
    /**
     * 控件重置
     * @protected
     * @method {__reset}
     * @param  {Object} 可选配置参数
     * @return {Void}
     */
    _proLayerWrapper.__reset = function(_options){
        this.__doInitLayerOptions();
        this.__supReset(this
            .__doFilterOptions(_options));
        this.__lopt.onbeforerecycle = 
            this._$recycle._$bind(this);
        this.__layer = this.__getLayerInstance();
    };
    /**
     * 控件销毁
     * @protected
     * @method {__destroy}
     * @return {Void}
     */
    _proLayerWrapper.__destroy = function(){
        this.__supDestroy();
        delete this.__lopt;
        _e._$removeByEC(this.__body);
        var _layer = this.__layer;
        if (!!_layer){
            delete this.__layer;
            _layer._$recycle();
        }
    };
    /**
     * 构建弹层控件实例，子类实现具体业务逻辑
     * @protected
     * @method {__getLayerInstance}
     * @return {nej.ui._$$Layer} 弹层控件实例
     */
    _proLayerWrapper.__getLayerInstance = _f;
    /**
     * 将配置参数拆分为两部分，一部分用于弹层控件，一部分用于本控件
     * @protected
     * @method {__doFilterOptions}
     * @param  {Object} 可选配置参数
     * @return {Object} 过滤后的配置参数
     * @return {Void}
     */
    _proLayerWrapper.__doFilterOptions = function(_options){
        var _result = {};
        _u._$forIn(_options,
            function(_item,_key){
                this.__lopt.hasOwnProperty(_key)
                ? this.__lopt[_key] = _item
                : _result[_key] = _item;
            },this);
        return _result;
    };
    /**
     * 初始化弹层控件可选配置参数
     * @protected
     * @method {__doInitLayerOptions}
     * @return {Void}
     */
    _proLayerWrapper.__doInitLayerOptions = function(){
        this.__lopt = {
            clazz:''
           ,parent:null
           ,content:this.__body
           ,destroyable:!1
           ,oncontentready:null
        };
    };
    /**
     * 显示弹层
     * @method {_$show}
     * @return {nej.ui._$$LayerWrapper}
     */
    _proLayerWrapper._$show = function(){
        if (!!this.__layer) 
            this.__layer._$show();
        this._$dispatchEvent('onaftershow');
        return this;
    };
    /**
     * 隐藏弹层
     * @method {_$hide}
     * @return {nej.ui._$$LayerWrapper}
     */
    _proLayerWrapper._$hide = function(){
        if (!!this.__layer) 
            this.__layer._$hide();
        return this;
    };
};
define('{lib}ui/layer/layer.wrapper.js',
      ['{lib}ui/layer/layer.js'],f);