import { Component, Renderer2 } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { PrimeNGConfig } from 'primeng/api';
import { TokenService } from './services/token.service';
import { NavigationStart, Router } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    trigger('submenu', [
        state('hidden', style({
            height: '0px'
        })),
        state('visible', style({
            height: '*'
        })),
        transition('visible => hidden', animate('400ms cubic-bezier(0.86, 0, 0.07, 1)')),
        transition('hidden => visible', animate('400ms cubic-bezier(0.86, 0, 0.07, 1)'))
    ])
]
})
export class AppComponent  {
   title = 'webIaas';
   menuMode = 'static';
    public menuInactiveDesktop!: boolean;

    public menuActiveMobile!: boolean;

    public overlayMenuActive!: boolean;
  
    public staticMenuInactive!: boolean;
    
    public showHead !: boolean;

    public profileActive!: boolean;

    public topMenuActive!: boolean;

    public topMenuLeaving!: boolean;

    public theme!: string;


    isLogged : boolean = false;
    menuClick!: boolean;

    topMenuButtonClick!: boolean;

    configActive!: boolean;

    configClick!: boolean;

    documentClickListener!: () => void;

    constructor(private readonly tokenSvc : TokenService,private primengConfig: PrimeNGConfig,public renderer: Renderer2, private router: Router){
        router.events.forEach((event)=> {
            if(event instanceof NavigationStart){
                if(event['url']== '/sign-in' || event['url']== '/sign-up') {
                    this.staticMenuInactive = true; //ocultar el leftpanel
                    this.showHead = false; // ocultar el header 
                }else {
                    this.staticMenuInactive = false; //mostrar leftpanel
                    this.showHead = true; // mostrar el header 
                }
            }
        })
    }
    
    ngOnInit() {
        this.isLogged = this.tokenSvc.isLogged();
        this.primengConfig.ripple = true;
        document.documentElement.style.fontSize = '14px';
    }
    
   

    ngAfterViewInit() {
      // hides the overlay menu and top menu if outside is clicked
      this.documentClickListener = this.renderer.listen('body', 'click', (event) => {
          if (!this.isDesktop()) {
              if (!this.menuClick) {
                  this.menuActiveMobile = false;
              }

              if (!this.topMenuButtonClick) {
                  this.hideTopMenu();
              }
          }
          else {
              if (!this.menuClick && this.isOverlay()) {
                  this.menuInactiveDesktop = true;
              }
              if (!this.menuClick){
                  this.overlayMenuActive = false;
              }
          }

          if (this.configActive && !this.configClick) {
              this.configActive = false;
          }

          this.configClick = false;
          this.menuClick = false;
          this.topMenuButtonClick = false;
      });
  }

  toggleMenu(event: Event) {
      this.menuClick = true;

      if (this.isDesktop()) {
          if (this.menuMode === 'overlay') {
              if(this.menuActiveMobile === true) {
                  this.overlayMenuActive = true;
              }

              this.overlayMenuActive = !this.overlayMenuActive;
              this.menuActiveMobile = false;
          }
          else if (this.menuMode === 'static') {
              this.staticMenuInactive = !this.staticMenuInactive;
          }
      }
      else {
          this.menuActiveMobile = !this.menuActiveMobile;
          this.topMenuActive = false;
      }

      event.preventDefault();
  }

  toggleProfile(event: Event) {
      this.profileActive = !this.profileActive;
      event.preventDefault();
  }

  toggleTopMenu(event: Event) {
      this.topMenuButtonClick = true;
      this.menuActiveMobile = false;

      if (this.topMenuActive) {
          this.hideTopMenu();
      } else {
          this.topMenuActive = true;
      }

      event.preventDefault();
  }

  hideTopMenu() {
      this.topMenuLeaving = true;
      setTimeout(() => {
          this.topMenuActive = false;
          this.topMenuLeaving = false;
      }, 1);
  }

  onMenuClick() {
      this.menuClick = true;
  }

  onConfigClick() {
      this.configClick = true;
  }

  isStatic() {
      return this.menuMode === 'static';
  }

  isOverlay() {
      return this.menuMode === 'overlay';
  }

  isDesktop() {
      return window.innerWidth > 992;
  }

  isMobile(){
      return window.innerWidth < 1024;
  }

  onSearchClick() {
      this.topMenuButtonClick = true;
  }

  ngOnDestroy() {
      if (this.documentClickListener) {
          this.documentClickListener();
      }


     
  }
}


