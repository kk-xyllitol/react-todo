/* History.ts */
import express from "express";

//SQL共通処理
const common =require('./common');
const router = express.Router();

const bodyParser = require('body-parser');

//データベース接続、カラム情報
common.createConnection();
const tableName = "todo";
const coloumsid = "id";
const coloumsList = "list";
const userId = "user_id";
const deleteFlag = "delete_flag";
const deleteUser = "delete_user";

router.use(bodyParser.json());


//一覧処理
router.get("/data", async(req: express.Request, res: express.Response) => {
  await common.getList(tableName,res);
});

//データ削除処理
 router.delete('/delete/:id', async (req: express.Request, res: express.Response) => {
  //リクエストID取得
  const itemId = req.params.id;
  common.deleteList(tableName,itemId,res);
});


module.exports = router;