import { Component, inject, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { ResultadoProviderService } from "../../../../services/providers/resultado/resultado-provider.service";

@Component({
  selector: 'app-view-resultado',
  imports: [],
  templateUrl: './view-resultado.component.html',
  styleUrl: './view-resultado.component.css'
})
export class ViewResultadoComponent implements OnInit {
  resultadoId: any;
  tipo: any;
  resultado: any;

  httpProvider = inject(ResultadoProviderService)
  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.resultadoId = this.route.snapshot.params['resultadoId'];
    this.tipo = this.route.snapshot.params['tipo']
    this.getResultadoByIdTipo();
  }

  getResultadoByIdTipo() {       
    this.httpProvider.getResultadoByIdTipo(this.resultadoId, this.tipo).subscribe((data : any) => {
      console.log(data)
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
