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

console.log(createConnection);

app.get("/", (req: express.Request, res: express.Response) => {
  res.send("Hello, world!");
});

app.post("/api", (req: express.Request, res: express.Response) => {
  const receivedData = req.body.data;
  console.log(receivedData);
  console.log("test");
  res.json([
    {
      id:1,
      name:"りんご",
      price:200,
    },
    {
      id:2,
      name:"バナナ",
      price:300,
    },
    {
      id:3,
      name:"みかん",
      price:"150",
    },
    {
      id:4,
      name:"メロン",
      price:"2000",
    },
  ]);
});

app.listen(port, () => {
  console.log(`port ${port} でサーバー起動中`);
});