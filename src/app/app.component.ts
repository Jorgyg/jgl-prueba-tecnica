import { Component } from '@angular/core';
import { DatabaseService } from './database.service';
import { SharedService } from './share.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'jgl-angular-json';

  characters: any;
  searchQuery: string = '';

  constructor(
    private databaseService: DatabaseService,
    private sharedService: SharedService,
    private router: Router
  ) { }

  onSearch(): void {
    const searchCar: any[] = [];

    for (let i = 1; i <= 600; i++) {
      this.databaseService.getPokemonById(i).subscribe(result => {
        this.characters = result;
        if (result.name.toLowerCase().startsWith(this.searchQuery.toLowerCase())) {
          searchCar.push(this.characters);
        }
      });
    }

    // Asigna el array searchCar al searchResults del servicio compartido
    this.sharedService.searchResults = searchCar;

    // Navega a la vista de Characters
    this.router.navigateByUrl('/search');
  }
}
