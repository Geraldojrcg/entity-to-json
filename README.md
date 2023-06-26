# entity-to-json

This library makes it possible for all getter methods of an entity (domain class) to be used when converting the entity to JSON using `JSON.stringify` instead of just its private properties.

## The Problem it solves

When we create domain entities or any other class and we want to protect their properties by making them private in order to protect integrity, it is recommended that we use getter methods to access such properties. But, when returning this entity through an API or even transforming it into JSON using JSON.stringify, as a result we only have visible private properties, instead of only the properties available via getters.

Example:

```ts
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

const car = new Car(2023, "black");
console.log(JSON.stringify(car));
```

Output:

```json
{
  "_year": 2023,
  "_color": "black"
}
```

To fix this, this library is able to identify all getters of the class and call them instead of the private properties.

## Instalation

```bash

```

## Usage

### 1. Using `entityToJson` function and `toJSON` method

```ts
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
    return this._age > 10;
  }

  toJSON() {
    return entityToJson(this);
  }
}

const cat = new Cat("fufu", 2);
console.log(JSON.stringify(cat));
```

Output:

```json
{
  "name": "fufu",
  "age": 2,
  "isOld": false
}
```

### 2. Using `WithEntityToJson` decorator

```ts
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

const car = new Car(2023, "black");
console.log(JSON.stringify(car));
```

Output:

```json
{
  "year": 2023,
  "color": "black"
}
```

### 3. Using `EntityToJson` class with inheritance

```ts
class Car extends EntityToJson {
  private _year: number;
  private _color: string;

  constructor(year: number, color: string) {
    super();
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

const car = new Car(2023, "black");
console.log(JSON.stringify(car));
```

Output:

```json
{
  "year": 2023,
  "color": "black"
}
```

## Contribute

feel free to contribute improvements to this lib
