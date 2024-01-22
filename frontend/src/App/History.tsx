import React , {useState,useEffect}from 'react';
import { useNavigate, Link } from 'react-router-dom';
import '../css/style.css';

type History = {
  id: number;
  list: string;
  user_id: any;
  delete_flag: number;
  delete_user: string;
};

const History = () => {
  const [history, setHistory] = useState<History[] | null>(null);

  useEffect(() => {
    // ページがマウントされたときにデータを取得
    fetchHistory();
  }, []); 

  //データベース情報表示
  const fetchHistory = async () => {
    try {
      const response = await fetch('http://localhost:3000/data');
      const data = await response.json();
      console.log('Fetched todos:', data);
      // delete_flag が 1 のものだけをフィルタリング
      const filteredData = data.filter((item: History) => item.delete_flag === 1);
      console.log('Fetched todos:', filteredData);
      setHistory(filteredData);
    } catch (error) {
      console.error('Error fetching todos:', error);
    }
  };

  //Todoカラム削除
  const deleteTask = async (id: number) => {
    try {
      const response = await fetch(`http://localhost:3000/history/delete/${id}`, {
        method: 'DELETE',
      });

      // データ削除後、再度データを取得する
      const data = await response.json(); 
      console.log('Fetched todos:', data);
      setHistory(data);
    } catch (error) {
      console.log('Error:', error);
    }
  };

  return (
    <div>
      <h1>削除履歴</h1>
      <table>
        <thead>
          <tr>
            <th className="space">削除</th>
            <th className="space">todo</th>
            <th className="space">削除ユーザー</th>
          </tr>
        </thead>
        <tbody>
        {history?.map((history) => (
            <tr key={history.id}>
              <td><a href='#' onClick={() => deleteTask(history.id)}>❌</a></td>
              <td>{history.list}</td>
              <td>{history.delete_user}</td>
            </tr>
        ))}
        </tbody>
      </table>
    </div>
  );
};
export default History;