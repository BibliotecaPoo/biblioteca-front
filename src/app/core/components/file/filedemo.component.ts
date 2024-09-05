import { Component, EventEmitter, Output } from '@angular/core';
import { MessageService } from 'primeng/api';

@Component({
    selector: 'app-filedemo',
    templateUrl: './filedemo.component.html',
    providers: [MessageService]
})
export class FileDemoComponent {

    uploadedFiles: any[] = [];

    @Output() fileSelected: EventEmitter<File> = new EventEmitter<File>();


    constructor(private messageService: MessageService) {}

    onFileSelected(event) {
        const uploadedFiles: File = event.files[0];
        this.fileSelected.emit(uploadedFiles);
    }
}
