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

const insertUser = async (userData: any) => {
  console.log(userData);
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



app.get("/", (req: express.Request, res: express.Response) => {
  res.send("Hello, world!");
});

app.post("/api", async(req: express.Request, res: express.Response) => {

  try {
    const receivedData = req.body.data;
    if(receivedData != ""){
      await insertUser(receivedData);
    }
    const userList = await getUserList();
    console.log(userList);

    
  } catch (error) {
    console.error("Error processing the request:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
  

});


app.listen(port, () => {
  console.log(`port ${port} でサーバー起動中`);
});