import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticleChartComponent } from './article-chart.component';

describe('ArticleChartComponent', () => {
  let component: ArticleChartComponent;
  let fixture: ComponentFixture<ArticleChartComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ArticleChartComponent]
    });
    fixture = TestBed.createComponent(ArticleChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
