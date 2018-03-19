import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

const routes: Routes = [
  {
    path: "",
    loadChildren: "@routes/home/home.module#HomeModule"
  },
  {
    path: "about",
    loadChildren: "@routes/about/about.module#AboutModule"
  },
  {
    path: "savings",
    loadChildren: "@routes/savings/savings.module#SavingsModule"
  },
  {
    path: "not-found",
    loadChildren: "@routes/not-found/not-found.module#NotFoundModule"
  },
  {
    path: "**",
    redirectTo: "not-found"
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
