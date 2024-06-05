import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductcreationComponent } from './productcreation.component';

describe('ProductcreationComponent', () => {
  let component: ProductcreationComponent;
  let fixture: ComponentFixture<ProductcreationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductcreationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductcreationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
