var input
  , editor;

CodeMirror.modeURL = "/public/vendor/codemirror/mode/%N/%N.js";
function selectMode() {
  var choice = input.options[input.selectedIndex].innerHTML;
  editor.setOption("mode", choice);
  CodeMirror.autoLoadMode(editor, choice);
}

document.addEventListener('DOMContentLoaded',function(){
  input = document.getElementById("select")
  editor = CodeMirror.fromTextArea(document.getElementById("paste"), {
    lineNumbers: true,
    tabMode: "indent",
    theme: "solarized dark",
  });
  selectMode();
});