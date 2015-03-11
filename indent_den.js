function IndentDen(spec){
    this.initialize(spec);
};

(function() {
"use strict";
IndentDen.prototype =
{
// Initialize
    initialize:function(spec){
        this.setSpec(spec);
    },
// Public
    setSpec:function(spec){
        
    },
    convert:function(src){
        return src+"!";
    },
// Internal
    
// Utility
    _or:function(spec, default_spec){
        if (typeof spec === "undefined") {
            return default_spec;
        }
        return spec;
    },
// end of object
    __end:true
}


}());
