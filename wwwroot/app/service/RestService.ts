import "rxjs/Rx"
import { Injectable } from '@angular/core';
import { Component } from '@angular/core';
import { Http, Headers, Response, Request, RequestOptions, RequestMethod  } from '@angular/http';
@Component({
   
})

@Injectable()
export class RestServiceComponent {
    

    constructor(private http: Http) {

    }

    public getUserById(id: string) {
        return this.http.get('/api/api/getUser/' + id).map(response => response.json());   
    }

    
}
