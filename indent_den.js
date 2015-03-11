function IndentDen(spec){
    this.initialize(spec);
};

(function() {
"use strict";

//---------------
// IndentDen
//---------------
IndentDen.prototype =
{
// Initialize
    initialize:function(spec){
        this.setSpec(spec);
    },
// Public
    setSpec:function(spec){
        spec = ut.or(spec,[]);
        this._indent = ut.or(spec.indent, "  ");
    },
    convert:function(src){
        return src+"!";
    },
// Internal
    
// end of object
    __end__:true
}

//---------------
// Local Utility
//---------------
var ut =
{
    or:function(spec, default_spec){
        if (typeof spec === "undefined") {
            return default_spec;
        }
        return spec;
    },
// end of object
    __end__:true
}



}());
