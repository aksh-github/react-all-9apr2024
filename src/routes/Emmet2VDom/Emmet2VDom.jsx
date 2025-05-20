import { useState } from "react";
import "./styles.css";
import expand from "emmet";
import Editor from "react-simple-code-editor";
import { highlight, languages } from "prismjs/components/prism-core";
import "prismjs/components/prism-clike";
import "prismjs/components/prism-javascript";
// import "prismjs/components/prism-cshtml";
import "prismjs/themes/prism.css"; //Example style, you can use another
import { loadLanguages } from "prismjs/components/";
// loadLanguages(["html"]);

let str = `
  .chat-container

    >(header
      >div{Room: {props.room}}
    )
    (.char-row
      >.messages
        >For[custom='{"each":"{@g.messages}", "as":"div"}']
          >div
            >.me.w3-animate-bottom
              >span{{@l.message}}
            ^.other.w3-animate-top
              >p{{@l.from}}
              +span{{@l.message}}
    )

    (footer
      >textarea[name="txtmsg" rows=8 placeholder="Type your message..."]
      +button
        >div.wrapper{✈️}
    )
  `;

let json = {
  $: ".chat-container",
  ch: [
    {
      $: "header",
      ch: [
        {
          $: "div",
          ch: ["Room: {props.room}"],
        },
      ],
    },
  ],
  ".chat-container": [
    {
      header: [
        {
          div: ["Room: {props.room}"],
        },
      ],
    },
  ],
};

function cleanup(str) {
  let arr = str.split("\n");
  // console.log(arr);

  let narr = [];

  arr.forEach((line) => {
    narr.push(line?.trim());
  });

  str = narr.join("");

  // str = str.replace("\n", ">");
  str = str.replace("\t", "");
  return str.trim();
}

export default function Emmet2VDom() {
  const [txt, setTxt] = useState(str);
  const [input, setInput] = useState(cleanup(txt));
  // const [output, setOutput] = useState("");

  return (
    <div className="emmetvdom-page">
      <div className="col">
        {/* <textarea
          onChange={(e) => {
            setTxt(e.target.value);
          }}
          name=""
          id=""
          value={txt}
        ></textarea> */}
        <Editor
          value={txt}
          onValueChange={(txt) => {
            setTxt(txt);
            // setInput(cleanup(txt));
          }}
          highlight={(txt) => highlight(txt, languages.js)}
          padding={10}
          style={{
            fontFamily: '"Fira txt", "Fira Mono", monospace',
            fontSize: 16,
          }}
        />
        <div>
          <button onClick={() => setInput(cleanup(txt))}>Gen</button>
        </div>
      </div>
      <div className="col output">
        <div>Final Emmet string: {cleanup(txt)}</div>
        {/* <hr />
        <div>{expand(input)}</div> */}
        <hr />
        <Editor
          value={expand(input)}
          // onValueChange={(txt) => {
          //   setTxt(txt);
          //   // setInput(cleanup(txt));
          // }}
          highlight={(txt) => highlight(txt, languages.html)}
          padding={10}
          style={{
            fontFamily: '"Fira txt", "Fira Mono", monospace',
            fontSize: 16,
          }}
        />
      </div>
    </div>
  );
}
