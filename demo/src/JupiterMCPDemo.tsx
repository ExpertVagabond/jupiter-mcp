import React from "react";
import { AbsoluteFill, Sequence, useCurrentFrame, interpolate } from "remotion";
import { TitleScene } from "./scenes/TitleScene";
import { ToolsScene } from "./scenes/ToolsScene";
import { LiveDemoScene } from "./scenes/LiveDemoScene";
import { DXFindingsScene } from "./scenes/DXFindingsScene";
import { CTAScene } from "./scenes/CTAScene";
import { CLAMP } from "./theme";

const scenes = [
  { Component: TitleScene, duration: 150 },
  { Component: ToolsScene, duration: 180 },
  { Component: LiveDemoScene, duration: 210 },
  { Component: DXFindingsScene, duration: 180 },
  { Component: CTAScene, duration: 120 },
];

const TOTAL = scenes.reduce((sum, s) => sum + s.duration, 0); // 840 frames = 28s at 30fps

export const JupiterMCPDemo: React.FC = () => {
  const frame = useCurrentFrame();

  const globalFadeIn = interpolate(frame, [0, 15], [0, 1], CLAMP);
  const globalFadeOut = interpolate(frame, [TOTAL - 20, TOTAL], [1, 0], CLAMP);

  let offset = 0;

  return (
    <AbsoluteFill style={{ backgroundColor: "#0B0E11", opacity: Math.min(globalFadeIn, globalFadeOut) }}>
      {scenes.map(({ Component, duration }, i) => {
        const from = offset;
        offset += duration;
        return (
          <Sequence key={i} from={from} durationInFrames={duration}>
            <Component />
          </Sequence>
        );
      })}
    </AbsoluteFill>
  );
};
