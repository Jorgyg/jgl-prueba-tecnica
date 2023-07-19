import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../database.service';
import { ActivatedRoute, Router } from '@angular/router';
import { SharedService } from '../share.service';

@Component({
  selector: 'app-characters',
  templateUrl: './characters.component.html',
  styleUrls: ['./characters.component.css']
})
export class CharactersComponent implements OnInit {
  private frontImg = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/';
  private readonly PAGE_SIZE = 54;

  characters: any;
  img: any;
  pokemons: any[] = [];
  filteredPokemons: any[] = [];
  currentPage: number = 1;
  totalCharacters: number = 0;
  totalPages: number = 0;

  constructor(
    private databaseService: DatabaseService,
    private route: ActivatedRoute,
    private sharedService: SharedService,
    private router: Router
  ) {}

  //Al llegar a characters nos mostrara todos los pokemons, a no ser que lleguemos por busqueda, entonces los pokemons filtrados
  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      if (params['searchQuery']) {
        const searchQuery = params['searchQuery'] as string;
        this.applyFilters(searchQuery);
      } else {
        this.loadAllCharacters();
      }
    });
  }

  //Aplicamos los filtros, y declaramos el numero de paginas depoende del total de pokemons que haya en el filtro
  applyFilters(searchQuery: string): void {
    this.currentPage = 1;
    this.pokemons = [];
    this.totalCharacters = 0;
    for (let i = 1; i <= 1101; i++) {
      this.databaseService.getPokemonById(i).subscribe((result) => {
        this.characters = result;
        if (this.characters.name.toLowerCase().startsWith(searchQuery.toLowerCase())) {
          this.totalCharacters++;       
            this.pokemons.push({
              name: this.characters.forms[0].name,
              image: this.frontImg + i + '.png',
              id: this.characters.id
            });
        }
      });
    }

    this.totalPages = Math.ceil(this.totalCharacters / this.PAGE_SIZE);
  }

  //Mostramos todos los pokemons y declaramos el numero total de paginas
  loadAllCharacters(): void {
    this.pokemons = [];
    this.totalCharacters = 0;

    for (let i = 1; i <= 1101; i++) {
      this.databaseService.getPokemonById(i).subscribe((result) => {
        this.characters = result;
        this.totalCharacters++;
          this.pokemons.push({
            name: this.characters.forms[0].name,
            image: this.frontImg + i + '.png',
            id: this.characters.id
          });
        
      });
    }

    this.totalPages = Math.ceil(this.totalCharacters / this.PAGE_SIZE);
  }


  
  //Cambiamos de pagina al darle a algun boton
  goToPage(pageNumber: number): void {
    this.currentPage = pageNumber;
    if (this.route.snapshot.queryParams['searchQuery']) {
      const searchQuery = this.route.snapshot.queryParams['searchQuery'] as string;
      this.applyFilters(searchQuery);
    } else {
      this.loadAllCharacters();
    }
    this.router.navigate([], { queryParams: { page: pageNumber }, queryParamsHandling: 'merge' });
  }

  //Cogemos el numero de la pagina
  getPageNumbers(): number[] {
    const totalPages = Math.ceil(this.filteredPokemons.length / this.PAGE_SIZE);
    return Array(totalPages).fill(0).map((_, index) => index + 1);
  }
  
}
