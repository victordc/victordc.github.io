var blocklyArea = document.getElementById('blocklyArea');
var blocklyDiv = document.getElementById('blocklyDiv');
var workspace = Blockly.inject(blocklyDiv,
    {toolbox: document.getElementById('toolbox')});
var onresize = function(e) {
  // Compute the absolute coordinates and dimensions of blocklyArea.
  var element = blocklyArea;
  var x = 0;
  var y = 0;
  do {
    x += element.offsetLeft;
    y += element.offsetTop;
    element = element.offsetParent;
  } while (element);
  // Position blocklyDiv over blocklyArea.
  blocklyDiv.style.left = x + 'px';
  blocklyDiv.style.top = y + 'px';
  blocklyDiv.style.width = blocklyArea.offsetWidth + 'px';
  blocklyDiv.style.height = blocklyArea.offsetHeight + 'px';
  
  //Restore blocks from localstorage XML
  var xml_text = localStorage.getItem("blockly");
  if (xml_text) {
      xml = Blockly.Xml.textToDom(xml_text);
      Blockly.Xml.domToWorkspace(xml, workspace);
  };
};
window.addEventListener('resize', onresize, false);
onresize();
Blockly.svgResize(workspace);

function updateFunctions(event) {
	//Reflect the source code on the right
	var code = Blockly.JavaScript.workspaceToCode(workspace);
	document.getElementById('sourceArea').value = code;

	//Store blocks locally as XML
	var xml = Blockly.Xml.workspaceToDom(workspace);
    var xml_text = Blockly.Xml.domToText(xml);
    localStorage.setItem("blockly", xml_text);
}
workspace.addChangeListener(updateFunctions);

var btnClear = document.getElementById('clrOption');
btnClear.addEventListener('click', function () {
	Blockly.mainWorkspace.clear();	
});