import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoreComponent } from './core.component';
import { MessageService } from 'primeng/api';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [CoreComponent]
})
export class CoreModule { }
