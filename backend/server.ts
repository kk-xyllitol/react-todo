/* server.ts */

import { create } from "domain";
import express from "express";
import { get } from "http";

const app: express.Express = express();
const port = 8000;

const bodyParser = require('body-parser');

app.use(bodyParser.json());
const mysql = require('mysql2/promise');
let client :any;
//データベース接続
const createConnection = async() => {
  try{
    client = await mysql.createConnection({
    host: "localhost",
    port: 8889,
    user: "root",
    password: "root",
    database: "react-todo"
    });
  } catch (error:any) {
    console.log("error" + error);
  }
};


const getUserList = async () => {
  try {
    if (!client) {
      await createConnection();
    }

    const [rows, fields] = await client.execute("SELECT * FROM todo");

    return rows;
  } catch (error) {
    console.error("Error fetching user list:", error);
    throw error;
  }
};
//データ追加
const insertUser = async (userData: any) => {
  try {
    if (!client) {
      await createConnection();
    }

    const [result] = await client.query(
      "INSERT INTO todo (list) VALUES (?)",
      [userData]  // userData.list を指定する
    );

    console.log("Inserted user with ID:", result.insertId);  // result.insertId を表示す
  } catch (error) {
    console.error("Error inserting user:", error);
    throw error;
  }
};


//一覧処理
app.get("/data", async(req: express.Request, res: express.Response) => {
  try {
    const userList = await getUserList();
    console.log(userList);
    res.json(userList);
    
  } catch (error) {
    console.error("Error processing the request:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
//追加処理
app.post("/api", async(req: express.Request, res: express.Response) => {

  try {
    const receivedData = req.body.data;
    if(receivedData != ""){
      await insertUser(receivedData);
    }
    const userList = await getUserList();
    console.log(userList);
    res.json(userList);
    
  } catch (error) {
    console.error("Error processing the request:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
  

});
//データ削除処理
app.delete('/api/:id', async (req: express.Request, res: express.Response) => {
  const itemId = req.params.id;
  try {
    if (!client) {
      await createConnection();
    }

    const [result] = await client.query(
      'DELETE FROM todo WHERE id = ?',
      [itemId]
    );
    

    if (result.affectedRows === 1) {
      res.json({ message: 'Item deleted successfully' });
    } else {
      res.status(404).json({ error: 'Item not found' });
    }
  } catch (error) {
    console.error('Error deleting item:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  };
});

app.listen(port, () => {
  console.log(`port ${port} でサーバー起動中`);
});