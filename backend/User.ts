import express from "express";

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

    const [rows, fields] = await client.execute("SELECT * FROM user");

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
      "INSERT INTO user (list) VALUES (?)",
      [userData]  // userData.list を指定する
    );

    console.log("Inserted user with ID:", result.insertId);  // result.insertId を表示す
  } catch (error) {
    console.error("Error inserting user:", error);
    throw error;
  }
};


//一覧処理
app.get("/user", async(req: express.Request, res: express.Response) => {
  console.log("test");
  try {
    const userList = await getUserList();
    res.json(userList);
    
  } catch (error) {
    console.error("Error processing the request:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
