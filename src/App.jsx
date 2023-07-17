import React, { useEffect, useRef } from "react";
import "xterm/css/xterm.css"; // 一定要记得引入css
import { message } from "antd";
import { Terminal } from "xterm";
import { WebLinksAddon } from "xterm-addon-web-links";
import { FitAddon } from "xterm-addon-fit";
import { AttachAddon } from "xterm-addon-attach";
import interact from "./interact";

var inputText = null;
function inputFunction() {
  return inputText;
}

const App = (props) => {
  const divRef = useRef(null);

  const initTerminal = () => {
    const term = new Terminal({
      rendererType: "canvas", // 渲染类型
      convertEol: true,
      cursorBlink: true, // 光标闪烁
      cursorStyle: "block" // 光标样式
    });
    const webLinksAddon = new WebLinksAddon();
    const fitAddon = new FitAddon();
    term.loadAddon(webLinksAddon);
    term.loadAddon(fitAddon);
    term.open(divRef.current);
    fitAddon.fit();
    term.write("What's on your mind?");
    var inputText = '';
    term.onKey(({ key, domEvent }) => {
      term.write(key);
      console.log(key);
      inputText = inputText + key;

      if (domEvent.keyCode === 13) {
        term.write("\r\n");
        term.write(inputText);
        console.log(inputText);
        //interact.interact(inputFunction, term.write);
        inputText = '';
      }
    });

    term.textarea.onkeypress = function (e) {
      console.log(e);
      term.write(String.fromCharCode(e.keyCode));
    };
  };

  useEffect(() => {
    initTerminal();
  }, [props.namespace, props.pod_Name, props.container_Name]);

  return (
    <div
      style={{ marginTop: 10, marginLeft: 20, width: 760, height: 500 }}
      ref={divRef}
    />
  );
};
export default App;