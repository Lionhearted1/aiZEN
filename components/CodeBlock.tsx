import { StreamLanguage } from '@codemirror/language';
import { go } from '@codemirror/legacy-modes/mode/go';
import { tokyoNight } from '@uiw/codemirror-theme-tokyo-night';
import CodeMirror from '@uiw/react-codemirror';
import { FC, useEffect, useState } from 'react';

interface Props {
  code: string;
  editable?: boolean;
  onChange?: (value: string) => void;
}

export const CodeBlock: FC<Props> = ({
  code,
  editable = false,
  onChange = () => {},
}) => {
  const [copyText, setCopyText] = useState<string>('Copy');

  useEffect(() => {
    const timeout = setTimeout(() => {
      setCopyText('Copy');
    }, 2000);

    return () => clearTimeout(timeout);
  }, [copyText]);

  return (
    <div className="relative">
      <button
        className="absolute right-2 top-2 z-10 rounded bg-[#31363F] p-2 text-xs text-white hover:bg-[#EEEEEE] hover:text-black active:hover:bg-[#EEEEEE] active:hover:text-black"
        onClick={() => {
          navigator.clipboard.writeText(code);
          setCopyText('Copied!');
        }}
      >
        {copyText}
      </button>

      <CodeMirror
        editable={editable}
        value={code}
        minHeight="450px"
        extensions={[StreamLanguage.define(go)]}
        theme={tokyoNight}
        onChange={(value) => onChange(value)}
      />
    </div>
  );
};
