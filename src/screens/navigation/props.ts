export interface NavigationProps {

    /**
     * @precondition The user must be on the navigation page (for example not in loading placeholder or kanji information display)
     * @precondition The user must swipe from the menu side or tap the icon.
     * @invariant The current user page is highligthed
     * @postcondition All available pages are displayed to the user in the lateral menu
     */
    onSwipe(): void;
}