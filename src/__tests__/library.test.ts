import { EntityToJson, WithEntityToJson, entityToJson } from "../index";

describe("entityToJson tests", () => {
  it("should be able to see all defined public properties of a entity when calls a JSON.stringify method", () => {
    class Cat {
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

      get isOld() {
        return this.calcIfIsOld();
      }

      set name(name: string) {
        this._name = name;
      }

      changeAge(age: number) {
        this._age = age;
      }

      private calcIfIsOld() {
        return this._age > 10;
      }

      toJSON() {
        return entityToJson(this);
      }
    }

    const cat1 = new Cat("fufu", 2);
    const cat2 = new Cat("mimi", 12);

    expect(JSON.stringify(cat1)).toStrictEqual(
      JSON.stringify({
        name: "fufu",
        age: 2,
        isOld: false,
      }),
    );
    expect(JSON.stringify(cat2)).toStrictEqual(
      JSON.stringify({
        name: "mimi",
        age: 12,
        isOld: true,
      }),
    );
  });

  it("should be possible to use any private property prefix delimited by typescript", () => {
    @WithEntityToJson()
    class Car {
      private _year: number;
      private _color: string;

      constructor(year: number, color: string) {
        this._year = year;
        this._color = color;
      }

      get year() {
        return this._year;
      }

      get color() {
        return this._color;
      }
    }

    class Cat extends EntityToJson {
      #name: string;
      #age: number;

      constructor(name: string, age: number) {
        super("#");
        this.#name = name;
        this.#age = age;
      }

      get name() {
        return this.#name;
      }

      get age() {
        return this.#age;
      }
    }

    const car = new Car(2023, "black");

    const cat = new Cat("fufu", 2);

    expect(JSON.stringify(car)).toStrictEqual(
      JSON.stringify({
        year: 2023,
        color: "black",
      }),
    );

    expect(JSON.stringify(cat)).toStrictEqual(
      JSON.stringify({
        name: "fufu",
        age: 2,
      }),
    );
  });

  it("should works with nested classes", () => {
    @WithEntityToJson({ privatePropertyPrefix: "$" })
    class Car {
      private $year: number;
      private $color: string;

      constructor(year: number, color: string) {
        this.$year = year;
        this.$color = color;
      }

      get year() {
        return this.$year;
      }

      get color() {
        return this.$color;
      }
    }

    class Pilot {
      private _name: string;
      private _car: Car;

      constructor(name: string, car: Car) {
        this._name = name;
        this._car = car;
      }

      get name() {
        return this._name;
      }

      get car() {
        return this._car;
      }

      toJSON() {
        return entityToJson(this);
      }
    }

    const car = new Car(2023, "black");

    const pilot = new Pilot("vettel", car);

    expect(JSON.stringify(pilot)).toStrictEqual(
      JSON.stringify({
        name: "vettel",
        car: {
          year: 2023,
          color: "black",
        },
      }),
    );
  });
});
