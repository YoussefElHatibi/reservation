import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { MainBoardComponent } from './main-board.component';
import { MainBoardRoutingModule } from './main-board-routing.module';
import { SidebarComponent } from './sidebar/sidebar.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatToolbarModule } from '@angular/material/toolbar';
import { SuivreReservationComponent } from './suivre-reservation/suivre-reservation.component';
import { NouvelleReservationComponent, ReservationAlerte } from './nouvelle-reservation/nouvelle-reservation.component';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule, MatOption, MAT_DATE_LOCALE } from '@angular/material/core';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker' ;
// import { DlDateTimeDateModule, DlDateTimePickerModule } from 'angular-bootstrap-datetimepicker';
import { DayGridModule } from './day-grid/day-grid.module';
import {MatSelectModule} from '@angular/material/select';
import { NgxMaskModule, IConfig } from 'ngx-mask';
import { MatDialogModule } from '@angular/material/dialog';
import { ReservationRecapComponent } from './reservation-recap/reservation-recap.component';
//import { SweetAlertService } from 'ngx-sweetalert2';
import {MatTableModule} from  '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import {MatBadgeModule} from '@angular/material/badge';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { AdminReservationComponent } from './admin-reservation/admin-reservation.component';


const maskConfig: Partial<IConfig> = {
  validation: false,
};

@NgModule({
  declarations: [
    MainBoardComponent,
    SidebarComponent,
    SuivreReservationComponent,
    NouvelleReservationComponent,
    ReservationRecapComponent,
    ReservationAlerte,
    AdminReservationComponent
  ],
  imports: [
    CommonModule,
    MainBoardRoutingModule,
    MatToolbarModule,
    MatSidenavModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    MatDatepickerModule,
    MatNativeDateModule,
    NgxMaterialTimepickerModule,
    DayGridModule,
    MatSelectModule,
    NgxMaskModule.forRoot(maskConfig),
    MatDialogModule,
    MatTableModule,
    MatPaginatorModule,
    MatBadgeModule,
    MatSnackBarModule
  ],
  providers: [
    MatDatepickerModule,
    MatNativeDateModule,
    DatePipe,
    { provide: MAT_DATE_LOCALE, useValue: 'en-GB' }
  ],
  exports:[ReservationAlerte]
})
export class MainBoardModule {}
