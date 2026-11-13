import { Routes } from '@angular/router';
import { Home } from './pages/home/home';

export const routes: Routes = [
  {
    path: '',
    component: Home,
    title: 'Home Page',
  },
  {
    path: 'imprint',
    loadComponent: () => import('./pages/imprint/imprint').then((m) => m.Imprint),
    title: 'Imprint',
  },
  {
    path: 'privacy-policy',
    loadComponent: () =>
      import('./pages/privacy-policy/privacy-policy').then((m) => m.PrivacyPolicy),
    title: 'Privacy Policy',
  },
  {
    path: 'legal-notice',
    loadComponent: () => import('./pages/legal-notice/legal-notice').then((m) => m.LegalNotice),
    title: 'Legal Notice',
  },
  {
    path: 'project/:id',
    loadComponent: () =>
      import('./pages/project-detail/project-detail').then((el) => el.ProjectDetail),
    title: 'Project',
  },
];
