import { strings } from "./strings/strings";

interface Assets {
  localized_strings: typeof strings;
}

export const assets: Assets = {
  localized_strings: strings,
};
