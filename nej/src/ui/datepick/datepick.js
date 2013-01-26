/*
 * ------------------------------------------
 * 日期选择控件实现文件
 * @version  1.0
 * @author   genify(caijf@corp.netease.com)
 * ------------------------------------------
 */
var f = function(){
    var _  = NEJ.P,
        _o = NEJ.O,
        _e = _('nej.e'),
        _u = _('nej.u'),
        _t = _('nej.ut'),
        _p = _('nej.ui'),
        _proDatePick,
        _supDatePick;
    if(!!_p._$$DatePick) return;
    // ui css text
    var _seed_css = _e._$pushCSSText('\
        .#<uispace>{width:210px;border:1px solid #aaa;font-size:14px;text-align:center;}\
        .#<uispace> .zact{line-height:30px;overflow:hidden;zoom:1;}\
        .#<uispace> .zact .zfl{float:left;}\
        .#<uispace> .zact .zfr{float:right;}\
        .#<uispace> .zact .zbtn{padding:0 5px;cursor:pointer;}\
        .#<uispace> .zact .ztxt{margin-left:10px;}\
        .#<uispace> .zday{table-layout:fixed;border-collapse:collapse;width:100%;}\
        .#<uispace> .zday a{display:block;height:22px;line-height:22px;color:#333;text-decoration:none;}\
        .#<uispace> .zday a:hover{background:#eee;}\
        .#<uispace> .zday a.js-extended{color:#aaa;}\
        .#<uispace> .zday a.js-selected,\
        .#<uispace> .zday a.js-selected:hover{background:#DAE4E7;}\
        .#<uispace> .zday a.js-disabled,\
        .#<uispace> .zday a.js-disabled:hover{background:#fff;color:#eee;cursor:default;}');
    // ui date html
    var _seed_date = _e._$addHtmlTemplate('\
        <table class="zday">\
          <tr>{list ["日","一","二","三","四","五","六"] as x}<td>${x}</td>{/list}</tr>\
        {list 1..6 as x}\
          <tr>{list 1..7 as y}<td><a href="#" class="js-ztag"></a></td>{/list}</tr>\
        {/list}\
        </table>');
    // ui html code
    var _seed_html;
    /**
     * 日期选择控件
     * @class   {nej.ui._$$DatePick} 日期选择控件
     * @extends {nej.ui._$$CardWrapper}
     * @param   {Object} 可选配置参数，已处理参数列表如下
     * @config  {Date}  date  设置日期
     * @config  {Array} range 可选范围
     * 
     * [hr]
     * 
     * @event  {onchange} 日期变化触发事件
     * @param  {Date} 日期
     * 
     */
    _p._$$DatePick = NEJ.C();
      _proDatePick = _p._$$DatePick._$extend(_p._$$CardWrapper);
      _supDatePick = _p._$$DatePick._$supro;
    /**
     * 控件初始化
     * @protected
     * @method {__init}
     * @return {Void}
     */
    _proDatePick.__init = function(){
        this.__copt = {
            onselect:this.__onDateChange._$bind(this)
        };
        this.__supInit();
    };
    /**
     * 控件重置
     * @protected
     * @method {__reset}
     * @param  {Object} 可选配置参数
     * @return {Void}
     */
    _proDatePick.__reset = function(_options){
        this.__supReset(_options);
        this.__copt.range = _options.range;
        this.__calendar = _t._$$Calendar
                            ._$allocate(this.__copt);
        this._$setDate(_options.date||(new Date()));
    };
    /**
     * 控件销毁
     * @protected
     * @method {__destroy}
     * @return {Void}
     */
    _proDatePick.__destroy = function(){
        this.__supDestroy();
        if (!!this.__calendar){
            this.__calendar._$recycle();
            delete this.__calendar;
        }
        delete this.__copt.range;
    };
    /**
     * 初始化外观信息
     * @protected
     * @method {__initXGui}
     * @return {Void}
     */
    _proDatePick.__initXGui = function(){
        this.__seed_css  = _seed_css;
        this.__seed_html = _seed_html;
    };
    /**
     * 初始化节点
     * @protected
     * @method {__initNode}
     * @return {Void}
     */
    _proDatePick.__initNode = function(){
        this.__supInitNode();
        var _list = _e._$getChildren(this.__body);
        this.__copt.list = _e._$getByClassName(_list[1],'js-ztag');
        _list = _e._$getChildren(_list[0]);
        this.__copt.yprv = _list[0];
        this.__copt.mprv = _list[1];
        this.__copt.ynxt = _list[2];
        this.__copt.mnxt = _list[3];
        this.__copt.year = _list[4];
        this.__copt.month= _list[5];
    };
    /**
     * 动态构建控件节点模板
     * @protected
     * @method {__initNodeTemplate}
     * @return {Void}
     */
    _proDatePick.__initNodeTemplate = function(){
        _seed_html = _e._$addNodeTemplate(
            '<div class="'+_seed_css+' zcard">\
               <div class="zact">\
                 <span class="zbtn zfl" title="上一年">&lt;&lt;</span>\
                 <span class="zbtn zfl" title="上一月">&lt;</span>\
                 <span class="zbtn zfr" title="下一年">&gt;&gt;</span>\
                 <span class="zbtn zfr" title="下一月">&gt;</span>\
                 <span class="ztxt"></span>年\
                 <span class="ztxt"></span>月\
               </div>\
               '+_e._$getHtmlTemplate(_seed_date)+'\
             </div>'
        );
        this.__seed_html = _seed_html;
    };
    /**
     * 日期变化回调函数
     * @protected
     * @method {__onDateChange}
     * @param  {Date} 日期
     * @return {Void}
     */
    _proDatePick.__onDateChange = function(_date){
        try{
            this._$dispatchEvent('onchange',_date);
        }catch(e){
            // ignore
        }
        this._$hide();
    };
    /**
     * 设置日期
     * @method {_$setDate}
     * @param  {Date} 日期
     * @return {nej.ui._$$DatePick}
     */
    _proDatePick._$setDate = function(_date){
        _date = _u._$var2date(_date);
        this.__calendar._$setDate(_date);
        return this;
    };
    /**
     * 取当前时间
     * @method {_$getDate}
     * @return {Date} 日期
     */
    _proDatePick._$getDate = function(){
        return this.__calendar._$getDate();
    };
};
define('{lib}ui/datepick/datepick.js',
      ['{lib}ui/layer/card.wrapper.js'
      ,'{lib}util/calendar/calendar.js'],f);