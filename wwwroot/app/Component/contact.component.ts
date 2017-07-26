
import { Component } from '@angular/core';
import { Observable } from "rxjs/Rx";
import { ComponentCanDeactivate } from './exit.about.guard';


@Component({
    selector: 'my-contact',
    template: `<h3>О сайте</h3>
                <button class="btn btn-default" (click)="save()">Сохранить</button>
                <a routerLink="">На главную</a>
                `
})


export class ContactComponent implements ComponentCanDeactivate {
    saved: boolean = false;
    save() {
        this.saved = true;
    }

    canDeactivate(): boolean | Observable<boolean> {

        if (!this.saved) {
            return confirm("Вы хотите покинуть страницу?");
        }
        else {
            return true;
        }
    }
}
