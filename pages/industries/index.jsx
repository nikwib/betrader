import useSWR from "swr";
import { APIKEY } from "../../util/constants";
import fetchMachine from "./fetchMachine";
import { useMachine } from "@xstate/react";

const IndexPage = ({ industries }) => {
  const [state, send] = useMachine(fetchMachine);
  console.log(state);
  return (
    <div>
      <h4> Industries static props</h4>
      <div>
        <button onClick={() => send({ type: "FETCH" })}>
          Click{/* {state.context.text} */}
        </button>
        {/* <div> You clicked Fetch {state.context.count} times</div> */}

        {/* {state.value === "loading" && <div> Loading.. </div>} */}
      </div>
    </div>
  );
};
export default IndexPage;
// {
//   branches: [
//     { id: 1, name: 'Olja & Gas - Borrning', sectorId: 3 },
//     { id: 2, name: 'Olja & Gas - Exploatering', sectorId: 3 },
//   ]}
export async function getServerSideProps({ params, req, res }) {
  try {
    const data = await fetch(
      `https://apiservice.borsdata.se/v1/branches${APIKEY}`
    ).then((data) => data.json());
    console.log(data);
    const industries = data.branches;

    return {
      props: { industries },
    };
  } catch (error) {
    console.log(error);
    res.writeHead(302, { Location: "/" });
    res.end();
    return { props: {} };
  }
}
