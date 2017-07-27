﻿import { Component, Pipe, PipeTransform ,OnDestroy } from '@angular/core';
import { DragulaService } from "ng2-dragula";
import { DomSanitizer } from "@angular/platform-browser"
import { SafeResourceUrl } from "@angular/platform-browser/src/platform-browser";
import { Observable } from "rxjs/Rx";
import { CloudinaryOptions, CloudinaryUploader, CloudinaryImageComponent } from 'ng2-cloudinary';

@Component({
    selector: 'instruction',
    templateUrl: '/partial/InstructionComponent', 
    styleUrls: ['/Component/InstructionComponent.css']
})


export class InstructionComponent {

    instruction: Instruction = new Instruction();

    addStep() {
        let step: Step = new Step();
        this.instruction.steps.push(step);
    }

    constructor(private dragulaService: DragulaService, private sanitizer: DomSanitizer) {

        dragulaService.dropModel.subscribe((value:any) => {
            this.onDropModel(value.slice(1));
        });
        dragulaService.removeModel.subscribe((value:any) => {
            this.onRemoveModel(value.slice(1));
        });

        dragulaService.setOptions('first-bag', {
            moves: function (el: any, container: any, handle: any) {
                console.log(container.className);
                console.log(handle.className);
                return handle.className === 'ui-panel-titlebar ui-widget-header ui-helper-clearfix ui-corner-all';
            }
        });

        this.uploader.onSuccessItem = (item: any, response: string, status: number, headers: any): any => {
            let res: any = JSON.parse(response);
            this.imageId = res.public_id;
            this.AddPhoto(this.imageIndex);
            return { item, response, status, headers };
        };

    }

    imageIndex: number;
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

    turn(indexI: number, indexJ: number) {
        this.instruction.steps[indexI].blocks[indexJ].state = !this.instruction.steps[indexI].blocks[indexJ].state;
    }

    AddText(index: number): void {
        let elem: Block = new Block();
        elem.field = "";
        elem.type = "text";
        elem.state = true;
        this.instruction.steps[index].blocks.push(elem);
       
    }

    AddPhoto(index : number): void {
        let elem: Block = new Block();
        elem.field = this.imageId;
        elem.type = "photo";
        this.instruction.steps[index].blocks.push(elem);
    }

    AddVideo(index: number): void {
        let elem: Block = new Block();
        elem.field = "";
        elem.type = "video";
        elem.state = false;
        this.instruction.steps[index].blocks.push(elem);
    }

    addYoutubeUrl(indexI:number ,indexJ: number): void {
        let url: string = this.instruction.steps[indexI].blocks[indexJ].field;
        let standartUrl: string = "https://www.youtube.com/embed/";
        let str = url.split("=");
        this.instruction.steps[indexI].blocks[indexJ].field = standartUrl + str[1];
        this.instruction.steps[indexI].blocks[indexJ].state = true;
    }

    safeOn(url: string): SafeResourceUrl {
        console.log("опача");
        return this.sanitizer.bypassSecurityTrustResourceUrl(url);
    }

    removeElement(indexI: number, indexDel:number): void {
        this.instruction.steps[indexI].blocks.splice(indexDel, 1);
    }

    deleteStep(j: number) {
        this.instruction.steps.splice(j, 1);
    }

    onChange(event: any, index: number) {
        this.uploader.uploadAll();
        this.imageIndex = index;
    }

}

@Pipe({ name: 'safe' })
export class SafePipe implements PipeTransform {
    constructor(private sanitizer: DomSanitizer) { }
    transform(url:any) {
        return this.sanitizer.bypassSecurityTrustResourceUrl(url);
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
    tags: string[] = [];
    steps: Step[] = [];

}