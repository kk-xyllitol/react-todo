/* server.ts */

import { table } from "console";
import { create } from "domain";
import express from "express";
import { get } from "http";
import { todo } from "node:test";

const common =require('./common');
//データベース接続
common.createConnection;

const app: express.Express = express();
const port = 8000;

const bodyParser = require('body-parser');

app.use(bodyParser.json());

const tableName = "todo";
let coloums = "list";

//初期表示
app.get("/", async(req: express.Request, res: express.Response) => {
  try {
    const userList = await common.getUserList(tableName);
    res.json(userList);
    
  } catch (error) {
    console.error("Error processing the request:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

//一覧処理
app.get("/data", async(req: express.Request, res: express.Response) => {
  try {
    const userList = await common.getUserList(tableName);
    res.json(userList);
  } catch (error) {
    console.error("Error processing the request:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

//追加処理
app.post("/api", async(req: express.Request, res: express.Response) => {

  const receivedData = req.body.data;
  if(receivedData != "" && receivedData != null){
  await common.insertUser(tableName,coloums,receivedData);
  }
  const userList = await common.getUserList(tableName);
  res.json(userList);

});
//データ削除処理
app.delete('/api/:id', async (req: express.Request, res: express.Response) => {
  //リクエストID取得
  const itemId = req.params.id;
 try {
  const result = await common.deleteUser(tableName,itemId);
  if (result.affectedRows === 1) {
    console.log('Item deleted successfully');
  } else {
    console.log('Item not found');
  }
  //データベース情報取得
  const userList = await common.getUserList(tableName);
    res.json(userList);
} catch (error) {
  console.error('Error deleting item:', error);
}
});


app.listen(port, () => {
  console.log(`port ${port} でサーバー起動中`);
});