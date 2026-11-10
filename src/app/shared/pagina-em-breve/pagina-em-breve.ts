import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  imports: [],
  selector: 'app-pagina-em-breve',
  styleUrl: './pagina-em-breve.css',
  templateUrl: './pagina-em-breve.html',
})
export class PaginaEmBreve {
  private route = inject(ActivatedRoute); 
  titulo = this.route.snapshot.data['titulo'] as string; 
}
