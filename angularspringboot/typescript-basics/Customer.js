"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Customer = /** @class */ (function () {
    // parameter properties, reduces boiler plate code
    function Customer(_firstName, _lastName) {
        this._firstName = _firstName;
        this._lastName = _lastName;
    }
    Object.defineProperty(Customer.prototype, "firstName", {
        // public by default
        //   private _firstName: string;
        //   private _lastName: string;
        //   constructor(firstName: string, lastName: string) {
        //     this._firstName = firstName;
        //     this._lastName = lastName;
        //   }
        // accessors, supported in ES5 or higher
        get: function () {
            return this._firstName;
        },
        set: function (value) {
            this._firstName = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Customer.prototype, "lastName", {
        get: function () {
            return this._lastName;
        },
        set: function (value) {
            this._lastName = value;
        },
        enumerable: true,
        configurable: true
    });
    return Customer;
}());
exports.Customer = Customer;
// instance
// let myCustomer = new Customer();
// myCustomer.firstName = "Damien";
// myCustomer.lastName = "Tan";
// let myCustomer = new Customer("Damien", "Tan");
// console.log(myCustomer.firstName);
// console.log(myCustomer.lastName);
