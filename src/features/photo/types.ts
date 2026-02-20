

export interface TakePhotoInterface {

    /**
     * @precondition The user must be in the OCR page in the image mode
     * @precondition The user must have access to camera available
     * @precondition The device must have a medium to take a photo
     * @postcondition A photo is taken and sent to the inference model
     * @invariant @photo is not modified in the process
     * @invariant @photo state must be the image or null
     */
    takePhoto(): void;
}


export interface UploadPhotoInterface {


    /**
     * @precondition The user must be in the OCR page in the image mode
     * @precondition The device must have access to the storage
     * @invariant Image is not modified in the process
     * @invariant Image state must be image or null
     * @postcondition A photo is uploaded and sent to the inference model
     */
    uploadPhoto(): void;
}

export interface DeleteImageInterface {

    /**
     * @precondition The user must be in the OCR page in the image mode
     * @precondition There must be an image loaded
     * @postcondition The image state pass to be null.
     * @invariant No inferece is triggered during this operation
     */
    delete(): void;
}