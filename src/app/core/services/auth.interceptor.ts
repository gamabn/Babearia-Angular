import { HttpInterceptorFn } from "@angular/common/http";
import { catchError, throwError } from "rxjs";


export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem('token');

  if(token){
     req = req.clone({
      headers: req.headers.set(
        'Authorization',
        `Bearer ${token}`
      )
    });
  }
return next(req).pipe(
    catchError(err => {
      if (err.status === 401) {
        localStorage.removeItem('token');
      }
      return throwError(() => err);
    })
  );

}
