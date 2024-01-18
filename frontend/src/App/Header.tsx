import { Outlet, Link} from 'react-router-dom';
import '../css/style.css';

const Route_top = () => {
  const Endpoint = 'http://localhost:3000/api';
  const sendDataToNode = async (apiEndpoint: string) => {
    try {
      const response = await fetch(apiEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      // レスポンスの処理
      const result = await response.json();
      console.log('Response from server:', result);

    } catch (error) {
      console.log('Error:', error);
    }
  };

  return (
    <div>
      <nav id="hed">
        <Link to="/" onClick={() => sendDataToNode(Endpoint)}>TODOリスト</Link>
        <Link to="/user">ユーザー追加</Link>
        <Link to="/history">完了履歴</Link>
      </nav>
      <hr />
      <Outlet />
      
    </div>
  );
};
export default Route_top;