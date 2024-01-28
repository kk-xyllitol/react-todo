import React, { useEffect, useState } from 'react';
import '../css/App.css';

//TODOリストテーブル
type Todo = {
  id: number;
  list: string;
  user_id: any;
  delete_flag: number;
};
//ユーザーテーブル
type Users = {
  id: number;
  name: string;
  post: string;
};

function App() {
  //ユーザーテーブル
  const [user, setUsers] = useState<Users[] | null>(null);
  //TODOテーブル
  const [todo, setTodos] = useState<Todo[] | null>(null);
  //TODO入力値
  const [data, setData] = useState('');
  //ユーザーID
  const [selectUser, setSelectUser] = useState('0');
  //エラーメッセージ
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  
  useEffect(() => {
    // ページがマウントされたときにデータを取得
    fetchTodos();
    fetchUser();
  }, []); 

  useEffect(() => {    
    fetchTodos();
  }, [selectUser]); 

  useEffect(() => {    
    fetchTodos();
    // selectUserが変更されたときにここで処理を追加
    const blankElement = document.getElementById('blank');
    if (blankElement) {
      blankElement.innerText = selectUser === '0' ? '' : getSelectedUserName() + "のタスク";
  
    }
  }, [selectUser]);
  //TODO入力値送信
  const sendDataToNode = async () => {
    try {
      setErrorMessage(null);
      const response = await fetch(`http://localhost:3000/api`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ data, selectUser })
      });

      const result = await response.json();
      console.log('Response from server:', result);

      setTodos(result);
    } catch (error) {
      console.log("Error:", error);
      setErrorMessage("エラーが発生しました。もう一度お試しください。");
    }
  };
//データベース情報表示
  const fetchTodos = async () => {
    try {
      const response = await fetch('http://localhost:3000/data');
      const data = await response.json();
      console.log('Fetched todos:', data);
      setTodos(data);
    } catch (error) {
      console.error('Error fetching todos:', error);
    }
  };
  //ユーザー情報取得
  const fetchUser = async () => {
    try {
      const response = await fetch('http://localhost:3000/user/data');
      const data = await response.json();
      console.log('Fetched todos:', data);
      setUsers(data);
    } catch (error) {
      console.error('Error fetching todos:', error);
    }
  };

  //Todoカラム削除
  const deleteTodo = async (id: number) => {
    if(selectUser !== "0"){
      try {
        const response = await fetch(`http://localhost:3000/delete/${id}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ selectUser })
        });
  
        // データ削除後、再度データを取得する
        const data = await response.json();
        console.log('Fetched todos:', data);
        setTodos(data);
      } catch (error) {
        console.log('Error:', error);
        setErrorMessage("エラーが発生しました。もう一度お試しください。");
      }
    } else {
      // ユーザーを選択していない場合のエラーメッセージ
      setErrorMessage("ユーザーを選択してください");
    };
  }
  //ユーザー名前取得
  const getSelectedUserName = () => {
    const selectedUser = user?.find(u => u.id.toString() === selectUser);
    return selectedUser ? selectedUser.name : '';
  };

  const todoVal = (e: any) => {
    setData(e.target.value);
  };
  const userVal = (e:any) => {
    setSelectUser(e.target.value);
    setErrorMessage(null);
  };

  return (
    <div>
      <h1>TODOリスト</h1>
      <div className="content">
        <p>{errorMessage}</p>
        <input type="text" value={data} onChange={todoVal}></input>
        <button onClick={() => sendDataToNode()}>追加</button>
      </div>
      <div>誰かのタスク</div>
      <ul>
        {todo?.map((todo) => (
          todo.user_id === 0 && todo.delete_flag == 0 && (
            <li key={todo.id}>
              <button onClick={() => deleteTodo(todo.id)}>×</button>
              {todo.list}
            </li>
          )
        ))}
      </ul>

      <div id="user_radio">
        <div>ユーザー一覧</div>
        <label><input type="radio" name="user" value="0" checked={selectUser === "0"} onChange={userVal} />誰か</label>
        {user?.map((user) => (
        <div key={user.id}>
          <label><input type="radio" name="user" value={user.id.toString()} checked={selectUser === user.id.toString()} onChange={userVal} />{user.name}</label>
        </div>
          ))}
      </div>
      <div id="blank">{getSelectedUserName()}</div>
      <ul>
        {todo?.map((todo) => (
          todo.user_id == selectUser && todo.delete_flag == 0 && todo.user_id != 0 && (
            <li key={todo.id}>
              <button onClick={() => deleteTodo(todo.id)}>×</button>
              {todo.list}
            </li>
          )
        ))}
      </ul>
    </div>
    
  );
}

export default App;