import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root',
})
export class UtilsService {
  lang = 'es';
  constructor(private translateService: TranslateService) {}

  configLanguage() {
    const languagePreference = localStorage.getItem('language');
    if (languagePreference) {
      this.setLanguage(languagePreference);
      return;
    }
    const language = navigator.language.split('-')[0];
    this.setLanguage(language);
  }

  setLanguage(language: string) {
    this.translateService.setDefaultLang(language);
    this.lang = language;
    localStorage.setItem('language', language);
  }
}
