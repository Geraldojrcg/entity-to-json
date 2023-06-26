import { entityToJson } from "./function";

export function WithEntityToJson() {
  return function <T extends { new (...args: any[]): {} }>(target: T) {
    target.prototype.toJSON = function () {
      return entityToJson(this);
    };
  };
}
