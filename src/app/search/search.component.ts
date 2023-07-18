import { Component, OnInit } from '@angular/core';
import { SharedService } from '../share.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  searchResults: any[] = [];
  frontImg = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/';


  constructor(private sharedService: SharedService) { }

  ngOnInit(): void {
    this.searchResults = this.sharedService.searchResults;
  }
}
