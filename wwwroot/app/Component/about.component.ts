import { Component, ViewChild } from '@angular/core';
import { DragulaService } from "ng2-dragula";


@Component({
    selector: 'my-about',
    templateUrl: '/partial/aboutComponent', 
})

export class AboutComponent {

  
   

    items: Data[] = []; 

    constructor(private dragulaService: DragulaService) {

        dragulaService.dropModel.subscribe((value:any) => {
            this.onDropModel(value.slice(1));
        });
        dragulaService.removeModel.subscribe((value:any) => {
            this.onRemoveModel(value.slice(1));
        });
    }

    private onDropModel(args:any) {
        let [el, target, source] = args;
        // do something else
    }

    private onRemoveModel(args:any) {
        let [el, source] = args;
        // do something else
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