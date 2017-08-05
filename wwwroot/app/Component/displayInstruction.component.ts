import { Component, OnInit } from '@angular/core';
import { Language } from 'angular-l10n';

@Component({
    selector: 'display-instructions',
    templateUrl: '/partial/displayInstructionComponent'
})

export class DisplayInstructionComponent {
    @Language() lang: string;
    instruction: Instruction = new Instruction();

    constructor() {  }

    ngOnInit() {

        this.like = false;
        this.instruction.previewImageUrl = "http://wallpapers-images.ru/1920x1080/nature/wallpapers/wallpapers-nature-013.jpg";
        this.instruction.rating = 23;

        let step1 = new Step();
        let step2 = new Step();

        step1.name = "FirstStep";
        step2.name = "SecondStep";

        let bl1 = new Block();
        let bl2 = new Block();
        bl1.type = "text";
        bl1.field = "У меня проблема. Ставлю анкоры на другую страницу. Их около 30 штук. Так вот, первые десять анкоров работают нормально, а остальные тупо перемещают в конец страницы. В чем может быть проблема?п.с.анкоры все разные с переходом на уникальные id";
        bl2.type = "photo";
        bl2.field = "http://wallpapers-image.ru/1920x1080/mountains/wallpapers/mountains-wallpapers-1920x1080-0007.jpg";

        let bl12 = new Block();
        let bl13 = new Block();
        let bl22 = new Block();
        bl13.type = "video";
        bl13.field = "https://www.youtube.com/embed/d3GDvpfNNcY";
        bl12.type = "text";
        bl12.field = "21";
        bl22.type = "text";
        bl22.field = "text";

        step1.blocks = step1.blocks.concat(bl1, bl2);
        step2.blocks = step2.blocks.concat(bl12, bl22, bl13);
        this.instruction.steps = this.instruction.steps.concat(step1, step2,step1,step1,step1,step1,step1);
        this.instruction.name = "How to made potato";
        let tag = new Tag();
        tag.name = "One";
        let tag1 = new Tag();
        tag1.name = "Two";
        let tag2 = new Tag();
        tag2.name = "Three";
        let tagInst = new InstructionTag();
        tagInst.tag = tag;
        let tagInst1 = new InstructionTag();
        tagInst1.tag = tag1;
        let tagInst2 = new InstructionTag();
        tagInst2.tag = tag2;
        this.instruction.tags = this.instruction.tags.concat(tagInst, tagInst1, tagInst2);
        let category = new Category();
        category.name = "Sport";
        this.instruction.category = category;
    }

    like: boolean;

    putLike() {
        if (this.like) {
            this.instruction.rating -= 1;
        }
        else {
            this.instruction.rating += 1;
        }

        this.like = !this.like;
        //request on server
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