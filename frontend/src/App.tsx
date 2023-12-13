import React, { useEffect, useState } from 'react';
import './App.css';

type Todo = {
  id: number;
  list: string;
};

function App() {
  const [todo, setTodos] = useState<Todo[] | null>(null);
  const [data, setData] = useState('');

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


// 空の依存配列は、useEffectがマウント時に一度だけ実行されることを保証します

  const val = (e:any) => {
    setData(e.target.value);
  };

  return (
    <div className="container fruitsList">
      <input type="text" value={data} onChange={val}></input>
      <button onClick={sendDataToNode}>追加</button>
      <div>{data}</div>
      <ul>
      {todo?.map((todo) => (
        
        <li key={todo.id}><button>×</button>{todo.list}</li>
      ))}
      </ul>
    </div>
  );
}

export default App;