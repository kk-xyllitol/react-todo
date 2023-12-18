import React, { useEffect, useState } from 'react';
import '../css/App.css';

type Todo = {
  id: number;
  list: string;
};

function App() {
  const [todo, setTodos] = useState<Todo[] | null>(null);
  //入力値取得
  const [data, setData] = useState('');
  //データベース追加関数
  const sendDataToNode = async () => {
    try {
      const response = await fetch('http://localhost:3000/api', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ data }),
      });

      // レスポンスの処理
      const result = await response.json();
      console.log('Response from server:', result);

      // サーバーからのデータを state にセットするなどの処理を行う
      setTodos(result);
    } catch (error) {
      console.log("sippai");
    }
  };
  //todoリスト一覧表示
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
  //todo削除
  const deleteTodo = async (id: number) => {
    try {
      const response = await fetch(`http://localhost:3000/api/${id}`, {
        method: 'DELETE',
      });

      const result = await response.json();
      console.log('Response from server:', result);

      // データ削除後、再度データを取得する
      fetchTodos();
    } catch (error) {
      console.log('Error:', error);
    }
  };


// 空の依存配列は、useEffectがマウント時に一度だけ実行されることを保証します

  const val = (e:any) => {
    setData(e.target.value);
  };

  return (
    <div>
      <h1>TODOリスト</h1>
      <div className="content">
        <input type="text" value={data} onChange={val}></input>
        <button onClick={sendDataToNode}>追加</button>
        <div>{data}</div>
      </div>
      <ul>
      {todo?.map((todo) => (
        
        <li key={todo.id}><button onClick={() => deleteTodo(todo.id)}>×</button>{todo.list}</li>
      ))}
      </ul>
    </div>
  );
}

export default App;