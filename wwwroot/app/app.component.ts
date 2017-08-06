import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Subscription } from 'rxjs/Subscription';
import { RestService } from "./RestService/RestService";
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { CompleterService, CompleterData } from 'ng2-completer';
import { Language } from 'angular-l10n';

@Component({
    selector: 'my-app',
    templateUrl: '/partial/appComponent',
    providers: [RestService],
})
export class AppComponent {

    user: User = new User();
    @Language() lang: string;

    public constructor(private completerService: CompleterService, private titleService: Title, private router: Router, private service: RestService) {
        this.service.getCurrentUser().subscribe(result => {
            this.user = result.json();
            console.log(this.user);
        });
        this.searchData1 = "";
        this.dataService = completerService.local(this.searchData, 'color', 'color');
    }
    public searchData1: string;
    angularClientSideData = 'Angular';

    public getRequest() {
        console.log(this.searchData1);
        this.router.navigate(['home/all/search/' + this.searchData1]);
    }

    public setTitle(newTitle: string) {
        this.titleService.setTitle(newTitle);
        
    }

    protected searchStr: string;
    protected captain: string;
    protected dataService: CompleterData;
    protected searchData = [
        { color: 'red', value: '#f00' },
        { color: 'green', value: '#0f0' },
        { color: 'blue', value: '#00f' },
        { color: 'cyan', value: '#0ff' },
        { color: 'magenta', value: '#f0f' },
        { color: 'yellow', value: '#ff0' },
        { color: 'black', value: '#000' }
    ];
    protected captains = ['James T. Kirk', 'Benjamin Sisko', 'Jean-Luc Picard', 'Spock', 'Jonathan Archer', 'Hikaru Sulu', 'Christopher Pike', 'Rachel Garrett'];

  

    text: string;

    results: string[];

    public search() {
        console.log("search");
        this.router.navigate(['home/all/search/' + this.searchData1]);          
    }

    
}


class User {
    id: number = 0;
    role: string;
}