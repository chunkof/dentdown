"use strict";

var dentdown = new Dentdown();
var indent_type = $('[name=indent_type]').val();
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
  var dst_mode =  $("input[name='dst_mode']:checked").val();
  
  if (("html_esc"    == dst_mode) ||
      ("preview_esc" == dst_mode))
  {
    src = escapeHTML(src);
  }
  switch (dst_mode)
  {
    case "markdown":
        var dst =dentdown.toMarkdown(src);
        $("#dst_text").val(dst);
        activateDstText();
      break;
    case "html":
    case "html_esc":
        var dst =dentdown.toHTML(src);
        $("#dst_text").val(dst);
        activateDstText();
      break;
    case "preview":
    case "preview_esc":
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
{/*
  var last_type = indent_type;
  indent_type = $('[name=indent_type]').val();
  var indent_str = getIndentStr(indent_type);
  dentdown.config.indent = indent_str;
  tabIndent.config.tab   = indent_str;
  if (last_type != indent_type)
  {
    replaceSrcIndent(last_type, indent_type)
  }
  */
};
function replaceSrcIndent(old_type, new_type)
{
  var old_str = getIndentStr(old_type);
  var new_str = getIndentStr(new_type);
  var src = $("#src_text").val();
 // while(-1 != str.indexOf(old_str, 0)){
  //  src = src.replace(old_str, new_str);
//  }
  $("#src_text").val(src);
};
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
function escapeHTML(val) {
      return $('<div />').text(val).html();
};
