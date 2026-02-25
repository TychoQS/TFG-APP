import * as ort from 'onnxruntime-web';
import type { ModelLoaderInterface } from './types';

ort.env.wasm.wasmPaths = '/';

export class ModelLoader implements ModelLoaderInterface {
    private session: ort.InferenceSession | null = null;
    private classes: string[] = [];
    private static instance: ModelLoader;
    public isModelReady: boolean = false;
    private loadingPromise: Promise<void> | null = null;

    private constructor() { }

    public static getInstance(): ModelLoader {
        if (!ModelLoader.instance) {
            ModelLoader.instance = new ModelLoader();
        }
        return ModelLoader.instance;
    }

    /**
     * @precondition The model is not already loaded (isModelReady = false)
     * @invariant The model is loaded exactly once and is loaded during all the use of the application (isModelReady = true)
     * @postcondition The model is loaded and ready to use (isModelReady = true)
     */
    async loadModel(): Promise<void> {
        if (this.isModelReady) return;
        if (this.loadingPromise) return this.loadingPromise;

        this.loadingPromise = (async () => {
            try {
                // Load classes
                const classesResponse = await fetch('/inference_model/classes.json');
                if (!classesResponse.ok) throw new Error('Failed to load classes.json');
                this.classes = await classesResponse.json();

                // Load ONNX model
                // Using webgl for better performance if available
                this.session = await ort.InferenceSession.create('/inference_model/kanji_model.onnx', {
                    executionProviders: ['webgl', 'wasm'],
                    graphOptimizationLevel: 'all'
                });

                this.isModelReady = true;
                console.log("Model loaded successfully");
            } catch (error) {
                console.error("Failed to load model:", error);
                this.isModelReady = false;
                this.loadingPromise = null; // Allow retry
                throw error;
            }
        })();

        return this.loadingPromise;
    }

    public getSession(): ort.InferenceSession | null {
        return this.session;
    }

    public getClasses(): string[] {
        return this.classes;
    }
}

export const modelLoader = ModelLoader.getInstance();
export default modelLoader;
