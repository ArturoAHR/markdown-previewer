import { highlight, languages } from "prismjs";
import "prismjs/components/prism-markdown";
import "prismjs/themes/prism.css"; // Import a PrismJS theme
import { useMemo, useState } from "react";
import Editor from "react-simple-code-editor";

import { useDebounce } from "../../hooks/useDebounce";
import { useMarked } from "../../hooks/useMarked";

import { Select } from "../../components/Select/Select";
import { MarkdownEditorSettings } from "../../types/markdown-editor-settings";
import "./MarkdownPreviewer.css";

export const MarkdownPreviewer = () => {
  const [inputText, setInputText] = useState("");
  const debouncedInputText = useDebounce(inputText, 500);
  const { htmlMarkdown } = useMarked({ inputText: debouncedInputText });

  const [markdownEditorSettings, setMarkdownEditorSettings] =
    useState<MarkdownEditorSettings>({
      fontSize: 14,
      theme: "prism",
    });

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

  const fontSizeOptions = useMemo(() => {
    const baseFontSize = 8;
    const options = [];

    for (let i = 0; i <= 10; i++) {
      const fontSize = baseFontSize + i * 2;

      options.push({
        label: `${fontSize}px`,
        value: fontSize,
      });
    }

    return options;
  }, []);

  const changeEditorSettings = (settings: Partial<MarkdownEditorSettings>) => {
    setMarkdownEditorSettings({
      ...markdownEditorSettings,
      ...settings,
    });
  };

  return (
    <div className="markdown-previewer">
      <div className="markdown-previewer-editor">
        <div className="markdown-previewer-editor-header">
          <div className="markdown-previewer-editor-header-label">
            Introduce your text:
          </div>
          <Select
            className="markdown-previewer-editor-header-select font-size"
            options={fontSizeOptions}
            value={markdownEditorSettings.fontSize}
            onChange={(fontSize) =>
              changeEditorSettings({ fontSize: +fontSize })
            }
          />
        </div>
        <Editor
          className="markdown-previewer-editor-textarea"
          value={inputText}
          onValueChange={(text) => setInputText(text)}
          highlight={(text) => highlight(text, languages.markdown, "")}
          padding={12}
          style={{
            fontSize: markdownEditorSettings.fontSize,
            lineHeight: 1.5,
            overflow: "auto",
          }}
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
