import { isPlatformBrowser } from "@angular/common";
import { HttpInterceptorFn } from "@angular/common/http";
import { inject, PLATFORM_ID } from "@angular/core";
import { catchError, throwError } from "rxjs";


export const authInterceptor: HttpInterceptorFn = (req, next) => {

   const platformId = inject(PLATFORM_ID);

  // 🚫 SSR não tem token
  if (!isPlatformBrowser(platformId)) {
    return next(req);
  }

  const token = localStorage.getItem('token');

  if (token) {
    req = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${token}`)
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
};

  //======================================================================
 // const token = localStorage.getItem('token');

 // if(token){
 ////    req = req.clone({
 //     headers: req.headers.set(
 //       'Authorization',
  //      `Bearer ${token}`
 //     )
 //   });
 // }
//return next(req).pipe(
//    catchError(err => {
 //     if (err.status === 401) {
//        localStorage.removeItem('token');
 //     }
 //     return throwError(() => err);
 //   })
 // );

//}
