import { Component, inject } from '@angular/core';
import { ProfissionalProviderService } from '../../../../services/providers/profissional/profissional-provider.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-view-profissional',
  imports: [],
  templateUrl: './view-profissional.component.html',
  styleUrl: './view-profissional.component.css'
})
export class ViewProfissionalComponent {
  resultadoId: any;
  resultado: any;

  httpProvider = inject(ProfissionalProviderService)
  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.resultadoId = this.route.snapshot.params['resultadoId'];      
    this.getProfissionalById();
  }

  getProfissionalById() {       
    this.httpProvider.getProfissionalById(this.resultadoId).subscribe((data : any) => {  
      if (data != null && data.body != null) {
        var resultData = data.body;
        if (resultData) {
          this.resultado = resultData;
        }
      }
    },
    (error :any)=> { }); 
  }
}
