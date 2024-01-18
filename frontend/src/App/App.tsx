import React, { useEffect, useState } from 'react';
import '../css/App.css';

type Todo = {
  id: number;
  list: string;
  user_id: any;
  delete_flag: number;
};

type Users = {
  id: number;
  name: string;
  post: string;
};

function App() {
  const [user, setUsers] = useState<Users[] | null>(null);
  const [todo, setTodos] = useState<Todo[] | null>(null);
  const [data, setData] = useState('');
  const [selectUser, setSelectUser] = useState('0');
  
  useEffect(() => {
    // ページがマウントされたときにデータを取得
    fetchTodos();
    fetchUser();
  }, []); 

  useEffect(() => {    
    fetchTodos();
  }, [selectUser]); 

  const sendDataToNode = async () => {
    try {
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
    if(selectUser != "0"){
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
      }
    };
  }

  const todoVal = (e: any) => {
    setData(e.target.value);
  };
  const userVal = (e:any) => {
    setSelectUser(e.target.value);
  };

  return (
    <div>
      <h1>TODOリスト</h1>
      <div className="content">
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

      <div>
        <div><input type="radio" name="user" value="0" checked={selectUser === "0"} onChange={userVal} />誰か</div>
        {user?.map((user) => (
        <div key={user.id}>
          <div><input type="radio" name="user" value={user.id} checked={selectUser === user.name} onChange={userVal}/>{user.name}</div>
        </div>
          ))}
      </div>
      {selectUser}
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