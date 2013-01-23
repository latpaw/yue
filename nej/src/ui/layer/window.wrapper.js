/*
 * ------------------------------------------
 * 弹出窗体封装基类实现文件
 * @version  1.0
 * @author   genify(caijf@corp.netease.com)
 * ------------------------------------------
 */
var f = function(){
    var _  = NEJ.P,
        _u = _('nej.u'),
        _p = _('nej.ui'),
        _proWindowWrapper;
    if(!!_p._$$WindowWrapper) return;
    /**
     * 弹出窗体封装基类对象，主要实现层里面内容部分的业务逻辑
     * @class   {nej.ui._$$WindowWrapper} 弹出窗体封装基类对象
     * @extends {nej.ui._$$LayerWrapper}
     * @param   {Object} 可选配置参数，已处理参数列表如下
     * 
     */
    _p._$$WindowWrapper = NEJ.C();
      _proWindowWrapper = _p._$$WindowWrapper._$extend(_p._$$LayerWrapper);
    /**
     * 构建弹层控件实例，子类实现具体业务逻辑
     * @protected
     * @method {__getLayerInstance}
     * @return {nej.ui._$$Layer} 弹层控件实例
     */
    _proWindowWrapper.__getLayerInstance = function(){
        return _p._$$Window._$allocate(this.__lopt);
    };
    /**
     * 初始化弹层控件可选配置参数
     * @protected
     * @method {__doInitLayerOptions}
     * @return {Void}
     */
    _proWindowWrapper.__doInitLayerOptions = function(){
        _p._$$WindowWrapper._$supro
          .__doInitLayerOptions.apply(this,arguments);
        this.__lopt.mask  = null;
        this.__lopt.title = '标题';
        this.__lopt.align = '';
        this.__lopt.draggable = !1;
        this.__lopt.onclose = null;
    };
};
define('{lib}ui/layer/window.wrapper.js',
      ['{lib}ui/layer/layer.wrapper.js'
      ,'{lib}ui/layer/window.js'],f);