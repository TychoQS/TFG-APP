import type { ClassificationDrawModeLayoutProps } from "../props";
import "./ClassificationDrawModeLayout.css";
import { Button } from "antd";
import { CanvasInput } from "../../components/CanvasInput";
import { InferenceList } from "../../components/InferenceList";
import { useState } from "react";
import { KanjiCard } from "../../components/KanjiCard";
import type { Kanji } from "../../../model/types";
import { DeleteOutlined, FullscreenOutlined, FullscreenExitOutlined } from "@ant-design/icons";


const ClassificationDrawModeLayout = (props: ClassificationDrawModeLayoutProps) => {
    const [selectedKanji, setSelectedKanji] = useState<Kanji | null>(null);
    const isExtended = props.canvasSize.height > 400;

    return (
        <div className={`container ${isExtended ? 'extended' : ''}`}>
            <div className={`canvas-layout-container ${isExtended ? 'extended' : ''}`}>
                <CanvasInput backgroundColor="black" />
            </div>
            <Button icon={<DeleteOutlined />} onClick={() => window.dispatchEvent(new CustomEvent('canvas:clear'))}>
                Clear
            </Button>
            {isExtended ? (
                <Button onClick={props.onContractCanvas} icon={<FullscreenExitOutlined />}>
                    Exit extended mode
                </Button>
            ) : (
                <Button onClick={props.onExtendCanvas} icon={<FullscreenOutlined />}>
                    Extended mode
                </Button>
            )}
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
        </div>
    );
};

export default ClassificationDrawModeLayout;