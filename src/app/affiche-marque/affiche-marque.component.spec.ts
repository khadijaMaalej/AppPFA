import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AfficheMarqueComponent } from './affiche-marque.component';

describe('AfficheMarqueComponent', () => {
  let component: AfficheMarqueComponent;
  let fixture: ComponentFixture<AfficheMarqueComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AfficheMarqueComponent]
    });
    fixture = TestBed.createComponent(AfficheMarqueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
