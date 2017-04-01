import {Component, OnInit} from '@angular/core';
import {UserService} from "../users/user.service";

@Component({
    templateUrl: './home.component.html'
})
export class HomeComponent  {
    constructor(public userService:UserService) {
        this._addNewSlide();
    }

    //The time to show the next photo
    private NextPhotoInterval:number = 5000;
    //Looping or not
    private noLoopSlides:boolean = true;
    //Photos
    private slides:Array<any> = [];

    private _addNewSlide() {
        this.slides.push(
            {image:'../../assets/img/banner4.jpg',text:''},
            {image:'../../assets/img/banner3.jpg',text:''},
            {image:'../../assets/img/banner2.jpg',text:''},
            {image:'../../assets/img/banner1.jpg',text:''},
            {image:'../../assets/img/banner5.jpg',text:''},

        );
    }

    private removeLastSlide() {
        this.slides.pop();
    }

}