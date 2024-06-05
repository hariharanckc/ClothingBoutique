import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnknownpageComponent } from './unknownpage.component';

describe('UnknownpageComponent', () => {
  let component: UnknownpageComponent;
  let fixture: ComponentFixture<UnknownpageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UnknownpageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UnknownpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
