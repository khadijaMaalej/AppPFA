import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CatRespComponent } from './cat-resp.component';

describe('CatRespComponent', () => {
  let component: CatRespComponent;
  let fixture: ComponentFixture<CatRespComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CatRespComponent]
    });
    fixture = TestBed.createComponent(CatRespComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
