import sanitizeHtml from "sanitize-html";

export const useSanitizeHtml = () => {
  const defaultOptions = {
    allowedTags: [
      "p",
      "br",
      "h1",
      "h2",
      "h3",
      "h4",
      "h5",
      "h6",
      "b",
      "i",
      "em",
      "strong",
      "img",
      "ul",
      "ol",
      "li",
      "blockquote",
      "code",
      "hr",
      "table",
      "tr",
      "td",
      "a",
    ],
    allowedAttributes: {
      p: ["align"],
      a: ["href", "target"],
      img: ["src", "width", "height", "alt"],
    },
  };

  const sanitize = (dirty: string, options?: sanitizeHtml.IOptions) => ({
    __html: sanitizeHtml(dirty, { ...defaultOptions, ...options }),
  });

  return { sanitize };
};
