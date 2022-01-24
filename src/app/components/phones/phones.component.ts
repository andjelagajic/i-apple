import { Component, OnInit } from '@angular/core';
import { Phone } from 'src/app/models/phone';
import { PhoneService } from 'src/app/services/phone.service';

@Component({
  selector: 'app-phones',
  templateUrl: './phones.component.html',
})
export class PhonesComponent implements OnInit {
  phones: Phone[] = [];

  searchValue: string; // for search [(ngModel)]

  constructor(private phoneService: PhoneService) {}

  ngOnInit(): void {
    // Set phones to local array
    this.phoneService.getPhones().subscribe((phones) => (this.phones = phones));
  }

  onAddPhone(phone: Phone) {
    this.phoneService.addPhone(phone);
  }
}
