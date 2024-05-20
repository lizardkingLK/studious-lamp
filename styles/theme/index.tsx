import { Theme } from "@aws-amplify/ui-react";

export const theme: Theme = {
  name: "studious-lamp",
  tokens: {
    fonts: {
      variable: { value: "Roboto Mono, sans-serif" },
    },
    colors: {
      font: {
        primary: { value: "#008080" },
        secondary: { value: "#333333" },
      },
      background: {
        primary: "#ffffff",
        secondary: "#008080",
      },
    },
  },
};
