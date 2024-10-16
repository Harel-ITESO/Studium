import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CirculosComponent } from './circulos.component';

describe('CirculosComponent', () => {
  let component: CirculosComponent;
  let fixture: ComponentFixture<CirculosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CirculosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CirculosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
