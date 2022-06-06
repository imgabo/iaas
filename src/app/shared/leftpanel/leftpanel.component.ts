import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-leftpanel',
  templateUrl: './leftpanel.component.html',
  styleUrls: ['./leftpanel.component.scss']
})
export class LeftpanelComponent implements OnInit {
  isLoggedIn$ !: Observable<boolean>;
  constructor(private tokenSvc : TokenService) { }

  ngOnInit(): void {
    this.isLoggedIn$ = this.tokenSvc.isLoggedIn;
  }

}
