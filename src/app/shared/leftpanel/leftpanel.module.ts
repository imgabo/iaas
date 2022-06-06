import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LeftpanelComponent } from './leftpanel.component';



@NgModule({
  declarations: [LeftpanelComponent],
  imports: [
    CommonModule
  ],
  exports:[
    LeftpanelComponent,
  ]
})
export class LeftpanelModule { }
