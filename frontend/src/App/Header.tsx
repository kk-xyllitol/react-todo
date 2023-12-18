import { Outlet, Link} from 'react-router-dom';
import '../css/style.css';

const Route_top = () => {
  return (
    <div>
      <nav id="hed">
        <Link to="/">TODOリスト</Link>
        <Link to="/route_1">ユーザー追加</Link>
        <Link to="/route_2">完了履歴</Link>
      </nav>
      <hr />
      <Outlet />
      
    </div>
  );
};
export default Route_top;