import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../database.service';
import { ActivatedRoute } from '@angular/router';
import { SharedService } from '../share.service';

@Component({
  selector: 'app-characters',
  templateUrl: './characters.component.html',
  styleUrls: ['./characters.component.css']
})
export class CharactersComponent implements OnInit {
  private frontImg = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/';

  characters: any;
  img: any;
  pokemons: any[] = [];
  filteredPokemons: any[] = [];

  constructor(
    private databaseService: DatabaseService,
    private route: ActivatedRoute,
    private sharedService: SharedService
  ) {}

  ngOnInit(): void {
      // Mostrar todos los personajes
      for (let i = 1; i <= 200; i++) {
        this.databaseService.getPokemonById(i).subscribe(result => {
          this.characters = result;
          this.pokemons.push({
            name: this.characters.forms[0].name,
            image: this.frontImg + i + '.png'
          });
        });
      }
    
  }
}
