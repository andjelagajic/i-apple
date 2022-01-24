import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { Phone } from '../models/phone';

@Injectable({
  providedIn: 'root',
})
export class PhoneService {
  private phones: Phone[] = [];

  constructor() {
    const phone1: Phone = {
      id: 1,
      title: 'Phone 1',
      image: 'assets/img/1.jpg',
      price: 900,
      numberInStock: 35,
    };

    const phone2: Phone = {
      id: 2,
      title: 'Phone 2',
      image: 'assets/img/2.jpg',
      price: 1030,
      numberInStock: 11,
    };

    const phone3: Phone = {
      id: 3,
      title: 'Phone 3',
      image: 'assets/img/3.jpg',
      price: 870,
      numberInStock: 15,
    };

    this.phones = [phone1, phone2, phone3];
  }

  getPhones() {
    return of(this.phones);
  }

  addPhone(phone: Phone) {
    this.phones.unshift(phone);
  }
}
