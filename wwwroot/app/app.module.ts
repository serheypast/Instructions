import { NgModule, enableProdMode } from '@angular/core';
import { BrowserModule, Title } from '@angular/platform-browser';
import { routing, routedComponents } from './app.routing';
import { APP_BASE_HREF, Location } from '@angular/common';
import { AppComponent } from './app.component';
import {DragulaModule} from 'ng2-dragula';
import { FormsModule } from '@angular/forms';
import { FileUploadModule } from 'primeng/primeng';
import { ExitAboutGuard } from './Component/exit.about.guard';

//import { AccordionModule } from 'primeng/primeng';     


// enableProdMode();

@NgModule({
    imports: [BrowserModule, routing, DragulaModule, FormsModule, FileUploadModule],
    declarations: [AppComponent, routedComponents],
    providers: [ExitAboutGuard, Title, { provide: APP_BASE_HREF, useValue: '/' }],
    bootstrap: [AppComponent]
})
export class AppModule { }


