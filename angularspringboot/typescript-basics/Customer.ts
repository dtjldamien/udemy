export class Customer {
  // parameter properties, reduces boiler plate code
  constructor(private _firstName: string, private _lastName: string) {}

  // public by default
  //   private _firstName: string;
  //   private _lastName: string;

  //   constructor(firstName: string, lastName: string) {
  //     this._firstName = firstName;
  //     this._lastName = lastName;
  //   }

  // accessors, supported in ES5 or higher
  public get firstName(): string {
    return this._firstName;
  }

  public set firstName(value: string) {
    this._firstName = value;
  }

  public get lastName(): string {
    return this._lastName;
  }

  public set lastName(value: string) {
    this._lastName = value;
  }
}

// instance
// let myCustomer = new Customer();
// myCustomer.firstName = "Damien";
// myCustomer.lastName = "Tan";

// let myCustomer = new Customer("Damien", "Tan");

// console.log(myCustomer.firstName);
// console.log(myCustomer.lastName);
