import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Todo from './App/App';
import User from './App/User';

function Routing() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Todo />} />
        <Route path="/user" element={<User />} />

      </Routes>
    </div>
  );
}
export default Routing;