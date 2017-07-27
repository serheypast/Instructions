"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var platform_browser_1 = require("@angular/platform-browser");
var app_routing_1 = require("./app.routing");
var instruction_component_1 = require("./Component/instruction.component");
var common_1 = require("@angular/common");
var app_component_1 = require("./app.component");
var ng2_dragula_1 = require("ng2-dragula");
var forms_1 = require("@angular/forms");
var primeng_1 = require("primeng/primeng");
var ng2_cloudinary_1 = require("ng2-cloudinary");
var ng2_file_upload_1 = require("ng2-file-upload");
var primeng_2 = require("primeng/primeng");
var ng2_tag_input_1 = require("ng2-tag-input");
var animations_1 = require("@angular/platform-browser/animations");
var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    core_1.NgModule({
        imports: [primeng_2.PanelModule, animations_1.BrowserAnimationsModule, ng2_tag_input_1.TagInputModule, platform_browser_1.BrowserModule, app_routing_1.routing, ng2_dragula_1.DragulaModule, forms_1.FormsModule, ng2_file_upload_1.FileUploadModule, ng2_cloudinary_1.Ng2CloudinaryModule, primeng_1.EditorModule, primeng_2.ButtonModule],
        declarations: [app_component_1.AppComponent, app_routing_1.routedComponents, instruction_component_1.SafePipe],
        providers: [platform_browser_1.Title, { provide: common_1.APP_BASE_HREF, useValue: '/' }],
        bootstrap: [app_component_1.AppComponent]
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map