import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IFilters } from '../../interfaces/filter.interface';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.page.html',
  styleUrls: ['./filters.page.scss'],
})
export class FiltersPage implements OnInit {
  @Input() iconType: 'filter' | 'sort' = 'filter';
  @Input() data!: IFilters;
  @Output() valueSelected = new EventEmitter();
  value = '';

  constructor() {}
  ngOnInit(): void {
    this.value = this.data.defaultValue;
  }

  setValue(value: string) {
    this.value = value;
    this.valueSelected.emit(value);
  }
}
