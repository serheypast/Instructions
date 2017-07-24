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
var AboutComponent = (function () {
    function AboutComponent(dragulaService) {
        var _this = this;
        this.dragulaService = dragulaService;
        this.items = [];
        dragulaService.dropModel.subscribe(function (value) {
            _this.onDropModel(value.slice(1));
        });
        dragulaService.removeModel.subscribe(function (value) {
            _this.onRemoveModel(value.slice(1));
        });
    }
    AboutComponent.prototype.onDropModel = function (args) {
        var el = args[0], target = args[1], source = args[2];
        // do something else
    };
    AboutComponent.prototype.onRemoveModel = function (args) {
        var el = args[0], source = args[1];
        // do something else
    };
    AboutComponent.prototype.AddText = function () {
        var elem = new Data();
        elem.field = "";
        elem.type = "text";
        this.items.push(elem);
    };
    AboutComponent.prototype.AddPhoto = function () {
        var elem = new Data();
        elem.field = "";
        elem.type = "photo";
        this.items.push(elem);
    };
    AboutComponent.prototype.AddVideo = function () {
        var elem = new Data();
        elem.field = "";
        elem.type = "video";
        this.items.push(elem);
    };
    AboutComponent.prototype.removeElement = function (index) {
        this.items.splice(index, 1);
    };
    return AboutComponent;
}());
AboutComponent = __decorate([
    core_1.Component({
        selector: 'my-about',
        templateUrl: '/partial/aboutComponent',
    }),
    __metadata("design:paramtypes", [ng2_dragula_1.DragulaService])
], AboutComponent);
exports.AboutComponent = AboutComponent;
var Data = (function () {
    function Data() {
    }
    return Data;
}());
//# sourceMappingURL=about.component.js.map