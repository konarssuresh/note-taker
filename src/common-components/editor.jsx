// ...existing code...
import { useRef, useEffect } from "react";

const domToValue = (el) => {
  if (!el) return "";
  let out = "";

  const traverse = (node) => {
    node.childNodes.forEach((child) => {
      if (child.nodeType === Node.TEXT_NODE) {
        out += child.nodeValue;
      } else if (child.nodeType === Node.ELEMENT_NODE) {
        const tag = child.tagName;
        if (tag === "BR") {
          out += "\n";
        } else if (tag === "DIV" || tag === "P") {
          // block-level created by Enter — traverse its children then append newline
          traverse(child);
          out += "\n";
        } else {
          // inline/other elements
          traverse(child);
        }
      }
    });
  };

  traverse(el);

  // If last child was a block element we added a trailing newline above; remove it
  const last = el.lastChild;
  if (
    last &&
    last.nodeType === Node.ELEMENT_NODE &&
    (last.tagName === "DIV" || last.tagName === "P") &&
    out.endsWith("\n")
  ) {
    out = out.slice(0, -1);
  }

  return out;
};

const renderValueToDom = (el, value) => {
  const desired = value ?? "";
  // avoid touching DOM if it's already representing the same value
  if (domToValue(el) === desired) return;

  // build nodes without using innerHTML
  const frag = document.createDocumentFragment();
  const lines = desired.split("\n");
  lines.forEach((line, idx) => {
    frag.appendChild(document.createTextNode(line));
    if (idx !== lines.length - 1) {
      frag.appendChild(document.createElement("br"));
    }
  });

  // replace children
  while (el.firstChild) el.removeChild(el.firstChild);
  el.appendChild(frag);
};

const Editor = ({ value, onChange, className = "" }) => {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    renderValueToDom(el, value ?? "");
  }, [value]);

  const handleInput = () => {
    const el = ref.current;
    if (!el) return;
    const newValue = domToValue(el);
    onChange({ target: { value: newValue } });
  };

  return (
    <div
      ref={ref}
      className={`px-1 text-preset-5 text-neutral-800 ${className}`}
      contentEditable={true}
      suppressContentEditableWarning={true}
      role="textbox"
      aria-multiline="true"
      onInput={handleInput}
      onBlur={handleInput}
    />
  );
};

export default Editor;
