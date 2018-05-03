import { Component, OnInit } from '@angular/core';
import { FormsService } from '../../core/forms.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Credential } from '../store/models/credential.model';
import { CredentialsPageData } from '../store/models/credentials-page-data.model';
import { CredentialsService } from '../store/credentials.service';
import { GlobalStoreService } from '../../core/store/global-store.service';
import {
  FormGroup,
  FormBuilder,
  Validators
} from '@angular/forms';
import { CustomValidators } from 'app/shared/custom.validators';

@Component({
  selector: 'kab-credentials',
  templateUrl: './credentials.component.html',
  styleUrls: []
})
export class CredentialsComponent implements OnInit {
  public pageData: CredentialsPageData;
  public form: FormGroup;
  public mustShowErrors = this.formsService.mustShowErrors;
  constructor(
    private activatedRoute: ActivatedRoute,
    private credentialsService: CredentialsService,
    private formBuilder: FormBuilder,
    private formsService: FormsService,
    private globalStore: GlobalStoreService,
    private router: Router
  ) {}

  public ngOnInit() {
    this.obtainPageDataFromRoute();
  }
  private obtainPageDataFromRoute() {
    this.pageData = this.activatedRoute.snapshot
      .data as CredentialsPageData;
    const credential = this.pageData.credential;
    this.form = this.formBuilder.group({
      email: [
        credential.email,
        [Validators.required, Validators.email]
      ],
      password: [
        credential.password,
        [
          Validators.required,
          Validators.minLength(4),
          CustomValidators.password
        ]
      ]
    });
  }

  public onSubmitCredential = (credential: Credential) => {
    this.globalStore.dispatchUserMessage(
      'Validating Credentials...'
    );
    const endPoint = this.pageData.endPoint;
    this.credentialsService
      .sendCredential$(credential, endPoint)
      .subscribe(
        this.acceptedCredentials,
        this.invalidCredentials
      );
  };

  private acceptedCredentials = response => {
    if (response) {
      this.globalStore.dispatchUserToken(response.token);
      this.globalStore.dispatchUserMessage('Welcome');
      this.router.navigateByUrl('/');
    } else {
      this.invalidCredentials();
    }
  };
  private invalidCredentials = () => {
    this.globalStore.dispatchUserToken(null);
    this.globalStore.dispatchUserMessage('Invalid Credentials');
  };
}
