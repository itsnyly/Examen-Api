import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})

export class artworks {
    constructor(private http: HttpClient) { };

 

    getAllArtWorks():Observable<any> {
        return this.http.get("https://api.artic.edu/api/v1/artworks");
    };

    getArtWorksByPage(page: number, limit:number):Observable<any> {
        return this.http.get(`https://api.artic.edu/api/v1/artworks?page=${page}&limit=${limit}`);
    };

 

    getImage(url: string, id: string):Observable<any>{
        return this.http.get(`https://www.artic.edu/iiif/2/${id}/full/843,/0/default.jpg`);
    }

    getArtist(id:number){
        console.log(id);
        return this.http.get(`https://api.artic.edu/api/v1/artists/${id}`);
    }

    

}