import { Component } from '@angular/core';


@Component({
    selector: 'my-about',
    templateUrl: '/partial/aboutComponent',
    
})

export class AboutComponent {
   
    textItems: [TextData];

    constructor() {
      
       
    }

    AddText(): void {
         
    }

    AddPhoto(): void {
        console.log("photo");
    }

    AddVideo(): void {
        console.log("video");
    }

}

class TextData {
    id: number;
    field: string;
}