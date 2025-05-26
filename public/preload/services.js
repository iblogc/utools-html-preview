const fs = require('node:fs')
const path = require('node:path')

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
  }
}
