import { NgModule, enableProdMode } from '@angular/core';
import { BrowserModule, Title } from '@angular/platform-browser';
import { routing, routedComponents } from './app.routing';
import { SafePipe } from './Component/instruction.component'
import { APP_BASE_HREF, Location } from '@angular/common';
import { AppComponent } from './app.component';
import { DragulaModule } from 'ng2-dragula';
import { HttpModule } from '@angular/http'
import { FormsModule } from '@angular/forms';
import { Ng2CloudinaryModule } from 'ng2-cloudinary';
import { FileUploadModule } from 'ng2-file-upload';
import { InfiniteScrollModule } from 'angular2-infinite-scroll';
import { ButtonModule, PanelModule, ConfirmDialogModule, ConfirmationService, DropdownModule, EditorModule, GrowlModule } from 'primeng/primeng';
import { TagInputModule } from 'ng2-tag-input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SelectModule } from 'ng2-select';
import { CommentComponent } from './Component/comment.component';
import { TranslationModule, LocaleService, TranslationService } from 'angular-l10n';
import { Ng2CompleterModule } from "ng2-completer";



@NgModule({
    imports: [TranslationModule.forRoot(), DropdownModule, Ng2CompleterModule, ConfirmDialogModule, SelectModule, PanelModule, BrowserAnimationsModule, GrowlModule,
        TagInputModule, BrowserModule, routing, DragulaModule, FormsModule, FileUploadModule, Ng2CloudinaryModule, EditorModule, ButtonModule, HttpModule, InfiniteScrollModule],
    declarations: [AppComponent, routedComponents, SafePipe, CommentComponent],
    providers: [Title, { provide: APP_BASE_HREF, useValue: '/' }],
    bootstrap: [AppComponent]
})

export class AppModule {
    constructor(public locale: LocaleService, public translation: TranslationService) {
        this.locale.addConfiguration()
            .addLanguages(['en', 'rus'])
            .setCookieExpiration(30)
            .defineLanguage('en');

        this.translation.addConfiguration()
            .addProvider('./assets/locale-');

        this.translation.init();
    }
}


