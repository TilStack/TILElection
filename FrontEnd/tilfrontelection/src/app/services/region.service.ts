import { Injectable } from '@angular/core';
import { Region } from '../models/Region.models';
import { Vote,Resultat } from '../models/Vote.models';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RegionService {
  CREATE_REGION: string = 'http://localhost:8000/api/region';
  CREATE_RESULTAT:string='http://localhost:8000/api/resultat';

  constructor(public http: HttpClient) {}

  // Création d'un observable qui va émettre une région qui sera souscris dans le composant region
  insertRegion(region: Region): Observable<Region> {
    return this.http.post<Region>(this.CREATE_REGION, region);
  }

  // Création d'un observable qui va émettre un tableau de région qui sera souscris dans le composant region
  loadRegion(): Observable<Region[]> {
    return this.http.get<Region[]>(this.CREATE_REGION);
  }

  // Création d'un observable qui va émettre une région qui sera souscris dans le composant EditRegoion
  updateRegion(id: number, region: Region): Observable<Region> {
    const url = `${this.CREATE_REGION}/${id}`;
    return this.http.put<Region>(url, region);
  }

  // Création d'un observable qui va émettre une région qui sera souscris dans le composant EditRegoion
  getRegionById(id: number): Observable<Region> {
    return this.http.get<Region>(`${this.CREATE_REGION}/${id}`);
  }

  // Suppression d'une région grace a son id
  deleteRegion(id: number): Observable<boolean> {
    return this.http.delete<boolean>(`${this.CREATE_REGION}/${id}`);
  }




  loadResultat(): Observable<Resultat[]> {
    return this.http.get<Resultat[]>(this.CREATE_RESULTAT);
  }
}
