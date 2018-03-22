import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { ControlService } from '@routes/control/control.service';
import { map } from "rxjs/operators";

@Injectable()
export class ControlGuard implements CanActivate {

  constructor(private controlService: ControlService){

  }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      console.log("guardeando");
     const ret = this.controlService.getData().pipe(map(()=>true));
     return ret;
  }
}
