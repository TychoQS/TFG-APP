import { Routes } from "./routes";

export type Route = typeof Routes[keyof typeof Routes];

export interface NavigationInterface {

    /**
     * The current route of the application.
     * @invariant Must be one of the values in Routes
     */
    route: Route;

    /**
     * Navigates to a new route and clears all associated state.
     * @param route The route to navigate to
     * @precondition The app must be on a valid page (in a route defined in Routes)
     * @precondition The inference model must be loaded
     * @precondition If route is CLASSIFICATION_DRAW_EXPANDED, current route must be CLASSIFICATION_DRAW
     * @postcondition The route changes to the new page
     * @postcondition All state associated to the previous page is cleared
     * @postcondition If route is CLASSIFICATION_DRAW_EXPANDED, the canvas enters expanded mode
     * @invariant No page preserves the state of another page
     * @invariant The default route is always the CLASSIFICATION_OCR page
     */
    navigateTo(route: Route): void;
}