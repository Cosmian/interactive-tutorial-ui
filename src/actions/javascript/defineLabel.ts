import { Label } from "cloudproof_js";

//
// Create a label for your indexation
//
export const defineLabel = (label: string): Label => {
  return new Label(label);
};
