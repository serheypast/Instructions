import { NgModule, enableProdMode } from '@angular/core';
import { BrowserModule, Title } from '@angular/platform-browser';
import { routing, routedComponents } from './app.routing';
import { SafePipe } from './Component/instruction.component'
import { APP_BASE_HREF, Location } from '@angular/common';
import { AppComponent } from './app.component';
import { DragulaModule } from 'ng2-dragula';
import { FormsModule } from '@angular/forms';
import { EditorModule } from 'primeng/primeng';
import { Ng2CloudinaryModule } from 'ng2-cloudinary';
import { FileUploadModule } from 'ng2-file-upload';
import { ButtonModule, PanelModule } from 'primeng/primeng';
import { TagInputModule } from 'ng2-tag-input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


@NgModule({
    imports: [PanelModule,BrowserAnimationsModule, TagInputModule, BrowserModule, routing, DragulaModule, FormsModule, FileUploadModule, Ng2CloudinaryModule, EditorModule, ButtonModule],
    declarations: [AppComponent, routedComponents, SafePipe],
    providers: [Title, { provide: APP_BASE_HREF, useValue: '/' }],
    bootstrap: [AppComponent]
})

export class AppModule { }


