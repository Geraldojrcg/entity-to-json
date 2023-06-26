import { entityToJson } from "./function";

export class EntityToJson {
  toJSON() {
    return entityToJson(this);
  }
}
