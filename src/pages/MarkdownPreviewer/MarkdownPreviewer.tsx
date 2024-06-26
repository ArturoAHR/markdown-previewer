import { useState } from "react";
import { useDebounce } from "../../hooks/useDebounce";
import { useMarked } from "../../hooks/useMarked";

import "./MarkdownPreviewer.css";

export const MarkdownPreviewer = () => {
  const [inputText, setInputText] = useState("");
  const debouncedInputText = useDebounce(inputText, 500);
  const { htmlMarkdown } = useMarked({ inputText: debouncedInputText });

  const downloadMarkdownHtml = () => {
    const element = document.createElement("a");
    const file = new Blob([htmlMarkdown.__html], { type: "text/html" });

    element.href = URL.createObjectURL(file);
    element.download = "markdown.html";

    document.body.appendChild(element);

    element.click();

    URL.revokeObjectURL(element.href);
    document.body.removeChild(element);
  };

  return (
    <div className="markdown-previewer">
      <div className="markdown-previewer-editor">
        <div className="markdown-previewer-editor-label">
          Introduce your text:
        </div>
        <textarea
          className="markdown-previewer-editor-textarea"
          placeholder="Enter some markdown"
          onChange={(e) => setInputText(e.target.value)}
        />
      </div>
      <div className="markdown-previewer-preview">
        <div className="markdown-previewer-preview-header">
          <div className="markdown-previewer-preview-header-label">
            Preview:
          </div>
          <button
            className="markdown-previewer-preview-header-button download"
            onClick={downloadMarkdownHtml}
          >
            Export
          </button>
        </div>
        <div
          className="markdown-previewer-preview-html"
          dangerouslySetInnerHTML={htmlMarkdown}
        ></div>
      </div>
    </div>
  );
};
