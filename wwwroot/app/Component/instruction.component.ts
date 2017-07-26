import { Component, OnDestroy } from '@angular/core';
import { DragulaService } from "ng2-dragula";
import { DomSanitizer } from "@angular/platform-browser"
import { SafeResourceUrl } from "@angular/platform-browser/src/platform-browser";
import { Observable } from "rxjs/Rx";
import { ComponentCanDeactivate } from './exit.about.guard';
import { CloudinaryOptions, CloudinaryUploader, CloudinaryImageComponent } from 'ng2-cloudinary';
import { EditorModule } from 'primeng/primeng';


@Component({
    selector: 'instruction',
    templateUrl: '/partial/InstructionComponent', 
})

export class InstructionComponent implements ComponentCanDeactivate {

    items: Block[] = []; 
    
    constructor(private dragulaService: DragulaService, private sanitizer: DomSanitizer) {

        dragulaService.dropModel.subscribe((value:any) => {
            this.onDropModel(value.slice(1));
        });
        dragulaService.removeModel.subscribe((value:any) => {
            this.onRemoveModel(value.slice(1));
        });

        this.uploader.onSuccessItem = (item: any, response: string, status: number, headers: any): any => {
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

    turn(index: number) {
        this.items[index].state = !this.items[index].state;
    }

    

    AddText(): void {
        let elem: Block = new Block();
        elem.field = "";
        elem.type = "text";
        elem.state = true;
        this.items.push(elem);    
    }

    AddPhoto(): void {
        let elem: Block = new Block();
        elem.field = this.imageId;
        elem.type = "photo";
        this.items.push(elem);
    }

    AddVideo(): void {
        let elem: Block = new Block();
        elem.field = "";
        elem.type = "video";
        elem.state = false;
        this.items.push(elem);
    }

    addYoutubeUrl(index: number): void {
        let url: string = this.items[index].field;
        let standartUrl: string = "https://www.youtube.com/embed/";
        let str = url.split("=");
        this.items[index].field = standartUrl + str[1];
        this.items[index].state = true;
    }

    safeOn(url: string): SafeResourceUrl {
        console.log(url);
        return this.sanitizer.bypassSecurityTrustResourceUrl(url);
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

class Block {
    type: string;
    field: string;
    state: boolean;
}

class Step {
    stepName: string;
    blocks: Block[] = []; 
}

class Instruction {
    instructionName: string;
    mainImageUrl: string;
    category: string;
    
    steps: Step[] = [];

}