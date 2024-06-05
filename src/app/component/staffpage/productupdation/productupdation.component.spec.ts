import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductupdationComponent } from './productupdation.component';

describe('ProductupdationComponent', () => {
  let component: ProductupdationComponent;
  let fixture: ComponentFixture<ProductupdationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductupdationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductupdationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
