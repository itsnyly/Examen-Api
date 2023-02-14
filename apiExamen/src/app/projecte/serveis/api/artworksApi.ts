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

    getNthFacts(limit: number):Observable<any> {
        return this.http.get("https://catfact.ninja/facts?limit="+limit);
    };

    

}