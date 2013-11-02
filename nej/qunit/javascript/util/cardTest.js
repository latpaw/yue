var f = function(){
    var _  = NEJ.P,
        _e = _('nej.e'),
        _v = _('nej.v'),
        _i = _('nej.ui.cmd');
    _fopt = {
        parent:_e._$get('card-parent')
    }
    var _f = function(_event){
        if(this.__card)
            this.__card = _i._$$FontSizeCard._$recycle(this.__card);
        _v._$stop(_event);
        this.__card = _i._$$FontSizeCard._$allocate(_fopt);
        this.__card._$showByReference({
            event:_event,
            target: this.__card.__body,
            fitable: true
        });
    };
    var _point = _e._$get('card-parent');
    _v._$addEvent(_point,'click',_f);
    
}
define('{pro}cardTest.js',['{lib}util/editor/command/fontsize.js'],f);
  