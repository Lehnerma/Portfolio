import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import {
  provideRouter,
  withComponentInputBinding,
  withInMemoryScrolling,
  withRouterConfig,
} from '@angular/router';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    // scroll to top on every navigation, otherwise a legal page opens at the footer's scroll position
    // anchorScrolling: nav links like /#about scroll to the matching id
    provideRouter(
      routes,
      withInMemoryScrolling({ scrollPositionRestoration: 'enabled', anchorScrolling: 'enabled' }),
      // clicking the same anchor twice (e.g. after scrolling away) must scroll again
      withRouterConfig({ onSameUrlNavigation: 'reload' }),
      withComponentInputBinding(), // we can easy read the url from the route
    ),
  ],
};
