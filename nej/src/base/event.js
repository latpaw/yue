/*
 * ------------------------------------------
 * 事件接口实现文件
 * @version  1.0
 * @author   genify(caijf@corp.netease.com)
 * ------------------------------------------
 */
var f = function(){
    // variable declaration
    var _  = NEJ.P,
        _e = _('nej.e'),
        _v = _('nej.v'),
        _u = _('nej.u'),
        _b = _('nej.p'),
        _h = _('nej.h'),
        _p = _('nej.ut'),
        _proEventHelper,
        _proTouchEventHelper;
    /**
     * 事件辅助对象
     * @class {nej.ut._$$EventHelper} 事件辅助对象
     */
    _p._$$EventHelper = NEJ.C();
      _proEventHelper = _p._$$EventHelper.prototype;
    /**
     * 取辅助对象实例
     * 
     * [code]
     *   var _p = NEJ.P('nej.ut');
     *   var _helper = _p._$$EventHelper._$getInstance();
     * [/code]
     * 
     * @static
     * @method {_$getInstance}
     * @return {nej.ut._$$EventHelper} 事件辅助对象实例
     */
    _p._$$EventHelper._$getInstance = function(){
        if (!this.__instance)
             this.__instance = new this();
        return this.__instance;
    };
    /**
     * 初始化控件
     * @protected
     * @method {__init}
     * @return {Void}
     */
    _proEventHelper.__init = function(){
        // event cache
        // id:{click:[{f:function1,c:!1},{f:function2,c:!0}...],
        //     mouseup:[{f:function1,c:!1},{f:function2,c:!0}...]}
        this.__cache = {};
    };
    /*
     * 缓存节点添加的事件
     * @param  {Node}     _element 节点对象
     * @param  {String}   _type    事件类型
     * @param  {Function} _event   事件处理函数
     * @param  {Boolean}  _capture 是否捕获阶段事件
     * @return {Void}
     */
    _proEventHelper.__cacheEvent = function(_element,_type,_event,_capture){
        var _id = _e._$id(_element),
            _cache = this.__cache[_id],
            _object = {f:_event,c:_capture};
        if (!_cache){
            _cache = {};
            this.__cache[_id] = _cache;
        }
        if (!_cache[_type])
            _cache[_type] = [];
        _cache[_type].push(_object);
    };
    /*
     * 删除节点缓存的事件
     * @param  {Node}     _element 节点对象
     * @param  {String}   _type    事件类型
     * @param  {Function} _event   事件处理函数
     * @param  {Boolean}  _capture 是否捕获阶段事件
     * @return {Void}
     */
    _proEventHelper.__uncacheEvent = function(_element,_type,_event,_capture){
        _element = _e._$get(_element);
        if (!_element) return;
        var _cache = this.__cache[_element.id];
        if (!_cache) return;
        var _events = _cache[_type];
        if (!_events) return;
        _u._$reverseEach(_events,
            function(_object,_index,_list){
                if (_object.f==_event&&
                  !!_object.c==!!_capture)
                    _list.splice(_index,1);
            });
        if (!_events.length) delete _cache[_type];
    };
    /**
     * 节点添加事件
     * @method {_$addEvent}
     * @param  {Node}     节点对象
     * @param  {String}   事件类型
     * @param  {Function} 事件处理函数
     * @param  {Boolean}  是否捕获阶段事件
     * @return {nej.ut._$$EventHelper}
     */
    _proEventHelper._$addEvent = function(_element,_type,_event,_capture){
        _element = _e._$get(_element);
        if (!_element||!_type||
            !_u._$isFunction(_event)) 
            return this;
        _capture = !!_capture;
        var _args = _h.__checkEvent.call(_h,
                    _element,_type,_event,_capture);
        this.__cacheEvent.apply(this,_args);
        this.__addEvent.apply(this,_args);
        return this;
    };
    /**
     * 添加事件
     * @protected
     * @method {__addEvent}
     * @param  {Node}     节点对象
     * @param  {String}   事件类型
     * @param  {Function} 事件处理函数
     * @param  {Boolean}  是否捕获阶段事件
     * @return {Void}
     */
    _proEventHelper.__addEvent = function(){
        _h.__addEvent.apply(_h,arguments);
    };
    /**
     * 删除事件
     * @method {_$delEvent}
     * @param  {Node}     节点对象
     * @param  {String}   事件类型
     * @param  {Function} 事件处理函数
     * @param  {Boolean}  是否捕获阶段事件
     * @return {nej.ut._$$EventHelper}
     */
    _proEventHelper._$delEvent = function(_element,_type,_event,_capture){
        _element = _e._$get(_element);
        if (!_element||!_type||
            !_u._$isFunction(_event)) 
            return this;
        var _args = _h.__checkEvent.apply(_h,arguments);
        this.__delEvent.apply(this,_args);
        this.__uncacheEvent.apply(this,_args);
        return this;
    };
    /**
     * 删除事件
     * @protected
     * @method {__delEvent}
     * @param  {Node}     节点对象
     * @param  {String}   事件类型
     * @param  {Function} 事件处理函数
     * @param  {Boolean}  是否捕获阶段事件
     * @return {Void}
     */
    _proEventHelper.__delEvent = function(){
        _h.__delEvent.apply(_h,arguments);
    };
    /**
     * 清除节点事件
     * @method {_$clearEvent}
     * @param  {Node}   节点对象
     * @param  {String} 事件类型
     * @return {nej.ut._$$EventHelper}
     */
    _proEventHelper._$clearEvent = function(_element,_type){
        _element = _e._$get(_element);
        if (!_element) return this;
        var _cache = this.__cache[_element.id];
        if (!_cache) return this;
        if (!!_type){
            var _args = _h.__checkEvent.apply(_h,arguments),
                _type = _args[1],
                _events = _cache[_type];
            if (!_events) return this;
            var _object;
            while(_events.length){
                _object = _events.pop();
                this.__delEvent(_element,_type,_object.f,_object.c);
            }
            delete _cache[_type];
            return this;
        }
        for(var x in _cache) _v._$clearEvent(_element,x);
        return this;
    };
    /**
     * 触摸事件辅助对象
     * @class   {nej.ut._$$TouchEventHelper} 触摸事件辅助对象
     * @extends {nej.ut._$$EventHelper}
     */
    _p._$$TouchEventHelper = NEJ.C();
      _proTouchEventHelper = _p._$$TouchEventHelper._$extend(_p._$$EventHelper);
    /**
     * 初始化控件
     * @protected
     * @method {__init}
     * @return {Void}
     */
    _proTouchEventHelper.__init = function(){
        this.__supInit();
        this.__touch_type = {};
        this.__touch_impl = {};
    };
    /**
     * 初始化事件模拟机制
     * @protected
     * @method {__initEvent}
     * @return {Void}
     */
    _proTouchEventHelper.__initEvent = (function(){
        var _inited = !1;
        return function(){
            // init once
            if (!!_inited) 
                return;
            _inited = !0;
            // init touch events
            _u._$forIn(_b._$KERNEL.touch,
                function(_name,_key){
                    _h.__addEvent(document,_name,this
                      .__onTouchEvent._$bind(this,'ontouch'+_key),!1);
                },this);
            // do click event check
            _h.__addEvent(document,'click',this.__onClickEvent._$bind(this),!0);
        };
    })();
    /**
     * 注册触摸事件
     * @method {_$regist}
     * @param  {String}              事件类型
     * @param  {nej.util._$$Gesture} 事件实现类
     * @return {nej.ut._$$TouchEventHelper}
     */
    _proTouchEventHelper._$regist = function(_type,_class){
        this.__initEvent();
        var _instance = _class._$getInstance();
        if (!(_instance instanceof _p._$$Gesture)) return;
        var _events = _instance._$getSupportedEvent()||[_type];
        _u._$forEach(_events,function(_event){
            this.__touch_type[_event.toLowerCase()] = _type;
        },this);
        this.__touch_impl[_type] = _instance;
    };
    /**
     * 判断指定事件是否触摸事件
     * @method {_$isTouchEvent}
     * @param  {String}  事件类型
     * @return {Boolean} 是否触摸事件
     */
    _proTouchEventHelper._$isTouchEvent = function(_type){
        return !!this.__touch_type[(_type||'').toLowerCase()];
    };
    /**
     * 节点添加触摸事件
     * @protected
     * @method {__addEvent}
     * @param  {Node}     节点对象
     * @param  {String}   事件类型
     * @param  {Function} 事件处理函数
     * @param  {Boolean}  是否捕获阶段事件
     * @return {Void}
     */
    _proTouchEventHelper.__addEvent = function(_element,_type,_event,_capture){
        _type = (_type||'').toLowerCase();
        var _instance = this.__touch_impl[
                        this.__touch_type[_type]];
        if (!!_instance) 
            _instance._$addEventListener(
                      _element,_type,_event,_capture);
    };
    /**
     * 删除事件
     * @protected
     * @method {__delEvent}
     * @param  {Node}     节点对象
     * @param  {String}   事件类型
     * @param  {Function} 事件处理函数
     * @param  {Boolean}  是否捕获阶段事件
     * @return {Void}
     */
    _proTouchEventHelper.__delEvent = function(_element,_type,_event,_capture){
        _type = (_type||'').toLowerCase();
        var _instance = this.__touch_impl[
                        this.__touch_type[_type]];
        if (!!_instance) 
            _instance._$removeEventListener(
                      _element,_type,_event,_capture);
    };
    /**
     * 是否忽略处理事件
     * @protected
     * @method {__isIgnore}
     * @param  {Event} 事件对象
     * @return {Void}
     */
    _proTouchEventHelper.__isIgnore = function(_event){
        var _element = _v._$getElement(_event),
            _tagname = _element.tagName.toLowerCase();
        // ignore input.text and textarea
        if (_tagname=='textarea'||
           (_tagname=='input'&&_element.type=='text'))
            return !0;
        return !1;
    };
    /**
     * 触摸触发事件
     * @protected
     * @method {__onTouchEvent}
     * @param  {String} 事件类型
     * @param  {Event}  事件对象
     * @return {Void}
     */
    _proTouchEventHelper.__onTouchEvent = function(_type,_event){
//        if (this.__isIgnore(_event)) 
//            return;
        var _targets = [],
            _target  = _v._$getElement(_event);
        this.__touch_event = _event;
        while(!!_target){
            if (!!this.__cache[_target.id])
                _targets.unshift(_target);
            _target = _target.parentNode;
        }
        var _options = {e:_event,t:_targets};
        for(var x in this.__touch_impl){
            this.__touch_impl[x]._$dispatchEvent(_type,_options);
        }
        if (_event.defaulted) this.__defaulted = !0;
    };
    /**
     * 点击事件检测，主要检测触摸事件是否需要阻止默认事件
     * @protected
     * @method {__onClickEvent}
     * @param  {Event} 事件对象
     * @return {Void}
     */
    _proTouchEventHelper.__onClickEvent = function(_event){
//        if (this.__isIgnore(_event)) 
//            return;
        if (this.__defaulted){
            this.__defaulted = !1;
            _v._$stopDefault(_event);
        }
        if (this.__touch_event&&
            this.__touch_event.propagated)
            _v._$stopBubble(_event);
    };
    /**
     * 节点添加事件
     * 
     * 页面结构举例
     * [code type="html"]
     *   <div id="abc">123</div>
     * [/code]
     * 
     * 脚本举例
     * [code]
     *   var _v = NEJ.P("nej.v"),
     *       _e = NEJ.P("nej.e");
     *   // 添加扩展的事件需要事先注册事件本身
     *   // 给节点abc添加事件,包括常规事件和扩展的触摸事件
     *   _v._$addEvent(_e._$get("abc"),"mouseover",function(_event){},false);
     *   _v._$addEvent(_e._$get("abc"),"touch",function(_event){},false);
     * [/code]
     * 
     * @see    {#_$delEvent}
     * @api    {nej.v._$addEvent}
     * @param  {Node}     节点对象
     * @param  {String}   事件类型，不带on前缀，全部小写
     * @param  {Function} 事件处理函数
     * [ntb]
     *  输入 | Event | DOM事件对象
     * [/ntb]
     * @param  {Boolean}  是否捕获阶段事件
     * @return {nej.v}
     */
    _v._$addEvent = function(_element,_type,_event,_capture){
        var _helper = _p._$$TouchEventHelper._$getInstance();
        _helper = _helper._$isTouchEvent(_type)
                ? _helper:_p._$$EventHelper._$getInstance();
        _helper._$addEvent.apply(_helper,arguments);
        return this;
    };
    /**
     * 节点删除事件
     * 
     * 页面结构举例
     * [code type="html"]
     *   <div id="abc">123</div>
     * [/code]
     * 
     * 脚本举例
     * [code]
     *   var _v = NEJ.P("nej.v"),
     *       _e = NEJ.P("nej.e");
     *   // 添加扩展的事件需要事先注册事件本身
     *   // 给节点abc添加事件,包括常规事件和扩展的触摸事件
     *   _v._$addEvent(_e._$get("abc"),"mouseover",function(_event){},false);
     *   // 移除节点abc上的事件
     *   _v._$delEvent(_e._$get("abc"),"mouseover",function(_event){},false);
     * [/code]
     * 
     * @see    {#_$addEvent}
     * @api    {nej.v._$delEvent}
     * @param  {Node}     节点对象
     * @param  {String}   事件类型
     * @param  {Function} 事件处理函数
     * [ntb]
     *  输入 | Event | DOM事件对象
     * [/ntb]
     * @param  {Boolean}  是否捕获阶段事件
     * @return {nej.v}
     */
    _v._$delEvent = function(_element,_type,_event,_capture){
        var _helper = _p._$$TouchEventHelper._$getInstance();
        _helper = _helper._$isTouchEvent(_type)
                ? _helper:_p._$$EventHelper._$getInstance();
        _helper._$delEvent.apply(_helper,arguments);
        return this;
    };
    /**
     * 清除节点事件
     * 
     * 页面结构举例
     * [code type="html"]
     *   <div id="abc">123</div>
     * [/code]
     * 
     * 脚本举例
     * [code]
     *   var _v = NEJ.P("nej.v"),
     *       _e = NEJ.P("nej.e");
     *   // 添加扩展的事件需要事先注册事件本身
     *   // 给节点abc添加事件,包括常规事件和扩展的触摸事件
     *   _v._$addEvent(_e._$get("abc"),"mouseover",function(_event){},false);
     *   _v._$addEvent(_e._$get("abc"),"touch",function(_event){},false);
     *   // 清除节点上所以事件
     *   _v._$delEvent(_e._$get("abc"),"mouseover",function(_event){},false);
     * [/code]
     * 
     * @api    {nej.v._$clearEvent}
     * @param  {Node}   节点对象
     * @param  {String} 事件类型
     * @return {nej.v}
     */
    _v._$clearEvent = function(_element,_type){
        _p._$$EventHelper
          ._$getInstance()
          ._$clearEvent(_element,_type);
        _p._$$TouchEventHelper
          ._$getInstance()
          ._$clearEvent(_element,_type);
        return this;
    };
    /**
     * 获取触发事件的节点，可以传入过滤接口来遍历父节点找到符合条件的节点
     * 
     * 页面结构举例
     * [code type="html"]
     *   <div id="a">
     *     <p>
     *       <span id="b">123</span>
     *     </p>
     *   </div>
     * [/code]
     * 
     * 脚本举例
     * [code]
     *   var _v = NEJ.P("nej.v"),
     *       _e = NEJ.P("nej.e");
     *   // 事件触发，找出id是a的父节点
     *   _v._$addEvent(_e._$get("b"),"click",
     *   fucntion(_event){
     *   // 如果不指定过滤接口，返回触发事件的节点本身
     *     var _node = _v._$getElement(_event,function(_ele){
     *       return !!_ele ? _ele.id == "a" : false;
     *     })
     *   },false);
     * [/code]
     * 
     * @api    {nej.v._$getElement}
     * @param  {Event}    事件对象
     * @param  {Function} 过滤接口
     * [ntb]
     *  输入 | Element | 节点
     *  输出 | Boolean | 是否过滤
     * [/ntb]
     * @return {Node}     符合条件的节点
     */
    _v._$getElement = function(_event){
        if (!_event) return null;
        var _element = _event.target||
                       _event.srcElement;
        if (!arguments[1]||
            !_u._$isFunction(arguments[1]))
            return _element;
        while(_element){
            if (!!arguments[1](_element))
                return _element;
            _element = _element.parentNode;
        }
        return null;
    };
    /**
     * 阻止事件，包括默认事件和传递事件
     * 
     * 页面结构举例
     * [code type="html"]
     *   <div id="a">
     *     <a href="xxx.html" id="b">123</a>
     *   </div>
     * [/code]
     * 
     * 脚本举例
     * [code]
     *   var _v = NEJ.P("nej.v"),
     *       _e = NEJ.P("nej.e");
     *   _v._$addEvent(_e._$get("b"),"click",function(_event){
     *     // 节点a不会捕获从节点b冒泡上来的事件，a的默认事件也被阻止了
     *     _v._$stop(_event);
     *   },false)
     * [/code]
     * 
     * @see    {#_$stopBubble}
     * @see    {#_$stopDefault}
     * @api    {nej.v._$stop}
     * @param  {Event} 要阻止的事件对象
     * @return {nej.v}
     */
    _v._$stop = function(_event){
        _v._$stopBubble(_event);
        _v._$stopDefault(_event);
        return this;
    };
    /**
     * 阻止事件的冒泡传递
     * 
     * 页面结构举例
     * [code type="html"]
     *   <div id="a">
     *     <a href="xxx.html" id="b">123</a>
     *   </div>
     * [/code]
     * 
     * 脚本举例
     * [code]
     *   var _v = NEJ.P("nej.v"),
     *       _e = NEJ.P("nej.e");
     *   _v._$addEvent(_e._$get("b"),"click",function(_event){
     *     // 节点a不会捕获从节点b冒泡上来的事件
     *     _v._$stopBubble(_event);
     *   },false)
     * [/code] 
     * 
     * @see    {#_$stop}
     * @api    {nej.v._$stopBubble}
     * @param  {Event} 要阻止的事件对象
     * @return {nej.v}
     */
    _v._$stopBubble = function(_event){
        if (!!_event){
            _event.propagated = !0;
            !!_event.stopPropagation
            ? _event.stopPropagation()
            : _event.cancelBubble = !0;
        } 
        return this;
    };
    /**
     * 阻止标签的默认事件
     * 
     * 页面结构举例
     * [code type="html"]
     *   <div id="a">
     *     <a href="xxx.html" id="b">123</a>
     *   </div>
     * [/code]
     * 
     * 脚本举例
     * [code]
     *   var _v = NEJ.P("nej.v"),
     *       _e = NEJ.P("nej.e");
     *   _v._$addEvent(_e._$get("b"),"click",function(_event){
     *       // a的默认事件也被阻止了
     *        _v._$stopDefault(_event);
     *   },false)
     * [/code]
     * 
     * @see    {#_$stop}
     * @api    {nej.v._$stopDefault}
     * @param  {Event} 要阻止的事件对象
     * @return {nej.v}
     */
    _v._$stopDefault = function(_event) {
        if (!!_event){
            _event.defaulted = !0;
            !!_event.preventDefault
            ? _event.preventDefault()
            : _event.returnValue = !1;
        }
    };
    /**
     * 取事件相对于页面左侧的位置
     * 
     * 页面结构举例
     * [code type="html"]
     *   <div id="abc" style="width:100%;height:100%;">123</div>
     * [/code]
     * 
     * 脚本举例
     * [code]
     *   var _e = NEJ.P("nej.e"),
     *       _v = NEJ.P("nej.v");
     *   _v._$addEvent(_e._$get("abc"),"click",function(_event){
     *       // 获取鼠标事件触发的水平位置
     *       var _x = _v._$pageX(_event);
     *   },false)
     * [/code]
     * 
     * @see    {#_$pageY}
     * @api    {nej.v._$pageX}
     * @param  {Event}    事件对象
     * @return {Number} 水平位置
     */
    _v._$pageX = function(_event){
        return _event.pageX!=null?_event.pageX:(
               _event.clientX+_e._$getPageBox().scrollLeft);
    };
    /**
     * 取事件相对于页面顶部的位置
     * 
     * 页面结构举例
     * [code type="html"]
     *   <div id="abc" style="width:100%;height:100%;">123</div>
     * [/code]
     * 
     * 脚本举例
     * [code]
     *   var _e = NEJ.P("nej.e"),
     *       _v = NEJ.P("nej.v");
     *   _v._$addEvent(_e._$get("abc"),"click",function(_event){
     *       // 获取鼠标事件触发的垂直位置
     *       var _x = _v._$pageY(_event);
     *   },false)
     * [/code]
     * 
     * @see    {#_$pageX}
     * @api    {nej.v._$pageY}
     * @param  {Event}    事件对象
     * @return {Number} 垂直位置
     */
    _v._$pageY = function(_event){
        return _event.pageY!=null?_event.pageY:(
               _event.clientY+_e._$getPageBox().scrollTop);
    };
    /**
     * 触发对象的某个事件
     * 
     * 页面结构举例
     * [code type="html"]
     *   <div id="abc">123</div>
     * [/code]
     * 
     * 脚本举例
     * [code]
     *   var _e = NEJ.P("nej.e"),
     *       _v = NEJ.P("nej.v");
     *   _v._$addEvent(_e._$get("abc"),"click",function(_event){
     *        // 获取鼠标事件触发的垂直位置
     *       var _x = _v._$pageY(_event);
     *   },false);
     *   // 立即触发已注册的事件
     *   _v._$dispatchEvent(_e._$get("abc"),"click");
     * [/code]
     * 
     * @api    {nej.v._$dispatchEvent}
     * @param  {String|Node}    节点ID或者对象
     * @param  {String}          鼠标事件类型
     * @return {nej.v}
     */
    _v._$dispatchEvent = function(_element,_type){
        var _element = _e._$get(_element);
        if (!_element) return this;
        _h.__dispatchEvent(_element,_type);
        return this;
    };
};
define('{lib}base/event.js',
      ['{lib}base/platform.js'
      ,'{lib}base/element.js'
      ,'{lib}base/util.js'
      ,'{patch}api.js'],f);