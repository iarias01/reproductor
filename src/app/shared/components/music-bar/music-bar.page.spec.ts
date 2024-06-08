import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MusicBarPage } from './music-bar.page';

describe('MusicBarPage', () => {
  let component: MusicBarPage;
  let fixture: ComponentFixture<MusicBarPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(MusicBarPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
