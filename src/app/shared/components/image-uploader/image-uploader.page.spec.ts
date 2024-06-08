import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ImageUploaderPage } from './image-uploader.page';

describe('ImageUploaderPage', () => {
  let component: ImageUploaderPage;
  let fixture: ComponentFixture<ImageUploaderPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ImageUploaderPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
