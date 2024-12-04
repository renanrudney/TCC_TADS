import { Component, inject, Input, OnInit, Type } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { ResultadoProviderService } from '../../services/providers/resultado/resultado-provider.service';
import { CommonModule } from '@angular/common';

// import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
// import { ToastrService } from 'ngx-toastr';
// import { HttpProviderService } from '../Service/http-provider.service';

@Component({
  selector: 'app-resultados',
  imports: [CommonModule, RouterModule],
  templateUrl: './resultados.component.html',
  styleUrl: './resultados.component.css'
})
export class ResultadosComponent implements OnInit {
  httpProvider = inject(ResultadoProviderService)
  resultadosList: any = []
  ngOnInit(): void {
    this.listResultados();
  }

  async listResultados() {
    this.httpProvider.listResultados().subscribe((data : any) => {
      if (data != null && data.records != null) {
        var resultData = data.records;
        if (resultData) {
          console.log(resultData)
          this.resultadosList = resultData;
        }
      }
    },
    (error : any)=> {
      if (error) {
        if (error.status == 404) {
          if(error.error && error.error.message){
            this.resultadosList = [];
          }
        }
      }
    });
  }

  public formatTipo(tipo: string) {
    switch (tipo) {
      case "hitpoint":
        return 'Hit the point'
      case "up_down_arm":
        return 'Up Down Arm'
      case "heel_rise":
        return 'Heel Rise'
      default:
        return ''
    }
  }
}

// export class HomeComponent implements OnInit {
//   closeResult = '';
//   employeeList: any = [];
//   constructor(private router: Router, private modalService: NgbModal,
//     private toastr: ToastrService, private httpProvider : HttpProviderService) { }

//   ngOnInit(): void {
//     this.getAllEmployee();
//   }
//   async getAllEmployee() {
//     this.httpProvider.getAllEmployee().subscribe((data : any) => {
//       if (data != null && data.body != null) {
//         var resultData = data.body;
//         if (resultData) {
//           this.employeeList = resultData;
//         }
//       }
//     },
//     (error : any)=> {
//         if (error) {
//           if (error.status == 404) {
//             if(error.error && error.error.message){
//               this.employeeList = [];
//             }
//           }
//         }
//       });
//   }

//   AddEmployee() {
//     this.router.navigate(['AddEmployee']);
//   }

//   deleteEmployeeConfirmation(employee: any) {
//     this.modalService.open(MODALS['deleteModal'],
//       {
//         ariaLabelledBy: 'modal-basic-title'
//       }).result.then((result) => {
//         this.deleteEmployee(employee);
//       },
//         (reason) => {});
//   }

//   deleteEmployee(employee: any) {
//     this.httpProvider.deleteEmployeeById(employee.id).subscribe((data : any) => {
//       if (data != null && data.body != null) {
//         var resultData = data.body;
//         if (resultData != null && resultData.isSuccess) {
//           this.toastr.success(resultData.message);
//           this.getAllEmployee();
//         }
//       }
//     },
//     (error : any) => {});
//   }
// }