function DentDown(spec) {
    this.initialize(spec);
};

(function () {
"use strict";
//---------------
// DentDown
//---------------
DentDown.prototype =
{
// Initialize
    initialize:function(spec){
        this._s = [];
        this.setSpec(spec);
    },
// Public
    setSpec:function(spec){
        spec = ut.or(spec,[]);
        this._s.indent      = ut.or(spec.indent,    "  ");
        this._s.line_feed   = ut.or(spec.line_feed, "\n");
    },
    convert:function(src){
        var dst = "";
        var lines = src.split(this._s.line_feed);
        for (var i = 0; i < lines.length; i++ ) {
            var line = lines[i];
            // get param
            var line_info = this._getLineInfo(line);
            // convert
            
            // output
            dst += line_info.body + this._s.line_feed;
        }
        
        return dst;
    },
// Internal
    _getLineInfo:function(line){
        // parse indent
        var indent_count = 0;
        var stack = "";
        var body  = "";
        for (var i = 0; i < line.length; i++){
            stack += line.charAt(i);
            if (stack.length == this._s.indent.length)
            {
                if (stack == this._s.indent)
                {
                    ++indent_count;
                    stack = "";
                }
                else
                {
                    body = line.substring(i-1);;
                }
            }
        }
        // parse type
        var index = body.search(/^#/);
        if (-1 != index)
        {
            var tag_s = "<h"  + (indent_count+1) + ">";
            var tag_e = "</h" + (indent_count+1) + ">";
            var value = body.substring(index+2);
            body = tag_s + value + tag_e;
        }
        
        // return result
        return {
            indent_count:indent_count,
            body:body
        };
    },
// end of object
    __end__:true
};

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
};



}());
