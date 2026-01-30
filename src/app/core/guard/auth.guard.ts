import {CanActivateFn, Router, Routes } from "@angular/router";
import { inject, PLATFORM_ID } from "@angular/core";
import { isPlatformBrowser } from "@angular/common";
import { isBrowser } from "../utils/is-browser";
import { UserStore } from "../services/user-store";
import { take, map } from "rxjs";

export const authGuard: CanActivateFn = () => {
  const router = inject(Router);
  const userStore = inject(UserStore);
  const platformId = inject(PLATFORM_ID);

if (!isPlatformBrowser(platformId)) {
    return router.parseUrl('/');
  }
  const token = localStorage.getItem('token');

  if (token) {
    return true;
  }

  return router.createUrlTree(['/']);
};
  // if (!isPlatformBrowser(platformId)) {
 //   return router.parseUrl('/');
 // }
 //if(!isPlatformBrowser(platformId)){
    //return true;
 // }
 ////////////////////////////////////
//if(!isBrowser()){
// return true
//}
///////////////////////////////////////

// const token =  !!localStorage.getItem('token')
 // const token = localStorage.getItem('token');

 // if(token){
 //   return true
 // }

 //==================
// if(userStore.getUser()){
//  return true
// }
 //==========================
 //=====================================================================
// return userStore.user$.pipe(
 //   take(1),
 //   map(user => {
  //    if (user) {
   //     return true;
   //   }
  //    return router.parseUrl('/');
  //  })
  //);
//}
//======================================================
   //return router.parseUrl('/')
    // router.navigate(['/']);
   // return false


//}

