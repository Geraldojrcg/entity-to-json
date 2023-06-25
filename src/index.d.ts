export function entityToJson(entity: Object, privatePropertyPrefix?: string): Object;

export type WithEntityToJsonParams = {
  privatePropertyPrefix?: string;
};

export function WithEntityToJson(params?: WithEntityToJsonParams): any;

export class EntityToJson {
  toJSON(): Object;
}

export default entityToJson;
