import { Component, OnDestroy } from '@angular/core';
import { DragulaService } from "ng2-dragula";

import { Observable } from "rxjs/Rx";
import { ComponentCanDeactivate } from './exit.about.guard';
import { CloudinaryOptions, CloudinaryUploader, CloudinaryImageComponent } from 'ng2-cloudinary';


@Component({
    selector: 'my-about',
    templateUrl: '/partial/aboutComponent', 
})

export class AboutComponent implements ComponentCanDeactivate {

    items: Data[] = []; 
   
    constructor(private dragulaService: DragulaService) {
        dragulaService.dropModel.subscribe((value:any) => {
            this.onDropModel(value.slice(1));
        });
        dragulaService.removeModel.subscribe((value:any) => {
            this.onRemoveModel(value.slice(1));
        });

        this.uploader.onSuccessItem = (item: any, response: string, status: number, headers: any): any => {
            console.log("uploud");
            let res: any = JSON.parse(response);
            this.imageId = res.public_id;
            this.AddPhoto();
            return { item, response, status, headers };

        };

    }

  

    imageId: string;

    uploader: CloudinaryUploader = new CloudinaryUploader(
        new CloudinaryOptions({ cloudName: 'dr4opxk5i', uploadPreset: 'ajvv2x7e' })
    );


    private onDropModel(args:any) {
        let [el, target, source] = args;   
    }

    private onRemoveModel(args:any) {
        let [el, source] = args;
    }

    AddText(): void {
        let elem: Data = new Data();
        elem.field = "";
        elem.type = "text";
        this.items.push(elem);
      
    }

    AddPhoto(): void {
        let elem: Data = new Data();
        elem.field = this.imageId;
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

    canDeactivate(): boolean | Observable<boolean> {
        for (let i = 0; i < this.items.length; i++) {
            let myContainer = <HTMLElement>document.querySelector("#a" + i);
            this.items[i].field = myContainer.innerHTML;

        }

        return true;
    }


    onChange(event: any) {
        this.uploader.uploadAll();
    }

}

class Data {
    type: string;
    field: string;
}