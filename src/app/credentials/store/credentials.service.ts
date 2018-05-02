import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@environments/environment';
import { Observable } from 'rxjs';
import { Credential } from './models/credential.model';
import { Token } from './models/token.model';

@Injectable()
export class CredentialsService {
  private url = environment.apiUrl + 'pub/credentials/';
  constructor(private http: HttpClient) {}

  public sendCredential$(
    credential: Credential,
    endPoint: string
  ): Observable<Token> {
    const credentialsUrl = this.url + endPoint.toLowerCase();
    return this.http.post<Token>(credentialsUrl, credential);
  }
}
