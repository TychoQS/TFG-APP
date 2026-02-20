
export interface ModelLoaderInterface {
    isModelReady: boolean;

    /**
     * @precondition The model is not already loaded (isModelReady = false)
     * @invariant The model is loaded exactly once and is loaded during all the use of the application (isModelReady = true)
     * @postcondition The model is loaded and ready to use (isModelReady = true)
     */
    loadModel(): Promise<void>;
}   