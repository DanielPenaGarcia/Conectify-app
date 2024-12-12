import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'sign-in',
    pathMatch: 'full'
  },
  //auth layout
  {
    path: '',
    loadComponent: () => import('@layouts/auth/auth.component').then(m => m.AuthComponent),
    children: [
      {
        path: 'sign-in',
        loadComponent: () => import('@layouts/auth/pages/sign-in/sign-in.component').then(m => m.SignInComponent)
      },
      {
        path: 'sign-up',
        loadComponent: () => import('@layouts/auth/pages/sign-up/sign-up.component').then(m => m.SignUpComponent)
      }
    ]
  }
];
