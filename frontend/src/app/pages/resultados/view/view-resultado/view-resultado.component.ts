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
  resultado: any;

  httpProvider = inject(ResultadoProviderService)
  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.resultadoId = this.route.snapshot.params['resultadoId'];      
    this.getResultadoById();
  }

  getResultadoById() {       
    this.httpProvider.getResultadoById(this.resultadoId).subscribe((data : any) => {  
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
