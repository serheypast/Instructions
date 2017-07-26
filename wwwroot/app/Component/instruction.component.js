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
var ng2_dragula_1 = require("ng2-dragula");
var platform_browser_1 = require("@angular/platform-browser");
var ng2_cloudinary_1 = require("ng2-cloudinary");
var InstructionComponent = (function () {
    function InstructionComponent(dragulaService, sanitizer) {
        var _this = this;
        this.dragulaService = dragulaService;
        this.sanitizer = sanitizer;
        this.items = [];
        this.uploader = new ng2_cloudinary_1.CloudinaryUploader(new ng2_cloudinary_1.CloudinaryOptions({ cloudName: 'dr4opxk5i', uploadPreset: 'ajvv2x7e' }));
        dragulaService.dropModel.subscribe(function (value) {
            _this.onDropModel(value.slice(1));
        });
        dragulaService.removeModel.subscribe(function (value) {
            _this.onRemoveModel(value.slice(1));
        });
        this.uploader.onSuccessItem = function (item, response, status, headers) {
            var res = JSON.parse(response);
            _this.imageId = res.public_id;
            _this.AddPhoto();
            return { item: item, response: response, status: status, headers: headers };
        };
    }
    InstructionComponent.prototype.onDropModel = function (args) {
        var el = args[0], target = args[1], source = args[2];
    };
    InstructionComponent.prototype.onRemoveModel = function (args) {
        var el = args[0], source = args[1];
    };
    InstructionComponent.prototype.turn = function (index) {
        this.items[index].state = !this.items[index].state;
    };
    InstructionComponent.prototype.AddText = function () {
        var elem = new Block();
        elem.field = "";
        elem.type = "text";
        elem.state = true;
        this.items.push(elem);
    };
    InstructionComponent.prototype.AddPhoto = function () {
        var elem = new Block();
        elem.field = this.imageId;
        elem.type = "photo";
        this.items.push(elem);
    };
    InstructionComponent.prototype.AddVideo = function () {
        var elem = new Block();
        elem.field = "";
        elem.type = "video";
        elem.state = false;
        this.items.push(elem);
    };
    InstructionComponent.prototype.addYoutubeUrl = function (index) {
        var url = this.items[index].field;
        var standartUrl = "https://www.youtube.com/embed/";
        var str = url.split("=");
        this.items[index].field = standartUrl + str[1];
        this.items[index].state = true;
    };
    InstructionComponent.prototype.safeOn = function (url) {
        console.log(url);
        return this.sanitizer.bypassSecurityTrustResourceUrl(url);
    };
    InstructionComponent.prototype.removeElement = function (index) {
        this.items.splice(index, 1);
    };
    InstructionComponent.prototype.canDeactivate = function () {
        for (var i = 0; i < this.items.length; i++) {
            var myContainer = document.querySelector("#a" + i);
            this.items[i].field = myContainer.innerHTML;
        }
        return true;
    };
    InstructionComponent.prototype.onChange = function (event) {
        this.uploader.uploadAll();
    };
    return InstructionComponent;
}());
InstructionComponent = __decorate([
    core_1.Component({
        selector: 'instruction',
        templateUrl: '/partial/InstructionComponent',
    }),
    __metadata("design:paramtypes", [ng2_dragula_1.DragulaService, platform_browser_1.DomSanitizer])
], InstructionComponent);
exports.InstructionComponent = InstructionComponent;
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
        this.steps = [];
    }
    return Instruction;
}());
//# sourceMappingURL=instruction.component.js.map