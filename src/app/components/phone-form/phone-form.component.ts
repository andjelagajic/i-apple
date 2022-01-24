import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Phone } from 'src/app/models/phone';

@Component({
  selector: 'app-phone-form',
  templateUrl: './phone-form.component.html',
})
export class PhoneFormComponent implements OnInit {
  phoneForm = this.formBuilder.group({
    title: '',
    price: '',
    numberInStock: '',
  });

  @Output() onAddEvent: EventEmitter<Phone> = new EventEmitter();

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {}

  onSubmit() {
    const { title, price, numberInStock } = this.phoneForm.value;

    let randomImageNumber: number = Math.trunc(Math.random() * 3 + 1);

    const phone: Phone = {
      title,
      image: `assets/img/${randomImageNumber}.jpg`,
      price,
      numberInStock,
    };

    console.log(title, price, numberInStock);

    this.onAddEvent.emit(phone);
  }
}
