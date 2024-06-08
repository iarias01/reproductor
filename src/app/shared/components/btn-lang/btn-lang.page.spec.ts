import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BtnLangPage } from './btn-lang.page';

describe('BtnLangPage', () => {
  let component: BtnLangPage;
  let fixture: ComponentFixture<BtnLangPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(BtnLangPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
