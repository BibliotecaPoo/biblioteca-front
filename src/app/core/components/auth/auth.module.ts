import { SharedModule } from '../../../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthRoutingModule } from './auth-routing.module';
import { MessageModule } from 'primeng/message';
import { ToastModule } from 'primeng/toast';
import { MessagesModule } from 'primeng/messages';

@NgModule({
    imports: [
        CommonModule,
        AuthRoutingModule,
        SharedModule,
        MessageModule,
        ToastModule,
        MessagesModule
    ]
})
export class AuthModule { }
