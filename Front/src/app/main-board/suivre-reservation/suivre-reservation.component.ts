import {Component, OnInit, ViewChild } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { ReservationService } from 'src/app/_services/reservation.service';
import {MatSort, Sort} from '@angular/material/sort';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import {MatSnackBar, MatSnackBarConfig} from '@angular/material/snack-bar';
import { HttpErrorResponse } from '@angular/common/http';


@Component({
  selector: 'app-suivre-reservation',
  templateUrl: './suivre-reservation.component.html',
  styleUrls: ['./suivre-reservation.component.css']
})
export class SuivreReservationComponent implements OnInit {
  ELEMENT_DATA:ReservationElement[] | undefined;
  dataSource = new MatTableDataSource<ReservationElement>();
  displayedColumns: string[] = ['nom', 'prenom', 'email', 'cin', 'date', 'statut','id'];
  resultsLength = 0;
  durationInSeconds = 5;
  idUser : any =sessionStorage.getItem('auth-user');

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;



  constructor(    private reservationService: ReservationService,private _liveAnnouncer: LiveAnnouncer,private _snackBar: MatSnackBar ) { }


  ngOnInit(): void {

    //console.log("id user : ",JSON.parse(idUser))
    this.reservationService.getAllByIdUser(JSON.parse(this.idUser).id).subscribe(
      (data) => {
        console.log('get All reservations', data);
        this.ELEMENT_DATA=data;
        this.dataSource = new MatTableDataSource<ReservationElement>(this.ELEMENT_DATA);
        this.resultsLength = data.length
        console.log('elt data', this.ELEMENT_DATA);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      (err) => {
        console.log('erreur get All reservations', err);
      }
    );
  }

  formatterStatuts(elt : string):any{
    switch(elt){
      case "En attente de validation" : return "enAttente";
      case "Validée" : return "validee";
      case "Refusée" : return "refusee";
      default : "fermee";

    }
  }

  announceSortChange(sortState: any) {
    // This example uses English messages. If your application supports
    // multiple language, you would internationalize these strings.
    // Furthermore, you can customize the message to add additional
    // details about the values being sorted.
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }
  deleteReservation(id:number){
    console.log("id reservaton is", id)
    let config = new MatSnackBarConfig();
    config.duration = 1500;


    this.reservationService.deleteById(id).subscribe(
      ()=>{
        config.panelClass = ['green-snackbar']
        this._snackBar.open('Résérvation supprimée avec succès !','',config)
        this.refresh();
      },
      (err:HttpErrorResponse)=>{
        config.panelClass = ['red-snackbar']
        this._snackBar.open('Erreur de suppression','',config )
      }
    )
  }

  refresh() {
    this.reservationService.getAllByIdUser(JSON.parse(this.idUser).id).subscribe((data) => {
      this.dataSource.data = data;
    },
    (err) => {
      console.log('erreur get All reservations refresh ', err);
    }
    );
  }

}

export interface ReservationElement {
  adresse: string;
  cin: number;
  date: number;
  email: string;
  heure: string;
  id:number;
  nom : string;
  prenom : string;
  statut:string;
  telephone: string;
  terrain:string;
  user:string;
}
