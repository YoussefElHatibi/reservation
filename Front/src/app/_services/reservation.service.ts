import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

const API_URL = 'http://localhost:8080/reservation/';

@Injectable({
  providedIn: 'root'
})
export class ReservationService{
  constructor(private http: HttpClient) { }

  heuresDisponniblesByDateAndTerrain(date:string,terrianId:string):Observable<any>{
    let params = new HttpParams();
    params = params.set('date',date);
    params = params.set('terrainId',terrianId);
    return this.http.get(API_URL+'heures?', {params:params, responseType: 'json' })
  }

  createReservation(reservation:any):Observable<any>{
    console.log(reservation)
    return this.http.post(API_URL+'add',reservation,{responseType:'json'})
  }

  getAllByIdUser(idUser:number): Observable<any>{
    return this.http.get(API_URL+'all/'+idUser,{responseType:'json'})
  }

  deleteById(id:number){
    return this.http.delete(API_URL+'delete/'+id)
  }

  getAllByStatut(statut:string): Observable<any>{
    return this.http.get(API_URL+'all/byStatut?statut='+statut,{responseType:'json'})
  }

  updateStatutById(id:number,statut:string){
    return this.http.put(API_URL+'update/'+id+'?statut='+statut,{responseType:'json'})
  }

}
