import React , {useState}from 'react';
import { useNavigate, Link } from 'react-router-dom';
import '../css/style.css';

type User = {
  id: number;
  name: string;
  post: string;
};


const UserAdd = () => {
  const [user, setUsers] = useState<User[] | null>(null);

  return (
    <div>
      <h1>ユーザー一覧</h1>
      <label>
        <span>名前：</span>
        <input type="text"></input>
      </label>
      <br />
      <label>
        <span>役職：</span>
        <input type="text"></input>
      </label>
      <br />
      <button>ユーザー登録</button>
      <ul>
      {user?.map((user) => (
        
        <li key={user.id}>{user.name}</li>
      ))}
      </ul>
    </div>
  );
};
export default UserAdd;