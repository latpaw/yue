/*
 * ------------------------------------------
 * 卡片控件实现文件
 * @version  1.0
 * @author   genify(caijf@corp.netease.com)
 * ------------------------------------------
 */
var f = function(){
    var _  = NEJ.P,
        _o = NEJ.O,
        _v = _('nej.v'),
        _e = _('nej.e'),
        _p = _('nej.ui'),
        _proCard;
    if(!!_p._$$Card) return;
    // ui css text
    var _seed_css = _e._$pushCSSText('.#<uispace>{position:absolute;background:#fff;}');
    /**
     * 卡片控件
     * @class   {nej.ui._$$Card} 卡片控件
     * @extends {nej.ui._$$Layer}
     * @param   {Object} 可选配置参数，已处理参数列表如下
     * @config  {String} top  卡片垂直位置
     * @config  {String} left 卡片水平位置
     */
    _p._$$Card = NEJ.C();
      _proCard = _p._$$Card._$extend(_p._$$Layer);
    /**
     * 控件重置
     * @protected
     * @method {__reset}
     * @param  {Object} 可选配置参数
     * @return {Void}
     */
    _proCard.__reset = function(_options){
        this.__supReset(_options);
        this.__doInitDomEvent([
            [document,'click',this._$hide._$bind(this)]
        ]);
        this.__position = {
            top:_options.top,
            left:_options.left
        };
    };
    /**
     * 控件销毁
     * @protected
     * @method {__destroy}
     * @return {Void}
     */
    _proCard.__destroy = function(){
        delete this.__fbox;
        delete this.__align;
        delete this.__position;
        this.__supDestroy();
    };
    /**
     * 初始化外观信息
     * @protected
     * @method {__initXGui}
     * @return {Void}
     */
    _proCard.__initXGui = function(){
        this.__seed_css = _seed_css;
    };
    /**
     * 初始化节点
     * @protected
     * @method {__initNode}
     * @return {Void}
     */
    _proCard.__initNode = function(){
        this.__supInitNode();
        this.__ncnt = this.__body;
        _v._$addEvent(this.__body,'click',_v._$stop);
    };
    /**
     * 设置对齐方式
     * @protected
     * @method {__setAlign}
     * @param  {String} 对齐方式
     * @return {Void}
     */
    _proCard.__setAlign = (function(){
        var _reg = /\s+/i;
        return function(_align){
            _align = (_align||'').trim()
                     .toLowerCase().split(_reg);
            _align[0] = _align[0]||'top';
            _align[1] = _align[1]||'left';
            this.__align = _align;
        };
    })();
    /**
     * 根据适应方式取位置信息
     * @protected
     * @method {__doCalPosition}
     * @param  {String} 适应位置
     * @return {Object} 位置信息
     */
    _proCard.__doCalPosition = function(_align){
        var _result = {},
            _fbox = this.__fbox,
            _pbox = _e._$getPageBox(),
            _width = this.__body.offsetWidth,
            _height = this.__body.offsetHeight;
        switch(_align[0]){
            case 'top':
                _result.top  = _fbox.top-_height;
                _result.left = _align[1]=='right'
                             ? _fbox.left+_fbox.width-_width
                             : _fbox.left;
            break;
            case 'left':
                _result.left = _fbox.left-_width;
                _result.top  = _align[1]=='bottom'
                             ? _fbox.top+_fbox.height-_height
                             : _fbox.top;
            break;
            case 'right':
                _result.left = _fbox.left+_fbox.width;
                _result.top  = _align[1]=='bottom'
                             ? _fbox.top+_fbox.height-_height
                             : _fbox.top;
            break;
            default:
                _result.top  = _fbox.top+_fbox.height;
                _result.left = _align[1]=='right'
                             ? _fbox.left+_fbox.width-_width
                             : _fbox.left;
            break;
        }
        return _result;
    };
    /**
     * 调整显示位置
     * @protected
     * @method {__doPositionAlign}
     * @return {Void}
     */
    _proCard.__doPositionAlign = function(){
        if (!this.__fitable){
            this._$setPosition(this.__position);
            return;
        }
        if(!!this.__byPoint){
            this._$setPosition(this.__pbox);
            return;
        }
        if (!!this.__fbox)
            this._$setPosition(
            this.__doCalPosition(this.__align));
    };
    
    /**
     * 根据卡片规则计算左上角的坐标
     * @protected
     * @method {__doFindPosition}
     * @return {Object} 卡片左上角坐标{top:20,left:10}
     */
    _proCard.__doFindPosition = function(_element,_delta,_event){
        _delta = _delta||_o;
        var _pageBox = _e._$getPageBox(),
            _x = _v._$pageX(_event) + (_delta.left||0),
            _y = _v._$pageY(_event) + (_delta.top||0),
            _width = _element.offsetWidth + (_delta.right||0),
            _height= _element.offsetHeight + (_delta.bottom||0),
            _pageWidth = _pageBox.scrollWidth,
            _pageHeight= _pageBox.scrollHeight,
            _temp0 = _x + _width,
            _temp1 = _y + _height;
        switch(this.__align[0]){
            case 'top':
                _y = (_temp1 > _pageHeight) ? (_y - _height): _y;
                if(this.__align[1] == 'right'){
                    _x = (_x - _width) < 0 ? 0 : (_x - _width);
                }else{
                    _x = (_temp0 > _pageWidth) ? (_pageWidth - _width): _x;
                }
            break;
            case 'left':
                _x = (_temp0 > _pageWidth) ? (_pageWidth - _width): _x;
                if(this.__align[1] == 'top'){
                    _y = (_temp1 > _pageHeight) ? (_y - _height): _y;
                }else{
                    _y = (_y - _height) < 0 ? _y : (_y - _height);
                }
            break;
            case 'right':
                _x = (_x - _width) < 0 ? 0 : (_x - _width);
                if(this.__align[1] == 'top'){
                    _y =(_temp1 > _pageHeight) ? (_y - _height) : _y;
                }else{
                    _y = (_y - _height) < 0 ? _y : (_y - _height);
                }
            break;
            default:
                _y = (_y - _height) < 0 ? _y : (_y - _height);
                if(this.__align[1] == 'left'){
                    _x = (_temp0 > _pageWidth) ? (_pageWidth - _width): _x;
                }else{
                    _x = (_x - _width) < 0 ? 0 : (_x - _width);
                }
            break;
        }
        return {top:_y,left:_x};
    }
    /**
     * 通过参照节点显示卡片位置
     * @method {_$showByReference}
     * @param  {Object} 可选配置参数，已处理参数列表如下
     * @config {Object}  delta   位置偏移，{top:0,right:0,bottom:0,left:0}
     * @config {Object}  align   卡片位置，默认为'top left'，{top:0,right:0,bottom:0,left:0}
     * [ntb]
     *  整体位置 | top/right/bottom/left
     *  对齐方式 | top/bottom | left/right
     * [/ntb]
     * @config {Boolean} fitable 是否需要调整卡片位置使其适应页面
     * @return {nej.ui._$$Card}
     */
    _proCard._$showByReference = (function(){
        var _doCalTargetBox = function(_element,_delta){
            _element = _e._$get(_element);
            if (!_element) return;
            _delta = _delta||_o;
            var _offset = _e._$offset(_element);
            return {top:_offset.y-(_delta.top||0),
                    left:_offset.x-(_delta.left||0),
                    width:_element.offsetWidth+(_delta.right||0),
                    height:_element.offsetHeight+(_delta.bottom||0)};
        };
        return function(_options){
            _options = _options||_o;
            this.__byPoint = _options.event;
            this.__setAlign(_options.align);
            if(!!this.__byPoint)
                this.__pbox = this.__doFindPosition(_options.target,_options.delta,this.__byPoint);
            this.__fbox = _doCalTargetBox(
                          _options.target,_options.delta);
            this.__fitable = !!_options.fitable;
            this._$show();
            return this;
        };
    })();
};
define('{lib}ui/layer/card.js',
      ['{lib}ui/layer/layer.js'],f);
