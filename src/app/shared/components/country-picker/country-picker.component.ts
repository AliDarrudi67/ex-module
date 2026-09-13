import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatStepperModule } from '@angular/material/stepper';
import { RouterModule } from '@angular/router';
import countries from 'i18n-iso-countries';
import faLocale from 'i18n-iso-countries/langs/fa.json';
import { LucideAngularModule } from 'lucide-angular';
import { ICountry } from '../../models/general/country.model';
countries.registerLocale(faLocale);

@Component({
  selector: 'app-country-picker',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    RouterModule,
    FormsModule,
    MatSelectModule,
    LucideAngularModule,
    MatCheckboxModule,
    MatStepperModule,
  ],
  templateUrl: './country-picker.component.html',
  styleUrl: './country-picker.component.scss',
})
export class CountryPickerComponent implements OnChanges {
  @Output() onCountrySelected = new EventEmitter<string>();
  @Input() iso3: string = '';

  countries: ICountry[] = [];
  open = false;
  selectedCountry: ICountry | null = null;
  searchValue = '';

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['iso3']?.currentValue) {
      const iso3 = changes['iso3']?.currentValue.toLowerCase();
      const country = this.countries.filter((c) =>
        c.iso3.toLowerCase().includes(iso3)
      );
      if (country.length) this.selectCountry(country[0]);
    }
  }

  ngOnInit(): void {
    this.loadCountries();
  }

  loadCountries() {
    const all = countries.getNames('fa', { select: 'official' });
    this.countries = Object.entries(all)
      .map(([alpha2, name]) => {
        const iso3 = countries.alpha2ToAlpha3(alpha2);
        return {
          code: alpha2,
          iso3,
          name,
          flag: this.getFlagUrl(alpha2),
          phone: '', // یا هر مقدار دلخواه
        } as ICountry;
      })
      .filter((c) => c.code !== 'IL'); // حذف اسرائیل
  }

  getFlagUrl(alpha2: string) {
    return `https://flagcdn.com/w40/${alpha2.toLowerCase()}.png`;
  }

  toggle() {
    this.open = !this.open;
    if (this.open) this.searchValue = '';
  }

  selectCountry(country: ICountry) {
    this.selectedCountry = country;
    this.open = false;
    this.onCountrySelected.emit(country.iso3);
  }

  filterCountries() {
    const search = this.searchValue.trim().toLowerCase();
    return this.countries.filter((c) => c.name.toLowerCase().includes(search));
  }
}
