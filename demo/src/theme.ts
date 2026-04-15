import { loadFont as loadSpaceGrotesk } from "@remotion/google-fonts/SpaceGrotesk";
import { loadFont as loadJetBrainsMono } from "@remotion/google-fonts/JetBrainsMono";

const { fontFamily: spaceGrotesk } = loadSpaceGrotesk();
const { fontFamily: jetBrainsMono } = loadJetBrainsMono();

export const FONTS = {
  heading: spaceGrotesk,
  mono: jetBrainsMono,
  body: spaceGrotesk,
} as const;

// Jupiter-inspired palette — warm greens + dark background
export const COLORS = {
  bg: "#0B0E11",
  bgCard: "#141920",
  text: "#E8ECF1",
  textBright: "#FFFFFF",
  accent: "#C7F284", // Jupiter green
  accentDim: "#8BB955",
  orange: "#FFA726",
  muted: "#6B7280",
  dimmed: "#1E2530",
  border: "#2A3140",
  success: "#4ADE80",
  error: "#EF4444",
} as const;

export const CLAMP = {
  extrapolateLeft: "clamp" as const,
  extrapolateRight: "clamp" as const,
};
