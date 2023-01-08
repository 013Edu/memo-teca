import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarPensamentosComponent } from './editar-pensamentos.component';

describe('EditarPensamentosComponent', () => {
  let component: EditarPensamentosComponent;
  let fixture: ComponentFixture<EditarPensamentosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditarPensamentosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditarPensamentosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
