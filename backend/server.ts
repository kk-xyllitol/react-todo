/* server.ts */
import express from "express";
//SQL共通処理
const common =require('./common');
const userRoutes = require('./User');
//データベース接続
common.createConnection;

const app: express.Express = express();
const port = 8000;

const bodyParser = require('body-parser');

app.use(bodyParser.json());

const tableName = "todo";
const coloumsid = "id";
const coloumsList = "list";
const userId = "user_id";

//初期表示
app.get("/", async(req: express.Request, res: express.Response) => {
  try {
    const userList = await common.getListSQL(tableName);
    res.json(userList);
    
  } catch (error) {
    console.error("Error processing the request:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

//一覧処理
app.get("/data", async(req: express.Request,res: express.Response) => {
  await common.getList(tableName,res);
});

//追加処理
app.post("/api", async(req: express.Request, res: express.Response) => {

  const {data, selectUser} = req.body;
  console.log(selectUser);
  if(data != "" && data != null && selectUser != "" && selectUser != null){
  await common.insertSQL(tableName,coloumsList + ',' + userId,data + '","' + selectUser);
  }
  const userList = await common.getListSQL(tableName);
  res.json(userList);

});
//データ削除処理
app.delete('/api/:id', async (req: express.Request, res: express.Response) => {
  //リクエストID取得
  const itemId = req.params.id;
 common.deleteList(tableName,itemId,res);
});

// ユーザールートを使用
app.use('/user', userRoutes);

app.listen(port, () => {
  console.log(`port ${port} でサーバー起動中`);
});