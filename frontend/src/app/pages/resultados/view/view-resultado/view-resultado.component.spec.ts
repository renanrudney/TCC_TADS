import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewResultadoComponent } from './view-resultado.component';

describe('ViewResultadoComponent', () => {
  let component: ViewResultadoComponent;
  let fixture: ComponentFixture<ViewResultadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewResultadoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewResultadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
