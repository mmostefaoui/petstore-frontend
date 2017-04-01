import { Component } from '@angular/core';

@Component({
    template: `
    	 <div class="row">
    <div class="col-md-12">
        <div class="box">
            <h1>Page Not Found</h1>
                <div class=" jumbotron alert alert-warning text-center">
                    <h3>We're sorry!</h3>
                    <p>
                    The page you have requested cannot be found.
                    </p>
                </div>
        </div>
    </div>
</div>
    `
})
export class NotFoundComponent { }