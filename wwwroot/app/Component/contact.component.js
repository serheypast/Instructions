//import { Component } from '@angular/core';
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
//@Component({
//    selector: 'my-contact',
//    templateUrl: '/partial/contactComponent'
//})
//export class ContactComponent {
//}
var core_1 = require("@angular/core");
var ContactComponent = (function () {
    function ContactComponent() {
        this.saved = false;
    }
    ContactComponent.prototype.save = function () {
        this.saved = true;
    };
    ContactComponent.prototype.canDeactivate = function () {
        if (!this.saved) {
            return confirm("Вы хотите покинуть страницу?");
        }
        else {
            return true;
        }
    };
    return ContactComponent;
}());
ContactComponent = __decorate([
    core_1.Component({
        selector: 'my-contact',
        template: "<h3>\u041E \u0441\u0430\u0439\u0442\u0435</h3>\n                <button class=\"btn btn-default\" (click)=\"save()\">\u0421\u043E\u0445\u0440\u0430\u043D\u0438\u0442\u044C</button>\n                <a routerLink=\"\">\u041D\u0430 \u0433\u043B\u0430\u0432\u043D\u0443\u044E</a>\n                "
    })
], ContactComponent);
exports.ContactComponent = ContactComponent;
//# sourceMappingURL=contact.component.js.map