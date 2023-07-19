import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'jgl-angular-json';
  searchQuery: string = '';

  constructor(private router: Router) {}

  //Funcion para hacer busqueda a caharcters
  onSearch(): void {
    const queryParams = { searchQuery: this.searchQuery };
    this.router.navigate(['/characters'], { queryParams });
  }


  resetSearch(): void {
    this.searchQuery = '';
    this.router.navigateByUrl('/characters');
  }
  
  
}
