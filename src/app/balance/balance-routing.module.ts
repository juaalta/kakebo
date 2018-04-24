import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { BalanceModule } from "./balance.module";

const routes: Routes = [
	{
		path: "",
		component: BalanceModule
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class BalanceRoutingModule {}
