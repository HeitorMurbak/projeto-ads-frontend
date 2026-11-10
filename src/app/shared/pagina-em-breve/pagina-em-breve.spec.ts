import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PaginaEmBreve } from './pagina-em-breve';

describe('PaginaEmBreve', () => {
  let component: PaginaEmBreve;
  let fixture: ComponentFixture<PaginaEmBreve>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaginaEmBreve],
    }).compileComponents();

    fixture = TestBed.createComponent(PaginaEmBreve);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
