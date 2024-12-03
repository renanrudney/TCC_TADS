import { Component, inject, OnInit } from "@angular/core";
import { ActivatedRoute, RouterModule } from "@angular/router";
import { ResultadoProviderService } from "../../../../services/providers/resultado/resultado-provider.service";
import { HighchartsChartModule } from 'highcharts-angular'
import Highcharts from 'highcharts'
import { CommonModule } from "@angular/common";

@Component({
  selector: 'app-view-resultado',
  imports: [CommonModule, RouterModule, HighchartsChartModule],
  templateUrl: './view-resultado.component.html',
  styleUrl: './view-resultado.component.css'
})
export class ViewResultadoComponent implements OnInit {
  Highcharts: typeof Highcharts = Highcharts;
  accelerometerChartOptions: Highcharts.Options = {}
  gyroscopeChartOptions: Highcharts.Options = {}
  hitpointChartOptions: Highcharts.Options = {}
  loadAccelerometer = false
  loadGyroscope = false
  loadHitpoint = false
  gyroscopes: any
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
      if (data != null) {
        var resultData = data;
        if (resultData) {
          this.resultado = resultData;
          console.log(this.resultado)

          if (this.tipo === 'hitpoint') {
            this.buildHitpointChartData()
          } else {
            this.buildAccelerometerChartData()
            this.buildGyroscopeChartData()
          }
        }
      }
    },
    (error :any)=> { }); 
  }

  buildHitpointChartData() {
    this.hitpointChartOptions =
    {
      title: { text: 'Toque/Hit' },
      series : [
        {
          data: this.resultado.hit_data.map((h: any) => [parseFloat(h.timestamp), h.hit_number + 1]),
          type: 'line',
          name: 'hit'
        },
      ]
    }
    console.log(this.hitpointChartOptions)
    this.loadHitpoint = true
  }

  buildAccelerometerChartData() {
    this.accelerometerChartOptions =
    {
      title: { text: 'Acelerômetro' },
      series: [
        {
          data: this.resultado.accelerometers.map((a: any) => [parseFloat(a.timestamp), parseFloat(a.x_axis)]),
          type: 'line',
          name: 'x_axis'
        },
        {
          data: this.resultado.accelerometers.map((a: any) => [parseFloat(a.timestamp), parseFloat(a.y_axis)]),
          type: 'line',
          name: 'y_axis'
        },
        {
          data: this.resultado.accelerometers.map((a: any) => [parseFloat(a.timestamp), parseFloat(a.z_axis)]),
          type: 'line',
          name: 'z_axis'
        },
      ]
    }
    this.loadAccelerometer = true
  }

  buildGyroscopeChartData() {
    this.gyroscopeChartOptions = {
      title: { text: 'Giroscópio' },
      series: [
        {
          data: this.resultado.gyroscopes.map((g: any) => [parseFloat(g.timestamp), parseFloat(g.x_axis)]),
          type: 'line',
          name: 'x_axis'
        },
        {
          data: this.resultado.gyroscopes.map((g: any) => [parseFloat(g.timestamp), parseFloat(g.y_axis)]),
          type: 'line',
          name: 'y_axis'
        },
        {
          data: this.resultado.gyroscopes.map((g: any) => [parseFloat(g.timestamp), parseFloat(g.z_axis)]),
          type: 'line',
          name: 'z_axis'
        },
      ]
    }
    this.loadGyroscope = true
  }
}
