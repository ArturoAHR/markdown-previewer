import { highlight, languages } from "prismjs";
import "prismjs/components/prism-markdown";
import { useEffect, useMemo, useState } from "react";
import Editor from "react-simple-code-editor";

import { useDebounce } from "../../hooks/useDebounce";
import { useMarked } from "../../hooks/useMarked";

import { Select } from "../../components/Select/Select";
import {
  MarkdownEditorSettings,
  MarkdownEditorTheme,
} from "../../types/markdown-editor-settings";
import "./MarkdownPreviewer.css";

export const MarkdownPreviewer = () => {
  const [inputText, setInputText] = useState("");
  const debouncedInputText = useDebounce(inputText, 500);
  const { htmlMarkdown } = useMarked({ inputText: debouncedInputText });

  const [markdownEditorSettings, setMarkdownEditorSettings] =
    useState<MarkdownEditorSettings>({
      fontSize: 16,
      theme: MarkdownEditorTheme.Prism,
    });

  /**
   * Swaps the current link used to load the theme for another one with the theme selected.
   */
  const loadTheme = async (theme: string) => {
    const themeId = "prism-theme-stylesheet";
    const existingLink = document.getElementById(themeId);

    if (existingLink) {
      existingLink.remove();
    }

    const link = document.createElement("link");
    link.id = themeId;
    link.rel = "stylesheet";
    link.href = `themes/${theme}.min.css`;

    document.head.appendChild(link);
  };

  useEffect(() => {
    loadTheme(markdownEditorSettings.theme);
  }, [markdownEditorSettings]);

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
    const options = [8, 10, 12, 14, 16, 18, 20, 22, 24, 32, 40, 48, 72];

    return options.map((option) => ({
      value: option,
      label: `${option}px`,
    }));
  }, []);

  const themeOptions = useMemo(() => {
    return Object.entries(MarkdownEditorTheme).map(([key, value]) => ({
      value,
      label: key,
    }));
  }, []);

  // Background colors for each theme as the Prism themes don't have a background color.
  const themeBackgroundColors = {
    [MarkdownEditorTheme.Prism]: "#f8f8f8",
    [MarkdownEditorTheme.Dark]: "#000",
    [MarkdownEditorTheme.Okaidia]: "#272822",
    [MarkdownEditorTheme.SolarizedLight]: "#fdf6e3",
    [MarkdownEditorTheme.Tomorrow]: "#f8f8f8",
    [MarkdownEditorTheme.Coy]: "#fbf7f3",
  };

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
          <div className="markdown-previewer-editor-header-label">Editor</div>
          <div className="markdown-previewer-editor-header-settings">
            <Select
              className="markdown-previewer-editor-header-select font-size"
              options={fontSizeOptions}
              value={markdownEditorSettings.fontSize}
              onChange={(fontSize) =>
                changeEditorSettings({ fontSize: +fontSize })
              }
            />
            <Select
              className="markdown-previewer-editor-header-select theme"
              options={themeOptions}
              value={markdownEditorSettings.theme}
              onChange={(theme) =>
                changeEditorSettings({ theme: theme as MarkdownEditorTheme })
              }
            />
          </div>
        </div>
        <div className="markdown-previewer-editor-textarea">
          <Editor
            className=""
            value={inputText}
            onValueChange={(text) => setInputText(text)}
            highlight={(text) => highlight(text, languages.markdown, "")}
            padding={12}
            style={{
              fontSize: markdownEditorSettings.fontSize,
              lineHeight: 1.5,
              backgroundColor:
                themeBackgroundColors[markdownEditorSettings.theme],
            }}
          />
        </div>
      </div>
      <div className="markdown-previewer-preview">
        <div className="markdown-previewer-preview-header">
          <div className="markdown-previewer-preview-header-label">Preview</div>
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
