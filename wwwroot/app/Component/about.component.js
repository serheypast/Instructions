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
var AboutComponent = (function () {
    function AboutComponent() {
        this.items = [];
    }
    AboutComponent.prototype.ngOnChanges = function (changes) {
        for (var propName in changes) {
            var chng = changes[propName];
            var cur = JSON.stringify(chng.currentValue);
            var prev = JSON.stringify(chng.previousValue);
            console.log(propName + ": currentValue = " + cur + ", previousValue = " + prev);
        }
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
    __metadata("design:paramtypes", [])
], AboutComponent);
exports.AboutComponent = AboutComponent;
var Data = (function () {
    function Data() {
    }
    return Data;
}());
//# sourceMappingURL=about.component.js.map