import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerifCompteComponent } from './verif-compte.component';

describe('VerifCompteComponent', () => {
  let component: VerifCompteComponent;
  let fixture: ComponentFixture<VerifCompteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VerifCompteComponent]
    });
    fixture = TestBed.createComponent(VerifCompteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
