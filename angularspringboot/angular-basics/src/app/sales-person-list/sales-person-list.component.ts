import { Component, OnInit } from "@angular/core";
import { SalesPerson } from "./sales-person";

@Component({
  selector: "app-sales-person-list",
  // templateUrl: "./sales-person-list.component.html",
  templateUrl: "./sales-person-list-bootstrap.component.html",
  styleUrls: ["./sales-person-list.component.css"],
})
export class SalesPersonListComponent implements OnInit {
  // create an array of objects
  salesPersonList: SalesPerson[] = [
    new SalesPerson("Damien", "Tan", "dtjldamien@gmail.com", 10000),
    new SalesPerson("Michael", "Scott", "michaelscott@hotmail.com", 50000),
    new SalesPerson("Jim", "Halpert", "jimhal@hotmail.com", 45000),
    new SalesPerson("Dwight", "Schrute", "dwightkschrute@dunder.com", 30000),
  ];
  constructor() {}

  ngOnInit(): void {}
}