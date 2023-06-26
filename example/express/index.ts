import { entityToJson, WithEntityToJson } from "entity-to-json";
import express from "express";

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

@WithEntityToJson()
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

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  const cat = new Cat("fufu", 2);
  const car = new Car(2023, "black");
  const pilot = new Pilot("vettel", car);

  return res.send({
    cat,
    car,
    pilot,
  });
});

app.listen(3000);
