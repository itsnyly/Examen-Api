import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})

export class artworks {
    constructor(private http: HttpClient) { };

    getFact():Observable<any> {
        return this.http.get("https://catfact.ninja/fact");
    };

    getAllArtWorks():Observable<any> {
        return this.http.get("https://api.artic.edu/api/v1/artworks");
    };

    getArtWorksByPage(page: number, limit:number):Observable<any> {
        return this.http.get(`https://api.artic.edu/api/v1/artworks?page=${page}&limit=${limit}`);
    };

    getNthFacts(limit: number):Observable<any> {
        return this.http.get("https://catfact.ninja/facts?limit="+limit);
    };

    

}