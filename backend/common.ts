import express from "express";
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


// データベース接続を確認して取得または新規作成
const getClient = async () => {
  if (!client) {
    await createConnection();
  }
  return client;
};



const getListSQL = async (tableName: string) => {
  try {
    if (!client) {
      await getClient();
    }

    const query = `SELECT * FROM ${tableName}`;

    const [rows, fields] = await client.execute(query);

    return rows;
  } catch (error) {
    console.error("Error fetching user list:", error);
    throw error;
  }
}; 

//データ追加
const insertSQL = async (tableName:string, columns:string ,userData: string) => {
  try {
    if (!client) {
      await getClient();
    } 

    const query = `INSERT INTO ${tableName} (${columns}) VALUES ("${userData}")`;

    const [result] = await client.execute(query);

    console.log("Inserted user with ID:", result.insertId);  // result.insertId を表示す
  } catch (error) {
    console.error("Error inserting user:", error);
    throw error;
  }
};

// データ削除
const deleteSQL = async (tableName:string, itemId: number) => {
  try {
    const client = await getClient();

    const query = `DELETE FROM ${tableName} WHERE id = ${itemId}`;

    const [result] = await client.execute(query);

    return result;
  } catch (error) {
    console.error('Error deleting item:', error);
    throw error;
  }
};

const getList = async (tableName: string, res:express.Response) => {
  try {
    const userList = await getListSQL(tableName);
    res.json(userList);
  } catch (error) {
    console.error("Error processing the request:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

const deleteList = async (tableName: string,deleteId: number, res:express.Response) => {
  try {
    const result = await deleteSQL(tableName,deleteId);
    if (result.affectedRows === 1) {
      console.log('Item deleted successfully');
    } else {
      console.log('Item not found');
    }
    //データベース情報取得
    const userList = await getListSQL(tableName);
      res.json(userList);
  } catch (error) {
    console.error('Error deleting item:', error);
  }
}

module.exports = {
  createConnection,
  getClient,
  getListSQL,
  insertSQL,
  deleteSQL,
  getList,
  deleteList
};