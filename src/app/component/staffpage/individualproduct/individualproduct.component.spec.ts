import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndividualproductComponent } from './individualproduct.component';

describe('IndividualproductComponent', () => {
  let component: IndividualproductComponent;
  let fixture: ComponentFixture<IndividualproductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IndividualproductComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IndividualproductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
