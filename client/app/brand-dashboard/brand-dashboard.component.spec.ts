import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BrandDashboardComponent } from './brand-dashboard.component';

describe('BrandDashboardComponent', () => {
  let component: BrandDashboardComponent;
  let fixture: ComponentFixture<BrandDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BrandDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BrandDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});