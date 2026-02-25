import type { ClassificationLayoutProps } from "./props";
import { useState } from "react";
import { Button, Drawer, Menu } from "antd";
import { MenuOutlined } from "@ant-design/icons";
import ClassificationPhotoModeLayout from "./ClassificationPhotoMode/ClassificationPhotoModeLayout";
import ClassificationDrawModeLayout from "./ClassificationDrawMode/ClassificationDrawModeLayout";
import LoadingScreen from "../components/LoadingScreen/LoadingScreen";
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
        isLoading,
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
            {isLoading && <LoadingScreen loadingText="Initializing Model..." />}
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

            <div className={`layout-content ${isLoading ? 'blur-content' : ''}`}>
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
                        inferenceList={inferenceList}
                    />
                )}
            </div>
        </div>
    );
};

export default ClassificationLayout;