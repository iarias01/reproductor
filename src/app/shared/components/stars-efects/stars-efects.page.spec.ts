import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StarsEfectsPage } from './stars-efects.page';

describe('StarsEfectsPage', () => {
  let component: StarsEfectsPage;
  let fixture: ComponentFixture<StarsEfectsPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(StarsEfectsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
