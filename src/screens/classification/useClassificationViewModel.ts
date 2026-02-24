import { useState } from 'react';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import type { Kanji } from '../../model/types';
import type { UploadPhotoInterface, DeleteImageInterface, TakePhotoInterface } from '../../features/photo/types';
import { Routes } from '../../navigation/routes';
import type { Route } from '../../navigation/types';

interface ClassificationViewModel extends UploadPhotoInterface, TakePhotoInterface, DeleteImageInterface {
    currentImage: File | null;
    inferenceList: Kanji[];
}


export const useClassificationViewModel = (currentRoute: Route): ClassificationViewModel => {
    const [currentImage, setCurrentImage] = useState<File | null>(null);
    const [inferenceList, setInferenceList] = useState<Kanji[]>([]);

    /**
     * Mocks the inference process.
     * @postcondition Inference results are loaded into the suggestion list.
     */
    const triggerInference = (_file: File) => {
        // Mock inference results
        setInferenceList([
            { character: "日", kunyomi: ["ひ"], onyomi: ["ニチ"], confidence: 0.95 },
            { character: "月", kunyomi: ["つき"], onyomi: ["ゲツ"], confidence: 0.80 },
            { character: "火", kunyomi: ["ひ"], onyomi: ["カ"], confidence: 0.75 },
        ]);
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
                    setCurrentImage(file);
                    triggerInference(file);
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
                setCurrentImage(file);
                triggerInference(file);
            }
        } catch (error) {
            console.error("Camera interaction failed or cancelled:", error);
        }
    };



    const deleteImage = () => {
        if (currentRoute !== Routes.CLASSIFICATION_OCR) {
            console.error("Precondition failed: delete can only be triggered in OCR mode.");
            return;
        }
        if (!currentImage) {
            console.warn("Precondition warning: Attempted to delete image when none was loaded.");
            return;
        }

        setCurrentImage(null);
        setInferenceList([]);
    };

    return {
        currentImage,
        inferenceList,
        uploadPhoto,
        takePhoto,
        delete: deleteImage
    };
};
