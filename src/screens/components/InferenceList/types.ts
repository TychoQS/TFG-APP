import type { Kanji } from "../../../model/types";

export interface InferenceListProps {
    /**
     * @precondition An inference must have been made
     * @precondition User must be in any of the modes of the classification page
     * @invariant At any time, the scroll works in both directions, and the circularity is always maintained, not just when reaching the end.
     * @postcondition After reaching the end of the list, the scroll returns to the beginning.
     */
    inferenceList: Array<Kanji>;

    /**
     * @precondition The inference list must be visible with suggestions
     * @invariant The rest of the application is always darkened while the card is visible
     * @postcondition A card appears from the bottom overlaying the rest of the application when pressing on an list element
    */
    onKanjiPress: (kanji: Kanji) => void;
}