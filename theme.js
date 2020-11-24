import { roboto } from "@theme-ui/presets";

const theme = {
  ...roboto,
  colors: {
    ...roboto.colors,
    text: "#000",
    background: "#fff",
    primary: "#07c",
    modes: {
      dark: {
        text: "#fff",
        background: "#000",
        primary: "#0cf",
      },
    },
  },
  buttons: {
    primary: {
      color: "background",
      bg: "primary",
      "&:hover": {
        bg: "text",
      },
    },
    secondary: {
      color: "background",
      bg: "secondary",
    },
  },

  containers: {
    card: {
      boxShadow: "0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)",
      border: "1px solid",
      borderColor: "muted",
      borderRadius: "4px",
      p: 2,
      m: 2,
    },
    page: {
      width: "100%",
      maxWidth: "960px",
      m: 0,
      mx: "auto",
    },
  },
  styles: {
    ...roboto.styles,
  },
};

console.log("roboto theme:", theme);

export default theme;
