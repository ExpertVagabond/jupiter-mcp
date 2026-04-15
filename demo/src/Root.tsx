import React from "react";
import { Composition } from "remotion";
import { JupiterMCPDemo } from "./JupiterMCPDemo";

export const Root: React.FC = () => {
  return (
    <Composition
      id="JupiterMCPDemo"
      component={JupiterMCPDemo}
      durationInFrames={840}
      fps={30}
      width={1920}
      height={1080}
    />
  );
};
