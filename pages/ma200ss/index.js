import useSWR from "swr";
import { APIKEY } from "../../util/constants";

const IndexPage = ({ stocksOverMA200, numberOfStocks, percentage, group }) => {
  return (
    <div>
      <p>MA200 Serverside static props</p>
      <div>
        <div> KPI: {group}</div>
        Total stocks over MA200 ({numberOfStocks}): {stocksOverMA200}
        <div>Percentage:{` ${percentage}`}</div>
      </div>
    </div>
  );
};
export default IndexPage;

export async function getStaticProps(context) {
  try {
    const data = await fetch(
      `https://apiservice.borsdata.se/v1/instruments/kpis/318/200day/diff${APIKEY}`
    ).then((data) => data.json());
    console.log(data);
    const stocksOverMA200 = data.values.filter((diff) => diff.n > 0).length;
    const numberOfStocks = data.values.filter((el) => el.n !== null).length;
    const percentage = Number.parseFloat(
      ((numberOfStocks / stocksOverMA200 - 1) * 100).toFixed(2)
    );
    const group = data.group;

    return {
      props: { stocksOverMA200, numberOfStocks, percentage, group },
    };
  } catch (error) {
    log.error(error);
  }
}
