
# 🌈 HTML Preview for uTools

<div align="center">

![Version](https://img.shields.io/badge/Version-1.0.2-blue.svg)
![License](https://img.shields.io/badge/License-MIT-yellow.svg)
[![uTools](https://img.shields.io/badge/uTools-插件-green.svg)](https://u.tools/)

一个优雅的HTML代码预览插件，提供类似浏览器的预览体验。

</div>

---

## 🎯 背景

有些 AI 输出 HTML 代码后不支持直接在线预览，之前的做法往往是复制 HTML 到本地保存为一个 `.html` 文件，然后用浏览器打开此文件，很麻烦。使用此插件可以节省保存文件浏览器打开这些步骤。

## ✨ 特性

<table>
  <tr>
    <td>🚀 即时预览</td>
    <td>🔍 智能识别</td>
    <td>🔄 双重预览模式</td>
    <td>💾 保存为文件</td>
  </tr>
</table>

## 📥 安装

### 方式一：插件市场安装

1. 打开 uTools
2. 进入插件市场
3. 搜索 `Html预览`
4. 点击安装

### 方式二：手动安装

1. 下载插件包 (`.upx` 文件)
2. 打开 uTools
3. 拖拽 `.upx` 文件到 uTools 窗口
4. 点击安装

## 🚀 使用方法

### 快速开始

1️⃣ 复制HTML文本  
2️⃣ 呼出uTools（确保uTools主输入框里有HTML内容）
3️⃣ 选择Html预览  

### 双重预览模式

本插件提供两种预览模式：

- **内置预览**: 默认模式，直接在uTools内部预览HTML
- **默认浏览器预览**: 通过系统默认浏览器打开预览

  > **为什么需要两种预览模式？**
  > 
  > 当HTML代码中包含需要通过代理访问的资源（如图片、CSS、JavaScript等）时，内置浏览器无法设置代理，可能导致资源加载失败。而系统浏览器预览模式会使用系统已配置的代理设置，确保所有资源正常加载，提供完整的预览体验。

### 预览原理说明

本插件的预览功能基于以下工作原理：

1. **临时文件创建**：当用户请求预览HTML内容时，插件会将HTML代码保存为临时文件
2. **文件位置**：这些临时文件存储在系统的临时文件目录中（如Windows的`%TEMP%`目录）
3. **浏览器打开**：然后通过内置浏览器或系统默认浏览器打开该临时文件
4. **自动清理**：系统会根据其内置的临时文件管理机制自动清理这些文件，无需用户手动删除

    > **无需担心临时文件堆积！** 
    > 
    > 由于使用系统标准的临时目录，操作系统会定期自动清理这些文件，不会造成垃圾文件积累或占用过多磁盘空间，用户可以放心使用预览功能。

### 使用场景

- **AI输出预览**: 快速预览AI生成的HTML代码
- **教学演示**: 展示HTML渲染结果

## 📝 代码示例

<details>
<summary>天气卡片HTML示例</summary>

```html
<!DOCTYPE html>
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
```
</details>

<details>
<summary>带JavaScript的HTML代码示例</summary>

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>拟物风格按钮与进度条</title>
    <style>
        body {
            margin: 0;
            height: 100vh;
            display: flex;
            justify-content: center;
            align-items: center;
            background: url('https://img.freepik.com/free-photo/wooden-textured-background_53876-14757.jpg') no-repeat center center fixed;
            background-size: cover;
            font-family: 'Arial', sans-serif;
            overflow: hidden;
        }
        .container {
            text-align: center;
        }
        .button {
            padding: 15px 30px;
            font-size: 1.2em;
            font-weight: bold;
            color: #fff;
            background: linear-gradient(145deg, #ff6f61, #e74c3c);
            border: 3px solid #c0392b;
            border-radius: 10px;
            box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.3), 
                        -3px -3px 5px rgba(255, 255, 255, 0.2) inset;
            cursor: pointer;
            user-select: none;
            transition: transform 0.1s, box-shadow 0.1s;
            outline: none;
        }
        .button:active {
            transform: translate(2px, 2px);
            box-shadow: 3px 3px 8px rgba(0, 0, 0, 0.3), 
                        -3px -3px 5px rgba(255, 255, 255, 0.2) inset;
        }
        .progress-container {
            width: 200px;
            height: 20px;
            background: #ddd;
            border-radius: 5px;
            overflow: hidden;
            margin: 20px auto;
            box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.2);
            display: none;
        }
        .progress-bar {
            height: 100%;
            background: linear-gradient(to right, #2ecc71, #27ae60);
            width: 0;
            transition: width 0.1s linear;
        }
        .confetti-container {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            display: none;
        }
        .confetti {
            position: absolute;
            width: 10px;
            height: 30px;
            transform-origin: center;
            animation: fall linear;
        }
        @keyframes fall {
            0% {
                top: -10%;
                transform: translateX(0) rotate(0deg);
            }
            100% {
                top: 110%;
                transform: translateX(100px) rotate(360deg);
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="button" id="actionButton">按住我！（鼠标左键或空格键）</div>
        <div class="progress-container" id="progressContainer">
            <div class="progress-bar" id="progressBar"></div>
        </div>
    </div>
    <div class="confetti-container" id="confettiContainer"></div>

    <script>
              const button = document.getElementById('actionButton');
        const progressContainer = document.getElementById('progressContainer');
        const progressBar = document.getElementById('progressBar');
        const confettiContainer = document.getElementById('confettiContainer');
        
        let isHolding = false;
        let progress = 0;
        let interval;

        // 按住按钮或空格键时的逻辑
        function startProgress() {
            if (!isHolding) {
                isHolding = true;
                progressContainer.style.display = 'block';
                interval = setInterval(() => {
                    if (progress < 100) {
                        progress += 2;
                        progressBar.style.width = progress + '%';
                    } else {
                        clearInterval(interval);
                        triggerConfetti();
                        progress = 0;
                        progressBar.style.width = '0%';
                        progressContainer.style.display = 'none';
                        isHolding = false;
                    }
                }, 50);
            }
        }

        // 松开按钮或空格键时的逻辑
        function stopProgress() {
            if (isHolding) {
                clearInterval(interval);
                isHolding = false;
                progress -= 10;
                if (progress < 0) progress = 0;
                progressBar.style.width = progress + '%';
                if (progress === 0) {
                    progressContainer.style.display = 'none';
                }
            }
        }

        // 触发庆祝彩带效果
        function triggerConfetti() {
            confettiContainer.style.display = 'block';
            confettiContainer.innerHTML = '';
            for (let i = 0; i < 50; i++) {
                const confetti = document.createElement('div');
                confetti.classList.add('confetti');
                confetti.style.backgroundColor = `hsl(${Math.random() * 360}, 100%, 50%)`;
                confetti.style.left = `${Math.random() * 100}%`;
                confetti.style.top = `${Math.random() * -50}%`;
                confetti.style.animationDuration = `${Math.random() * 3 + 2}s`;
                confetti.style.transform = `rotate(${Math.random() * 360}deg)`;
                confettiContainer.appendChild(confetti);
            }
            setTimeout(() => {
                confettiContainer.style.display = 'none';
            }, 5000);
        }

        // 鼠标事件
        button.addEventListener('mousedown', startProgress);
        button.addEventListener('mouseup', stopProgress);
        button.addEventListener('mouseleave', stopProgress);

        // 键盘事件（空格键）
        document.addEventListener('keydown', (e) => {
            if (e.code === 'Space') {
                e.preventDefault();
                startProgress();
            }
        });
        document.addEventListener('keyup', (e) => {
            if (e.code === 'Space') {
                stopProgress();
            }
        });
    </script>
</body>
</html>
```
</details>

<details>
<summary>非完整HTML代码示例</summary>

```html
<div style="display: flex; justify-content: center; align-items: center; min-height: 100vh; margin: 0;">
  <div style="width: 300px; background: linear-gradient(135deg, #ff9a9e, #fad0c4); border-radius: 15px; overflow: hidden; box-shadow: 0 4px 8px rgba(0,0,0,0.3); transition: transform 0.3s ease, box-shadow 0.3s ease;">
    <div style="padding: 20px; text-align: center; color: white; font-family: Arial, sans-serif;">
      <h2 style="margin: 0; font-size: 24px;">欢迎使用Html预览插件!</h2>
      <p style="margin: 10px 0 0; font-size: 16px;">鼠标悬停查看效果</p>
    </div>
  </div>
</div>
<style>
  div div:hover {
    transform: scale(1.05);
    box-shadow: 0 8px 16px rgba(0,0,0,0.5);
  }
</style>
```
</details>

## 🤝 贡献

欢迎提交问题和改进建议！

## 📦 开发者

<div align="center">
  
Made with ❤️ by iblogc

</div>

## 📄 许可证

本项目基于 MIT 许可证开源，详见 [LICENSE](LICENSE) 文件。

---

<div align="center">
  
**如果这个项目对你有帮助，请给一个 ⭐️ 支持一下！**

</div>
