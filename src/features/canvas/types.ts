type Point = {
    x: number;
    y: number;
};

export interface CleanCanvasInterface {

    /**
     * @precondition The canvas is not empty
     * @invariant Do not make any inference
     * @postcondition The canvas is empty
     * @postcondition The stroke history list is cleared
     * @postcondition The suggestion list is cleared
     */
    cleanCanvas(): void;
}

export interface DrawStrokeInterface {

    /**
     * @precondition The event to stop interacting with the canvas must have been triggered after the event of interactuating with the canvas
     * @invariant Only the zone described by the user must be painted
     * @invariant All points must be within the canvas bounds
     * @postcondition The coordenates of the stroke are send to draw
     * @postcondition A image of the canvas is taken after the stroke is drawn and sent to the inference module
     * @postcondition The suggestion list is updated with the inference results
     */
    drawStroke(points: Point[]): void;
}

/**
 * @invariant The canvas size adapts to the current route (normal or expanded)
 */
export interface CanvasInputInterface {

    /**
     * @precondition The user must be in the classification page in the draw mode
     * @invariant The state of the stroke history list must be an empty list or a list of strokes
     * @invariant All points must be within the canvas bounds
     * @invariant The state of the suggestion list must be an empty list or a list of kanji (maximum 5)
     * @postcondition The stroke information is saved in the stroke history list 
     */
    saveStroke(points: Point[]): void;
}


