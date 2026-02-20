import React from 'react';
import type { LoadingScreenProps } from './types';
import './LoadingScreen.css';

/**
 * LoadingScreen component implementation following DbC principles.
 * 
 * @precondition Ongoing process must be active
 * @invariant Blocks interaction with the rest of the app
 * @invariant Displays animation and loading text
 * @postcondition disappears when loading completes
 */
const LoadingScreen: React.FC<LoadingScreenProps> = ({ loadingText }) => {
    return (
        <div className="loading-screen-overlay">
            <div className="loading-content">
                <div className="loading-animation-container">
                    <div className="loading-circle" />
                    <div className="loading-glow" />
                </div>
                <div className="loading-text-wrapper">
                    <p className="loading-text">{loadingText}</p>
                    <div className="loading-dots">
                        <span />
                        <span />
                        <span />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoadingScreen;
