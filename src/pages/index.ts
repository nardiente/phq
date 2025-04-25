import { lazy } from 'react';

// Force it to use our new version
export const Widgets = lazy(() => import('./WidgetsPage.tsx'));
