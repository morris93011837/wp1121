# Web Programming HW#1

有實作進階要求（至少完成其中2點即可得分）之「Filter」與「更改日記卡的日期」


啟動方式同課堂範例程式：
1.在backend中建立.env，格式如同.env.example，其中PORT=8000，MONGO_URL=您的mongodb database
  (How to set up: https://www.youtube.com/watch?v=O5cmLDVTgAs (從 2h01m08s 開始))
2.啟動backend：
  在terminal依序輸入"wsl"、"cd backend"、"yarn"、"yarn start"，等到顯示出"Connected to MongoDB"、"Server running on port http://localhost:8000"，再執行下一步
3.開啟 frontend 之 index.html即可操作

註: 1.不建議使用台大 wi-fi 啟動 backend 連接 mongodb，可能出現 query REFUSED 
    2.若執行yarn lint 時顯示"warning ..\..\..\..\package.json: No license field"，通常為本機端母資料夾有其他package.json檔案所導致，與此程式無關，此程式之frontend/package.json與backend/package.json皆有"license": "MIT"