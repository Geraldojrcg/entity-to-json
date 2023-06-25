import { entityToJson } from "./function";

export abstract class EntityToJson {
  #privatePropertyPrefix: string = "_";

  constructor(privatePropertyPrefix?: string) {
    if (privatePropertyPrefix) {
      this.#privatePropertyPrefix = privatePropertyPrefix;
    }
  }

  toJSON() {
    return entityToJson(this, this.#privatePropertyPrefix);
  }
}
