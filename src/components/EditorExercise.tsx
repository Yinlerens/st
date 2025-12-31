import { useState, useRef } from 'react';
import { Card, Button, Space, Tabs, message } from 'antd';
import { PlayCircleOutlined, ReloadOutlined, SaveOutlined } from '@ant-design/icons';
import CodeEditor from '../components/CodeEditor';
import { useProgressStore } from '../store/useProgressStore';

interface EditorExerciseProps {
  exerciseId: string;
  title: string;
  description: string;
  initialCode?: {
    html?: string;
    css?: string;
    javascript?: string;
  };
}

const EditorExercise: React.FC<EditorExerciseProps> = ({
  exerciseId,
  title,
  description,
  initialCode = {
    html: '<!DOCTYPE html>\n<html>\n<head>\n  <title>练习</title>\n</head>\n<body>\n  <h1>Hello World</h1>\n</body>\n</html>',
    css: 'body {\n  font-family: Arial, sans-serif;\n  padding: 20px;\n}\n\nh1 {\n  color: #0ea5e9;\n}',
    javascript: '// JavaScript 代码\nconsole.log("Hello World");',
  },
}) => {
  const [htmlCode, setHtmlCode] = useState(initialCode.html || '');
  const [cssCode, setCssCode] = useState(initialCode.css || '');
  const [jsCode, setJsCode] = useState(initialCode.javascript || '');
  const [output, setOutput] = useState('');
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const { updateExerciseProgress } = useProgressStore();

  const runCode = () => {
    try {
      const fullHTML = `
        <!DOCTYPE html>
        <html>
        <head>
          <style>${cssCode}</style>
        </head>
        <body>
          ${htmlCode}
          <script>
            // 捕获console.log
            (function() {
              const oldLog = console.log;
              console.log = function(...args) {
                window.parent.postMessage({
                  type: 'console',
                  data: args.map(arg => 
                    typeof arg === 'object' ? JSON.stringify(arg) : String(arg)
                  ).join(' ')
                }, '*');
                oldLog.apply(console, args);
              };
            })();
            
            // 执行用户代码
            try {
              ${jsCode}
            } catch (error) {
              window.parent.postMessage({
                type: 'error',
                data: error.toString()
              }, '*');
            }
          </script>
        </body>
        </html>
      `;

      if (iframeRef.current) {
        const iframe = iframeRef.current;
        const iframeDoc = iframe.contentDocument || iframe.contentWindow?.document;
        if (iframeDoc) {
          iframeDoc.open();
          iframeDoc.write(fullHTML);
          iframeDoc.close();
        }
      }

      message.success('代码运行成功!');
    } catch (error) {
      message.error('代码运行出错: ' + (error as Error).message);
    }
  };

  const resetCode = () => {
    setHtmlCode(initialCode.html || '');
    setCssCode(initialCode.css || '');
    setJsCode(initialCode.javascript || '');
    setOutput('');
    if (iframeRef.current) {
      const iframe = iframeRef.current;
      const iframeDoc = iframe.contentDocument || iframe.contentWindow?.document;
      if (iframeDoc) {
        iframeDoc.open();
        iframeDoc.write('');
        iframeDoc.close();
      }
    }
    message.info('代码已重置');
  };

  const saveCode = () => {
    updateExerciseProgress(exerciseId, {
      exerciseId,
      completed: false,
      attemptCount: 1,
      lastCode: {
        html: htmlCode,
        css: cssCode,
        javascript: jsCode,
      },
    });
    message.success('代码已保存!');
  };

  // 监听iframe消息
  useState(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.data.type === 'console') {
        setOutput((prev) => prev + '\n' + event.data.data);
      } else if (event.data.type === 'error') {
        setOutput((prev) => prev + '\n❌ Error: ' + event.data.data);
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  });

  const editorTabs = [
    {
      key: 'html',
      label: 'HTML',
      children: (
        <CodeEditor
          value={htmlCode}
          language="html"
          onChange={(value) => setHtmlCode(value || '')}
          height="300px"
        />
      ),
    },
    {
      key: 'css',
      label: 'CSS',
      children: (
        <CodeEditor
          value={cssCode}
          language="css"
          onChange={(value) => setCssCode(value || '')}
          height="300px"
        />
      ),
    },
    {
      key: 'javascript',
      label: 'JavaScript',
      children: (
        <CodeEditor
          value={jsCode}
          language="javascript"
          onChange={(value) => setJsCode(value || '')}
          height="300px"
        />
      ),
    },
  ];

  return (
    <div>
      <Card
        title={title}
        extra={
          <Space>
            <Button
              type="primary"
              icon={<PlayCircleOutlined />}
              onClick={runCode}
            >
              运行
            </Button>
            <Button icon={<ReloadOutlined />} onClick={resetCode}>
              重置
            </Button>
            <Button icon={<SaveOutlined />} onClick={saveCode}>
              保存
            </Button>
          </Space>
        }
        style={{ marginBottom: 16 }}
      >
        <p>{description}</p>
      </Card>

      <Card title="代码编辑器" style={{ marginBottom: 16 }}>
        <Tabs items={editorTabs} />
      </Card>

      <Card title="预览区域" style={{ marginBottom: 16 }}>
        <iframe
          ref={iframeRef}
          style={{
            width: '100%',
            height: '400px',
            border: '1px solid #d9d9d9',
            borderRadius: '4px',
            backgroundColor: 'white',
          }}
          title="preview"
        />
      </Card>

      {output && (
        <Card title="控制台输出">
          <pre
            style={{
              backgroundColor: '#1e1e1e',
              color: '#d4d4d4',
              padding: '12px',
              borderRadius: '4px',
              maxHeight: '200px',
              overflow: 'auto',
            }}
          >
            {output}
          </pre>
        </Card>
      )}
    </div>
  );
};

export default EditorExercise;
