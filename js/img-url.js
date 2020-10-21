setup();

function setup() {
  addListeners();
  injectCSS();
}

function teardown() {
  removeListeners();
  removeCSS();
}

function addListeners() {
  for (const el of document.querySelectorAll("ytd-thumbnail")) {
    el.addEventListener("click", extractURL);
  }
}

function removeListeners() {
  for (const el of document.querySelectorAll("ytd-thumbnail")) {
    el.removeEventListener("click", extractURL);
  }
}

function extractURL(e) {
  e.preventDefault();
  e.stopPropagation();
  var el = e.target;
  // Look up the container anchor
  while (el.tagName != "A") {
    el = el.parentElement;
  }
  const newClip = el.querySelector("yt-img-shadow #img").src;
  navigator.clipboard.writeText(newClip);
  teardown();
}

function injectCSS() {
  const style = document.createElement("style");
  const css =
    " ytd-thumbnail #thumbnail:hover { box-sizing: border-box; border-style: solid; border-radius: 2px; border-color: #4285f4; }";
  const styleText = document.createTextNode(css);
  style.id = "shionfujie.youtube:style";
  style.appendChild(styleText);
  document.getElementsByTagName("head")[0].appendChild(style);
}

function removeCSS() {
  var cssNode = document.getElementById("shionfujie.youtube:style");
  cssNode && cssNode.parentNode.removeChild(cssNode);
}
