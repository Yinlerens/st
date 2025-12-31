import React, { useRef, useEffect } from 'react';
import Editor, { Monaco } from '@monaco-editor/react';
import { useThemeStore } from '../store/useThemeStore';

interface CodeEditorProps {
  value: string;
  language: 'html' | 'css' | 'javascript' | 'typescript';
  onChange?: (value: string | undefined) => void;
  height?: string;
  readOnly?: boolean;
}

const CodeEditor: React.FC<CodeEditorProps> = ({
  value,
  language,
  onChange,
  height = '400px',
  readOnly = false,
}) => {
  const { isDarkMode } = useThemeStore();
  const editorRef = useRef<any>(null);

  const handleEditorDidMount = (editor: any, monaco: Monaco) => {
    editorRef.current = editor;

    // 配置编辑器选项
    editor.updateOptions({
      fontSize: 14,
      minimap: { enabled: false },
      scrollBeyondLastLine: false,
      wordWrap: 'on',
      readOnly,
    });
  };

  const handleEditorChange = (value: string | undefined) => {
    if (onChange) {
      onChange(value);
    }
  };

  return (
    <div style={{ border: '1px solid #d9d9d9', borderRadius: '4px', overflow: 'hidden' }}>
      <Editor
        height={height}
        language={language}
        value={value}
        onChange={handleEditorChange}
        onMount={handleEditorDidMount}
        theme={isDarkMode ? 'vs-dark' : 'light'}
        options={{
          selectOnLineNumbers: true,
          automaticLayout: true,
          formatOnPaste: true,
          formatOnType: true,
        }}
      />
    </div>
  );
};

export default CodeEditor;
