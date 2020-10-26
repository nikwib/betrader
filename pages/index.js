import React from "react";
import Link from "next/link";
import StocksOverMA200 from "./ma200/StocksOverMA200";

const App = () => {
  console.log('env', process.env.BD_API_KEY);
  return (
    <div>
      <ul>
        <li>
          <Link href="/">
            <a>Home</a>
          </Link>
        </li>
        <li>
          <Link href="/sectors">
            <a>Sectors</a>
          </Link>
        </li>
        <li>
          <Link href="/ma200">
            <a>MA200</a>
          </Link>
          <StocksOverMA200 />
        </li>
      </ul>
    </div>
  );
};

export default App;
