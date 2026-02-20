import type { Kanji } from "../../model/types";
import type { Route } from "../../navigation/types";

export interface ClassificationLayoutProps {
    currentMode: Route

    /**
     * @precondition The user must be in the classification page
     * @invariant The toggle always shows both valid states
     * @invariant The toggle is always located at the top of the page
     * @postcondition The toggle is at the top of the screen marking the active state
     */
    onToggle: () => void;
}

/**
 * @invariant The inference list is always displayed below the image
 * @invariant Content is always centered and stacked in a column layout
 */
export interface ClassificationPhotoModeLayoutProps {
    /**
     * @precondition The user must be in the classification page in ocr mode
     * @invariant The buttons are always situated one above the other at the bottom of the screen
     * @invariant The upload button is always above the take photo button
     * @postcondition Both buttons are always present in the image mode
     */
    onTakePhoto: () => void;

    /**
     * @precondition The user must be in the classification page in ocr mode
     * @invariant The buttons are always situated one above the other at the bottom of the screen
     * @invariant The upload button is always above the take photo button
     * @postcondition Both buttons are always present in the image mode
     */
    onUploadPhoto: () => void;

    /**
     * @precondition The user must be in classification image mode
     * @invariant The image is always visible when a classification is being shown
     * @postcondition The image is displayed alongside the inference results
     */
    currentImage: File | null;

    /**
     * @precondition An inference must have been made
     * @precondition User must be in the classification image mode
     * @invariant The inference list is always displayed below the image
     * @postcondition The inference list appears below the image after an inference
     */
    inferenceList: Array<Kanji>;
}

/**
 * @invariant The inference list is always displayed below the canvas
 * @invariant Content is always centered and stacked in a column layout
 * @invariant The clear canvas button will be always independent of the submode (extended or not) below the canvas with some separation
 * @invariant The expand/contract canvas button will be always independent of the submode (extended or not) below the clear button and above the prediction list with some separation
 * 
 */
export interface ClassificationDrawModeLayoutProps {
    /**
     * @precondition The user must be in the classification page in draw mode but not in the extended submode
     * @invariant The canvas will occupy 50% of the height and 100% of the width, while the predictions list, the clear button and the return button will occupy the remaining height.
     * @postcondition All unnecessary UI elements are removed, including the toggle button, side menu, etc...
     */
    onExtendCanvas: () => void;

    /**
     * @precondition The user must be in the classification page in draw mode in the extended submode
     * @invariant Under the clean canvas button a button with text "Exit extended mode" is always being displayed
     * @postcondition Returns to the classification draw mode
     */
    onContractCanvas: () => void;

    /**
     * @precondition The user must be in classification draw mode without the extended submode
     * @invariant The canvas occupies most of the screen horizontally and vertically without eclipsing other components and not filling the whole screen (giving space in borders)
     * @postcondition The canvas resizes to occupy the maximum possible screen space without eclipsing other components and filling the whole screen
     */
    canvasSize: { width: number; height: number };

    /**
     * @precondition An inference must have been made
     * @precondition User must be in the classification draw mode
     * @invariant The inference list is always displayed below the canvas
     * @postcondition The inference list appears below the canvas after an inference
        */
    inferenceList: Array<Kanji>;

}
