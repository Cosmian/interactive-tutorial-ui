import { CoverCrypt, Policy } from "cloudproof_js";

//
// Creating a Policy
//

type PolicyAxisItem = {
  [key: string]: { name: string; isHybridized: boolean }[];
};

export const createPolicy = async (axis: PolicyAxisItem[]): Promise<Policy> => {
  const { Policy, PolicyAxis } = await CoverCrypt();
  const policyAxis = axis.map((entry) => {
    return new PolicyAxis(Object.keys(entry)[0], Object.values(entry)[0], false);
  });
  const policy = new Policy(policyAxis);
  return policy;
};
