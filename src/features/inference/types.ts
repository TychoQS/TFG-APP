import type { Kanji } from "../../model/types";

export interface InferenceRunnerInterface {
    /**
     * @precondition The model must be loaded (modelLoader.isModelReady = true)
     * @postcondition Returns the top 5 kanji predictions with their confidence
     */
    predict(imageSource: HTMLCanvasElement | HTMLImageElement | File): Promise<Kanji[]>;
}
