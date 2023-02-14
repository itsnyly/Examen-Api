import { Component, OnInit } from '@angular/core';
import { artworks } from '../../serveis/api/artworksApi';
import { Quadre } from '../../model/entitats/quadre';
import { url } from 'inspector';
import { catchError, take, throwError } from 'rxjs';
@Component({
  selector: 'app-llistat',
  templateUrl: './llistat.component.html',
  styleUrls: ['./llistat.component.css']
})
export class LlistatComponent implements OnInit {
  allQuadres = new Array<{title: string,id: string, image_id: string}>();
  quadresSecond = new Array<{title: string, image_id:string, artist_id: number }>();
  artistesQuadresSecond = new Array<{titol: string, image_id:string, title: string,birth_date: number, death_date: number }>();
  currentPage : number = 1;
  lastPage : number = 10;
  iiif_url : string = "";

  constructor(private httpClient: artworks) { }

  ngOnInit(): void {
    this.getArtWorksByPage(1,12);
    this.getArtWorksByPageSecond(1,12);
  }
 

  getArtWorksByPage(page: number, limit:number){
    this.httpClient.getArtWorksByPage(page,limit).subscribe(
      data => {
        console.log("dins subscribe");
        console.log(data);
        this.iiif_url = data.config.iiif_url;
        this.currentPage = data.pagination.current_page;
        this.lastPage = data.pagination.total_pages;
        this.allQuadres = data.data;        
        
      }
    );
  }


  getArtWorksByPageSecond(page: number, limit:number) {
    this.httpClient
      .getArtWorksByPage(page,limit)
      .pipe(
        take(1),
        catchError((err: any) => {
          return throwError(() => new Error('Error al agafar la info'));
        })
      )
      .subscribe({
        next: (x) => {
          this.quadresSecond = x.data;
        },
        error: (err: any) => {
          console.log(err.message);
        },
        complete: () => {
          this.getArtistes();
        },
      });
  }

  getArtista(id: number){
    this.httpClient.getArtist(id).subscribe(
      data => {
        console.log("dins subscribe");
        console.log(data);  
        return data; 
      }
    );
  }

  getArtistes(){
    console.log(this.quadresSecond);
    this.quadresSecond.forEach(quadre => {
      let artista = this.getArtista(quadre.artist_id);
      console.log(artista)
    });
  }

  getImatge(url: string, id:string){
    this.httpClient.getImage(url,id).subscribe(
      data => {
        console.log("dins subscribe");
        console.log(data);
        return data;      
        
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

  firstPage(){
    this.getArtWorksByPage(1,12);
  }

  oneLessPage(){
    this.getArtWorksByPage(this.currentPage -1,12);

  }
  oneMorePage(){
    this.getArtWorksByPage(this.currentPage+1,12);
  }

  lastPageF(){
    this.getArtWorksByPage(this.lastPage,12);
  }

  visualitzarImatge(id: string){
    this.getImatge(this.iiif_url, id);
  }

}
