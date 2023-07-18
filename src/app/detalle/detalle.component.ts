import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../database.service';
import { ActivatedRoute } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.css']
})
export class DetalleComponent implements OnInit {
  index: number = 0;
  character: any; // Reemplaza "any" con el tipo de objeto para tus personajes
  details:any = {};
  abilities: string = "";
  stats:any[] = [];

  constructor(private databaseService: DatabaseService, private route: ActivatedRoute){
  }
  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.index = params['index'];
      this.databaseService.getPokemonById(+this.index + 1).subscribe(result => {
        this.character = result;
        for (let abil of this.character.abilities) {
          if(abil.ability.name != undefined) {
            this.abilities+= " " + abil.ability.name;
          }
        }

        for (let st of this.character.stats) {
          this.stats.push({
            name: st.stat.name,
            base: st.base_stat
          });
        }


      });
    });
  }
}