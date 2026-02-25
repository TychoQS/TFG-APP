import { useState, useEffect, useRef } from 'react';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import type { Kanji } from '../../model/types';
import type { UploadPhotoInterface, DeleteImageInterface, TakePhotoInterface } from '../../features/photo/types';
import { Routes } from '../../navigation/routes';
import type { Route } from '../../navigation/types';
import { modelLoader } from '../../features/inference/loader/default';
import { inferenceRunner } from '../../features/inference/default';
import type { DisplayInferencesInterface } from '../../features/kanji/types';

interface ClassificationViewModel extends
    UploadPhotoInterface,
    TakePhotoInterface,
    DeleteImageInterface,
    DisplayInferencesInterface {
    currentImage: File | null;
    isLoading: boolean;
    triggerCanvasInference: (canvas: HTMLCanvasElement) => Promise<void>;
}


export const useClassificationViewModel = (currentRoute: Route): ClassificationViewModel => {
    const [currentImage, setCurrentImage] = useState<File | null>(null);
    const [inferenceList, setInferenceList] = useState<Kanji[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(!modelLoader.isModelReady);
    const pendingResultsRef = useRef<Kanji[]>([]);

    useEffect(() => {
        if (!modelLoader.isModelReady) {
            setIsLoading(true);
            modelLoader.loadModel()
                .catch(console.error)
                .finally(() => setIsLoading(false));
        } else {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        const handleStrokeEnd = (e: any) => {
            if (e.detail?.canvas) {
                triggerCanvasInference(e.detail.canvas);
            }
        };

        window.addEventListener('canvas:stroke-end' as any, handleStrokeEnd);

        const handleClear = () => {
            pendingResultsRef.current = [];
            setInferenceList([]);
        };
        window.addEventListener('canvas:clear', handleClear);

        return () => {
            window.removeEventListener('canvas:stroke-end' as any, handleStrokeEnd);
            window.removeEventListener('canvas:clear', handleClear);
        };
    }, [currentRoute]);

    // Automatically trigger inference when currentImage changes in OCR mode
    useEffect(() => {
        if (currentImage && currentRoute === Routes.CLASSIFICATION_OCR) {
            triggerInference(currentImage);
        }
    }, [currentImage, currentRoute]);

    const displayInference = () => {
        if (pendingResultsRef.current.length === 0) return;

        // Apply Invariants: Filter > 0%, Sort descending, Max 5
        const validResults = pendingResultsRef.current
            .filter(k => k.confidence > 0)
            .sort((a, b) => b.confidence - a.confidence)
            .slice(0, 5);

        // Mode Invariants
        if (currentRoute === Routes.CLASSIFICATION_OCR) {
            // Updated once after first inference (don't update if already populated for current source session)
            if (inferenceList.length === 0) {
                setInferenceList(validResults);
            }
        } else {
            // Draw mode: updated after every inference
            setInferenceList(validResults);
        }
    };

    /**
     * Triggers the inference process using the actual model.
     * @postcondition Inference results are loaded into the suggestion list via displayInference.
     */
    const triggerInference = async (source: File | HTMLCanvasElement) => {
        try {
            const results = await inferenceRunner.predict(source);
            pendingResultsRef.current = results;
            displayInference();
        } catch (error) {
            console.error("Inference failed:", error);
            pendingResultsRef.current = [];
            setInferenceList([]);
        }
    };

    const triggerCanvasInference = async (canvas: HTMLCanvasElement) => {
        if (currentRoute !== Routes.CLASSIFICATION_DRAW && currentRoute !== Routes.CLASSIFICATION_DRAW_EXPANDED) {
            return;
        }
        await triggerInference(canvas);
    };

    const uploadPhoto = async () => {
        if (currentRoute !== Routes.CLASSIFICATION_OCR) {
            console.error("Precondition failed: uploadPhoto can only be triggered in OCR mode.");
            return;
        }

        try {
            const permissions = await Camera.checkPermissions();
            if (permissions.photos !== 'granted') {
                const request = await Camera.requestPermissions({ permissions: ['photos'] });
                if (request.photos !== 'granted') {
                    console.error("Precondition failed: storage access (photos) denied.");
                    return;
                }
            }

            const input = document.createElement('input');
            input.type = 'file';
            input.accept = 'image/*';
            input.onchange = (e: Event) => {
                const target = e.target as HTMLInputElement;
                const file = target.files?.[0];
                if (file) {
                    setInferenceList([]); // Reset for new photo
                    setCurrentImage(file);
                }
            };
            input.click();
        } catch (error) {
            console.error("Failed to check storage permissions:", error);
        }
    };


    const takePhoto = async () => {
        if (currentRoute !== Routes.CLASSIFICATION_OCR) {
            console.error("Precondition failed: takePhoto can only be triggered in OCR mode.");
            return;
        }

        try {
            const permissions = await Camera.checkPermissions();
            if (permissions.camera !== 'granted') {
                const request = await Camera.requestPermissions({ permissions: ['camera'] });
                if (request.camera !== 'granted') {
                    console.error("Precondition failed: camera access denied.");
                    return;
                }
            }

            const photo = await Camera.getPhoto({
                quality: 90,
                allowEditing: false,
                resultType: CameraResultType.Uri,
                source: CameraSource.Camera
            });

            if (photo.webPath) {
                const response = await fetch(photo.webPath);
                const blob = await response.blob();
                const file = new File([blob], `captured_photo_${Date.now()}.jpg`, { type: blob.type });
                setInferenceList([]); // Reset for new photo
                setCurrentImage(file);
            }
        } catch (error) {
            console.error("Camera interaction failed or cancelled:", error);
        }
    };



    const deleteImage = () => {
        if (currentRoute !== Routes.CLASSIFICATION_OCR && currentRoute !== Routes.CLASSIFICATION_DRAW && currentRoute !== Routes.CLASSIFICATION_DRAW_EXPANDED) {
            return;
        }

        setCurrentImage(null);
        pendingResultsRef.current = [];
        setInferenceList([]);
    };

    return {
        currentImage,
        inferenceList,
        isLoading,
        uploadPhoto,
        takePhoto,
        displayInference,
        triggerCanvasInference,
        delete: deleteImage
    };
};
