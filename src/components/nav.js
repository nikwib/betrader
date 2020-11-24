/** @jsx jsx */
import { jsx, MenuButton } from "theme-ui";
import Link from "next/link";
import { useColorMode } from "theme-ui";
import { createMachine, interpret } from "xstate";
import { useThemeUI } from "theme-ui";
import { Button } from "theme-ui";

const machine = createMachine({
  initial: "light",
  context: {
    count: 0,
  },
  states: {
    light: {
      on: {
        CLICK: { target: "dark" },
      },
    },
    dark: {
      on: {
        CLICK: { target: "light" },
      },
    },
  },
});

let currentState = machine.initial;
console.log(currentState);

function transition(state, event) {
  const nextState = machine.states[state].on?.[event] || state;
  return nextState;
}

function send(event) {
  currentState = transition(currentState, event);
  console.log(currentState);
  elBox.dataset.state = currentState;
}

const Nav = () => {
  const [colorMode, setColorMode] = useColorMode();

  return (
    <header
      sx={{
        height: "60px",
        width: "100vw",
        bg: "primary",
        borderBottom: "1px solid",
        borderColor: "primary",
      }}
    >
      <nav
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          variant: "containers.page",
          height: "100%",
        }}
      >
        <Link key="1" href="/">
          <a sx={{ fontWeight: "bold", fontSize: 4, cursor: "pointer" }}>
            Beatrader
          </a>
        </Link>
        <div
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
            variant: "containers.page",
            height: "100%",
          }}
        >
          <Link key="2" href="/ma200ss">
            <a sx={{ variant: "containers.card" }}>MA200</a>
          </Link>
          <Link key="3" href="/sectors">
            <a sx={{ variant: "containers.card" }}>Sectors </a>
          </Link>
          <Link key="4" href="/industries">
            <a sx={{ variant: "containers.card" }}>Industries </a>
          </Link>

          <Button
            key="b1"
            onClick={(e) => {
              setColorMode(colorMode === "default" ? "dark" : "default");
            }}
          >
            Toggle {colorMode === "default" ? "Dark" : "Light"} Mode
          </Button>
          <MenuButton aria-label="Toggle Menu" />
        </div>
      </nav>
    </header>
  );
};

export default Nav;
