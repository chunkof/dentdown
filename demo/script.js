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

  //--------
  // bind
  //--------
  // auto run
  $('#src_text').keyup(function(e) {
    autoRun();
  });
  // index type
  $('[name=indent_type]').change(function() {
    var last_type = indent_type;
    indent_type = $('[name=indent_type]').val();
    var indent_str = getIndentStr(indent_type);
    dentdown.config.indent = indent_str;
    tabIndent.config.tab   = indent_str;
  });

  //---------
  // first run
  //---------
  run();
}
(function () {
}());
//-----------
// run
//-----------
function run()
{
  var src = $("#src_text").val();
  var dst_mode =  $("input[name='dst_mode']:checked").val();
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
        $("#dst_text").val(dst);
        activateDstPreview();
      break;
  }
}
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
}
//-----------
// activate dst result
//-----------
function activateDstText()
{
  $("#dst_text").show();
  $("#dst_html").hide();
}
function activateDstPreview()
{
  $("#dst_text").hide();
  $("#dst_html").show();
}
//-----------
// indent
//-----------
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
  console.log("[error]unknown indent type=" + type);
}
