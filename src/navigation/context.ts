import { createContext, useContext } from 'react';
import type { NavigationInterface } from './types';
import { DEFAULT_ROUTE } from './defaults';

export const NavigationContext = createContext<NavigationInterface>({
    route: DEFAULT_ROUTE,
    navigateTo: () => { }
});

export const useNavigation = () => useContext(NavigationContext);
