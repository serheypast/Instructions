import { Component, HostListener } from '@angular/core';
import { Http } from '@angular/http';
import { RestService } from "./RestService/RestService";
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { LocaleService, Language } from 'angular-l10n';

@Component({
    selector: 'home',
    templateUrl: '/partial/homeComponent',
    providers: [RestService],
})

export class HomeComponent {
    @Language() lang: string;

    categories: Category[];
    tags: Tag[];
    public value: string;
    public type: string;
    public property: string;
    public subscription: Subscription;
    constructor(private service: RestService, private activateRoute: ActivatedRoute, public locale: LocaleService) {
        this.subscription = activateRoute.params.subscribe(params => {
            this.type = params['type'];
            this.property = params['property'];
            this.value = params['value'];
        });
        service.getCategories().subscribe(result => {
            this.categories = result.json();
        });
        service.getTags().subscribe(result => {
            this.tags = result.json();
        });
    }

    //selectLanguage(language: string): void {
    //    this.locale.setCurrentLanguage(language);
    //}

}


class Category {
    id: number;
    name: string;
}

class Tag {
    id: number;
    name: string;
}