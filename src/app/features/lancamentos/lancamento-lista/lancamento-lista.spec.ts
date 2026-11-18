import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LancamentoLista } from './lancamento-lista';

describe('LancamentoLista', () => {
  let component: LancamentoLista;
  let fixture: ComponentFixture<LancamentoLista>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LancamentoLista],
    }).compileComponents();

    fixture = TestBed.createComponent(LancamentoLista);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
