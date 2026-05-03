# drink-picker

純前端飲料挑選工具，沿用 [Sides/project-common](../../project-common) 的 Vue 3 + Pinia + Vite 架構（精簡版：拿掉 ky / vue-i18n / auth / cypress / storybook）。

## 功能

- 飲料清單與詳情：店家、特色、價格（M / L）、熱量、咖啡因、推薦甜度 / 冰塊 / 加料
- 店家清單與詳情：步行時間、營業時間、評分、菜單外連、外送平台連結（Uber Eats / foodpanda）
- 篩選：關鍵字、店家、類型 tag、咖啡因等級、最高價
- 「幫我選」：依心情（提神 / 想睡 / 大熱天 / 預算緊⋯）+ 預算抽 3 杯
- 我的最愛 ⭐ / 不要再推薦 ❌（封鎖清單會從推薦池排除）
- 喝過紀錄：當下的甜度 / 冰塊 / 容量 / 評分 / 備註，含偏好統計（最常喝 / 最常買 / 平均評分）
- 個人化資料全寫 localStorage，無後端

## 開發

```bash
nvm use         # node 22+
npm install
npm run serve   # http://localhost:8080
```

其他：

```bash
npm run lint
npm run test
npm run production   # 輸出到 public/
```

## 結構

依 project-common 規範：

```
resources/
├── js/
│   ├── apis/        # 純前端版：載 JSON + mockResponse helper
│   ├── bootstrap/   # boot() 編排：載目錄 → 還原偏好 → 訂閱 → 路由
│   ├── components/  # App / app / common / pages
│   ├── composables/
│   ├── config/      # app, storage
│   ├── data/        # drinks.json, shops.json
│   ├── enums/
│   ├── formatters/  # drink/Filter, drink/Picker, app/Router
│   ├── libs/        # EnumMap, Cache, random
│   ├── maps/        # navigation/PageRoute, navigation/MainNav, drink/*
│   ├── router/
│   ├── stores/      # drink, shop, favorite, history, filter, picker
│   └── tests/
└── sass/            # reset-css + tailwind utilities + 全域變數
```

更換資料來源：把 `apis/drink/drink.js` 與 `apis/shop/shop.js` 的 `mockResponse` 換成真實 fetch / ky 即可，store 與元件不必動。
