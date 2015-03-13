function Dentdown(spec) {
  this.initialize(spec);
};

(function () {
"use strict";
//---------------
// Dentdown
//---------------
Dentdown.prototype =
{
// Initialize
  initialize:function(spec){
    this._s = [];
    this.setSpec(spec);
  },
// Public
  setSpec:function(spec){
    spec = ut.or(spec,[]);
    this._s.indent    = ut.or(spec.indent,  "  ");
    this._s.line_feed   = ut.or(spec.line_feed, "\n");
  },
  toMarkdown:function(src){
    var dst = "";
    var lines = src.split(this._s.line_feed);
    for (var i = 0; i < lines.length; i++ ) {
      var line = lines[i];
      // get param
      var line_info = this._getLineInfo(line);
      // output
      dst += line_info.body + this._s.line_feed;
    }
    
    return dst;
  },
  toHTML:function(src){
    var md = this.toMarkdown(src);
    
    return markdown.toHTML(md);
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
          continue;
        }
        
        break;
      }
    }
    // trim body
    body = line.substring(indent_count*this._s.indent.length);
    
    // parse type
    var exist_h = body.search(/^#/);
    if (-1 != exist_h)
    {
      var mark  = ut.repeatStr("#",indent_count);
      body = mark + body;
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
  repeatStr:function(str, num){
    var ret = "";
    for (var i=0; i<num; ++i){
    ret += str;
    }
    return ret;
  },
// end of object
  __end__:true
};



}());
