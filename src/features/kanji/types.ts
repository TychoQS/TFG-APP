import type { Kanji } from "../../model/types";


export interface DisplayInferencesInterface {

    inferenceList: Array<Kanji>;

    /**
     * @precondition The user must be in the classification page
     * @precondition There must be an inference results
     * @postcondition Between 1 and 5 inferences are shown that have the highest confidence percentage greater than 0%.
     * @invariant The value of confidence of each prediction in the prediction list must be over 0%
     * @invariant The prediction list must be sorted by confidence in descending order
     * @invariant The prediction list have at maximum 5 elements
     * @invariant The prediction list only can be an empty list or a list of kanjis
     * @invariant In classification ocr mode, the list is only updated once after the first inference
     * @invariant In classification draw mode, the list is updated after every inference
     */
    displayInference(): void;
}

export interface DisplayKanjiInterface {
    /**
     * @precondition The user must be in the classification page
     * @precondition There must be an inference results
     * @postcondition Detailed information about the kanji will be displayed
     * @invariant Application states doesn't change
     */
    displayKanjiInformation(): void;

    /**
     * @precondition The user must be in the classification page
     * @precondition There must be an inference results
     * @precondition The detailed information about the kanji is displayed
     * @postcondition Detailed information about the kanji is hidden
     * @invariant Application states doesn't change
     */
    hideKanjiInformation(): void
}

