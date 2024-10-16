import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategorieClientComponent } from './categorie-client.component';

describe('CategorieClientComponent', () => {
  let component: CategorieClientComponent;
  let fixture: ComponentFixture<CategorieClientComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CategorieClientComponent]
    });
    fixture = TestBed.createComponent(CategorieClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
