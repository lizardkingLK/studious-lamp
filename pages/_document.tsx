import { Html, Head, Main, NextScript } from "next/document";
import { CSSProperties } from "react";

const bodyStyles: CSSProperties | undefined = {
  margin: 0,
};

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body style={bodyStyles}>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
