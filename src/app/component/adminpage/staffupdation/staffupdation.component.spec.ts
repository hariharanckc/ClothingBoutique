import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StaffupdationComponent } from './staffupdation.component';

describe('StaffupdationComponent', () => {
  let component: StaffupdationComponent;
  let fixture: ComponentFixture<StaffupdationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StaffupdationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StaffupdationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
