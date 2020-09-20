import { Injectable, Injector } from '@angular/core';
import { HttpInterceptor} from '@angular/common/http';
import { UserService } from './user.service';


@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor {

  constructor(private injector: Injector) { }

  intercept(req, next) {
      let authService = this.injector.get(UserService)
      let token = JSON.parse(authService.getToken())
      let tokenizeReq = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      })
      return next.handle(tokenizeReq)
  }
}
