import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Todo from './App/App';
import User from './App/User';
import History from './App/History';

function Routing() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Todo />} />
        <Route path="/user" element={<User />} />
        <Route path="/history" element={<History />} />
      </Routes>
    </div>
  );
}
export default Routing;