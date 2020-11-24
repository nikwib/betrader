import React from "react";
import Link from "next/link";
import StocksOverMA200 from "./ma200/StocksOverMA200";

const App = () => {
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
        </li>
        <li>
          <Link href="/ma200ss">
            <a>MA200 ss</a>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default App;
