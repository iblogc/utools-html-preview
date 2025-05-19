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
  
  // 写入完整的HTML文档结构
  doc.open()
  doc.write(`
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
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
              <path d="M15 18l-6-6 6-6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </span>
          <span class="action-btn forward">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M9 18l6-6-6-6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </span>
          <span class="action-btn reload">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M21 12a9 9 0 11-3-6.74" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M21 3v6h-6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
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
    <div class="copyright">
      © 2024 HTML Preview. Made with ❤️ by 打个大西瓜
    </div>
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
  box-shadow: 0 10px 30px rgba(0,0,0,0.1);
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

.close { background: #ff5f57; }
.minimize { background: #ffbd2e; }
.maximize { background: #28c940; }

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