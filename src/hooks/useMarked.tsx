import { marked } from "marked";
import { useMemo } from "react";
import { useSanitizeHtml } from "./useSanitizeHTML";

type UseMarkedProps = {
  inputText: string;
};

export const useMarked = ({ inputText }: UseMarkedProps) => {
  const { sanitize } = useSanitizeHtml();

  const htmlMarkdown = useMemo(() => {
    const parsedMarkdown = marked(inputText) as string;

    return sanitize(parsedMarkdown);
  }, [inputText, sanitize]);

  return { htmlMarkdown };
};
