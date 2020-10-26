import React from "react";
import useSWR from "swr";
import { APIKEY, BASEURL } from "../../util/constants";

const StocksOverMA200 = () => {
  const {
    data,
    error,
  } = useSWR(
    `https://apiservice.borsdata.se/v1/instruments/kpis/318/200day/diff${APIKEY}`,
    { refreshInterval: 0 }
  );

  if (error) return "An error has occurred: " + error.message;
  if (!data) return <div>loading...</div>;

  if (data) {
    const stocksOverMA200 =
      data && data.values && data.values.filter((diff) => diff.n > 0);
    const numberOfStocks = data.values.filter((el) => el.n !== null).length;
    console.log("data:", data);
    return (
      <div>
        <div> KPI: {data && data.group}</div>
        Total stocks over MA200 ({numberOfStocks}):{" "}
        {stocksOverMA200 && stocksOverMA200.length}
        <div>
          Percentage:{" "}
          {Number.parseFloat(
            ((numberOfStocks / stocksOverMA200.length - 1) * 100).toFixed(2)
          )}
        </div>
      </div>
    );
  }
};

export default StocksOverMA200;
