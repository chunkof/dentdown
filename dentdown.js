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
    this._ut = ut;
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
    var indent_count = ut.getIndentCount(line, this.config.indent);
    // trim body
    var body = line.substring(indent_count*this.config.indent.length);  
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
// Internal Utility
//---------------
var ut =
{
  repeatStr:function(str, num){
    var ret = "";
    for (var i=0; i<num; ++i){
    ret += str;
    }
    return ret;
  },
  getIndentCount:function(line, indent)
  {
    var indent_count = 0;
    var stack = "";
    for (var i = 0; i < line.length; i++)
    {
      stack += line.charAt(i);
      if (stack.length == indent.length)
      {
        if (stack != indent)
        {
          break;
        }
        ++indent_count;
        stack = "";
      }
    }
    return indent_count;
  },
  // end of object
  __end__:true
};



}());
