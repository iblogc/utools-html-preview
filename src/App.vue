<script lang="ts" setup>
import { onMounted, ref } from 'vue'

// 声明window.services类型
declare global {
  interface Window {
    services: {
      createTempHtmlFile: (content: string) => { success: boolean; path?: string; error?: string }
      extractTitleFromHtml: (htmlContent: string) => string
      saveHtmlToDownloads: (content: string) => { success: boolean; path?: string; title?: string; filename?: string; error?: string }
      getWelcomeHTML: () => string
    }
    utools: any
  }
}

const route = ref('')
const enterAction = ref({})

// 处理HTML预览功能
function handlePreviewHtml(htmlContent) {
  // 使用Node.js创建临时HTML文件
  const result = window.services.createTempHtmlFile(htmlContent)
  if (result.success) {
    // 使用file://协议打开临时文件
    const fileUrl = `file://${result.path}`
    console.log('创建临时文件成功, 打开:', fileUrl)

    window.utools.ubrowser.goto(fileUrl).run({ width: 1200, height: 800 })
  } else {
    console.error('创建临时文件失败:', result.error)
    window.utools.showNotification('创建临时文件失败: ' + result.error)
  }
}

// 处理保存HTML文件功能
function handleSaveHtml(htmlContent) {
  // 保存HTML到下载目录
  const result = window.services.saveHtmlToDownloads(htmlContent)
  if (result.success && result.path) {
    console.log('保存HTML文件成功:', result.path)
    window.utools.showNotification(`已保存HTML文件 "${result.filename}" 到下载目录`)
    
    // 可选：在文件管理器中显示文件
    window.utools.shellShowItemInFolder(result.path)
  } else {
    console.error('保存HTML文件失败:', result.error)
    window.utools.showNotification('保存HTML文件失败: ' + (result.error || '未知错误'))
  }
}

onMounted(() => {
  window.utools.onPluginEnter((action) => {
    route.value = action.code
    enterAction.value = action
    console.log('插件进入', action)
    
    // 获取HTML内容
    let htmlContent = action.payload

    // 根据功能类型执行不同操作
    if (action.code === 'preview') {
      if (!htmlContent || htmlContent === 'html预览' || htmlContent === 'Html预览' || htmlContent === 'HTML预览') {
        htmlContent = window.services.getWelcomeHTML()
      }
      handlePreviewHtml(htmlContent)
    } else if (action.code === 'savehtml') {
      handleSaveHtml(htmlContent)
    }
    
    // 插件执行完成后退出
    window.utools.hideMainWindow()
    if (action.code === 'savehtml') {
      // 保存文件后直接退出插件
      window.utools.outPlugin()
    }
  })
  
  window.utools.onPluginOut((isKill) => {
    route.value = ''
  })
})
</script>
