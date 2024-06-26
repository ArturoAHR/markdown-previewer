export type MarkdownEditorSettings = {
  fontSize: number;
  theme: MarkdownEditorTheme;
};

export enum MarkdownEditorTheme {
  Prism = "prism",
  Dark = "prism-dark",
  Okaidia = "prism-okaidia",
  SolarizedLight = "prism-solarizedlight",
  Tomorrow = "prism-tomorrow",
  Coy = "prism-coy",
}
