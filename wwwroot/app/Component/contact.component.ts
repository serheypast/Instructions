import { Component } from '@angular/core';
import { Observable } from "rxjs/Rx";


@Component({
    selector: 'my-contact',
    template: `<h3>О сайте</h3>
                <button class="btn btn-default" (click)="save()">Сохранить</button>
                <a routerLink="">На главную</a>
                `
})


export class ContactComponent{

    items = ['Pizza', 'Pasta', 'Parmesan'];

    saved: boolean = false;
    save() {
        this.saved = true;
    }
    
}
