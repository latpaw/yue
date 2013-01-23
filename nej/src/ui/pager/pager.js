/*
 * ------------------------------------------
 * 分页器控件封装实现文件
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
        _t = _('nej.ut'),
        _p = _('nej.ui'),
        _proPager;
    if(!!_p._$$Pager) return;
    // ui css text
    var _seed_css = _e._$pushCSSText('\
        .#<uispace>{font-size:12px;line-height:160%;}\
        .#<uispace> a{margin:0 2px;padding:2px 8px;color:#333;border:1px solid #aaa;text-decoration:none;}\
        .#<uispace> .js-disabled{cursor:default;}\
        .#<uispace> .js-selected{background:#bbb;}');
    var _seed_page = _e._$addHtmlTemplate('\
        {if !defined("noprv")||!noprv}\
        <a href="#" class="zbtn zprv ${\'js-p-\'|seed}">上一页</a>\
        {/if}\
        {list 1..number as x}\
        <a href="#" class="zpgi zpg${x} ${\'js-i-\'|seed}"></a>\
        {/list}\
        {if !defined("nonxt")||!nonxt}\
        <a href="#" class="zbtn znxt ${\'js-n-\'|seed}">下一页</a>\
        {/if}');
    // ui html code
    var _seed_html;
    /**
     * 分页器控件封装
     * @class   {nej.ui._$$Pager} 分页器控件封装
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
    _p._$$Pager = NEJ.C();
      _proPager = _p._$$Pager._$extend(_p._$$AbstractPager);
    /**
     * 控件重置
     * @protected
     * @method {__reset}
     * @param  {Object} 可选配置参数
     * @return {Void}
     */
    _proPager.__reset = function(_options){
        this.__supReset(_options);
        this.__page = _t._$$Page._$allocate(this.__popt);
    };
    /**
     * 初始化外观信息
     * @protected
     * @method {__initXGui}
     * @return {Void}
     */
    _proPager.__initXGui = function(){
        this.__seed_css  = _seed_css;
        this.__seed_html = _seed_html;
    };
    /**
     * 初始化节点
     * @protected
     * @method {__initNode}
     * @return {Void}
     */
    _proPager.__initNode = function(){
        this.__supInitNode();
        var _seed = _e._$getHtmlTemplateSeed();
        this.__popt.list =  _e._$getByClassName
                           (this.__body,'js-i-'+_seed);
        this.__popt.pbtn = (_e._$getByClassName
                           (this.__body,'js-p-'+_seed)||_r)[0];
        this.__popt.nbtn = (_e._$getByClassName
                           (this.__body,'js-n-'+_seed)||_r)[0];
    };
    /**
     * 动态构建控件节点模板
     * @protected
     * @method {__initNodeTemplate}
     * @return {Void}
     */
    _proPager.__initNodeTemplate = function(){
        _seed_html = _e._$addNodeTemplate(
                     '<div class="'+this.__seed_css+'">'
                     +this.__doGenPageListXhtml({number:9})+
                     '</div>');
        this.__seed_html = _seed_html;
    };
    /**
     * 生成页码列表html代码
     * @protected
     * @method {__doGenPageListXhtml}
     * @param  {Object} 页码列表信息
     * @return {String} 页码列表html代码
     */
    _proPager.__doGenPageListXhtml = function(_data){
        return _e._$getHtmlTemplate(_seed_page,_data);
    };
};
define('{lib}ui/pager/pager.js',
      ['{lib}ui/pager/pager.base.js'
      ,'{lib}util/page/page.js'],f);