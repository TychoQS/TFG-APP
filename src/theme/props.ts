export interface ThemeConfigProps {
    /**
     * @precondition The device theme must be accessible
     * @invariant The color combination must strictly belong to cold colors
     * @invariant Colors must be solid
     * @postcondition All UI components follow the color scheme
     */
    colorScheme: 'light' | 'dark';
    /**
     * @precondition The device theme must be accessible
     * @invariant The color combination must strictly belong to cold colors
     * @invariant Colors must be solid
     * @postcondition When the user changes the device theme, the app colors update accordingly
     */
    onThemeChange: (scheme: 'light' | 'dark') => void;
}