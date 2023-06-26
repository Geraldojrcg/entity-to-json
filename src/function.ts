export const entityToJson = (entity: Object): Object => {
  const obj = {};

  const proto = Object.getPrototypeOf(entity);
  for (const key of Object.getOwnPropertyNames(proto)) {
    const desc = Object.getOwnPropertyDescriptor(proto, key);
    const hasGetter = desc && typeof desc.get === "function";
    if (hasGetter) {
      obj[key] = entity[key];
    }
  }

  return obj;
};
