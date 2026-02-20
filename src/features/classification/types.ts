export interface ToggleClassificationModeInterface {

    /**
     * @precondition The user must be in any mode of the classification page
     * @postcondition The classification mode will be toggled to the oposite mode
     * @postcondition All state associated to the previous mode is cleared (canvas, image, suggestion list)
     * @invariant Toggle state will always be ocr or draw
     */
    toggle(): void
}