export interface LoadingScreenProps {
    /**
     * @precondition There must be an ongoing process blocking the view generation (loading the model for example)
     * @invariant The loading screen always blocks interaction with the rest of the application
     * @invariant The loading screen always shows an animation and text indicating the loading process
     * @postcondition The loading screen disappears and the interactable view appears
     */
    loadingText: string;
}