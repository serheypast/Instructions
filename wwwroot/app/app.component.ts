import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Subscription } from 'rxjs/Subscription';
import { RestService } from "./RestService/RestService";
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { CompleterService, CompleterData } from 'ng2-completer';
import { Language } from 'angular-l10n';
import { RoleService } from "./RoleService/RoleService";

@Component({
    selector: 'my-app',
    templateUrl: '/partial/appComponent',
    providers: [RestService,RoleService],
})
export class AppComponent {
    angularClientSideData = 'Angular';
    public searchData1: string;
    protected searchStr: string;
    protected captain: string;
    protected dataService: CompleterData;
    text: string;
    results: string[];
   
    @Language() lang: string;
    user: AuthUser = new AuthUser();
    public constructor(private completerService: CompleterService, private titleService: Title, private router: Router, private service: RestService) {
              
        console.log("CheckRoleServiceInAppComponent");
        console.log(RoleService.getCurrentAuthUser());
        this.service.getCurrentUser().subscribe(result => {
            this.user = result.json();
            if (this.user == null) {
                this.user = new AuthUser();
                this.user.id = 0;
                this.user.role = "Guest";
            }
            RoleService.setCurrentAuthUser(this.user);
        });
        this.searchData1 = "";
    }

    public getRequest() {
        console.log(this.searchData1);
        this.router.navigate(['home/all/search/' + this.searchData1]);
    }

    public setTitle(newTitle: string) {
        this.titleService.setTitle(newTitle);
        
    }

    public search() {
        console.log("search");
        this.router.navigate(['home/all/search/' + this.searchData1]);          
    }

}
class User {
    id: number = 0;
    role: string;
}

class AuthUser {
    id: number = 0;
    role: string;
}