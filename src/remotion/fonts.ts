import { loadFont as loadInter } from "@remotion/google-fonts/Inter";
import { loadFont as loadJetBrains } from "@remotion/google-fonts/JetBrainsMono";
import { loadFont as loadOrbitron } from "@remotion/google-fonts/Orbitron";
import { loadFont as loadRoboto } from "@remotion/google-fonts/Roboto";
import { loadFont as loadShareTech } from "@remotion/google-fonts/ShareTechMono";
import { cancelRender, continueRender, delayRender } from "remotion";
import { useEffect, useState } from "react";
import type { FontId, Template } from "../catalog/types";

const inter = loadInter("normal", { weights: ["400", "600", "700"], subsets: ["latin"] });
const jetbrains = loadJetBrains("normal", { weights: ["400", "600"], subsets: ["latin"] });
const roboto = loadRoboto("normal", { weights: ["400", "500", "700"], subsets: ["latin"] });
const orbitron = loadOrbitron("normal", { weights: ["500", "700"], subsets: ["latin"] });
const shareTech = loadShareTech("normal", { weights: ["400"], subsets: ["latin"] });

export const loadedFonts: Record<FontId, string> = {
  inter: inter.fontFamily,
  jetbrains: jetbrains.fontFamily,
  roboto: roboto.fontFamily,
  orbitron: orbitron.fontFamily,
  shareTech: shareTech.fontFamily,
};

export function waitForFonts() {
  return Promise.all([
    inter.waitUntilDone(),
    jetbrains.waitUntilDone(),
    roboto.waitUntilDone(),
    orbitron.waitUntilDone(),
    shareTech.waitUntilDone(),
  ]);
}

export function useFontGate() {
  const [handle] = useState(() => delayRender("Loading fonts"));
  useEffect(() => {
    let active = true;
    waitForFonts()
      .then(() => {
        if (active) continueRender(handle);
      })
      .catch((error: unknown) => {
        cancelRender(error);
      });
    return () => {
      active = false;
    };
  }, [handle]);
}

export function fontsFor(template: Template) {
  return {
    display: loadedFonts[template.fonts.display],
    ui: loadedFonts[template.fonts.ui],
    code: loadedFonts[template.fonts.code],
  };
}
