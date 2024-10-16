import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListSouscategorieComponent } from './list-souscategorie.component';

describe('ListSouscategorieComponent', () => {
  let component: ListSouscategorieComponent;
  let fixture: ComponentFixture<ListSouscategorieComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListSouscategorieComponent]
    });
    fixture = TestBed.createComponent(ListSouscategorieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
