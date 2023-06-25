export const entityToJson = (entity: Object, privatePropertyPrefix = "_"): Object => {
  const obj = {};

  for (let key in entity) {
    if (key.startsWith(privatePropertyPrefix)) {
      obj[key.substring(1)] = entity[key];
    }
  }

  const proto = Object.getPrototypeOf(entity);
  for (const key of Object.getOwnPropertyNames(proto)) {
    const desc = Object.getOwnPropertyDescriptor(proto, key);
    const hasGetter = desc && typeof desc.get === "function";
    if (hasGetter) {
      obj[key] = entity[key];
    }
  }

  return JSON.parse(JSON.stringify(obj));
};
