import config from "./vitest.config.js";
import { defaultExclude, defineConfig, mergeConfig } from "vitest/config";

export default mergeConfig(
  config,
  defineConfig({
    test: {
      include: ["**/*.{test,spec}.?(c|m)[jt]s?(x)"],
      exclude: [...defaultExclude, "**/*.integration.{test,spec}.?(c|m)[jt]s?(x)"],
    },
  }),
);
