import { DatePipe } from '@angular/common';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { MyErrorStateMatcher } from 'src/app/_helpers/MyErrorStateMatcher';
import { TerrainService } from 'src/app/_services/terrain.service';
import { ReservationService } from 'src/app/_services/reservation.service';
import { DayGridComponent } from '../day-grid/day-grid.component';
import { TokenStorageService } from 'src/app/_services/token-storage.service';
import { MatDialog } from '@angular/material/dialog';
import { ReservationRecapComponent } from '../reservation-recap/reservation-recap.component';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
//import { SweetAlertService } from 'ngx-sweetalert2';
@Component({
  selector: 'app-nouvelle-reservation',
  templateUrl: './nouvelle-reservation.component.html',
  styleUrls: ['./nouvelle-reservation.component.css'],
  providers: [DatePipe],
})
export class NouvelleReservationComponent implements OnInit {
  @ViewChild(DayGridComponent) dayGrid: DayGridComponent =
    new DayGridComponent();

  public reservationForm = new FormGroup({
    nom: new FormControl(''),
    prenom: new FormControl(''),
    cin: new FormControl(''),
    telephone: new FormControl('', Validators.required),
    email: new FormControl(''),
    terrain: new FormControl(''),
    adresse: new FormControl(''),
    date: new FormControl('', Validators.required),
    heure: new FormControl('', Validators.required),
    statut: new FormControl('EN_ATTENTE_DE_VALIDATION'),
    user: new FormControl(''),
  });

  matcher = new MyErrorStateMatcher();

  terrains: any[] = [];

  constructor(
    private tokenStorageService: TokenStorageService,
    private datePipe: DatePipe,
    private terrainService: TerrainService,
    private reservationService: ReservationService,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar
  ) //private sweetAlertService:SweetAlertService
  {}

  ngOnInit(): void {
    console.log('form on init', this.reservationForm.value);
    console.log(this.reservationForm.value.terrain.id);
    this.terrainService.getAll().subscribe(
      (data) => {
        console.log('get All Terrains', data);
        this.terrains = data;
      },
      (err) => {
        console.log('erreur get All Terrains', err);
      }
    );
  }

  reserver(): void {
    let config = new MatSnackBarConfig();
      config.duration = 1500;
      config.panelClass = ['red-snackbar'];
    var form = this.reservationForm.value;

      form.terrain = { id: form.terrain };
      form.user = { id: this.tokenStorageService.getUser().id };
      this.reservationForm.setValue(form);
      console.log(this.reservationForm.value);
      console.log("is form valide ? ",this.reservationForm.valid);
      if (this.reservationForm.valid){
      this.reservationService
        .createReservation(this.reservationForm.value)
        .subscribe(
          (data) => {
            this.reservationForm.reset();
            console.log('CREATION SUCCESSED DATA RESPONSE : ', data);
            this.dialog.open(ReservationAlerte, {
              width: '100% !important',
              panelClass: 'custom-dialog-container',
            });
          },
          (err) => {
            this._snackBar.open(
              'Erreur lors de création de la réservation !',
              '',
              config
            );
            console.log('ERROR--', err);
          }
        );
      // }
      // });
    }else{
      this._snackBar.open(
        'Veuillez remplir les champs obligatoires !',
        '',
        config
      );
    }


  }

  hourChangedHandler(event: any) {
    console.log('final hour', this.reservationForm.value);
    var form = this.reservationForm.value;
    form.heure = event;
    this.reservationForm.setValue(form);
    console.log('final hour', this.reservationForm.value);
  }

  refreshGrid() {
    var form = this.reservationForm.value;
    var date = form.date;
    var terrainId = form.terrain;

    if (terrainId != '' && date != undefined && date != '') {
      date = new Date(date);
      date = this.datePipe.transform(date, 'dd/MM/yyyy');

      console.log('date ', date);
      this.reservationService
        .heuresDisponniblesByDateAndTerrain(date, terrainId)
        .subscribe(
          (data) => {
            console.log(data);
            let dayHoursList = new Array();
            for (let hour of this.dayGrid.dayHours) {
              if (data.includes(hour.heure)) {
                dayHoursList.push({
                  heure: hour.heure,
                  class: 'disabled-grid',
                });
              } else {
                dayHoursList.push({ heure: hour.heure, class: 'enabled-grid' });
              }
            }
            this.dayGrid.dayHours = dayHoursList;
            console.log('child hoursday: ', this.dayGrid?.dayHours);
            console.log('result dayHoursList: ', this.dayGrid.dayHours);
            console.log(
              'result form value final: ',
              this.reservationForm.value
            );
          },
          (err) => {}
        );
    }
  }
}

@Component({
  selector: 'reservation-alerte',
  templateUrl: 'reservation-alerte.html',
  styleUrls: ['reservation-alerte.css'],
})
export class ReservationAlerte {
  constructor(private router: Router) {}
  goToMesReservations() {
    this.router.navigateByUrl('/main/suivreReservation');
  }
}
