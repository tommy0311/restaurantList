# 餐廳清單 

此專案提供使用者搜尋、檢視餐廳資訊，例如:餐廳類別、地址、評分、描述等

## 功能列表

- 依照餐廳名稱及餐廳類別搜尋
- 檢視餐廳詳細資訊包含類別、地址、電話、評分、圖片及 Google Map
  - 點選 Google Map`顯示詳細地圖`可查看位置詳細資料

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

3.開啟程式

```
npm run start  //執行程式
```

終端顯示 `db is connected!` 即啟動完成，請至[http://localhost:3000](http://localhost:3000)開始使用程式

## Test Data


## Screen Photo
1. 首頁
<img width="812" alt="index" src="https://user-images.githubusercontent.com/12669644/168429886-e27c14a8-8a70-4314-8261-f1b3577d2053.png">

2. 搜尋
<img width="831" alt="search" src="https://user-images.githubusercontent.com/12669644/168429892-bf3da5e8-8824-4da8-891c-3bfa0290b126.png">

3. 檢視
<img width="771" alt="show" src="https://user-images.githubusercontent.com/12669644/168429895-112da5bf-94d3-460b-b256-fe9f68f51efe.png">



## 使用工具

- [Express](https://www.npmjs.com/package/express) - 應用程式架構
- [Express-Handlebars](https://www.npmjs.com/package/express-handlebars) - 模板引擎
