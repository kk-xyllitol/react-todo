import React, { useEffect, useState } from 'react';
import '../css/App.css';

type Todo = {
  id: number;
  list: string;
};

function App() {
  const [todo, setTodos] = useState<Todo[] | null>(null);
  const [data, setData] = useState('');
  
  useEffect(() => {
    // ページがマウントされたときにデータを取得
    fetchTodos();
  }, []); 

  const sendDataToNode = async () => {
    try {
      const response = await fetch('http://localhost:3000/api', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ data }),
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

  //Todoカラム削除
  const deleteTodo = async (id: number) => {
    try {
      const response = await fetch(`http://localhost:3000/api/${id}`, {
        method: 'DELETE',
      });

      // データ削除後、再度データを取得する
      const data = await response.json();
      console.log('Fetched todos:', data);
      setTodos(data);
    } catch (error) {
      console.log('Error:', error);
    }
  };

  const val = (e: any) => {
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
          <li key={todo.id}>
            <button onClick={() => deleteTodo(todo.id)}>×</button>
            {todo.list}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;