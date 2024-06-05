import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FacescanningComponent } from './facescanning.component';

describe('FacescanningComponent', () => {
  let component: FacescanningComponent;
  let fixture: ComponentFixture<FacescanningComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FacescanningComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FacescanningComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
