import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Store } from "@ngrx/store";
import { State } from "@tools/global/state";
import { ValidateUser } from "@tools/global/state/user.actions";

@Component({
  selector: "kab-login",
  template: `
  <kab-widget-header mode="h1" caption="{{pageData.title}}" value="Wellcome"></kab-widget-header>
  <form [formGroup]="form" (submit)="submit(form.value)">
    <label for="email">Email</label>
    <input name="email"
      formControlName="email"
      type="email"/>
    <label for="password">Password</label>
    <input name="password"
      formControlName="password"
      type="password"/>
    <input class="button-primary" type="submit" [value]="pageData.title" [disabled]="form.invalid">
    <a class="button button-clear" [routerLink]="['..',pageData.alternate | lowercase]">{{ pageData.alternate }}</a>
  </form>
  <i>{{ errorMessage }}</i>
  `,
  styles: []
})
export class CredentialsComponent implements OnInit {
  public pageData: any;
  public errorMessage = "";
  public form: FormGroup;
  constructor(
    private activatedRoute: ActivatedRoute,
    private formbuilder: FormBuilder,
    private store: Store<State>
  ) {}

  public ngOnInit() {
    this.obtainPageDataFromRoute();
  }
  private obtainPageDataFromRoute() {
    this.pageData = this.activatedRoute.snapshot.data;
    this.form = this.formbuilder.group({
      email: [
        this.pageData.credential.email,
        [Validators.required, Validators.email]
      ],
      password: [
        this.pageData.credential.password,
        [Validators.required, Validators.minLength(4)]
      ]
    });
  }
  public submit(credentials) {
    this.store.dispatch(
      new ValidateUser({
        email: credentials.email,
        password: credentials.password,
        service: this.pageData.title.toLowerCase()
      })
    );
  }
}
