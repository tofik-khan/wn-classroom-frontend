import { useRef } from "react";
import JoditEditor from "jodit-react";

export const Editor = ({
  placeholder,
  content,
  setContent,
  readonly = false,
}: {
  placeholder?: string;
  content: string;
  setContent: any;
  readonly?: boolean;
}) => {
  const editor = useRef(null);

  const readOnlyProperties = readonly
    ? {
        toolbar: false,
        readonly: true,
        showCharsCounter: false,
        showWordsCounter: false,
        showXPathInStatusbar: false,
        containerStyle: {
          border: "none",
        },
        height: "100px",
      }
    : {};

  const config = {
    placeholder: placeholder ?? "Start typing...",
    disablePlugins: [
      "video",
      "file",
      "symbols",
      "about",
      "image",
      "preview",
      "line-height",
      "class-span",
      "clean-html",
      "source",
    ],
    ...readOnlyProperties,
  };

  return (
    <JoditEditor
      ref={editor}
      value={content}
      config={config}
      tabIndex={1} // tabIndex of textarea
      onBlur={(newContent) => setContent(newContent)}
    />
  );
};
