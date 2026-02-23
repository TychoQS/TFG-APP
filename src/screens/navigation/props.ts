export interface NavigationProps {

    /**
     * @precondition The user must be on the navigation page (for example not in loading placeholder or kanji information display)
     * @precondition The user must swipe from the menu side or tap the icon.
     * @invariant The current user page is highligthed
     * @postcondition All available pages are displayed to the user in the lateral menu
     */
    onSwipe(): void;


    /**
     * @precondition The user must be on the navigation page (for example not in loading placeholder or kanji information display)
     * @precondition The user must swipe from the other side of the menu side to the menu side.
     * @invariant The current user page is highligthed
     * @postcondition The navigation menu is closed and the user remains on the current page      
     */
    onSwipeClose(): void;

    /**
     * @precondition The navigation menu must be open
     * @precondition The user must press a page that is not the one they are currently on
     * @invariant The current user page is highlighted in the menu
     * @postcondition If the user presses the page they are already on, nothing happens. Otherwise the app navigates to the selected page and the lateral menu is closed
     */
    onNavigate(page: string): void;
}