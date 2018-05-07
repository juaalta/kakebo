import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "@environments/environment";
import { Credential } from "@tools/global/state/user/models/credentials.model";
import { Observable } from "rxjs";

@Injectable()
export class UserApi {
  private url = environment.apiUrl + "pub/credentials/";
  constructor(private http: HttpClient) { }

  public sendCredential(credential: Credential): Observable<any> {
    const credentialsUrl = this.url + credential.service.toLowerCase();
    return this.http.post(credentialsUrl, credential);
  }
}
