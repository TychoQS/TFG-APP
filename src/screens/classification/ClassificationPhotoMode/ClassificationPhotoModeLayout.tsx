import type { ClassificationPhotoModeLayoutProps } from "../props";
import "./ClassificationPhotoModeLayout.css";
import { Button } from "antd";
import { UploadOutlined, CameraOutlined, FileImageOutlined } from "@ant-design/icons";
import { InferenceList } from "../../components/InferenceList";
import { useState } from "react";
import { KanjiCard } from "../../components/KanjiCard";
import type { Kanji } from "../../../model/types";

const ClassificationPhotoModeLayout = (props: ClassificationPhotoModeLayoutProps) => {
    const [selectedKanji, setSelectedKanji] = useState<Kanji | null>(null);
    return (
        <div className="container">
            <div className="image-placeholder">
                {props.currentImage ? (
                    <img src={URL.createObjectURL(props.currentImage)} alt="Uploaded" />
                ) : (
                    <>
                        <FileImageOutlined />
                        <p>Take a picture or upload one to classify</p>
                    </>
                )}
            </div>
            <div className="predict-list">
                <InferenceList
                    inferenceList={props.inferenceList}
                    onKanjiPress={(kanji) => setSelectedKanji(kanji)}
                />

                {selectedKanji && (
                    <KanjiCard
                        kanji={selectedKanji}
                        onClose={() => setSelectedKanji(null)}
                    />
                )}
            </div>
            <div className="buttons-wrapper">
                <Button color="default" onClick={props.onUploadPhoto} icon={<UploadOutlined />}>Upload photo</Button>
                <Button color="default" onClick={props.onTakePhoto} icon={<CameraOutlined />}>Take photo</Button>
            </div>
        </div>
    );
};

export default ClassificationPhotoModeLayout;