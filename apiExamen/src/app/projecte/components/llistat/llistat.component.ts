import { Component, OnInit } from '@angular/core';
import { artworks } from '../../serveis/api/artworksApi';
import { Quadre } from '../../model/entitats/quadre';
@Component({
  selector: 'app-llistat',
  templateUrl: './llistat.component.html',
  styleUrls: ['./llistat.component.css']
})
export class LlistatComponent implements OnInit {
  quadres = new Array<Quadre>();
  allQuadres = new Array<{title: string,id: string}>();

  constructor(private httpClient: artworks) { }

  ngOnInit(): void {
    this.getAllArtWorks();
  }
  getAllArtWorks(){
    this.httpClient.getAllArtWorks().subscribe(
      data => {
        console.log("dins subscribe");
        console.log(data);
        console.log(data.data);
        this.allQuadres = data.data;
        console.log(this.allQuadres);
        
        
      }
    );
  }

  getArtWorksByPage(page: number, limit:number){
    this.httpClient.getArtWorksByPage(page,limit).subscribe(
      data => {
        console.log("dins subscribe");
        console.log(data);
        console.log(data.data);
        this.allQuadres = data.data;
        console.log(this.allQuadres);
        
        
      }
    );
  }

  AccedirPagina(){
    const documents = (
      document.getElementById('documentsPlana') as HTMLSelectElement
    ).value;

    const plana = (
      document.getElementById('numPlana') as HTMLSelectElement
    ).value;

    this.getArtWorksByPage(Number(plana),Number(documents));

    
  }
 

}
