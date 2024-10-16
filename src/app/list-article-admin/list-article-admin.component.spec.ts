import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListArticleAdminComponent } from './list-article-admin.component';

describe('ListArticleAdminComponent', () => {
  let component: ListArticleAdminComponent;
  let fixture: ComponentFixture<ListArticleAdminComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListArticleAdminComponent]
    });
    fixture = TestBed.createComponent(ListArticleAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
