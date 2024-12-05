import { Component } from '@angular/core';
import { SearchComponent } from '../search/search.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ListResultadoComponent } from '../list/list-resultado/list-resultado.component';

@Component({
  selector: 'app-resultado',
  imports: [CommonModule, SearchComponent, ListResultadoComponent],
  templateUrl: './resultado.component.html',
  styleUrl: './resultado.component.css'
})
export class ResultadoComponent {
  searchText: string = '';
  filters: Object = {};

  constructor() {}
}
