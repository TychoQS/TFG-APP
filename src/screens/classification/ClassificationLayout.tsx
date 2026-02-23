import type { ClassificationLayoutProps } from "./props";
import { useState } from "react";
import { Button, Drawer, Menu } from "antd";
import { MenuOutlined } from "@ant-design/icons";
import ClassificationPhotoModeLayout from "./ClassificationPhotoMode/ClassificationPhotoModeLayout";
import ClassificationDrawModeLayout from "./ClassificationDrawMode/ClassificationDrawModeLayout";
import "./ClassificationLayout.css";
import { useNavigation } from '../../navigation/context';
import { Routes } from '../../navigation/routes';



const ClassificationLayout = ({ currentMode, onToggle }: ClassificationLayoutProps) => {
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [isExtended, setIsExtended] = useState(false);
    const { navigateTo } = useNavigation();

    return (
        <div className="layout-container">
            {!isExtended && (
                <div className="layout-header">
                    <Button icon={<MenuOutlined />} onClick={() => setDrawerOpen(true)} />
                    <Button.Group>
                        <Button
                            type={currentMode === '/classification/ocr' ? 'primary' : 'default'}
                            onClick={onToggle}
                        >
                            Photo
                        </Button>
                        <Button
                            type={currentMode === '/classification/draw' ? 'primary' : 'default'}
                            onClick={onToggle}
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
                        onTakePhoto={() => console.log('Take photo')}
                        onUploadPhoto={() => console.log('Upload photo')}
                        currentImage={null}
                        inferenceList={[]}
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