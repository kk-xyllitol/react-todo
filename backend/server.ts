/* server.ts */

import express from "express";

const app: express.Express = express();
const port = 8000;

const bodyParser = require('body-parser');

app.use(bodyParser.json());

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