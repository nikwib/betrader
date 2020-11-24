import { APIKEY } from "../../util/constants";
import { createMachine, assign } from "xstate";

const fetchMachine = createMachine(
  {
    id: "fetch",
    initial: "idle",
    context: {
      count: 0,
      retries: 0,
      text: "fetch",
    },
    states: {
      idle: {
        entry: assign({ text: fetch }),
        on: {
          FETCH: {
            target: "loading",
            actions: assign({ text: "fetching.." }),
          },
        },
      },
      loading: {
        entry: [
          assign({
            count: (context, event) => {
              return context.count + 1;
            },
          }),
          "activate",
          "getData",
        ],
        on: {
          RESOLVE: { target: "success" },
          REJECT: { target: "failure" },
        },
      },
      success: {
        type: "final",
      },
      failure: {
        on: {
          RETRY: {
            target: "loading",
            // actions: assign({
            //   retries: (context, event) => context.retries + 1,
            // }),
          },
        },
      },
    },
  },
  {
    actions: {
      // action implementations
      activate: (context, event) => {
        console.log("activating...");
      },
      getData: (context, event) => {
        console.log("getData");
        context = getIndustry;
      },
      notifyInactive: (context, event) => {
        console.log("inactive!");
      },
      sendTelemetry: (context, event) => {
        console.log("time:", Date.now());
      },
    },
  }
);

const getIndustry = async function getServerSideProps({ params, req, res }) {
  console.log("getServerSideProps");
  try {
    const data = await fetch(
      `https://apiservice.borsdata.se/v1/branches${APIKEY}`
    ).then((data) => data.json());
    console.log(data);

    return {
      props: { data },
    };
  } catch (error) {
    console.log(error);
    res.writeHead(302, { Location: "/" });
    res.end();
    return { props: {} };
  }
};

export default fetchMachine;
