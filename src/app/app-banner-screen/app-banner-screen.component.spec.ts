import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppBannerScreenComponent } from './app-banner-screen.component';

describe('AppBannerScreenComponent', () => {
  let component: AppBannerScreenComponent;
  let fixture: ComponentFixture<AppBannerScreenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppBannerScreenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppBannerScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
