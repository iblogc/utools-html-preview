<script setup>
import { ref, onMounted, watch } from 'vue'

const props = defineProps({
  enterAction: {
    type: Object,
    required: true
  }
})

const htmlContent = ref('')
const iframeRef = ref(null)
const pageTitle = ref('')

// 示例HTML代码 (占位)
const exampleHTML = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Immersive Weather Cards</title>
</head>
<body style="margin:0;font-family:'Segoe UI',sans-serif;background:linear-gradient(to right, #dbeafe, #f0f9ff);overflow-x:hidden;">
  <div style="padding: 40px;text-align: center;">
    <h1 style="font-size: 2.5rem;color:#1e3a8a;margin-bottom:10px;text-shadow:1px 1px 4px #fff;">Today's Weather Showcase</h1>
    <p style="color:#475569;font-style:italic;font-size:1.1rem;">Experience the mood of the skies through design and motion</p>
  </div>

  <div style="display: flex; justify-content: center; gap: 30px; flex-wrap: wrap; padding: 20px;">
    <!-- Sunny -->
    <div style="position: relative; width: 250px; height: 350px; background: linear-gradient(to bottom right, #ffe259, #ffa751); border-radius: 20px; box-shadow: 0 10px 30px rgba(255, 184, 0, 0.4); transition: transform 0.4s ease, box-shadow 0.4s ease; overflow:hidden; cursor:pointer;" onmouseover="this.style.transform='scale(1.05)'; this.style.boxShadow='0 15px 40px rgba(255, 174, 0, 0.6)'" onmouseout="this.style.transform='scale(1)'; this.style.boxShadow='0 10px 30px rgba(255, 184, 0, 0.4)'">
      <div style="position:absolute;top:20px;left:20px;font-size:2.5rem;">☀️</div>
      <h2 style="position: absolute; bottom: 80px; left: 20px; color: #fff; font-size: 1.8rem; text-shadow: 0 0 5px #0003;">Sunny</h2>
      <p style="position: absolute; bottom: 30px; left: 20px; color: #fff; font-size: 1rem; font-style: italic;">Clear skies & warm vibes</p>
      <div style="position:absolute; bottom:-20px; right:-20px; width:120px; height:120px; background: rgba(255,255,255,0.3); filter: blur(20px); border-radius: 50%;"></div>
    </div>

    <!-- Windy -->
    <div style="position: relative; width: 250px; height: 350px; background: linear-gradient(to bottom right, #a1c4fd, #c2e9fb); border-radius: 20px; box-shadow: 0 10px 30px rgba(100, 149, 237, 0.4); transition: transform 0.4s ease, box-shadow 0.4s ease; overflow:hidden; cursor:pointer;" onmouseover="this.style.transform='scale(1.05)'; this.style.boxShadow='0 15px 40px rgba(100, 149, 237, 0.6)'" onmouseout="this.style.transform='scale(1)'; this.style.boxShadow='0 10px 30px rgba(100, 149, 237, 0.4)'">
      <div style="position:absolute;top:20px;left:20px;font-size:2.5rem;">💨</div>
      <h2 style="position: absolute; bottom: 80px; left: 20px; color: #1e3a8a; font-size: 1.8rem;">Windy</h2>
      <p style="position: absolute; bottom: 30px; left: 20px; color: #334155; font-size: 1rem; font-style: italic;">Dancing leaves & breezy whispers</p>
      <div style="position:absolute; top:-20px; right:-30px; width:100px; height:100px; background: rgba(255,255,255,0.3); filter: blur(25px); border-radius: 50%;"></div>
    </div>

    <!-- Thunderstorm -->
    <div style="position: relative; width: 250px; height: 350px; background: linear-gradient(to bottom right, #485563, #29323c); border-radius: 20px; box-shadow: 0 10px 30px rgba(72, 85, 99, 0.4); transition: transform 0.4s ease, box-shadow 0.4s ease; overflow:hidden; cursor:pointer;" onmouseover="this.style.transform='scale(1.05)'; this.style.boxShadow='0 15px 40px rgba(72, 85, 99, 0.6)'" onmouseout="this.style.transform='scale(1)'; this.style.boxShadow='0 10px 30px rgba(72, 85, 99, 0.4)'">
      <div style="position:absolute;top:20px;left:20px;font-size:2.5rem;">🌩️</div>
      <h2 style="position: absolute; bottom: 80px; left: 20px; color: #fff; font-size: 1.8rem;">Thunderstorm</h2>
      <p style="position: absolute; bottom: 30px; left: 20px; color: #d1d5db; font-size: 1rem; font-style: italic;">Booming skies & pouring rains</p>
      <div style="position:absolute; bottom:-10px; left:-10px; width:100px; height:100px; background: rgba(255,255,255,0.1); filter: blur(20px); border-radius: 50%;"></div>
    </div>

    <!-- Snowstorm -->
    <div style="position: relative; width: 250px; height: 350px; background: linear-gradient(to bottom right, #e0f7fa, #ffffff); border-radius: 20px; box-shadow: 0 10px 30px rgba(173, 216, 230, 0.4); transition: transform 0.4s ease, box-shadow 0.4s ease; overflow:hidden; cursor:pointer;" onmouseover="this.style.transform='scale(1.05)'; this.style.boxShadow='0 15px 40px rgba(173, 216, 230, 0.6)'" onmouseout="this.style.transform='scale(1)'; this.style.boxShadow='0 10px 30px rgba(173, 216, 230, 0.4)'">
      <div style="position:absolute;top:20px;left:20px;font-size:2.5rem;">❄️</div>
      <h2 style="position: absolute; bottom: 80px; left: 20px; color: #0f172a; font-size: 1.8rem;">Snowstorm</h2>
      <p style="position: absolute; bottom: 30px; left: 20px; color: #334155; font-size: 1rem; font-style: italic;">Frozen wonderland & icy flurries</p>
      <div style="position:absolute; top:-10px; left:-10px; width:90px; height:90px; background: rgba(255,255,255,0.4); filter: blur(18px); border-radius: 50%;"></div>
    </div>
  </div>

  <div style="text-align: center; margin-top: 60px; color:#334155; font-size: 1rem; font-style: italic;">
    Designed to make you feel the weather with your eyes — immersive, emotive, elegant.
  </div>
