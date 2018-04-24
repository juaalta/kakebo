import { AppComponent } from "./app.component";
import { AppRoutingModule } from "./app-routing.module";
import { BrowserModule } from "@angular/platform-browser";
import { CoreModule } from "./core/core.module";
import { NgModule } from "@angular/core";
import { BalanceComponent } from './balance/balance.component';

@NgModule({
	declarations: [AppComponent, BalanceComponent],
	imports: [AppRoutingModule, BrowserModule, CoreModule],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule {}
