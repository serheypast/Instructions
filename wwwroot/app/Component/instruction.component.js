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
var primeng_1 = require("primeng/primeng");
var RestService_1 = require("./../RestService/RestService");
var angular_l10n_1 = require("angular-l10n");
var router_1 = require("@angular/router");
var RoleService_1 = require("./../RoleService/RoleService");
var InstructionComponent = (function () {
    function InstructionComponent(service, dragulaService, sanitizer, confirmationService, activateRoute, router) {
        var _this = this;
        this.service = service;
        this.dragulaService = dragulaService;
        this.sanitizer = sanitizer;
        this.confirmationService = confirmationService;
        this.activateRoute = activateRoute;
        this.router = router;
        this.msgs = [];
        this.instruction = new Instruction();
        this.category = new Category();
        this.tags = [];
        this.loadInstruction = false;
        this.IdUserWhoCreated = 0;
        this.uploader = new ng2_cloudinary_1.CloudinaryUploader(new ng2_cloudinary_1.CloudinaryOptions({ cloudName: 'dr4opxk5i', uploadPreset: 'ajvv2x7e' }));
        this.validators = [this.addTag];
        this.errorMessages = {
            'addTag': 'Your tag can have max 25 symbols',
        };
        this.subscription = this.activateRoute.params.subscribe(function (params) {
            _this.id = params['id'];
        });
        this.service.getCategories().subscribe(function (result) {
            _this.categories = [];
            for (var _i = 0, _a = result.json(); _i < _a.length; _i++) {
                var cat = _a[_i];
                _this.categories.push({ label: cat.name, value: { name: cat.name } });
            }
        });
        if (this.id)
            this.service.getInstrcutionById(this.id).subscribe(function (result) {
                _this.instruction = result.json();
                _this.getTags();
                _this.category.name = _this.instruction.category.name;
                _this.IdUserWhoCreated = _this.instruction.userProfile.id;
                _this.loadInstruction = true;
            });
        else {
            this.create = true;
            this.instruction.name = "Name";
            this.instruction.previewImageUrl = "https://res.cloudinary.com/dr4opxk5i/image/upload/spt2r2sqiyotibnrfhch.jpg";
            this.instruction.category = this.category;
            this.loadInstruction = true;
        }
        dragulaService.dropModel.subscribe(function (value) {
            _this.onDropModel(value.slice(1));
        });
        dragulaService.removeModel.subscribe(function (value) {
            _this.onRemoveModel(value.slice(1));
        });
        dragulaService.setOptions('first-bag', {
            moves: function (el, container, handle) {
                return handle.className === 'ui-panel-titlebar ui-widget-header ui-helper-clearfix ui-corner-all';
            }
        });
        this.uploader.onSuccessItem = function (item, response, status, headers) {
            var res = JSON.parse(response);
            if (_this.typePhoto) {
                _this.instruction.previewImageUrl = "https://res.cloudinary.com/dr4opxk5i/image/upload/" + res.public_id + ".jpg";
            }
            else {
                _this.imageId = res.public_id;
                _this.AddPhoto(_this.imageIndex);
            }
            return { item: item, response: response, status: status, headers: headers };
        };
        this.addStep();
    }
    InstructionComponent.prototype.addStep = function () {
        var step = new Step();
        this.instruction.steps.push(step);
    };
    InstructionComponent.prototype.confirm2 = function (index) {
        var _this = this;
        this.confirmationService.confirm({
            message: 'Do you want to delete this step?',
            header: 'Delete step',
            icon: 'fa fa-trash',
            accept: function () {
                _this.deleteStep(index);
            },
            reject: function () {
            }
        });
    };
    InstructionComponent.prototype.checkRole = function () {
        this.AuthUser = RoleService_1.RoleService.getCurrentAuthUser();
        if (this.AuthUser.role == 'Admin' || this.IdUserWhoCreated == 0 || this.AuthUser.id == this.instruction.userProfile.id) {
            return true;
        }
        return false;
    };
    InstructionComponent.prototype.getTags = function () {
        for (var _i = 0, _a = this.instruction.tags; _i < _a.length; _i++) {
            var tag = _a[_i];
            this.tags.push(tag.tag.name);
        }
    };
    InstructionComponent.prototype.ngOnDestroy = function () {
        this.dragulaService.destroy('first-bag');
    };
    InstructionComponent.prototype.publish = function () {
        if (this.validate()) {
            this.instruction.category = this.category;
            if (!this.id) {
                this.addTags();
                this.service.publishInstruction(this.instruction);
                this.router.navigate(['home/all']);
            }
            else
                this.editInstruction();
        }
    };
    InstructionComponent.prototype.editInstruction = function () {
        for (var _i = 0, _a = this.instruction.steps; _i < _a.length; _i++) {
            var step = _a[_i];
            step.id = 0;
            for (var _b = 0, _c = step.blocks; _b < _c.length; _b++) {
                var block = _c[_b];
                block.id = 0;
            }
        }
        this.msgs.push({ severity: 'success', summary: 'Success Message', detail: 'Instruction saved' });
        this.service.editInstruction(this.instruction);
    };
    InstructionComponent.prototype.validate = function () {
        this.msgs = [];
        return !(this.nameValidate() || this.tagsValidate() || this.categoryValidate() || this.stepNameValidate());
    };
    InstructionComponent.prototype.nameValidate = function () {
        if (this.instruction.name.length == 0) {
            this.msgs.push({ severity: 'error', summary: 'Error Message', detail: 'Name is empty' });
            return true;
        }
        return false;
    };
    InstructionComponent.prototype.tagsValidate = function () {
        if (this.tags.length == 0) {
            this.msgs.push({ severity: 'error', summary: 'Error Message', detail: 'Tags is empty' });
            return true;
        }
        return false;
    };
    InstructionComponent.prototype.categoryValidate = function () {
        if (this.category.name.length == 0) {
            this.msgs.push({ severity: 'error', summary: 'Error Message', detail: 'Category is not choosen' });
            return true;
        }
        return false;
    };
    InstructionComponent.prototype.stepNameValidate = function () {
        for (var _i = 0, _a = this.instruction.steps; _i < _a.length; _i++) {
            var step = _a[_i];
            console.log(step.name);
            if (!step.name) {
                this.msgs.push({ severity: 'error', summary: 'Error Message', detail: 'Enter the name in all steps' });
                return true;
            }
        }
        return false;
    };
    InstructionComponent.prototype.addTags = function () {
        for (var _i = 0, _a = this.tags; _i < _a.length; _i++) {
            var tag1 = _a[_i];
            var tag = new Tag();
            tag.name = tag1.value;
            var tagInst = new InstructionTag();
            tagInst.tag = tag;
            this.instruction.tags.push(tagInst);
        }
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
        var text = new Block();
        text.field = "";
        text.type = "text";
        text.state = true;
        this.instruction.steps[index].blocks.push(text);
    };
    InstructionComponent.prototype.AddPhoto = function (index) {
        var photo = new Block();
        photo.field = "https://res.cloudinary.com/dr4opxk5i/image/upload/" + this.imageId + ".jpg";
        photo.type = "photo";
        this.instruction.steps[index].blocks.push(photo);
    };
    InstructionComponent.prototype.AddVideo = function (index) {
        var video = new Block();
        video.field = "";
        video.type = "video";
        video.state = false;
        this.instruction.steps[index].blocks.push(video);
    };
    InstructionComponent.prototype.addYoutubeUrl = function (indexI, indexJ) {
        var url = this.instruction.steps[indexI].blocks[indexJ].field;
        var standartUrl = "https://www.youtube.com/embed/";
        var str = url.split("=");
        this.instruction.steps[indexI].blocks[indexJ].field = standartUrl + str[1];
        this.instruction.steps[indexI].blocks[indexJ].state = true;
    };
    InstructionComponent.prototype.safeOn = function (url) {
        return this.sanitizer.bypassSecurityTrustResourceUrl(url);
    };
    InstructionComponent.prototype.removeElement = function (indexI, indexDel) {
        this.instruction.steps[indexI].blocks.splice(indexDel, 1);
    };
    InstructionComponent.prototype.deleteStep = function (j) {
        this.instruction.steps.splice(j, 1);
    };
    InstructionComponent.prototype.onChange = function (event, index) {
        if (index == -1)
            this.typePhoto = true;
        else
            this.typePhoto = false;
        this.uploader.uploadAll();
        this.imageIndex = index;
    };
    InstructionComponent.prototype.addTag = function (control) {
        if (control.value.length > 25) {
            return {
                'addTag': true
            };
        }
        return null;
    };
    InstructionComponent.prototype.selected = function (value) {
        this.category.name = value.text;
    };
    return InstructionComponent;
}());
__decorate([
    angular_l10n_1.Language(),
    __metadata("design:type", String)
], InstructionComponent.prototype, "lang", void 0);
InstructionComponent = __decorate([
    core_1.Component({
        selector: 'instruction',
        templateUrl: '/partial/InstructionComponent',
        styleUrls: ['./css/Components/instructionComponent.css'],
        providers: [primeng_1.ConfirmationService, RestService_1.RestService, RoleService_1.RoleService]
    }),
    __metadata("design:paramtypes", [RestService_1.RestService, ng2_dragula_1.DragulaService, platform_browser_1.DomSanitizer,
        primeng_1.ConfirmationService, router_1.ActivatedRoute, router_1.Router])
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
var Categ = (function () {
    function Categ() {
    }
    return Categ;
}());
var AuthUser = (function () {
    function AuthUser() {
        this.id = 0;
    }
    return AuthUser;
}());
var UserProfile = (function () {
    function UserProfile() {
    }
    return UserProfile;
}());
//# sourceMappingURL=instruction.component.js.map