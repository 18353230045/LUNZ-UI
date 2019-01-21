import { Component, OnInit } from '@angular/core';

export interface City {
  name: string;
  label?: string;
  code: string;
}

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss']
})
export class DropdownComponent implements OnInit {
  cities: City[];
  groupedCars: any[];
  selectedCity: City;
  selectedCity1: City;
  selectedCity2: City;
  selectedCity3: any;

  constructor() { }

  ngOnInit() {
    this.cities = [
      { name: 'New York', code: 'NY' },
      { name: 'Rome', code: 'RM' },
      { name: 'London', code: 'LDN' },
      { name: 'Istanbul', code: 'IST' },
      { name: 'Paris', code: 'PRS' }
    ];
    this.groupedCars = [
      {
        label: 'Germany', value: 'germany.png',
        items: [
          { label: 'Audi', value: 'Audi' },
          { label: 'BMW', value: 'BMW' },
          { label: 'Mercedes', value: 'Mercedes' }
        ]
      },
      {
        label: 'USA', value: 'usa.png',
        items: [
          { label: 'Cadillac', value: 'Cadillac' },
          { label: 'Ford', value: 'Ford' },
          { label: 'GMC', value: 'GMC' }
        ]
      },
      {
        label: 'Japan', value: 'japan.png',
        items: [
          { label: 'Honda', value: 'Honda' },
          { label: 'Mazda', value: 'Mazda' },
          { label: 'Toyota', value: 'Toyota' }
        ]
      }
    ];
  }

}