</body>
</html>
`;

// 一键复制示例HTML
const copyExampleHTML = async () => {
  try {
    await navigator.clipboard.writeText(exampleHTML);
    alert('示例HTML已复制到剪贴板!');
  } catch (err) {
    console.error('复制失败: ', err);
    alert('复制失败,请手动复制。');
  }
};

// 从iframe中获取title
const updateTitle = () => {
  if (!iframeRef.value) return
  const doc = iframeRef.value.contentDocument || iframeRef.value.contentWindow.document
  const title = doc.title
  pageTitle.value = title || ''
}

// 更新iframe内容
const updatePreview = (content) => {
  if (!iframeRef.value) return
  
  const iframe = iframeRef.value
  const doc = iframe.contentDocument || iframe.contentWindow.document
  
  // 如果没有内容,显示欢迎页面
  if (!content || content === 'Html预览' || content === 'Html预览') {
    content = `
      <style>
        body {
          margin: 0;
          padding: 20px;
          font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Text', 'SF Pro Icons', 'Helvetica Neue', Helvetica, Arial, sans-serif;
          background: linear-gradient(135deg, #f0f2f5, #e2e5ec);
          color: #1d1d1f;
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: calc(100vh - 40px);
        }
        .container {
          max-width: 520px;
          width: 100%;
          margin: 0 auto;
          background: rgba(255, 255, 255, 0.8);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border-radius: 20px;
          padding: 25px 32px;
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
          text-align: center;
        }
        h2 {
          margin: 0 0 32px;
          color: #1d1d1f;
          font-size: 28px;
          font-weight: 600;
          letter-spacing: -0.5px;
        }
        .steps {
          list-style: none;
          padding: 0;
          margin: 0 0 8px 0;
          text-align: left;
        }
        .step {
          display: flex;
          align-items: center;
          padding: 5px 0;
          margin-bottom: 8px;
        }
        .step:last-child {
          margin-bottom: 0;
        }
        .step-number {
          min-width: 32px;
          height: 25px;
          background: rgba(0, 122, 255, 0.1);
          color: #007aff;
          border-radius: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 500;
          margin-right: 16px;
          font-size: 15px;
        }
        .step-text {
          font-size: 16px;
          color: #1d1d1f;
          line-height: 1.4;
        }
        .copy-button {
          display: inline-block;
          padding: 10px 24px;
          background: rgba(0, 122, 255, 0.9);
          color: white;
          border: none;
          border-radius: 12px;
          font-size: 15px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s ease-in-out;
          text-align: center;
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
        }
        .copy-button:hover {
          background: rgba(0, 122, 255, 1);
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(0, 122, 255, 0.3);
        }
        .copy-button:active {
          transform: translateY(0);
          background: rgba(0, 122, 255, 0.8);
          box-shadow: 0 2px 6px rgba(0, 122, 255, 0.2);
        }
        .tip {
          margin-top: 20px;
          padding: 10px;
          background: rgba(0, 0, 0, 0.03);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          border-radius: 14px;
          color: #1d1d1f;
          font-size: 14px;
          line-height: 1.5;
          text-align: left;
          border: 1px solid rgba(0, 0, 0, 0.05);
        }
        .tip-icon {
          font-size: 18px;
          margin-right: 8px;
          vertical-align: middle;
        }
      </style>
      <div class="container">
        <h2>📖 使用方法</h2>
        <ul class="steps">
          <li class="step">
            <div class="step-number">1</div>
            <div class="step-text">复制HTML代码</div>
          </li>
          <li class="step">
            <div class="step-number">2</div>
            <div class="step-text">呼出uTools（确保uTools主输入框里有HTML内容）</div>
          </li>
          <li class="step">
            <div class="step-number">3</div>
            <div class="step-text">选择Html预览</div>
          </li>
        </ul>
        <button class="copy-button" onclick="parent.copyExampleHTML_BRIDGE()">一键复制示例HTML</button>
        <div class="tip">
          <span class="tip-icon">💡</span>
          提示: 支持JavaScript执行和完整的HTML文档预览。
        </div>
      </div>
    `
  }
  
  // 写入完整的HTML文档结构
  doc.open()
  doc.write(`
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style id="custom-scrollbar-style">
          /* macOS Scrollbar Style */
          ::-webkit-scrollbar {
            width: 8px;
            height: 8px;
          }
          ::-webkit-scrollbar-track {
            background: transparent;
          }
          ::-webkit-scrollbar-thumb {
            background: rgba(0,0,0,0.3);
            border-radius: 4px;
          }
          ::-webkit-scrollbar-thumb:hover {
            background: rgba(0,0,0,0.5);
          }
          body { margin: 0; padding: 16px; }
        </style>
      </head>
      <body>${content}</body>
    </html>
  `)
  doc.close()
  
  // 等待iframe加载完成后获取title
  iframe.onload = () => {
    updateTitle()
    // 将复制函数桥接到iframe的父级
    if(iframe.contentWindow) {
      iframe.contentWindow.parent.copyExampleHTML_BRIDGE = copyExampleHTML;
    }
  }
}

// 监听输入变化
watch(() => props.enterAction, (newVal) => {
  if (newVal.payload) {
    htmlContent.value = newVal.payload
    updatePreview(newVal.payload)
  }
}, { deep: true })

// 获取输入框内容
onMounted(() => {
  if (props.enterAction.payload) {
    htmlContent.value = props.enterAction.payload
    updatePreview(props.enterAction.payload)
  } else {
    // 如果没有输入内容,也触发一次updatePreview来显示欢迎页
    updatePreview('')
  }
})
</script>

<template>
  <div class="preview-container">
    <div class="browser-shell">
      <!-- 浏览器标题栏 -->
      <div class="browser-titlebar">
        <div class="window-controls">
          <span class="control close"></span>
          <span class="control minimize"></span>
          <span class="control maximize"></span>
        </div>
        <div v-if="pageTitle" class="titlebar-title">{{ pageTitle }}</div>
      </div>

      <!-- 浏览器工具栏 -->
      <div class="browser-toolbar">
        <div class="browser-actions">
          <span class="action-btn back">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M15 18l-6-6 6-6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
          </span>
          <span class="action-btn forward">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M9 18l6-6-6-6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
          </span>
          <span class="action-btn reload">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M21 12a9 9 0 11-3-6.74" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
              <path d="M21 3v6h-6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
          </span>
        </div>
        <div class="address-bar">
          <span class="secure-icon">🔒</span>
          <span class="url">preview.html</span>
        </div>
      </div>

      <!-- 预览内容区 -->
      <div class="browser-content">
        <iframe
          ref="iframeRef"
          class="preview-frame"
          sandbox="allow-scripts allow-same-origin allow-modals allow-popups allow-forms allow-pointer-lock allow-presentation allow-top-navigation allow-top-navigation-by-user-activation allow-downloads allow-orientation-lock"
        ></iframe>
      </div>
    </div>
    <!-- 版权信息 -->
    <div class="copyright">© 2024 HTML Preview. Made with ❤️ by 二进制跳杀</div>
  </div>
</template>

<style scoped>
.preview-container {
  padding: 20px;
  height: 95vh;
  overflow: hidden;
  background: #e2e5ec;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.browser-shell {
  background: white;
  border-radius: 12px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.browser-titlebar {
  background: rgba(236, 236, 236, 0.9);
  backdrop-filter: blur(10px);
  padding: 8px 16px;
  -webkit-app-region: drag;
  display: flex;
  align-items: center;
  height: 16px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
}

.window-controls {
  display: flex;
  gap: 8px;
  margin-right: 16px;
}

.control {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  -webkit-app-region: no-drag;
  position: relative;
  transition: all 0.2s;
}

.control::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  border-radius: 50%;
  box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.15);
}

.close {
  background: #ff5f57;
}
.minimize {
  background: #ffbd2e;
}
.maximize {
  background: #28c940;
}

.control:hover {
  filter: brightness(0.9);
}

.titlebar-title {
  font-size: 13px;
  color: #4a4a4a;
  font-weight: 500;
  margin: 0 auto;
}

.browser-toolbar {
  background: #f5f5f5;
  padding: 8px 16px;
  border-bottom: 1px solid #e0e0e0;
  display: flex;
  gap: 16px;
  align-items: center;
}

.browser-actions {
  display: flex;
  gap: 8px;
}

.action-btn {
  width: 28px;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  color: #666;
  cursor: pointer;
  user-select: none;
}

.action-btn:hover {
  background: #e0e0e0;
}

.address-bar {
  flex: 1;
  background: #fff;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  padding: 6px 12px;
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  color: #333;
}

.secure-icon {
  color: #28c940;
  font-size: 12px;
}

.browser-content {
  flex: 1;
  background: white;
  overflow: hidden;
}

.preview-frame {
  width: 100%;
  height: 100%;
  border: none;
}

.copyright {
  text-align: center;
  color: #666;
  font-size: 12px;
  padding: 4px 0;
  user-select: none;
}
</style>
