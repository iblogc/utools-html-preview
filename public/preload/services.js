const fs = require('node:fs')
const path = require('node:path')
const os = require('node:os')

// 欢迎页面HTML - 苹果设计风格
const welcomeHTML = `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>HTML预览工具</title>
  <style>
    :root {
      --apple-blue: #0071e3;
      --apple-blue-hover: #0077ed;
      --apple-gray: #f5f5f7;
      --apple-dark: #1d1d1f;
      --apple-secondary: #6e6e73;
    }
    
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
      -webkit-font-smoothing: antialiased;
    }
    
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Text', 'SF Pro Icons', 'Helvetica Neue', Helvetica, Arial, sans-serif;
      background: linear-gradient(145deg, #f0f2f5, #e6e9f0);
      color: var(--apple-dark);
      line-height: 1.5;
      height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 20px;
    }
    
    .container {
      max-width: 580px;
      width: 100%;
      background: rgba(255, 255, 255, 0.85);
      backdrop-filter: blur(20px);
      -webkit-backdrop-filter: blur(20px);
      border-radius: 20px;
      padding: 40px;
      box-shadow: 0 20px 40px rgba(0, 0, 0, 0.08);
      animation: fadeIn 0.5s ease-out;
    }
    
    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(10px); }
      to { opacity: 1; transform: translateY(0); }
    }
    
    h1 {
      font-size: 32px;
      font-weight: 600;
      color: var(--apple-dark);
      margin-bottom: 20px;
      text-align: center;
      letter-spacing: -0.5px;
    }
    
    p {
      font-size: 17px;
      color: var(--apple-secondary);
      margin-bottom: 25px;
      text-align: center;
    }
    
    .divider {
      height: 1px;
      background: rgba(0, 0, 0, 0.1);
      margin: 25px 0;
    }
    
    h2 {
      font-size: 22px;
      font-weight: 600;
      color: var(--apple-dark);
      margin-bottom: 20px;
      letter-spacing: -0.3px;
    }
    
    .steps {
      list-style: none;
      margin-bottom: 30px;
    }
    
    .step {
      display: flex;
      margin-bottom: 16px;
      align-items: flex-start;
    }
    
    .step-number {
      width: 30px;
      height: 30px;
      background: rgba(0, 113, 227, 0.1);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 600;
      color: var(--apple-blue);
      margin-right: 15px;
      font-size: 15px;
      flex-shrink: 0;
    }
    
    .step-content {
      padding-top: 4px;
    }
    
    .step-title {
      font-weight: 500;
      font-size: 17px;
      margin-bottom: 4px;
    }
    
    .step-desc {
      font-size: 14px;
      color: var(--apple-secondary);
    }
    
    .footer {
      text-align: center;
      margin-top: 30px;
      font-size: 13px;
      color: var(--apple-secondary);
    }
    
    @media (max-width: 600px) {
      .container {
        padding: 30px 20px;
      }
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>HTML预览工具</h1>
    <p>一个简单但功能强大的HTML预览插件，帮助您快速查看HTML代码的渲染效果</p>
    
    <div class="divider"></div>
    
    <h2>使用方法</h2>
    <ul class="steps">
      <li class="step">
        <div class="step-number">1</div>
        <div class="step-content">
          <div class="step-title">准备HTML代码</div>
          <div class="step-desc">复制您想要预览的HTML代码到剪贴板</div>
        </div>
      </li>
      <li class="step">
        <div class="step-number">2</div>
        <div class="step-content">
          <div class="step-title">呼出uTools</div>
          <div class="step-desc">确保主输入框中有HTML内容</div>
        </div>
      </li>
      <li class="step">
        <div class="step-number">3</div>
        <div class="step-content">
          <div class="step-title">选择HTML预览</div>
          <div class="step-desc">即可查看HTML渲染效果</div>
        </div>
      </li>
    </ul>
   </div>
</body>
</html>`;

// 通过 window 对象向渲染进程注入 nodejs 能力
window.services = {
  saveFile(filePath, content) {
    try {
      fs.writeFileSync(filePath, content)
      return { success: true, path: filePath }
    } catch (error) {
      console.error('Preload: 保存文件失败', error)
      return { success: false, error: error.message }
    }
  },
  
  // 创建临时HTML文件
  createTempHtmlFile(content) {
    try {
      const tempDir = os.tmpdir()
      const tempFilePath = path.join(tempDir, `utools-preview-${Date.now()}.html`)
      fs.writeFileSync(tempFilePath, content)
      return { success: true, path: tempFilePath }
    } catch (error) {
      console.error('Preload: 创建临时HTML文件失败', error)
      return { success: false, error: error.message }
    }
  },
  
  // 从HTML内容中提取标题
  extractTitleFromHtml(htmlContent) {
    try {
      const titleMatch = htmlContent.match(/<title>(.*?)<\/title>/i)
      if (titleMatch && titleMatch[1]) {
        // 去除标题中的非法字符
        return titleMatch[1].replace(/[<>:"/\\|?*\x00-\x1F]/g, '_').trim() || 'untitled'
      }
    } catch (error) {
      console.error('提取标题失败:', error)
    }
    return 'untitled'
  },
  
  // 保存HTML到下载目录
  saveHtmlToDownloads(content) {
    try {
      const title = this.extractTitleFromHtml(content)
      const downloadsDir = utools.getPath('downloads')
      const filename = `${title}_${Date.now()}.html`
      const filePath = path.join(downloadsDir, filename)
      
      fs.writeFileSync(filePath, content)
      return { success: true, path: filePath, title, filename }
    } catch (error) {
      console.error('保存HTML到下载目录失败:', error)
      return { success: false, error: error.message }
    }
  },
  
  // 获取欢迎页面HTML
  getWelcomeHTML() {
    return welcomeHTML;
  }
}

// 导出给uTools调用的方法
window.exports = {
  'preview': {
    mode: "none", // 无UI模式
    args: {
      // 插件执行入口
      enter: (action) => {
        utools.showNotification("hello world");
        // 预览功能在App.vue中处理
      },
    },
  },
  'savehtml': {
    mode: "none",
    args: {
      enter: () => {
        // 保存功能在App.vue中处理
      },
    },
  }
};