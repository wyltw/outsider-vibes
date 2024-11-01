# Outsider Vibes - 音樂搜索平台

![image](https://github.com/user-attachments/assets/e2ff09ff-3aa6-4311-9cbd-9099b52be9de)

* 使用Next.js開發的音樂搜索平台，因Spotify沒有以音樂風格/類型進行搜尋的功能，因此利用Discogs API提供的音樂資料實現進階搜尋功能。

## Live Demo

https://outsider-vibes.vercel.app/

## 使用的技術：

### 前端

- TypeScript
- Next.js(App Router)
- React

### UI

- Tailwind CSS
- Shadcn/ui
- Framer Motion

### 後端

- Firebase
- Auth.js(NextAuth.js v5)

### 工具套件

- Zod - 用於驗證外部資料（如：API回應），確保型別安全

## 專案特色

1. **模組化：**

-- 建立通用性高的組件，透過對泛型組件傳入Props進行複用，同時減少Tailwind CSS和Shadcn/ui可能帶來的重複

2. **性能優化：**

-- 充分利用Next.js的Server Components維持SSR的優勢，只在必要時將組件轉換為Client Components

3. **嚴謹的數據驗證及型別安全：**

-- 使用TypeScript進行靜態檢查，同時使用Zod幫助驗證外部來源資料，使專案在運行期間同樣強健

4. **以URLs管理狀態：**

-- 使用URL參數管理狀態，搜索頁的URL與API URL結合，所以搜索結果可以被保存和分享

5. **泛型組件和函式：**

-- 在合理場景下進行重構，利用泛型組件和函式以利功能拓展

6. **RWD設計：**

-- 確保網頁在所有尺寸下都易於使用

## 主要功能

1. **進階搜尋：**

-- 搜尋頁面包含排序，過濾等功能

![image](https://github.com/user-attachments/assets/c53bdceb-c72a-4216-a235-4cef6dd82162)

2. **簡易收藏：**

-- 提供用戶使用google登入添加簡易收藏

![image](https://github.com/user-attachments/assets/54f255c5-3174-4ab4-afca-138a40c61dac)

## 未來拓展

1. **結合Spotify API：**

-- 以目前的架構為基礎繼續加入Spotify API，完成Spotify的第三方登入功能，使用戶可以在本專案使用完整收藏功能

2. **試聽功能：**

-- 嘗試整合Spotify API和Discogs API，添加試聽功能及專輯/藝人詳細信息瀏覽

3. **簡易收藏的改進：**

-- 受限於Discogs API的請求頻率限制，考慮使用Firebase保存簡易專輯/藝人信息作為緩存策略

## 專案結構

```
src/
├── app/                  
│   ├── (app)/              
│   ├── (landing)/          
│   ├── actions/            
│   ├── api/               
│   ├── error.tsx          
│   ├── favicon.ico         
│   ├── globals.css         
│   ├── layout.tsx          
│   └── not-found.tsx       
│
├── components/             
│
├── contexts/              
│
├── lib/                    
│   ├── constants.ts        
│   ├── hooks.ts           
│   ├── server-utils.ts     
│   ├── types.ts            
│   ├── utils.ts            
│   ├── validations.ts      
│   ├── auth.ts             
│   ├── firebase.ts         
│   └── middleware.ts  
```








