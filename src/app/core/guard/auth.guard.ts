import {CanActivateFn, Router, Routes } from "@angular/router";
import { inject, PLATFORM_ID } from "@angular/core";
import { isPlatformBrowser } from "@angular/common";
import { isBrowser } from "../utils/is-browser";

export const authGuard: CanActivateFn = () => {
 const platformId = inject(PLATFORM_ID)
 const router = inject(Router)

 //if(!isPlatformBrowser(platformId)){
    //return true;
 // }

   if (!isPlatformBrowser(platformId)) {
    return router.parseUrl('/');
  }

  ////////////////////////////////////
//if(!isBrowser()){
// return true
//}
///////////////////////////////////////

// const token =  !!localStorage.getItem('token')
  const token = localStorage.getItem('token');

  if(token){
    return true
  }
   return router.parseUrl('/')
    // router.navigate(['/']);
   // return false


}

