import { Component, Input, OnInit } from '@angular/core';
import { languages } from '../../variables';
import { UtilsService } from 'src/app/services/utils/utils.service';

@Component({
  selector: 'app-btn-lang',
  templateUrl: './btn-lang.page.html',
  styleUrls: ['./btn-lang.page.scss'],
})
export class BtnLangPage {
  @Input() postion: 'top' | 'bottom' = 'bottom';
  languages = languages;
  lang = 'es';
  constructor(private utilsService: UtilsService) {
    this.lang = this.utilsService.lang;
  }

  setLanguage(code: string) {
    this.utilsService.setLanguage(code);
    this.lang = code;
  }
}
