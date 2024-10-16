import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjoutArticleComponent } from './ajout-article.component';

describe('AjoutArticleComponent', () => {
  let component: AjoutArticleComponent;
  let fixture: ComponentFixture<AjoutArticleComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AjoutArticleComponent]
    });
    fixture = TestBed.createComponent(AjoutArticleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
