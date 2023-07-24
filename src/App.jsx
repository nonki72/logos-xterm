import React, { useEffect, useRef } from "react";
import "xterm/css/xterm.css"; // 一定要记得引入css
import { message } from "antd";
import { Terminal } from "xterm";
import { WebLinksAddon } from "xterm-addon-web-links";
import { FitAddon } from "xterm-addon-fit";
import { AttachAddon } from "xterm-addon-attach";
import Interact from "./Client";

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
    term.write("What's on your mind?\r\n");
    var inputText = '';
    term.onData(async (data) => {
      term.write(data);
      console.log(data);
      if (data.charCodeAt(0) === 13) { // enter
        term.write("\r\n");
        const outputString = await Interact(inputText);
        const outputText = '>'+outputString;
        term.write(outputText);
        term.write("\r\n");
        inputText = '';
      } else if (data.charCodeAt(0) === 127) { // backspace
        term.write('\b');
        term.write(' ');
        term.write('\b');
        inputText = inputText.slice(0,inputText.length-1);
      } else {
        inputText = inputText + data;
      }
    });
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
