import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewProfissionalComponent } from './view-profissional.component';

describe('ViewProfissionalComponent', () => {
  let component: ViewProfissionalComponent;
  let fixture: ComponentFixture<ViewProfissionalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewProfissionalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewProfissionalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
