export interface CanvasInputProps {
    /**
     * @precondition The user must be in classification page in draw mode
     * @invariant The canvas background color is always white or black, being the stroke color always the other one
     * @postcondition backgroundColor and strokeColor are always opposite colors
     */
    backgroundColor: "white" | "black";
}