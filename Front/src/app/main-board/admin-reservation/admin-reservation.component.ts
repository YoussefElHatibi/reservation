import { LiveAnnouncer } from '@angular/cdk/a11y';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ReservationService } from 'src/app/_services/reservation.service';

@Component({
  selector: 'app-admin-reservation',
  templateUrl: './admin-reservation.component.html',
  styleUrls: ['./admin-reservation.component.css']
})
export class AdminReservationComponent implements OnInit {
  ELEMENT_DATA:AdminReservationElement[] | undefined;
  dataSource = new MatTableDataSource<AdminReservationElement>();
  displayedColumns: string[] = ['nom', 'prenom', 'email', 'cin', 'date', 'statut','id'];
  resultsLength = 0;
  durationInSeconds = 5;

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private reservationService: ReservationService,private _liveAnnouncer: LiveAnnouncer,private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.reservationService.getAllByStatut("EN_ATTENTE_DE_VALIDATION").subscribe(
      (data) => {
        console.log('get All reservations admin en attente', data);
        this.ELEMENT_DATA=data;
        this.dataSource = new MatTableDataSource<AdminReservationElement>(this.ELEMENT_DATA);
        this.resultsLength = data.length
        console.log('elt data', this.ELEMENT_DATA);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      (err) => {
        console.log('erreur get All reservations admin en attente', err);
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

  refresh() {
    this.reservationService.getAllByStatut("EN_ATTENTE_DE_VALIDATION").subscribe((data) => {
      this.dataSource.data = data;
    },
    (err) => {
      console.log('erreur get All reservations refresh ', err);
    }
    );
  }

  validerReservation(id:number){
    console.log("id reservaton is", id)
    let config = new MatSnackBarConfig();
    config.duration = 1500;


    this.reservationService.updateStatutById(id,"VALIDÉE").subscribe(
      ()=>{
        config.panelClass = ['green-snackbar']
        this._snackBar.open('Résérvation validée avec succès !','',config)
        this.refresh();
      },
      (err:HttpErrorResponse)=>{
        config.panelClass = ['red-snackbar']
        this._snackBar.open('Erreur de validation','',config )
      }
    )
  }

  annulerReservation(id:number){
    console.log("id reservaton is", id)
    let config = new MatSnackBarConfig();
    config.duration = 1500;


    this.reservationService.updateStatutById(id,"REFUSÉE").subscribe(
      ()=>{
        config.panelClass = ['green-snackbar']
        this._snackBar.open('Résérvation annulée avec succès !','',config)
        this.refresh();
      },
      (err:HttpErrorResponse)=>{
        config.panelClass = ['red-snackbar']
        this._snackBar.open("Erreur d'annulation",'',config )
      }
    )
  }

}


export interface AdminReservationElement {
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
