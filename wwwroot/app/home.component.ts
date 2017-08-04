import { Component, HostListener } from '@angular/core';
import { Http } from '@angular/http';
import { RestService } from "./RestService/RestService";
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

@Component({
    selector: 'home',
    templateUrl: '/partial/homeComponent',
    providers: [RestService],
})

export class HomeComponent {
    categories: Category[];
    tags: Tag[];
    public value: string;
    public type: string;
    public property: string;
    public subscription: Subscription;
    constructor(private service: RestService, private activateRoute: ActivatedRoute,) {
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
}


class Category {
    id: number;
    name: string;
}

class Tag {
    id: number;
    name: string;
}