import {OnDestroy, OnInit, Component, Input, HostBinding} from "@angular/core";
import {CarouselComponent, Direction} from "./carousel.component";
@Component({
    selector: 'slide',
    template: `
    <div [class.active]="active" class="owl-item">
      <ng-content></ng-content>
    </div>
  `
})
export class SlideComponent implements OnInit, OnDestroy {
    @Input() index: number;
    @Input() direction: Direction;

    @HostBinding('class.active')
    @Input() active: boolean;

    @HostBinding('class.item')
    @HostBinding('class.carousel-item')
    private addClass: boolean = true;

    constructor(private _carousel: CarouselComponent) {
    }

    public ngOnInit() {
        this._carousel.addSlide(this);
    }

    public ngOnDestroy() {
        this._carousel.removeSlide(this);
    }
}
