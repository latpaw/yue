var f = function(){
    var _  = NEJ.P,
        _f = NEJ.F,
        _u = _('nej.u'),
        _e = _('nej.e'),
        _p = _('nej.ut'),
        _j = _('nej.j'),
        _proCacheListCustom,
        _supCacheListCustom;
    _p._$$CacheListCustom = NEJ.C();
    _proCacheListCustom = _p._$$CacheListCustom._$extend(_p._$$AbstractListCache);
    _supCacheListCustom = _proCacheListCustom._$supro;
	
	_proCacheListCustom.__doLoadList = function(_options){
		var _key    = _options.key;
		var _data   = _options.data;
		var _offset = _options.offset;
		var _limit  = _options.limit;
		var _rkey   = _options.rkey;
		var _onload = _options.onload;
		_j._$request('http://123.163.com:3000/xhr/getLog',{
                type:'json',
                method:'POST',
                data:{offset:_offset,limit:_limit},
                timeout:1000,
                onload:_onload._$bind(this),
                onerror:function(_error){}
            }
        );
	};
	
	_proCacheListCustom.__doLoadItem = function(_options){
        var _id     = _options.id;
        var _key    = _options.key;
        var _rkey   = _options.rkey;
        var _onload = _options.onload;
        _j._$request('http://123.163.com:3000/xhr/getLog',{
                type:'json',
                method:'POST',
                data:{rkey:_rkey},
                timeout:1000,
                onload:_onload._$bind(this),
                onerror:function(_error){}
            }
        );
    };
	
    // todo
	_proCacheListCustom.__doAddItem = function(){
        
    };
	
	// todo
	_proCacheListCustom.__doDeleteItem = function(){
        
    };
	
	// todo
	_proCacheListCustom.__doUpdateItem = function(){
        
    };
    
}
define('{pro}util/cache.list.custom.js',['{lib}util/cache/cache.list.base.js'],f);

