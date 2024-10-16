import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticleConfirmerComponent } from './article-confirmer.component';

describe('ArticleConfirmerComponent', () => {
  let component: ArticleConfirmerComponent;
  let fixture: ComponentFixture<ArticleConfirmerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ArticleConfirmerComponent]
    });
    fixture = TestBed.createComponent(ArticleConfirmerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
