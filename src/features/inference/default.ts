import * as ort from 'onnxruntime-web';
import { modelLoader } from './loader/default';
import type { Kanji } from '../../model/types';
import type { InferenceRunnerInterface } from './types';
import { Image, readCanvas, readImg, decode, Mask } from 'image-js';

export class InferenceRunner implements InferenceRunnerInterface {
    private static instance: InferenceRunner;
    private readonly IMG_SIZE = 128;
    private readonly CHANNEL_SIZE = 3;

    private constructor() { }

    public static getInstance(): InferenceRunner {
        if (!InferenceRunner.instance) {
            InferenceRunner.instance = new InferenceRunner();
        }
        return InferenceRunner.instance;
    }

    /**
     * @precondition The model must be loaded
     * @postcondition Returns the top 5 kanji predictions with their confidence
     */
    async predict(imageSource: HTMLCanvasElement | HTMLImageElement | File): Promise<Kanji[]> {
        if (!modelLoader.isModelReady) {
            await modelLoader.loadModel();
        }

        const session = modelLoader.getSession();
        const classes = modelLoader.getClasses();

        if (!session || classes.length === 0) {
            console.error('Inference error: Model session or classes not available');
            return [];
        }

        try {
            const imageData = await this.preprocess(imageSource);
            const inputTensor = new ort.Tensor('float32', imageData, [1, this.CHANNEL_SIZE, this.IMG_SIZE, this.IMG_SIZE]);

            const inputName = session.inputNames[0];
            const outputName = session.outputNames[0];

            const output = await session.run({ [inputName]: inputTensor });
            const results = output[outputName].data as Float32Array;

            return this.postprocess(results, classes);
        } catch (error) {
            console.error('Inference execution failed:', error);
            return [];
        }
    }

    private async preprocess(source: HTMLCanvasElement | HTMLImageElement | File): Promise<Float32Array> {
        if (source instanceof HTMLCanvasElement) {
            return this.preprocessCanvas(source);
        } else if (source instanceof File) {
            return this.preprocessFile(source);
        } else if (source instanceof HTMLImageElement) {
            const image = readImg(source);
            return this.preprocessImage(image, false);
        }
        throw new Error('Unsupported image source type');
    }

    private async preprocessCanvas(canvas: HTMLCanvasElement): Promise<Float32Array> {
        const image = readCanvas(canvas);
        return this.preprocessImage(image, false);
    }

    private async preprocessFile(file: File): Promise<Float32Array> {
        const buffer = await file.arrayBuffer();
        const image = decode(new Uint8Array(buffer));
        return this.preprocessImage(image, true);
    }

    private async preprocessImage(image: Image, isFile: boolean): Promise<Float32Array> {
        let processed: Image;
        if (isFile) {
            processed = image.grey().resize({ width: this.IMG_SIZE, height: this.IMG_SIZE, interpolationType: 'nearest' });
        } else {
            processed = image.resize({ width: this.IMG_SIZE, height: this.IMG_SIZE, interpolationType: 'nearest' });
        }

        const means = processed.mean();
        const meanIntensity = means.reduce((a, b) => a + b, 0) / means.length;

        if (meanIntensity > 127.5) {
            processed = processed.invert();
        }

        let mask: Mask;
        if (isFile) {
            mask = processed.threshold({ algorithm: 'otsu' });
        } else {
            const greyImage = processed.components > 1 ? processed.grey() : processed;
            mask = greyImage.threshold({ threshold: 0.5 });
        }

        const totalPixels = this.IMG_SIZE * this.IMG_SIZE;
        const floatData = new Float32Array(this.CHANNEL_SIZE * totalPixels);

        for (let i = 0; i < totalPixels; i++) {
            const val = mask.getBitByIndex(i);
            const normalized = val > 0 ? 1.0 : 0.0;
            for (let c = 0; c < this.CHANNEL_SIZE; c++) {
                floatData[c * totalPixels + i] = normalized;
            }
        }

        return floatData;
    }

    private postprocess(results: Float32Array, classes: string[]): Kanji[] {
        // Apply Softmax to convert logits to probabilities
        const maxLogit = Math.max(...results);
        const exps = Array.from(results).map(x => Math.exp(x - maxLogit));
        const sumExps = exps.reduce((a, b) => a + b, 0);
        const probabilities = exps.map(x => x / sumExps);

        const indexed = probabilities.map((confidence, index) => ({
            confidence,
            character: classes[index]
        }));

        // Sort by confidence descending and filter results with confidence > 0
        // Take only top 5 as per contract and invariants
        return indexed
            .filter(item => item.confidence > 0)
            .sort((a, b) => b.confidence - a.confidence)
            .slice(0, 5)
            .map(item => ({
                character: item.character,
                confidence: item.confidence,
                kunyomi: [],
                onyomi: []
            }));
    }
}

export const inferenceRunner = InferenceRunner.getInstance();
export default inferenceRunner;
