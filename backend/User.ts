/* User.ts */
import { table } from "console";
import express from "express";

//SQL共通処理
const common =require('./common');
const router = express.Router();

const bodyParser = require('body-parser');

//データベース接続
common.createConnection;
const tableName = "user";
const coloumsId = "id";
const coloumsName = "name";
const coloumsPost = "post";

router.use(bodyParser.json());


//一覧処理
router.get("/data", async(req: express.Request, res: express.Response) => {
  await common.getList(tableName,res);
});

router.post("/add", async(req: express.Request, res: express.Response) => {
  const receivedPerson = req.body;
  console.log(receivedPerson);
  if(receivedPerson.name != null && receivedPerson.name != "" && receivedPerson.post != null && receivedPerson.post != ""){
  common.insertSQL(tableName,coloumsName+","+coloumsPost,receivedPerson.name+'"' +","+ '"'+receivedPerson.post);
  }
  const userList = await common.getListSQL(tableName);
  res.json(userList);
});


//データ削除処理
 router.delete('/delete/:id', async (req: express.Request, res: express.Response) => {
  //リクエストID取得
  const itemId = req.params.id;
  common.deleteList(tableName,itemId,res);
});


module.exports = router;