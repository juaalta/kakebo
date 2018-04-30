import { Component, OnInit } from '@angular/core';
import { FormsService } from '../../core/forms.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Credential } from '../state/models/credential.model';
import { CredentialsPageData } from '../state/models/credentials-page-data.model';
import { CredentialsService } from '../state/credentials.service';
import { GlobalStoreService } from '../../core/state/global-store.service';

@Component({
  selector: 'kab-credentials',
  templateUrl: './credentials.component.html',
  styleUrls: []
})
export class CredentialsComponent implements OnInit {
  public pageData: CredentialsPageData;
  public credential: Credential;
  public mustShowErrors = this.formsService.mustShowErrors;
  constructor(
    private activatedRoute: ActivatedRoute,
    private credentialsService: CredentialsService,
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
    this.credential = this.pageData.credential;
  }

  public onSubmitCredential = () => {
    this.globalStore.dispatchUserMessage(
      'Validating Credentials...'
    );
    const endPoint = this.pageData.endPoint;
    this.credentialsService
      .sendCredential(this.credential, endPoint)
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
