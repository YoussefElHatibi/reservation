import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from '../_services/token-storage.service';

@Component({
  selector: 'app-main-board',
  templateUrl: './main-board.component.html',
  styleUrls: ['./main-board.component.css']
})
export class MainBoardComponent implements OnInit {

  userRole = null;

  constructor(private tokenStorageService : TokenStorageService) { }

  ngOnInit(): void {
    console.log("url : " , window.location.href.substring(22) )
    this.userRole = this.tokenStorageService.getUser().roles[0];
  }

  isActive(parentPath: String, childPath: String): boolean {
    return parentPath+"/"+childPath== window.location.href.substring(22);
  }
}
