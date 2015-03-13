// https://github.com/chunkof

function Dentdown(spec) {
  this.initialize(spec);
};

(function () {
"use strict";

var markdown_converter = null;
if (typeof Showdown !== "undefined")
{
  markdown_converter = new Showdown.converter();
}
//---------------
// Dentdown
//---------------
Dentdown.prototype =
{
// Initialize
  initialize:function(spec){
    this.config = [];
    this.config.indent =  "  ";
    this.config.line_feed = "\n";
},
// Public
  toMarkdown:function(src){
    var dst = "";
    var lines = src.split(this.config.line_feed);
    for (var i = 0; i < lines.length; i++ ) {
      var line = lines[i];
      // get param
      var line_info = this._getLineInfo(line);
      // output
      dst += line_info.body + this.config.line_feed;
    }
    
    return dst;
  },
  toHTML:function(src){
    if (null == markdown_converter)
    {
      return "[error]Showdown.js is not loaded. Showdown.js needed to make HTML.";
    }
    var md = this.toMarkdown(src);
    return markdown_converter.makeHtml(md);
  },
// Internal
  _getLineInfo:function(line){
    // parse indent
    var indent_count = 0;
    var stack = "";
    var body  = "";
    for (var i = 0; i < line.length; i++){
      stack += line.charAt(i);
      if (stack.length == this.config.indent.length)
      {
        if (stack == this.config.indent)
        {
          ++indent_count;
          stack = "";
          continue;
        }
        
        break;
      }
    }
    // trim body
    body = line.substring(indent_count*this.config.indent.length);
    
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
