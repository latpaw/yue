/*
 * ------------------------------------------
 * 弹出层控件基类实现文件
 * @version  1.0
 * @author   genify(caijf@corp.netease.com)
 * ------------------------------------------
 */
var f = function(){
    var _  = NEJ.P,
        _o = NEJ.O,
        _f = NEJ.F,
        _e = _('nej.e'),
        _u = _('nej.u'),
        _h = _('nej.h'),
        _p = _('nej.ui'),
        _proLayer,
        _supLayer;
    if(!!_p._$$Layer) return;
    /**
     * 弹出层控件基类
     * @class   {nej.ui._$$Layer} 弹出层控件基类
     * @extends {nej.ui._$$Abstract}
     * @param   {Object} 可选配置参数，已处理参数列表如下
     * @config  {String|Node} content       内容HTML代码或者节点对象
     * @config  {Boolean}       destroyable 调用隐藏时是否自动回收，默认不自动回收
     * 
     * [hr]
     * 
     * @event  {oncontentready} 显示内容准备就绪触发事件
     * @param  {Node} 显示内容的节点
     * 
     * [hr]
     * 
     * @event  {onbeforerecycle} 控件回收前触发事件
     * 
     */
    _p._$$Layer = NEJ.C();
      _proLayer = _p._$$Layer._$extend(_p._$$Abstract);
      _supLayer = _p._$$Layer._$supro;
    /**
     * 控件重置
     * @protected
     * @method {__reset}
     * @param  {Object} 可选配置参数
     * @return {Void}
     */
    _proLayer.__reset = function(_options){
        this.__supReset(_options);
        this._$setEvent('oncontentready',
                        _options.oncontentready||
                        this.__doInitContent._$bind(this));
        this.__destroyable = !!_options.destroyable;
        this._$setContent(_options.content);
    };
    /**
     * 控件销毁
     * @protected
     * @method {__destroy}
     * @return {Void}
     */
    _proLayer.__destroy = function(){
        this._$dispatchEvent('onbeforerecycle');
        this.__supDestroy();
        this.__doHide();
        this._$setContent('');
    };
    /**
     * 初始化内容区域，子类实现具体逻辑
     * @protected
     * @method {__doInitContent}
     * @param  {Node} 内容区容器节点
     * @return {Void}
     */
    _proLayer.__doInitContent = _f;
    /**
     * 调整显示位置，子类实现具体业务逻辑
     * @protected
     * @method {__doPositionAlign}
     * @return {Void}
     */
    _proLayer.__doPositionAlign = _f;
    /**
     * 控件隐藏
     * @protected
     * @method {__doHide}
     * @return {Void}
     */
    _proLayer.__doHide = function(){
        _e._$removeByEC(this.__body);
        this.__mask = _h.__unmask(this.__body);
    };
    /**
     * 设置层显示内容
     * @method {_$setContent}
     * @param  {String|Node} 内容HTML代码或者节点
     * @return {nej.ui._$$Layer}
     */
    _proLayer._$setContent = function(_content){
        if (!this.__body||
            !this.__ncnt||
            _content==null) return this;
        _content = _content||'';
        _u._$isString(_content)
        ? this.__ncnt.innerHTML = _content
        : this.__ncnt.appendChild(_content);
        this._$dispatchEvent('oncontentready',this.__ncnt);
        return this;
    };
    /**
     * 设置位置
     * @method {_$setPosition}
     * @param  {Object} 位置信息，如{top:100,left:200}
     * @return {nej.ui._$$Layer}
     */
    _proLayer._$setPosition = function(_offset){
        var _value = _offset.top;
        if (_value!=null){
            _value += 'px';
            _e._$setStyle(this.__body,'top',_value);
            _e._$setStyle(this.__mask,'top',_value);
        }
        var _value = _offset.left;
        if (_value!=null){
            _value += 'px';
            _e._$setStyle(this.__body,'left',_value);
            _e._$setStyle(this.__mask,'left',_value);
        }
        return this;
    };
    /**
     * 显示控件
     * @method {_$show}
     * @return {nej.ui._$$Layer}
     */
    _proLayer._$show = function(){
        _e._$setStyle(this.__body,'visibility','hidden');
        _supLayer._$show.apply(this,arguments);
        this.__doPositionAlign();
        _e._$setStyle(this.__body,'visibility','');
        this.__mask = _h.__mask(this.__body);
        return this;
    };
    /**
     * 隐藏控件
     * @method {_$hide}
     * @return {nej.ui._$$Layer}
     */
    _proLayer._$hide = function(){
        this.__destroyable ? this._$recycle()
                           : this.__doHide();
        return this;
    };
};
define('{lib}ui/layer/layer.js',
      ['{lib}ui/base.js'],f);