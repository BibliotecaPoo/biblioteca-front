import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularMaterialModule } from './angular-material/angular-material.module';

@NgModule({
  imports: [
    CommonModule,
    AngularMaterialModule
  ],
  declarations: [
  ],
  exports:[
    AngularMaterialModule, CommonModule
  ]
})
export class SharedModule { }
