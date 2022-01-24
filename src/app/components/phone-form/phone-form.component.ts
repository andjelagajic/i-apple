import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Phone } from 'src/app/models/phone';
import { PhoneService } from 'src/app/services/phone.service';

@Component({
  selector: 'app-phone-form',
  templateUrl: './phone-form.component.html',
})
export class PhoneFormComponent implements OnInit {
  phoneForm = this.formBuilder.group({
    id: '',
    title: '',
    image: '',
    price: '',
    numberInStock: '',
  });

  add: boolean = true;

  @Output() onAddEvent: EventEmitter<Phone> = new EventEmitter();

  @Output() onUpdateEvent: EventEmitter<Phone> = new EventEmitter();

  constructor(
    private formBuilder: FormBuilder,
    private phoneService: PhoneService
  ) {}

  ngOnInit(): void {
    // Subscribe to the selected phone observable
    this.phoneService.selectedPhone.subscribe((phone) => {
      console.log('p', phone);

      if (phone.id != null) {
        this.add = false;

        this.phoneForm.controls['id'].setValue(phone.id);
        this.phoneForm.controls['title'].setValue(phone.title);
        this.phoneForm.controls['image'].setValue(phone.image);
        this.phoneForm.controls['price'].setValue(phone.price);
        this.phoneForm.controls['numberInStock'].setValue(phone.numberInStock);
      }
    });
  }

  onSubmit() {
    if (this.add) {
      const { title, price, numberInStock } = this.phoneForm.value;

      let randomImageNumber: number = Math.trunc(Math.random() * 3 + 1);

      const phone: Phone = {
        id: this.phoneService.getNextId() + 1,
        title,
        image: `assets/img/${randomImageNumber}.jpg`,
        price,
        numberInStock,
      };

      this.onAddEvent.emit(phone);
    } else {
      const { id, title, image, price, numberInStock } = this.phoneForm.value;

      const updPhone: Phone = {
        id,
        title,
        image,
        price,
        numberInStock,
      };

      this.onUpdateEvent.emit(updPhone);

      console.log(updPhone);
    }

    this.clearState();
  }

  clearState() {
    this.add = true;

    this.phoneForm.controls['id'].setValue('');
    this.phoneForm.controls['title'].setValue('');
    this.phoneForm.controls['image'].setValue('');
    this.phoneForm.controls['price'].setValue('');
    this.phoneForm.controls['numberInStock'].setValue('');

    this.phoneService.clearState();

    // this.phoneService.initState();
  }
}
