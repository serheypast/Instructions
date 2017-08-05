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
var platform_browser_1 = require("@angular/platform-browser");
var app_routing_1 = require("./app.routing");
var instruction_component_1 = require("./Component/instruction.component");
var common_1 = require("@angular/common");
var app_component_1 = require("./app.component");
var ng2_dragula_1 = require("ng2-dragula");
var http_1 = require("@angular/http");
var forms_1 = require("@angular/forms");
var ng2_cloudinary_1 = require("ng2-cloudinary");
var ng2_file_upload_1 = require("ng2-file-upload");
var angular2_infinite_scroll_1 = require("angular2-infinite-scroll");
var primeng_1 = require("primeng/primeng");
var ng2_tag_input_1 = require("ng2-tag-input");
var animations_1 = require("@angular/platform-browser/animations");
var ng2_select_1 = require("ng2-select");
var comment_component_1 = require("./Component/comment.component");
var angular_l10n_1 = require("angular-l10n");
var ng2_completer_1 = require("ng2-completer");
var AppModule = (function () {
    function AppModule(locale, translation) {
        this.locale = locale;
        this.translation = translation;
        this.locale.addConfiguration()
            .addLanguages(['en', 'rus'])
            .setCookieExpiration(30)
            .defineLanguage('en');
        this.translation.addConfiguration()
            .addProvider('./assets/locale-');
        this.translation.init();
    }
    return AppModule;
}());
AppModule = __decorate([
    core_1.NgModule({
        imports: [angular_l10n_1.TranslationModule.forRoot(), primeng_1.DropdownModule, ng2_completer_1.Ng2CompleterModule, primeng_1.ConfirmDialogModule, ng2_select_1.SelectModule, primeng_1.PanelModule, animations_1.BrowserAnimationsModule, primeng_1.GrowlModule,
            ng2_tag_input_1.TagInputModule, platform_browser_1.BrowserModule, app_routing_1.routing, ng2_dragula_1.DragulaModule, forms_1.FormsModule, ng2_file_upload_1.FileUploadModule, ng2_cloudinary_1.Ng2CloudinaryModule, primeng_1.EditorModule, primeng_1.ButtonModule, http_1.HttpModule, angular2_infinite_scroll_1.InfiniteScrollModule],
        declarations: [app_component_1.AppComponent, app_routing_1.routedComponents, instruction_component_1.SafePipe, comment_component_1.CommentComponent],
        providers: [platform_browser_1.Title, { provide: common_1.APP_BASE_HREF, useValue: '/' }],
        bootstrap: [app_component_1.AppComponent]
    }),
    __metadata("design:paramtypes", [angular_l10n_1.LocaleService, angular_l10n_1.TranslationService])
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map