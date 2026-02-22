import React, { useRef, useEffect } from 'react';
import type { InferenceListProps } from './types';
import './InferenceList.css';


const InferenceList: React.FC<InferenceListProps> = ({ inferenceList, onKanjiPress }) => {
    const scrollRef = useRef<HTMLDivElement>(null);

    const tripleList = [...inferenceList, ...inferenceList, ...inferenceList];
    const originalLength = inferenceList.length;

    useEffect(() => {
        const container = scrollRef.current;
        if (!container || originalLength === 0) return;

        const singleSetWidth = container.scrollWidth / 3;
        container.scrollLeft = singleSetWidth;

        let isAdjusting = false;

        const handleScroll = () => {
            if (isAdjusting) return;
            const { scrollLeft } = container;

            if (scrollLeft <= 0) {
                isAdjusting = true;
                container.scrollLeft = scrollLeft + singleSetWidth;
                requestAnimationFrame(() => {
                    isAdjusting = false;
                });
            } else if (scrollLeft >= container.scrollWidth - container.clientWidth - 1) {
                isAdjusting = true;
                container.scrollLeft = scrollLeft - singleSetWidth;
                requestAnimationFrame(() => {
                    isAdjusting = false;
                });
            }
        };

        container.addEventListener("scroll", handleScroll, { passive: true });
        return () => {
            container.removeEventListener("scroll", handleScroll);
        };
    }, [originalLength]);

    if (!inferenceList || inferenceList.length === 0) return null;

    return (
        <div className="inference-list-container">
            <div className="inference-list-scroll" ref={scrollRef}>
                {tripleList.map((kanji, index) => (
                    <div
                        key={`${kanji.character}-${index}`}
                        className="inference-item-wrapper"
                        onClick={() => onKanjiPress(kanji)}
                    >
                        <div className="inference-item">
                            <span className="kanji-glyph">{kanji.character}</span>
                            <div className="confidence-indicator">
                                <div
                                    className="confidence-bar"
                                    style={{ width: `${kanji.confidence * 100}%` }}
                                />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <div className="scroll-indicator-fade left" />
            <div className="scroll-indicator-fade right" />
        </div>
    );
};

export default InferenceList;
