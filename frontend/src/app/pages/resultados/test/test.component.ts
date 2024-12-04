import { Component } from '@angular/core';
import { SearchComponent } from '../search/search.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ListResultadoComponent } from '../list/list-resultado/list-resultado.component';

@Component({
  selector: 'app-test',
  imports: [CommonModule, SearchComponent, ListResultadoComponent],
  templateUrl: './test.component.html',
  styleUrl: './test.component.css'
})
export class TestComponent {
  searchText: string = '';
  filters: Object = {};

  constructor() {}
}
