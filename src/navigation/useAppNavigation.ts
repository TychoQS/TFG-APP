import { useState } from 'react';
import type { Route, NavigationInterface } from './types';
import { Routes } from './routes';
import { DEFAULT_ROUTE } from './defaults';

export const useAppNavigation = () => {
    const [route, setRoute] = useState<Route>(DEFAULT_ROUTE);
    const [drawerOpen, setDrawerOpen] = useState(false);

    const navigateTo = (newRoute: Route) => {
        setRoute(prevRoute => {
            if (newRoute === Routes.CLASSIFICATION_DRAW_EXPANDED && prevRoute !== Routes.CLASSIFICATION_DRAW) {
                console.warn("Navigation rejected: Can only enter extended draw mode from standard draw mode.");
                return prevRoute;
            }
            return newRoute;
        });
    };

    const navigation: NavigationInterface = {
        route,
        navigateTo
    };

    const currentAbstractPage = route.startsWith('/classification') ? 'classification' : route;

    const handleNavigate = (page: string) => {
        if (currentAbstractPage !== page) {
            if (page === 'classification') {
                navigateTo(Routes.CLASSIFICATION_OCR);
            } else {
                navigateTo(page as Route);
            }
            setDrawerOpen(false);
        }
    };

    const handleSwipe = () => setDrawerOpen(true);
    const handleSwipeClose = () => setDrawerOpen(false);

    const handleToggleMode = () => {
        navigateTo(route === Routes.CLASSIFICATION_OCR ? Routes.CLASSIFICATION_DRAW : Routes.CLASSIFICATION_OCR);
    };

    const shouldShowMenuButton = route !== Routes.CLASSIFICATION_DRAW_EXPANDED;

    return {
        route,
        currentAbstractPage,
        drawerOpen,
        navigation,
        handleNavigate,
        handleSwipe,
        handleSwipeClose,
        handleToggleMode,
        shouldShowMenuButton,
    };
};
