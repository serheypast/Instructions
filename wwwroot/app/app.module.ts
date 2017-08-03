import { NgModule, enableProdMode } from '@angular/core';
import { BrowserModule, Title } from '@angular/platform-browser';
import { routing, routedComponents } from './app.routing';
import { SafePipe } from './Component/instruction.component'
import { APP_BASE_HREF, Location } from '@angular/common';
import { AppComponent } from './app.component';
import { DragulaModule } from 'ng2-dragula';
import { HttpModule } from '@angular/http'
import { FormsModule } from '@angular/forms';
import { EditorModule } from 'primeng/primeng';
import { Ng2CloudinaryModule } from 'ng2-cloudinary';
import { FileUploadModule } from 'ng2-file-upload';
import { InfiniteScrollModule } from 'angular2-infinite-scroll';
import { ButtonModule, PanelModule, ConfirmDialogModule, ConfirmationService } from 'primeng/primeng';
import { TagInputModule } from 'ng2-tag-input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SelectModule } from 'ng2-select';
import { Ng2StickyModule } from 'ng2-sticky';
import { CommentComponent } from './Component/comment.component';
import { NguiScrollableModule } from '@ngui/scrollable';

@NgModule({
    imports: [NguiScrollableModule, Ng2StickyModule, ConfirmDialogModule, SelectModule, PanelModule,BrowserAnimationsModule, TagInputModule, BrowserModule, routing, DragulaModule, FormsModule, FileUploadModule, Ng2CloudinaryModule, EditorModule, ButtonModule,  HttpModule, InfiniteScrollModule],
    declarations: [AppComponent, routedComponents, SafePipe, CommentComponent],
    providers: [Title, { provide: APP_BASE_HREF, useValue: '/' }],
    bootstrap: [AppComponent]
})

export class AppModule { }


