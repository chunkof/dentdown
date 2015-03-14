"use strict";

var dentdown = new Dentdown();
var indent_type = $('[name=indent_type]').val();
var dst_mode   = "preview";
var dst_escape = "-";
//-----------
// onLoad
//-----------
function onLoad()
{
  //--------
  // initialize
  //--------
  var src = $("#initial_src").val();
  $("#src_text").val(src);
  
  var src_text = $("#src_text").get(0);
  tabIndent.render(src_text);
  updateIndent();
  
  //--------
  // bind
  //--------
  // auto run
  $('#src_text').keyup(function(e) {
    autoRun();
  });
  // index type
  $('[name=indent_type]').change(function() {
    updateIndent();
  });

  //---------
  // first run
  //---------
  run();
};
(function () {
}());
//-----------
// run
//-----------
function run()
{
  var src = $("#src_text").val();
  switch (dst_escape)
  {
  case "all":
      src = escapeHTML(src);
      break;
  case "script":
      src = escapeScriptTag(src);
      break;
  }
  switch (dst_mode)
  {
  case "markdown":
      var dst =dentdown.toMarkdown(src);
      $("#dst_text").val(dst);
      activateDstText();
    break;
  case "html":
      var dst =dentdown.toHTML(src);
      $("#dst_text").val(dst);
      activateDstText();
    break;
  case "preview":
      var dst =dentdown.toHTML(src);
      $("#dst_html").html(dst);
      activateDstPreview();
    break;
  }
};
//-----------
// auto run
//-----------
function autoRun()
{
  var check = $("#auto_run").prop('checked');
  if (!check){
    return;
  }
  run();
};
//-----------
// dst mode
//-----------
function chageDst(mode, escape)
{
  dst_mode   = mode;
  dst_escape = escape;
  run();
}
//-----------
// activate dst result
//-----------
function activateDstText()
{
  $("#dst_text").show();
  $("#dst_html").hide();
};
function activateDstPreview()
{
  $("#dst_text").hide();
  $("#dst_html").show();
};
//-----------
// indent
//-----------
function updateIndent()
{
  var last_type = indent_type;
  indent_type = $('[name=indent_type]').val();
  var indent_str = getIndentStr(indent_type);
  dentdown.config.indent = indent_str;
  tabIndent.config.tab   = indent_str;
  if (last_type != indent_type)
  {
    replaceSrcIndent(last_type, indent_type)
  }
  
};
function replaceSrcIndent(old_type, new_type)
{
  var old_str = getIndentStr(old_type);
  var new_str = getIndentStr(new_type);
  if ((undefined == old_str) ||
      (undefined == new_str))
  {
    return;
  }
  var src      = $("#src_text").val();
  var new_src  = "";
  var lines = src.split("\n");
  for (var i = 0; i < lines.length; i++ ) {
    var line = lines[i];
    line = replaceLineIndent(line, old_str, new_str);
    new_src += line + "\n";
  }
  $("#src_text").val(new_src);
};
function replaceLineIndent(line, old_indent, new_indent)
{
  var indent_count = dentdown._ut.getIndentCount(line, old_indent);
  // trim old indent
  line = line.substring(old_indent.length*indent_count);  
  // add new indent
  line = dentdown._ut.repeatStr(new_indent, indent_count) + line;
  return line;
}
function getIndentStr(type)
{
  switch(type){
    case "tab":
      return "	"
    case "2spaces":
      return "  "
    case "4spaces":
      return "    "
  }
  return undefined;
};
//------------
// escape
//------------
function escapeHTML(val) {
      return $('<div />').text(val).html();
};
function escapeScriptTag(val) {
  return val
          .replace(/<script>/g, '&lt;script&gt;')
          .replace(/<\/script>/g, '&lt;\/script&gt;');
};