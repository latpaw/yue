/*
 * ------------------------------------------
 * 分页器控件基类封装实现文件
 * @version  1.0
 * @author   genify(caijf@corp.netease.com)
 * ------------------------------------------
 */
var f = function(){
    // variable declaration
    var _  = NEJ.P,
        _o = NEJ.O,
        _r = NEJ.R,
        _e = _('nej.e'),
        _u = _('nej.u'),
        _p = _('nej.ui'),
        _proAbstractPager;
    if(!!_p._$$AbstractPager) return;
    /**
     * 分页器控件基类封装
     * @class   {nej.ui._$$AbstractPager} 分页器控件封装
     * @extends {nej.ui._$$Abstract}
     * @param   {Object} 可选配置参数，已处理参数列表如下
     * @config  {Number} index 当前页码
     * @config  {Number} total 总页码数
     * 
     * [hr]
     * 
     * @event  {onchange} 页码切换事件，输入{last:3,index:1,total:12}
     * @param  {Object} 页码状态对象
     * @config {Number} last  上一次的页码
     * @config {Number} index 当前要切换的页面
     * @config {Number} total  总页面数
     * 
     */
    _p._$$AbstractPager = NEJ.C();
      _proAbstractPager = _p._$$AbstractPager._$extend(_p._$$Abstract);
    /**
     * 初始化
     * @protected
     * @method {__init}
     * @return {Void}
     */
    _proAbstractPager.__init = function(){
        this.__popt = {onchange:this.__onChange._$bind(this)};
        this.__supInit();
    };
    /**
     * 控件重置
     * @protected
     * @method {__reset}
     * @param  {Object} 可选配置参数
     * @return {Void}
     */
    _proAbstractPager.__reset = function(_options){
        this.__supReset(_options);
        this.__popt.total = _options.total;
        this.__popt.index = _options.index;
    };
    /**
     * 控件销毁
     * @protected
     * @method {__destroy}
     * @return {Void}
     */
    _proAbstractPager.__destroy = function(){
        this.__supDestroy();
        this.__page = this
            .__page._$recycle();
        this._$unbind();
    };
    /**
     * 页面变化触发事件
     * @protected
     * @method {__onChange}
     * @param  {Object} 事件对象
     * @return {Void}
     */
    _proAbstractPager.__onChange = function(_event){
        if (this.__flag) return;
        var _index = _event.index,
            _total = _event.total;
        // sync pagers
        this.__flag = !0;
        this._$updatePage(_index,_total);
        _u._$forEach(this.__binders,
            function(_pager){
                _pager._$updatePage(_index,_total);
            });
        this.__flag = !1;
        this._$dispatchEvent('onchange',_event);
    };
    /**
     * 绑定联动分页器
     * @method {_$bind}
     * @param  {String|Node} 联动分页器父容器
     * @return {nej.ui._$$AbstractPager}
     */
    _proAbstractPager._$bind = function(_parent){
        _parent = _e._$get(_parent);
        if (!_parent) return this;
        var _pager = this.constructor._$allocate({
            parent:_parent,
            index:this._$getIndex(),
            total:this._$getTotal()
        });
        _pager._$setEvent('onchange',
               this.__popt.onchange);
        if (!this.__binders) 
             this.__binders = [];
        this.__binders.push(_pager);
        return this;
    };
    /**
     * 解除联动分页器
     * @method {_$unbind}
     * @return {nej.ui._$$AbstractPager}
     */
    _proAbstractPager._$unbind = (function(){
        var _doRemove = function(_pager,_index,_list){
            _pager._$recycle();
            _list.splice(_index,1);
        };
        return function(){
            _u._$reverseEach(this.__binders,_doRemove);
        };
    })();
    /**
     * 跳转至指定页码
     * @method {_$setIndex}
     * @param  {Number} 页码
     * @return {nej.ui._$$AbstractPager}
     */
    _proAbstractPager._$setIndex = function(_index){
        if (!this.__page) return;
        this.__page._$setIndex(_index);
    };
    /**
     * 取当前页码
     * @method {_$getIndex}
     * @return {Number} 当前页码 
     */
    _proAbstractPager._$getIndex = function(){
        if (!this.__page) return 1;
        return this.__page._$getIndex();
    };
    /**
     * 取总页数
     * @method {_$getTotal}
     * @return {Number} 总页数
     */
    _proAbstractPager._$getTotal = function(){
        if (!this.__page) return 1;
        return this.__page._$getTotal();
    };
    /**
     * 更新页码信息
     * @method {_$updatePage}
     * @param  {Number} 当前页码
     * @param  {Number} 总页码数
     * @return {nej.ui._$$AbstractPager}
     */
    _proAbstractPager._$updatePage = function(_index,_total){
        if (!this.__page) return;
        this.__page._$updatePage(_index,_total);
    };
};
define('{lib}ui/pager/pager.base.js',
      ['{lib}ui/base.js'],f);