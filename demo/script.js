"use strict";

var dst_mode     = "html";
var dentdown     = new Dentdown();
//-----------
// onLoad
//-----------
function onLoad()
{
  // first run
  var src = $("#initial_src").val();
  $("#src_text").val(src);
  run();

  // bind to auto run
  var need_run = false;
  $('#src_text').keyup(function(e) {
    autoRun();
  });
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
// run
//-----------
function run()
{
  var src = $("#src_text").val();
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
// dst mode
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
function changeDstMode(value)
{
  dst_mode = value;
  run();
}

