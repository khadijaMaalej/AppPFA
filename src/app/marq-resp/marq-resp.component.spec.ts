import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MarqRespComponent } from './marq-resp.component';

describe('MarqRespComponent', () => {
  let component: MarqRespComponent;
  let fixture: ComponentFixture<MarqRespComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MarqRespComponent]
    });
    fixture = TestBed.createComponent(MarqRespComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
