import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Seccion1Component } from './seccion1.component';

describe('Seccion1Component', () => {
  let component: Seccion1Component;
  let fixture: ComponentFixture<Seccion1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Seccion1Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Seccion1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
