import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageVideoGalleryComponent } from './image-video-gallery.component';

describe('ImageVideoGalleryComponent', () => {
  let component: ImageVideoGalleryComponent;
  let fixture: ComponentFixture<ImageVideoGalleryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImageVideoGalleryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImageVideoGalleryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
