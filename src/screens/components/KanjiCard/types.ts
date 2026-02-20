import type { Kanji } from "../../../model/types";

/**
 * @invariant The content of the card is centered
 */
export interface KanjiCardProps {
    /**
     * @precondition A kanji card must be visible
     * @invariant There is always a visible mechanism to close the card
     * @postcondition The card disappears and the rest of the application is no longer darkened
     */
    onClose: () => void;

    /**
     * @precondition The kanji card must be visible
     * @invariant The kanji is always displayed at the top with its pronunciations to the right
     * @invariant kunyomi is displayed in hiragana, onyomi in katakana
     */
    kanji: Kanji;
}