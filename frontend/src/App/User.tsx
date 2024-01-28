import React , {useState,useEffect}from 'react';
import { useNavigate, Link } from 'react-router-dom';
import '../css/style.css';

//ユーザーテーブル
type Users = {
  id: number;
  name: string;
  post: string;
};


const User = () => {
  //ユーザーテーブル
  const [user, setUsers] = useState<Users[] | null>(null);
  //ユーザーの名前
  const [name, setName] = useState('');
  //ユーザーの役職
  const [post, setPost] = useState('');
  
  useEffect(() => {
    // ページがマウントされたときにデータを取得
    fetchUser();
  }, []); 


  //データベース情報表示
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
  //ユーザー情報登録
  const sendPersonData = async () => {
    try {
      const person = {name,post}
      console.log(person);
      const response = await fetch('http://localhost:3000/user/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(person),
      });

      const result = await response.json();
      console.log('Response from server:', result);

      setUsers(result);
    } catch (error) {
      console.log("Error:", error);
    }
  };
  
  //Userカラム削除
  const deleteUser = async (id: number) => {
    try {
      const response = await fetch(`http://localhost:3000/user/delete/${id}`, {
        method: 'DELETE',
      });

      // データ削除後、再度データを取得する
      const data = await response.json();
      console.log('Fetched todos:', data);
      setUsers(data);
    } catch (error) {
      console.log('Error:', error);
    }
  };

  const chName = (e: any) => {
    setName(e.target.value);
  };

  const chPost = (e: any) => {
    setPost(e.target.value);
  };


  return (
    <div>
      <h1>ユーザー一覧</h1>
      <label>
        <span>名前：</span>
        <input type="text" value={name} onChange={chName}></input>
      </label>
      <br />
      <label>
        <span>役職：</span>
        <input type="text" value={post} onChange={chPost}></input>
      </label>
      <br />
      <button onClick={sendPersonData}>ユーザー登録</button>
      <table>
        <thead>
          <tr>
            <th className="space">削除</th>
            <th className="space">名前</th>
            <th className="space">役職</th>
          </tr>
        </thead>
        <tbody>
        {user?.map((user) => (
          <tr key={user.id}>
            <td><a href='#' onClick={() => deleteUser(user.id)}>❌</a></td>
            <td>{user.name}</td>
            <td>{user.post}</td>
          </tr>
        ))}
        </tbody>
      </table>
    </div>
  );
};
export default User;