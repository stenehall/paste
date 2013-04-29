var editor = CodeMirror.fromTextArea(document.getElementById("paste"), {
  lineNumbers: true,
  tabMode: "indent",
  theme: "solarized dark",
});

CodeMirror.modeURL = "/public/vendor/codemirror/mode/%N/%N.js";

var input = document.getElementById("select");
function selectMode() {
  var choice = input.options[input.selectedIndex].innerHTML;
  editor.setOption("mode", choice);
  CodeMirror.autoLoadMode(editor, choice);
}
selectMode();