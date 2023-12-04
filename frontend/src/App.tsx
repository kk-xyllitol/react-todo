import React, { useEffect, useState } from 'react';
import './App.css';

type Fruit = {
  id: number;
  name: string;
  price: number;
};

function App() {
  const [fruits, setFruits] = useState<Fruit[] | null>(null);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        /* ↓「http://localhost:8000」を消す */
        const res = await fetch("/api");
        const json: React.SetStateAction<Fruit[] | null> = await res.json();
        setFruits(json);
      } catch (e: unknown) {
        if (e instanceof Error) {
          console.error(e.message);
        }
      }
    };

    fetchData();
  }, []); // 空の依存配列は、useEffectがマウント時に一度だけ実行されることを保証します

  return (
    <div className="container fruitsList">
      <h1>Fruits Store</h1>

      {fruits?.map((fruit) => (
        <div key={fruit.id}>
          <div className="text">
            <h2>{fruit.name}</h2>
            <p>{`￥${fruit.price}`}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default App;