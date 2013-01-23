/*
 * ------------------------------------------
 * 模板管理接口实现文件
 * @version  1.0
 * @author   genify(caijf@corp.netease.com)
 * ------------------------------------------
 */
var f = function(){
    // variable declaration
    var _  = NEJ.P,
        _o = NEJ.O,
        _e = _('nej.e'),
        _v = _('nej.v'),
        _u = _('nej.u'),
        _j = _('nej.j'),
        _t = _('nej.ut'),
        _cache = {}, // template cache
        _skey  = (+new Date)+'-';
    /**
     * 解析模板集合
     * @api    {nej.e._$parseTemplate}
     * @param  {String|Node} 模板集合节点
     * @return {nej.e}
     */
    _e._$parseTemplate = (function(){
        var _count = 0;
        var _doCheckReady = function(){
            if (_count>0) return;
            _count = 0;
            document.ontemplateready();
            _v._$clearEvent(document,'templateready');
        };
        var _doParseSrc = function(_textarea){
            var _src = _e._$dataset(_textarea,'src');
            if (!_src) return;
            var _root = _textarea.ownerDocument.location.href;
            _src = _src.split(',');
            _u._$forEach(_src,
                function(_value,_index,_list){
                    _list[_index] = _u._$absolute(_value,_root);
                });
            return _src;
        };
        var _doAddStyle = function(_textarea){
            if (!_textarea) return;
            var _src = _doParseSrc(_textarea);
            if (!!_src)
                _j._$queueStyle(_src,{version:
                   _e._$dataset(_textarea,'version')});
            _e._$addStyle(_textarea.value);
        };
        var _onAddScript = function(_value){
            _count--;
            _e._$addScript(_value);
            _doCheckReady();
        };
        var _doAddScript = function(_textarea){
            if (!_textarea) return;
            var _src = _doParseSrc(_textarea),
                _val = _textarea.value;
            if (!!_src){
                _count++;
                var _options = {
                        version:_e._$dataset(_textarea,'version'),
                        onloaded:_onAddScript._$bind(null,_val)
                    };
                window.setTimeout(_j._$queueScript._$bind(_j,_src,_options),0);
                return;
            }
            _e._$addScript(_val);
        };
        var _onAddHtml = function(_body){
            _count--;
            _e._$parseTemplate(_body);
            _doCheckReady();
        };
        var _doAddHtml = function(_textarea){
            if (!_textarea) return;
            var _src = _doParseSrc(_textarea)[0];
            if (!!_src){
                _count++;
                var _options = {version:_e._$dataset(
                                        _textarea,'version'),
                                onloaded:_onAddHtml};
                window.setTimeout(_j._$loadHtml._$bind(_j,_src,_options),0);
            }
        };
        var _onAddTextResource = function(_id,_text){
            _count--;
            _e._$addTextTemplate(_id,_text||'');
            _doCheckReady();
        };
        var _doAddTextResource = function(_textarea){
            if (!_textarea||!_textarea.id) return;
            var _id = _textarea.id,
                _src = _doParseSrc(_textarea)[0];
            if (!!_src){
                _count++;
                var _url = _src+(_src.indexOf('?')<0?'?':'&')+
                                (_e._$dataset(_textarea,'version')||''),
                    _options = {type:'text',method:'GET',
                                onload:_onAddTextResource._$bind(null,_id)};
                window.setTimeout(_j._$request._$bind(_j,_url,_options),0);
            }
        };
        var _doAddTemplate = function(_node){
            var _type = _node.name.toLowerCase();
            switch(_type){
                case 'jst':
                    _e._$addHtmlTemplate(_node,!0);
                return;
                case 'txt':
                    _e._$addTextTemplate(_node.id,_node.value||'');
                return;
                case 'ntp':
                    _e._$addNodeTemplate(_node.value||'',_node.id);
                return;
                case 'js':
                    _doAddScript(_node);
                return;
                case 'css':
                    _doAddStyle(_node);
                return;
                case 'html':
                    _doAddHtml(_node);
                return;
                case 'res':
                    _doAddTextResource(_node);
                return;
            }
        };
        // extend ontemplateready event on document
        _t._$$CustomEvent._$allocate({
            element:document
           ,event:'templateready'
           ,oneventadd:function(){
               _doCheckReady();
           }
        });
        return function(_element){
            _element = _e._$get(_element);
            if (!!_element){
                var _list = _element.tagName=='TEXTAREA' ? [_element]
                          : _element.getElementsByTagName('textarea');
                _u._$forEach(_list,_doAddTemplate);
                _e._$remove(_element,!0);
            }
            _doCheckReady();
            return this;
        };
    })();
    /**
     * 添加文本模板
     * @api    {nej.e._$addTextTemplate}
     * @param  {String} 模板键值
     * @param  {String} 模板内容
     * @return {nej.e}
     */
    _e._$addTextTemplate = function(_key,_value){
        _cache[_key] = _value||'';
        return this;
    };
    /**
     * 取文本模板
     * @api    {nej.e._$getTextTemplate}
     * @param  {String} 模板键值
     * @return {String} 模板内容
     */
    _e._$getTextTemplate = function(_key){
        return _cache[_key]||'';
    };
    /**
     * 添加节点模板
     * @api    {nej.e._$addNodeTemplate}
     * @param  {String|Node} 模板
     * @param  {String}      模板序列号
     * @return {String}      模板序列号
     */
    _e._$addNodeTemplate = function(_element,_key){
        _key = _key||_u._$randNumberString();
        _element = _e._$get(_element)||_element;
        _e._$addTextTemplate(_skey+_key,_element);
        _e._$removeByEC(_element);
        return _key;
    };
    /**
     * 取节点模板
     * @api    {nej.e._$getNodeTemplate}
     * @param  {String} 模板序列号
     * @return {Node}   节点模板
     */
    _e._$getNodeTemplate = function(_key){
        if (!_key) return null;
        _key = _skey+_key;
        var _value = _e._$getTextTemplate(_key);
        if (!_value) return null;
        if (_u._$isString(_value)){
            _value = _e._$html2node(_value);
            _e._$addTextTemplate(_key,_value);
        }
        return _value.cloneNode(!0);
    };
    /**
     * 取ITEM模板列表
     * @api    {nej.e._$getItemTemplate}
     * @param  {Array}          数据列表
     * @param  {nej.ui._$$Item} 列表项构造函数
     * @param  {Object}         可选配置参数，已处理参数列表如下，其他参数参见item指定的构造函数的配置参数
     * @config {Number} offset  起始指针【包含】，默认0
     * @config {Number} limit   分配数据长度或者数量，默认为列表长度
     * @return {Array}          ITEM模板列表
     */
    _e._$getItemTemplate = (function(){
        var _doFilter = function(_value,_key){
            return _key=='offset'||_key=='limit';
        };
        return function(_list,_item,_options){
            var _arr = [];
            if (!_list||!_list.length||!_item)
                return _arr;
            _options = _options||_o;
            var _len = _list.length,
                _beg = parseInt(_options.offset)||0,
                _end = Math.min(_len,_beg+(
                       parseInt(_options.limit)||_len)),
                _opt = {total:_list.length,range:[_beg,_end]};
            NEJ.X(_opt,_options,_doFilter);
            for(var i=_beg,_instance;i<_end;i++){
                _opt.index = i;
                _opt.data = _list[i];
                _instance = _item._$allocate(_opt);
                var _id = _instance._$getId();
                _cache[_id] = _instance;
                _instance._$recycle = 
                _instance._$recycle._$aop(
                    function(_event){
                        delete _cache[_id];
                        delete _instance._$recycle;
                    });
                _arr.push(_instance);
            }
            return _arr;
        };
    })();
    /**
     * 根据ID取列表项对象
     * @api    {nej.e._$getItemById}
     * @param  {String} 列表项
     * @return {nej.ui._$$Item} 列表项实例
     */
    _e._$getItemById = function(_id){
        return _cache[_id];
    };
};
define('{lib}util/template/tpl.js',
      ['{lib}util/template/jst.js'
      ,'{lib}util/event/event.js'
      ,'{lib}util/ajax/tag.js'
      ,'{lib}util/ajax/xdr.js'],f);