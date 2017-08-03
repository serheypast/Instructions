"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var DisplayInstructionComponent = (function () {
    function DisplayInstructionComponent() {
        this.instruction = new Instruction();
    }
    DisplayInstructionComponent.prototype.goTo = function (location) {
        window.location.hash = location;
    };
    DisplayInstructionComponent.prototype.ngOnInit = function () {
        this.like = false;
        this.instruction.previewImageUrl = "http://wallpapers-images.ru/1920x1080/nature/wallpapers/wallpapers-nature-013.jpg";
        this.instruction.rating = 23;
        var step1 = new Step();
        var step2 = new Step();
        step1.name = "FirstStep";
        step2.name = "SecondStep";
        var bl1 = new Block();
        var bl2 = new Block();
        bl1.type = "text";
        bl1.field = "У меня проблема. Ставлю анкоры на другую страницу. Их около 30 штук. Так вот, первые десять анкоров работают нормально, а остальные тупо перемещают в конец страницы. В чем может быть проблема?п.с.анкоры все разные с переходом на уникальные id";
        bl2.type = "photo";
        bl2.field = "http://wallpapers-image.ru/1920x1080/mountains/wallpapers/mountains-wallpapers-1920x1080-0007.jpg";
        var bl12 = new Block();
        var bl13 = new Block();
        var bl22 = new Block();
        bl13.type = "video";
        bl13.field = "https://www.youtube.com/embed/d3GDvpfNNcY";
        bl12.type = "text";
        bl12.field = "21";
        bl22.type = "text";
        bl22.field = "text";
        step1.blocks = step1.blocks.concat(bl1, bl2);
        step2.blocks = step2.blocks.concat(bl12, bl22, bl13);
        this.instruction.steps = this.instruction.steps.concat(step1, step2, step1, step1, step1, step1, step1);
        this.instruction.name = "How to made potato";
        var tag = new Tag();
        tag.name = "One";
        var tag1 = new Tag();
        tag1.name = "Two";
        var tag2 = new Tag();
        tag2.name = "Three";
        var tagInst = new InstructionTag();
        tagInst.tag = tag;
        var tagInst1 = new InstructionTag();
        tagInst1.tag = tag1;
        var tagInst2 = new InstructionTag();
        tagInst2.tag = tag2;
        this.instruction.tags = this.instruction.tags.concat(tagInst, tagInst1, tagInst2);
        var category = new Category();
        category.name = "Sport";
        this.instruction.category = category;
    };
    DisplayInstructionComponent.prototype.putLike = function () {
        if (this.like) {
            this.instruction.rating -= 1;
        }
        else {
            this.instruction.rating += 1;
        }
        this.like = !this.like;
        //request on server
    };
    return DisplayInstructionComponent;
}());
DisplayInstructionComponent = __decorate([
    core_1.Component({
        selector: 'display-instructions',
        templateUrl: '/partial/displayInstructionComponent'
    }),
    __metadata("design:paramtypes", [])
], DisplayInstructionComponent);
exports.DisplayInstructionComponent = DisplayInstructionComponent;
var Block = (function () {
    function Block() {
    }
    return Block;
}());
var Step = (function () {
    function Step() {
        this.blocks = [];
    }
    return Step;
}());
var Instruction = (function () {
    function Instruction() {
        this.tags = [];
        this.steps = [];
    }
    return Instruction;
}());
var Category = (function () {
    function Category() {
    }
    return Category;
}());
var InstructionTag = (function () {
    function InstructionTag() {
    }
    return InstructionTag;
}());
var Tag = (function () {
    function Tag() {
        this.instructoins = [];
    }
    return Tag;
}());
//# sourceMappingURL=displayInstruction.component.js.map