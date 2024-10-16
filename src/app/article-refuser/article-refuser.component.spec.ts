import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticleRefuserComponent } from './article-refuser.component';

describe('ArticleRefuserComponent', () => {
  let component: ArticleRefuserComponent;
  let fixture: ComponentFixture<ArticleRefuserComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ArticleRefuserComponent]
    });
    fixture = TestBed.createComponent(ArticleRefuserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
