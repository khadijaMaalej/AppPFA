import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategorieChartComponent } from './categorie-chart.component';

describe('CategorieChartComponent', () => {
  let component: CategorieChartComponent;
  let fixture: ComponentFixture<CategorieChartComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CategorieChartComponent]
    });
    fixture = TestBed.createComponent(CategorieChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
