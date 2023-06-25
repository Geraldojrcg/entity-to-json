import { entityToJson } from "./function";

type WithEntityToJsonParams = {
  privatePropertyPrefix?: string;
};

export function WithEntityToJson({
  privatePropertyPrefix = "_",
}: WithEntityToJsonParams = {}) {
  return function <T extends { new (...args: any[]): {} }>(target: T) {
    return class extends target {
      toJSON() {
        return entityToJson(this, privatePropertyPrefix);
      }
    };
  };
}
