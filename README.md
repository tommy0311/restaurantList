# 餐廳清單 

此專案提供使用者搜尋、檢視餐廳資訊，例如:餐廳類別、地址、評分、描述等

## 功能列表

- 依照餐廳名稱及餐廳類別搜尋
- 檢視餐廳詳細資訊包含類別、地址、電話、評分、圖片及 Google Map
  - 點選 Google Map`顯示詳細地圖`可查看位置詳細資料
- 使用者可註冊建立帳號
- 使用者登入後可新增自己的餐廳清單
- 點擊餐廳Detail按鈕，使用者可進入詳細資料頁面，檢視餐廳資訊
- 點擊餐廳Edit按鈕，使用者可進入編輯頁面，修改餐廳資訊
- 點擊Delete按鈕可刪除該餐廳


### 安裝

1.開啟終端機(Terminal)cd 到存放專案本機位置並執行:

```
git clone https://github.com/tommy0311/restaurantList.git
```

2.初始

```
cd restaurantList  //切至專案資料夾
```
```
npm install  //安裝套件
```
3.參考 .env.example，在根目錄建立 .env

4.載入種子資料

```
npm run seed
```

5.開啟程式

```
npm run start
```

終端顯示 `db is connected!` 即啟動完成，請至[http://localhost:3000](http://localhost:3000)開始使用程式

## Test Data


## Screen Photo
1. 首頁
<img width="693" alt="index" src="https://user-images.githubusercontent.com/12669644/172614522-d6d6bebf-ea7d-426c-9970-112bed41e6c5.png">

2. 搜尋
<img width="831" alt="search" src="https://user-images.githubusercontent.com/12669644/168429892-bf3da5e8-8824-4da8-891c-3bfa0290b126.png">

3. 檢視
<img width="771" alt="show" src="https://user-images.githubusercontent.com/12669644/168429895-112da5bf-94d3-460b-b256-fe9f68f51efe.png">

4. 登入
<img width="668" alt="login" src="https://user-images.githubusercontent.com/12669644/172614674-2d614504-3b71-45c4-8602-af1980bef0f1.png">

5. 註冊
<img width="668" alt="register" src="https://user-images.githubusercontent.com/12669644/172614751-25924249-ca1b-4325-b5a9-b149a95fb7ae.png">

## 使用工具

- [Express](https://www.npmjs.com/package/express) - 應用程式架構
- [Express-Handlebars](https://www.npmjs.com/package/express-handlebars) - 模板引擎
