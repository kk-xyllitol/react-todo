/* server.ts */
import express from "express";
//SQL共通処理
const common =require('./common');
const userRoutes = require('./User');
const history = require('./History');
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
const deleteFlag = "delete_flag";
const deleteUser = "delete_user";

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
  await common.insertSQL(tableName,coloumsList + ',' + deleteFlag + ',' + userId, data + '", 0 ,"' + selectUser); 
  }
  const userList = await common.getListSQL(tableName);
  res.json(userList);

});
//データ削除処理
app.post('/delete/:id', async (req: express.Request, res: express.Response) => {
  //リクエストID取得
  const id = req.params.id;
  const selectUser = req.body.selectUser;
  const userName = await common.selectSQL("name", "user", selectUser);
  console.log(userName);

  await common.updataSQL(tableName, deleteFlag + " = 1," + deleteUser + " = " + userName, coloumsid + " = " + id);
});
 
// ユーザールートを使用
app.use('/user', userRoutes);
//完了履歴
app.use('./history', history);

app.listen(port, () => {
  console.log(`port ${port} でサーバー起動中`);
});