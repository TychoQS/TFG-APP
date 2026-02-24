import type { ClassificationLayoutProps } from "./props";
import { useState } from "react";
import { Button, Drawer, Menu } from "antd";
import { MenuOutlined } from "@ant-design/icons";
import ClassificationPhotoModeLayout from "./ClassificationPhotoMode/ClassificationPhotoModeLayout";
import ClassificationDrawModeLayout from "./ClassificationDrawMode/ClassificationDrawModeLayout";
import "./ClassificationLayout.css";
import { useNavigation } from '../../navigation/context';
import { Routes } from '../../navigation/routes';
import { useClassificationViewModel } from "./useClassificationViewModel";



const ClassificationLayout = ({ currentMode, onToggle }: ClassificationLayoutProps) => {
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [isExtended, setIsExtended] = useState(false);
    const { navigateTo } = useNavigation();
    const {
        currentImage,
        inferenceList,
        uploadPhoto,
        takePhoto,
        delete: deleteImage
    } = useClassificationViewModel(currentMode);

    const handleToggle = () => {
        deleteImage(); // Clear state when toggling as per ToggleClassificationModeInterface postcondition
        onToggle();
    };

    return (
        <div className="layout-container">
            {!isExtended && (
                <div className="layout-header">
                    <Button icon={<MenuOutlined />} onClick={() => setDrawerOpen(true)} />
                    <Button.Group>
                        <Button
                            type={currentMode === '/classification/ocr' ? 'primary' : 'default'}
                            onClick={handleToggle}
                        >
                            Photo
                        </Button>
                        <Button
                            type={currentMode === '/classification/draw' ? 'primary' : 'default'}
                            onClick={handleToggle}
                        >
                            Draw
                        </Button>
                    </Button.Group>
                </div>)}

            <Drawer title="Menu" placement="left" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
                <Menu items={[]} />
            </Drawer>

            <div className="layout-content">
                {currentMode === '/classification/ocr' ? (
                    <ClassificationPhotoModeLayout
                        onTakePhoto={takePhoto}
                        onUploadPhoto={uploadPhoto}
                        currentImage={currentImage}
                        inferenceList={inferenceList}
                    />
                ) : (
                    <ClassificationDrawModeLayout
                        onExtendCanvas={() => {
                            setIsExtended(true);
                            navigateTo(Routes.CLASSIFICATION_DRAW_EXPANDED);
                        }}
                        onContractCanvas={() => {
                            setIsExtended(false);
                            navigateTo(Routes.CLASSIFICATION_DRAW);
                        }}
                        inferenceList={[]}
                    />
                )}
            </div>
        </div>
    );
};

export default ClassificationLayout;