import { lazy } from 'react'

// The admin workspace exists only in local development (npm run dev): in the production
// build this branch is dropped, so it isn't even part of the published site.
// Kept out of App.jsx on purpose: App.jsx re-runs whenever a file in home/ changes,
// and recreating this lazy component there would remount the editor and lose its state.
export const AdminWorkspace = import.meta.env.DEV ? lazy(() => import('./admin/AdminWorkspace.jsx')) : null
