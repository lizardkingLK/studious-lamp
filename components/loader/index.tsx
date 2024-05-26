import { Loader } from "@aws-amplify/ui-react";
import React, { Fragment } from "react";

const LoaderBar = () => {
  return (
    <Fragment>
      <Loader
        emptyColor={"transparent"}
        filledColor={"Highlight"}
        className="loader"
      />
    </Fragment>
  );
};

export default LoaderBar;
