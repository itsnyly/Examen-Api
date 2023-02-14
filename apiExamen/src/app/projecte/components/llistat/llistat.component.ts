import { Component, OnInit } from '@angular/core';
import { artworks } from '../../serveis/api/artworksApi';

@Component({
  selector: 'app-llistat',
  templateUrl: './llistat.component.html',
  styleUrls: ['./llistat.component.css']
})
export class LlistatComponent implements OnInit {

  constructor(private httpClient: artworks) { }

  ngOnInit(): void {
    this.getAllArtWorks();
  }
  getAllArtWorks(){
    this.httpClient.getAllArtWorks().subscribe(
      data => {
        console.log("dins subscribe");
        console.log(data);
        
      }
    );
  }
 

}
