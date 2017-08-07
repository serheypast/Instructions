import { Component, Pipe, PipeTransform ,OnDestroy } from '@angular/core';
import { DragulaService } from "ng2-dragula";
import { DomSanitizer } from "@angular/platform-browser"
import { SafeResourceUrl } from "@angular/platform-browser/src/platform-browser";
import { Observable } from "rxjs/Rx";
import { CloudinaryOptions, CloudinaryUploader, CloudinaryImageComponent } from 'ng2-cloudinary';
import { TagModel } from "ng2-tag-input/dist/modules/core";
import { FormControl } from "@angular/forms/src/model";
import { ConfirmationService, Message } from 'primeng/primeng';
import { RestService } from "./../RestService/RestService";
import { SelectItem } from "primeng/components/common/selectitem";
import { Language } from 'angular-l10n';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { RoleService } from "./../RoleService/RoleService";

@Component({
    selector: 'instruction',
    templateUrl: '/partial/InstructionComponent', 
    styleUrls: ['/Component/InstructionComponent.css'],
    providers: [ConfirmationService, RestService,RoleService]
})

export class InstructionComponent {
    @Language() lang: string;   
    msgs: Message[] = [];
    categories: SelectItem[];
    public id: number;
    private subscription: Subscription;
    instruction: Instruction = new Instruction();
    category: Category = new Category();
    tags: any[] = [];
    create: boolean;
    AuthUser: AuthUser;
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

    public checkRole(): boolean {
        this.AuthUser = RoleService.getCurrentAuthUser();
        if (this.AuthUser.role == 'Admin' || this.IdUserWhoCreated == 0 || this.AuthUser.id == this.instruction.userProfile.id) {
            return true;
        }
        return false;
    }
    loadInstruction: boolean = false;
    IdUserWhoCreated: number = 0;
    constructor(private service: RestService, private dragulaService: DragulaService, private sanitizer: DomSanitizer,
        private confirmationService: ConfirmationService, private activateRoute: ActivatedRoute, private router: Router) {
      
        this.subscription = this.activateRoute.params.subscribe(params => {
            this.id = params['id'];            
        });

        this.service.getCategories().subscribe(result => {  
            this.categories = [];
            for (let cat of result.json()) {
                this.categories.push({ label: cat.name, value: { name: cat.name } });
            }
        });

        if (this.id)
            this.service.getInstrcutionById(this.id).subscribe(result => {
                this.instruction = result.json();
                this.getTags();     
                this.category.name = this.instruction.category.name;
                this.IdUserWhoCreated = this.instruction.userProfile.id;
                this.loadInstruction = true;
            });
        else {
            this.create = true;
            this.instruction.name = "Name";
            this.instruction.previewImageUrl = "https://res.cloudinary.com/dr4opxk5i/image/upload/spt2r2sqiyotibnrfhch.jpg";
            this.instruction.category = this.category;
            this.loadInstruction = true;
        }
        
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

        this.addStep();

    }

    getTags() {
        for (let tag of this.instruction.tags) {
            this.tags.push(tag.tag.name);
        }
    }

    ngOnDestroy() {
        this.dragulaService.destroy('first-bag');
    }

    publish() {
        if (this.validate()) {             
            this.instruction.category = this.category;
            if (!this.id) {
                this.addTags();
                this.service.publishInstruction(this.instruction);
                this.router.navigate(['home/all']);
            }
            else this.editInstruction();
        }       
    }

    editInstruction() {
        for (let step of this.instruction.steps){
            step.id = 0;
            for (let block of step.blocks) {
                block.id = 0;
            }
        }
        this.msgs.push({ severity: 'success', summary: 'Success Message', detail: 'Instruction saved' });
        this.service.editInstruction(this.instruction);
    }

    validate(): boolean {
        this.msgs = [];
        return !(this.nameValidate() || this.tagsValidate() || this.categoryValidate() || this.stepNameValidate());          
    }

    nameValidate() {
        if (this.instruction.name.length == 0) {
            this.msgs.push({ severity: 'error', summary: 'Error Message', detail: 'Name is empty' });
            return true;
        }
        return false;
    }

    tagsValidate() {
        if (this.tags.length == 0) {
            this.msgs.push({ severity: 'error', summary: 'Error Message', detail: 'Tags is empty' });
            return true;
        }
        return false;
    }

    categoryValidate() {
        if (this.category.name.length == 0) {
            this.msgs.push({ severity: 'error', summary: 'Error Message', detail: 'Category is not choosen' });
            return true;
        }
        return false;
    }

    stepNameValidate() {
        for (let step of this.instruction.steps) {
            console.log(step.name);
            if (!step.name) {
                this.msgs.push({ severity: 'error', summary: 'Error Message', detail: 'Enter the name in all steps' });
                return true;
            }
        }
        return false;
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
        'addTag': 'Your tag can have max 25 symbols',
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
    id: null;
    name: string;
    dataCreated: string;
    previewImageUrl: string;
    rating: number;
    category: Category;
    userProfile: UserProfile;
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

class Categ {
    name: string;
}

class AuthUser {
    id: number = 0;
    role: string;
}

class UserProfile {
    id: number;
    firstName: string;
    secondName: string;
    urlPhoto: string;
    rating: number;
    country: string;
    city: string;
    dataOfBirth: string;
    aboutMySelf: string;
}