/**
 * This function makes it possible for all getter methods of an entity (domain class)
 * to be used when converting the entity to JSON using JSON.stringify instead of just its private properties.
 * @example
 * class Cat {
      private _name: string;
      private _age: number;

      constructor(name: string, age: number) {
        this._name = name;
        this._age = age;
      }

      get name() {
        return this._name;
      }

      get age() {
        return this._age;
      }

      toJSON() {
        return entityToJson(this);
      }
    }

    const cat = new Cat("fufu", 2);
    console.log(JSON.stringify(cat))
    
    {
      name: "fufu",
      age: 2,
    }

 * @param {Object} entity
 * @returns {Object}
 */
export function entityToJson(entity: Object): Object;

/**
 * This decorator is responsible for injecting the toJSON method using entityToJson
 * @type WithEntityToJsonParams
 * @returns {ClassDecorator}
 */
export function WithEntityToJson(): ClassDecorator;

/**
 * This class is responsible for providing the toJSON method using entityToJson and allowing the extension by other entities of the application
 * @example
 * class Cat extends EntityToJson {
      ...
   }
 */
export class EntityToJson {
  toJSON(): Object;
}

export default entityToJson;
