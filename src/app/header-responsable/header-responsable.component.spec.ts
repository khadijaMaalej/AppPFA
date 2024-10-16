import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderResponsableComponent } from './header-responsable.component';

describe('HeaderResponsableComponent', () => {
  let component: HeaderResponsableComponent;
  let fixture: ComponentFixture<HeaderResponsableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HeaderResponsableComponent]
    });
    fixture = TestBed.createComponent(HeaderResponsableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
