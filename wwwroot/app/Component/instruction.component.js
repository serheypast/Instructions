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
        this.instruction = new Instruction();
        this.uploader = new ng2_cloudinary_1.CloudinaryUploader(new ng2_cloudinary_1.CloudinaryOptions({ cloudName: 'dr4opxk5i', uploadPreset: 'ajvv2x7e' }));
        dragulaService.dropModel.subscribe(function (value) {
            _this.onDropModel(value.slice(1));
        });
        dragulaService.removeModel.subscribe(function (value) {
            _this.onRemoveModel(value.slice(1));
        });
        dragulaService.setOptions('first-bag', {
            moves: function (el, container, handle) {
                console.log(container.className);
                console.log(handle.className);
                return handle.className === 'ui-panel-titlebar ui-widget-header ui-helper-clearfix ui-corner-all';
            }
        });
        this.uploader.onSuccessItem = function (item, response, status, headers) {
            var res = JSON.parse(response);
            _this.imageId = res.public_id;
            _this.AddPhoto(_this.imageIndex);
            return { item: item, response: response, status: status, headers: headers };
        };
    }
    InstructionComponent.prototype.addStep = function () {
        var step = new Step();
        this.instruction.steps.push(step);
    };
    InstructionComponent.prototype.onDropModel = function (args) {
        var el = args[0], target = args[1], source = args[2];
    };
    InstructionComponent.prototype.onRemoveModel = function (args) {
        var el = args[0], source = args[1];
    };
    InstructionComponent.prototype.turn = function (indexI, indexJ) {
        this.instruction.steps[indexI].blocks[indexJ].state = !this.instruction.steps[indexI].blocks[indexJ].state;
    };
    InstructionComponent.prototype.AddText = function (index) {
        var elem = new Block();
        elem.field = "";
        elem.type = "text";
        elem.state = true;
        this.instruction.steps[index].blocks.push(elem);
    };
    InstructionComponent.prototype.AddPhoto = function (index) {
        var elem = new Block();
        elem.field = this.imageId;
        elem.type = "photo";
        this.instruction.steps[index].blocks.push(elem);
    };
    InstructionComponent.prototype.AddVideo = function (index) {
        var elem = new Block();
        elem.field = "";
        elem.type = "video";
        elem.state = false;
        this.instruction.steps[index].blocks.push(elem);
    };
    InstructionComponent.prototype.addYoutubeUrl = function (indexI, indexJ) {
        var url = this.instruction.steps[indexI].blocks[indexJ].field;
        var standartUrl = "https://www.youtube.com/embed/";
        var str = url.split("=");
        this.instruction.steps[indexI].blocks[indexJ].field = standartUrl + str[1];
        this.instruction.steps[indexI].blocks[indexJ].state = true;
    };
    InstructionComponent.prototype.safeOn = function (url) {
        console.log("опача");
        return this.sanitizer.bypassSecurityTrustResourceUrl(url);
    };
    InstructionComponent.prototype.removeElement = function (indexI, indexDel) {
        this.instruction.steps[indexI].blocks.splice(indexDel, 1);
    };
    InstructionComponent.prototype.deleteStep = function (j) {
        this.instruction.steps.splice(j, 1);
    };
    InstructionComponent.prototype.onChange = function (event, index) {
        this.uploader.uploadAll();
        this.imageIndex = index;
    };
    return InstructionComponent;
}());
InstructionComponent = __decorate([
    core_1.Component({
        selector: 'instruction',
        templateUrl: '/partial/InstructionComponent',
        styleUrls: ['/Component/InstructionComponent.css']
    }),
    __metadata("design:paramtypes", [ng2_dragula_1.DragulaService, platform_browser_1.DomSanitizer])
], InstructionComponent);
exports.InstructionComponent = InstructionComponent;
var SafePipe = (function () {
    function SafePipe(sanitizer) {
        this.sanitizer = sanitizer;
    }
    SafePipe.prototype.transform = function (url) {
        return this.sanitizer.bypassSecurityTrustResourceUrl(url);
    };
    return SafePipe;
}());
SafePipe = __decorate([
    core_1.Pipe({ name: 'safe' }),
    __metadata("design:paramtypes", [platform_browser_1.DomSanitizer])
], SafePipe);
exports.SafePipe = SafePipe;
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
//# sourceMappingURL=instruction.component.js.map