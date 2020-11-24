import { FunctionComponent } from "react";
import { APIKEY } from "../../util/constants";
import DonutWithValue from "../../src/components/DonutWithValue/DonutWithValue";
interface IProps {
  stocksOverMA200: number;
  numberOfStocks: number;
  percentage: number;
  group: string;
  omxspiMA200: string;
}
const IndexPage: FunctionComponent = ({
  stocksOverMA200,
  numberOfStocks,
  percentage,
  omxspiMA200,
}: IProps) => {
  return (
    <div>
      <h4> MA200 Serverside static props</h4>
      <div>
        <div>
          Number of stocks over MA200 ({numberOfStocks}): {stocksOverMA200}
        </div>
        <DonutWithValue value={percentage} />
      </div>
      <p> OMXSPI MA200: {omxspiMA200}%</p>
    </div>
  );
};
export default IndexPage;

// If you export an async function called getServerSideProps from a page,
// Next.js will pre-render this page on each request using the data returned by getServerSideProps.
interface Ma200 {
  values: [{ i: number; n: number }];
}
export async function getServerSideProps({ params, req, res }) {
  try {
    // const ma200: { values: [{ i: number; n: number }] } = await fetch(
    const ma200: Ma200 = await fetch(
      `https://apiservice.borsdata.se/v1/instruments/kpis/318/200day/diff${APIKEY}`
    ).then((ma200) => ma200.json());
    // {
    //   kpiId: 318,
    //   group: '200day',
    //   calculation: 'diff',
    //   values: [
    //     { i: 2, n: 3.12734842300415, s: null },
    //     { i: 3, n: 9.21978950500488, s: null },
    //     { i: 6, n: -37.3336906433105, s: null },

    interface InstrumentsArray {
      [index: number]: { marketId: number; insId: number; ma200value: number };
    }
    const instruments: InstrumentsArray = await fetch(
      `https://apiservice.borsdata.se/v1/instruments${APIKEY}`
    )
      .then((response) => response.json())
      .then((response) => response.instruments);
    // const instruments: [
    //   { marketId: number; insId: number; ma200value: number }
    // ] = await fetch(`https://apiservice.borsdata.se/v1/instruments${APIKEY}`)
    //   .then((response) => response.json())
    //   .then((response) => response.instruments);

    // {
    //   "instruments": [
    //       {
    //           "insId": 3,
    //           "name": "ABB",
    //           "urlName": "abb",
    //           "instrument": 0,
    //           "isin": "CH0012221716",
    //           "ticker": "ABB",
    //           "yahoo": "ABB.ST",
    //           "sectorId": 5,
    //           "marketId": 1,
    //           "branchId": 23,
    //           "countryId": 1,
    //           "listingDate": "1999-06-22T00:00:00"
    //       }...

    // const markets: { markets: [] } = await fetch(
    //   `https://apiservice.borsdata.se/v1/markets${APIKEY}`
    // ).then((markets) => markets.json());
    // {
    //   "markets": [
    //       {
    //           "id": 1,
    //           "name": "Large Cap",
    //           "countryId": 1,
    //           "isIndex": false,
    //           "exchangeName": "OMX Stockholm"
    //       },

    const instrumentsWithMa200 = instruments.map((stock) => {
      const ma200value = ma200.values.find((el) => el.i === stock.insId).n;
      return { ...stock, ma200value };
    });

    const largeCapMarketId = 1;
    const largeCapStocks: InstrumentsArray = filterStocksByMarkets(
      instrumentsWithMa200,
      largeCapMarketId
    );

    const midCapMarketId = 2;
    const midCapStocks: InstrumentsArray = filterStocksByMarkets(
      instrumentsWithMa200,
      midCapMarketId
    );

    const smallCapMarketId = 3;
    const smallCapStocks: InstrumentsArray = filterStocksByMarkets(
      instrumentsWithMa200,
      smallCapMarketId
    );

    const percentageLargeCapOverMa200 = getPercentage(largeCapStocks);
    const percentageMidCapOverMa200 = getPercentage(midCapStocks);
    const percentageSmallCapOverMa200 = getPercentage(smallCapStocks);
    const percentageOverMa200 = getPercentage(instrumentsWithMa200);

    const stocksOverMA200 = ma200.values.filter((diff) => diff.n > 0).length;
    const numberOfStocks = ma200.values.filter((el) => el.n !== null).length;
    const percentage = Number.parseFloat(
      ((stocksOverMA200 / numberOfStocks) * 100).toFixed(1)
    );

    // const percentageOverMA200 = getPercentage(stocksOverMA200);
    // console.log(percentageOverMA200);

    const omxspiId = 638;
    const omxspiMA200: string = ma200.values
      .find((el) => el.i === omxspiId)
      .n.toFixed(1);
    return {
      props: {
        stocksOverMA200,
        numberOfStocks,
        percentage,
        omxspiMA200,
      },
    };
  } catch (error) {
    console.log(error);
    res.writeHead(302, { Location: "/" });
    res.end();
    return { props: {} };
  }
}

function filterStocksByMarkets(instruments, marketId: number) {
  const filteredInstruments = instruments.filter(
    (el) => el.marketId === marketId
  );
  return filteredInstruments;
}

function getPercentage(instruments) {
  // const filteredInstruments = instruments.filter(
  //   (el) => el.marketId === marketId
  // );
  const numberOfStocks = instruments.length;
  const stocksOverMA200 = instruments.filter((stock) => stock.ma200value > 0)
    .length;
  const percentageOverMA200 = (
    (stocksOverMA200 / numberOfStocks) *
    100
  ).toFixed(1);
  console.log("Percentage ", percentageOverMA200);

  return percentageOverMA200;
}
