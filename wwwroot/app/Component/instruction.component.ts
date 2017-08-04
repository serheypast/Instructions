import { Component, Pipe, PipeTransform ,OnDestroy } from '@angular/core';
import { DragulaService } from "ng2-dragula";
import { DomSanitizer } from "@angular/platform-browser"
import { SafeResourceUrl } from "@angular/platform-browser/src/platform-browser";
import { Observable } from "rxjs/Rx";
import { CloudinaryOptions, CloudinaryUploader, CloudinaryImageComponent } from 'ng2-cloudinary';
import { TagModel } from "ng2-tag-input/dist/modules/core";
import { FormControl } from "@angular/forms/src/model";
import { ConfirmationService } from 'primeng/primeng';
import { RestService } from "./../RestService/RestService";
import { SelectItem } from "primeng/components/common/selectitem";

@Component({
    selector: 'instruction',
    templateUrl: '/partial/InstructionComponent', 
    styleUrls: ['/Component/InstructionComponent.css'],
    providers: [ConfirmationService, RestService]
})

export class InstructionComponent {

    cities: SelectItem[];

    selectedCity: any;


    instruction: Instruction = new Instruction();
    category: Category = new Category();
    tags: any[] = [];

    addStep() {
        let step: Step = new Step();
        this.instruction.steps.push(step);
        
    }

    confirm2(index: number) {
        this.confirmationService.confirm({
            message: 'Do you want to delete this step?',
            header: 'Delete step',
            icon: 'fa fa-trash',
            accept: () => {
                this.deleteStep(index);
            },
            reject: () => {

            }
        });
    }

    constructor(private service: RestService,private dragulaService: DragulaService, private sanitizer: DomSanitizer, private confirmationService: ConfirmationService) {
        this.cities = [];
        this.cities.push({ label: 'New York', value: {name:'New York' }});

        this.addStep();

        this.instruction.name = "Name";
        this.instruction.previewImageUrl = "https://res.cloudinary.com/dr4opxk5i/image/upload/spt2r2sqiyotibnrfhch.jpg"; 
        this.instruction.category = this.category;

        dragulaService.dropModel.subscribe((value: any) => {
            this.onDropModel(value.slice(1));
        });
        dragulaService.removeModel.subscribe((value: any) => {
            this.onRemoveModel(value.slice(1));
        });

        dragulaService.setOptions('first-bag', {
            moves: function (el: any, container: any, handle: any) {
                return handle.className === 'ui-panel-titlebar ui-widget-header ui-helper-clearfix ui-corner-all';
            }
        });

        this.uploader.onSuccessItem = (item: any, response: string, status: number, headers: any): any => {
            let res: any = JSON.parse(response);
            if (this.typePhoto) {
                this.instruction.previewImageUrl = "https://res.cloudinary.com/dr4opxk5i/image/upload/" + res.public_id + ".jpg";
            }
            else {
                this.imageId = res.public_id;
                this.AddPhoto(this.imageIndex);
            }
            return { item, response, status, headers };
        };

    }

    ngOnDestroy() {
        this.dragulaService.destroy('first-bag');
    }

    publish() {
        this.addTags();
        this.addCategory();
        console.log(this.instruction);
    }

    addCategory() {
        let category: Category = new Category();
        category.name = this.selectedCity.name;
        this.instruction.category = category;
    }

    addTags() {
        for (let tag1 of this.tags) {
            let tag = new Tag();
            tag.name = tag1.value;
            let tagInst = new InstructionTag();
            tagInst.tag = tag;
            this.instruction.tags.push(tagInst);
        }
    }

    typePhoto: boolean;
    imageIndex: number;
    imageId: string;

    uploader: CloudinaryUploader = new CloudinaryUploader(
        new CloudinaryOptions({ cloudName: 'dr4opxk5i', uploadPreset: 'ajvv2x7e' })
    );

    private onDropModel(args: any) {
        let [el, target, source] = args;
    }

    private onRemoveModel(args: any) {
        let [el, source] = args;
    }

    turn(indexI: number, indexJ: number) {
        this.instruction.steps[indexI].blocks[indexJ].state = !this.instruction.steps[indexI].blocks[indexJ].state;
    }

    AddText(index: number): void {
        let text: Block = new Block();
        text.field = "";
        text.type = "text";
        text.state = true;
        this.instruction.steps[index].blocks.push(text);
    }

    AddPhoto(index: number): void {
        let photo: Block = new Block();
        photo.field = "https://res.cloudinary.com/dr4opxk5i/image/upload/" + this.imageId + ".jpg";
        photo.type = "photo";
        this.instruction.steps[index].blocks.push(photo);
    }

    AddVideo(index: number): void {
        let video: Block = new Block();
        video.field = "";
        video.type = "video";
        video.state = false;
        this.instruction.steps[index].blocks.push(video);
    }

    addYoutubeUrl(indexI: number, indexJ: number): void {
        let url: string = this.instruction.steps[indexI].blocks[indexJ].field;
        let standartUrl: string = "https://www.youtube.com/embed/";
        let str = url.split("=");
        this.instruction.steps[indexI].blocks[indexJ].field = standartUrl + str[1];
        this.instruction.steps[indexI].blocks[indexJ].state = true;
    }

    safeOn(url: string): SafeResourceUrl {
        return this.sanitizer.bypassSecurityTrustResourceUrl(url);
    }

    removeElement(indexI: number, indexDel: number): void {
        this.instruction.steps[indexI].blocks.splice(indexDel, 1);
    }

    deleteStep(j: number) {
        this.instruction.steps.splice(j, 1);
    }

    onChange(event: any, index: number) {
        if (index == -1) this.typePhoto = true;
        else this.typePhoto = false;
        this.uploader.uploadAll();
        this.imageIndex = index;
    }


    public items: Array<string> = ['Amsterdam', 'Antwerp', 'Athens', 'Barcelona',
        'Berlin'];


    public validators = [this.addTag];

    private addTag(control: FormControl) {

        if (control.value.length > 25) {
            return {
                'addTag': true
            };
        }

        return null;
    }

    public errorMessages = {
        'addTag': 'Your tag can have max 25 symbols'
    };

    public selected(value: any): void {       
        this.category.name = value.text;        
    }

}

@Pipe({ name: 'safe' })
export class SafePipe implements PipeTransform {
    constructor(private sanitizer: DomSanitizer) { }
    transform(url: any) {
        return this.sanitizer.bypassSecurityTrustResourceUrl(url);
    }
} 

class Block {
    id: number;
    type: string;
    field: string;
    state: boolean;
}

class Step {
    id: number;
    position: number;
    name: string;
    blocks: Block[] = [];
}

class Instruction {
    id: number;
    name: string;
    dataCreated: string;
    previewImageUrl: string;
    rating: number;
    category: Category;
    user: null;
    tags: InstructionTag[] = [];
    steps: Step[] = [];
}

class Category {
    id: number;
    name: string;
}

class InstructionTag {
    id: number;
    tag: Tag;
    instruction: Instruction;
}

class Tag {
    id: number;
    name: string;
    instructoins: InstructionTag[] = [];
}