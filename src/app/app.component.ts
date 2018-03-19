import { Component } from '@angular/core';

@Component({
  selector: 'kab-root',
  template: `
    <header>
      <h1>Kakebo</h1>
      <blockquote>
        <p><em>The japanese art of saving money</em></p>
      </blockquote>
    </header>  
    <router-outlet></router-outlet>
    
  `,
  styles: []
})
export class AppComponent {
  title = 'kab';
}
