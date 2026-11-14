# 日常收藏家：放上 GitHub 的步驟

## 一、上傳到 GitHub
1. 登入 GitHub，右上角「＋ → New repository」，名稱隨意（例如 `diary`），選 **Public**，按 Create。
2. 在新倉庫點「uploading an existing file」，把這 6 個檔案一起上傳，按 Commit changes：
   `index.html`、`manifest.webmanifest`、`sw.js`、`icon-192.png`、`icon-512.png`、`apple-touch-icon.png`
3. 到 **Settings → Pages**，Source 選「Deploy from a branch」，Branch 選 `main`、資料夾選 `/ (root)`，按 Save。
4. 等 1～2 分鐘，網址會是 `https://你的帳號.github.io/diary/`。

## 二、第一次使用
1. 用手機打開上面的網址，會自動跳出設定視窗。
2. Apps Script 網址已經預先填好，只要輸入你在 Code.gs 設定的**密碼**，按「儲存並同步」。
3. 看到畫面上方顯示「☁️ 已同步到 Google 試算表」，就完成了。每台裝置只需要輸入一次。

## 三、安裝成手機 App
- **iPhone**：用 Safari 打開，點「分享」→「加入主畫面」。
- **Android**：用 Chrome 打開，點右上角「⋮」→「安裝應用程式」。

## 四、日常使用
- 沒有網路時照常寫，內容會先存在手機，有網路後自動送到試算表。
- 右上角 ⚙️ 可以匯出備份檔（JSON）、匯入備份、登出這台裝置。

## 五、之後更新網站
重新上傳覆蓋檔案後，把 `sw.js` 第一行的 `sd-v1` 改成 `sd-v2`（再更新就 v3…），手機才會抓到新版。

## 注意
- 密碼只存在你各台裝置的瀏覽器裡，不會出現在 GitHub 的程式碼中；日記內容只存在你自己的 Google 試算表。
- GitHub 上公開的只有程式和 Apps Script 網址，所以密碼請設長一點（16 字元以上）。
- 確認同步成功後，記得把 Code.gs 裡 `const SEED =` 後面的日記內容刪掉，只留 `[]`。
- 這個版本沒有照片，也沒有 AI 功能（訪談員改為隨機題目，未來信和週報改為範本與自動統計）。
