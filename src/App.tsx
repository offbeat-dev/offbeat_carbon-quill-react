import React, { useState, useRef } from "react";
import reactLogo from "./assets/react.svg";
import "./App.scss";
import ReactQuill, { Quill } from "react-quill";
import "react-quill/dist/quill.snow.css";
import ReactDOMServer from "react-dom/server";
import {
  ListChecked20,
  ListBulleted20,
  ListNumbered20,
  Undo20,
  Redo20,
  Copy20,
  Cut20,
  Paste20,
  TextBold20,
  TextItalic20,
  TextUnderline20,
  TextIndentMore20,
  TextIndentLess20,
  TextAlignLeft20,
  TextAlignCenter20,
  TextAlignRight20,
  TextAlignJustify20,
} from "@carbon/icons-react";

function copy() {
  document.execCommand("copy");
}

function cut() {
  document.execCommand("cut");
}

function paste() {
  document.execCommand("paste");
}

function undoChange(this: any) {
  this.quill.history.undo();
}

function redoChange(this: any) {
  console.log(this.quill.getContents());
  this.quill.history.redo();
}

const icons = Quill.import("ui/icons");
icons.undo = ReactDOMServer.renderToString(
  <Undo20 aria-label="undo" color="#242424" />
);
icons.redo = ReactDOMServer.renderToString(
  <Redo20 aria-label="redo" color="#242424" />
);
icons.cut = ReactDOMServer.renderToString(
  <Cut20 aria-label="cut" color="#242424" />
);
icons.copy = ReactDOMServer.renderToString(
  <Copy20 aria-label="copy" color="#242424" />
);
icons.paste = ReactDOMServer.renderToString(
  <Paste20 aria-label="paste" color="#242424" />
);
icons.list["ordered"] = ReactDOMServer.renderToString(
  <ListNumbered20 aria-label="ordered list" color="#242424" />
);
icons.list["bullet"] = ReactDOMServer.renderToString(
  <ListBulleted20 aria-label="bullet list" color="#242424" />
);
icons.list["check"] = ReactDOMServer.renderToString(
  <ListChecked20 aria-label="checked list" color="#242424" />
);
icons.bold = ReactDOMServer.renderToString(
  <TextBold20 aria-label="bold" color="#242424" />
);
icons.italic = ReactDOMServer.renderToString(
  <TextItalic20 aria-label="italic" color="#242424" />
);
icons.underline = ReactDOMServer.renderToString(
  <TextUnderline20 aria-label="underline" color="#242424" />
);
icons.align[""] = ReactDOMServer.renderToString(
  <TextAlignLeft20 aria-label="align left" color="#242424" />
);
icons.align["center"] = ReactDOMServer.renderToString(
  <TextAlignCenter20 aria-label="align center" color="#242424" />
);
icons.align["right"] = ReactDOMServer.renderToString(
  <TextAlignRight20 aria-label="align right" color="#242424" />
);
icons.align["justify"] = ReactDOMServer.renderToString(
  <TextAlignJustify20 aria-label="align justify" color="#242424" />
);
icons.indent["+1"] = ReactDOMServer.renderToString(
  <TextIndentMore20 aria-label="Indent" color="#242424" />
);
icons.indent["-1"] = ReactDOMServer.renderToString(
  <TextIndentLess20 aria-label="Outdent" color="#242424" />
);

// Add sizes to whitelist and register them
const Size = Quill.import("formats/size");
Size.whitelist = ["extra-small", "small", "medium", "large"];
Quill.register(Size, true);

// Add fonts to whitelist and register them
const Font = Quill.import("formats/font");
Font.whitelist = [
  "arial",
  "comic-sans",
  "courier-new",
  "georgia",
  "helvetica",
  "lucida",
];
Quill.register(Font, true);

/*
 * Editor component with custom toolbar and content containers
 */
class Editor extends React.Component {
  state = { editorHtml: "" };

  handleChange = (html) => {
    this.setState({ editorHtml: html });
  };

  static modules = {
    toolbar: {
      container: [
        ["undo", "redo"],
        ["cut", "copy", "paste"],
        [{ header: [1, 2, 3, 4, 5, 6, false] }],
        [{ align: ["", "center", "right", "justify"] }],
        ["bold", "italic", "underline"],
        [ { list: "bullet" }, { list: "check" }, { list: "ordered" }],
        [{ indent: "+1" }, { indent: "-1" }]

      ],
      handlers: {
        undo: undoChange,
        redo: redoChange,
        copy: copy,
        cut: cut,
        paste: paste,
      },
      history: {
        userOnly: true, // leaves programmatical changes intact, including init'ing the content
      },
    },
  };

  static formats = [
    "align",
    "header",
    "font",
    "size",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
    "color",
  ];
  static quill: any;

  render() {
    return (
      <div className="text-editor">
        <ReactQuill
          value={this.state.editorHtml}
          onChange={this.handleChange}
          placeholder={this.props.placeholder}
          modules={Editor.modules}
          formats={Editor.formats}
        />
      </div>
    );
  }
}

const App = () => {
  return (
    <div className="App">
      <Editor />
    </div>
  );
};

export default App;
