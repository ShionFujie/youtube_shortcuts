setup();

function setup() {
  addListeners();
  injectCSS();
}

function addListeners() {
  // TODO
}

function removeListeners() {
  // TODO
}

function injectCSS() {
  const style = document.createElement("style");
  const css = " ytd-thumbnail #thumbnail:hover { box-sizing: border-box; border-style: solid; border-radius: 2px; border-color: #4285f4; }"
  const styleText = document.createTextNode(css)
  style.id = 'shionfujie.youtube:style'
  style.appendChild(styleText);
  document.getElementsByTagName("head")[0].appendChild(style);
}

function removeCSS() {
  var cssNode = document.getElementById("shionfujie.youtube:style");
  cssNode && cssNode.parentNode.removeChild(cssNode);
}

function teardown() {
  removeListeners();
  removeCSS();
}
