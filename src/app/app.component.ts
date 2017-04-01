import {Component} from '@angular/core';

@Component({
    selector: 'app-root',
    template: `
        <navbar></navbar>
        <div class="container">
            <router-outlet></router-outlet>
        </div>
        <footer></footer>
`
})
export class AppComponent {
}
