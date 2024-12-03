import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateProfissionalComponent } from './create-profissional.component';

describe('CreateProfissionalComponent', () => {
  let component: CreateProfissionalComponent;
  let fixture: ComponentFixture<CreateProfissionalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateProfissionalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateProfissionalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
