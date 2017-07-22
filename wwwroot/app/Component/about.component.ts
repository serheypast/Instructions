import { Component } from '@angular/core';


@Component({
    selector: 'my-about',
    templateUrl: '/partial/aboutComponent',
    
})

export class AboutComponent {
   
    items: Data[] = []; 

    constructor() {
       

    }

    AddText(): void {
        let elem: Data = new Data();
        elem.field = "";
        elem.type = "text";
        this.items.push(elem);
    }

    AddPhoto(): void {
        let elem: Data = new Data();
        elem.field = "";
        elem.type = "photo";
        this.items.push(elem);
    }

    AddVideo(): void {
        let elem: Data = new Data();
        elem.field = "";
        elem.type = "video";
        this.items.push(elem);
    }

    removeElement(index: number): void {
        this.items.splice(index,1);
    }

}

class Data {
    type: string;
    field: string;
}