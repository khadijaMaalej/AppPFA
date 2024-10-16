import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjoutSouscategorieComponent } from './ajout-souscategorie.component';

describe('AjoutSouscategorieComponent', () => {
  let component: AjoutSouscategorieComponent;
  let fixture: ComponentFixture<AjoutSouscategorieComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AjoutSouscategorieComponent]
    });
    fixture = TestBed.createComponent(AjoutSouscategorieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
