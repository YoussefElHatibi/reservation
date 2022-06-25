import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "../auth.guard";
import { AdminReservationComponent } from "./admin-reservation/admin-reservation.component";
import { MainBoardComponent } from "./main-board.component";
import { MainGuard } from "./main.guard";
import { NouvelleReservationComponent } from "./nouvelle-reservation/nouvelle-reservation.component";
import { SuivreReservationComponent } from "./suivre-reservation/suivre-reservation.component";

const routes: Routes = [
  { path: 'main', component: MainBoardComponent,canActivate:[MainGuard], children:[
    {path:'nouvelleReservation',component:NouvelleReservationComponent},
    {path:'suivreReservation',component:SuivreReservationComponent},
    {path:'administrerReservation',component:AdminReservationComponent},
    { path: '', redirectTo: 'nouvelleReservation', pathMatch: 'full' },
  ] }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MainBoardRoutingModule {}
