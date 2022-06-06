import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  isLoggedIn$ !: Observable<boolean>;
  constructor(private readonly tokenSvc : TokenService) { }

  ngOnInit(): void {
    this.isLoggedIn$ = this.tokenSvc.isLoggedIn;
  }

}
