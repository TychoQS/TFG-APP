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

        // Start at the middle duplicate for seamless bidirectional scrolling
        const itemWidth = container.scrollWidth / 3;
        container.scrollLeft = itemWidth;

        const handleScroll = () => {
            const { scrollLeft, scrollWidth } = container;
            const oneThird = scrollWidth / 3;

            // If we scroll too far left, jump to the same position in the middle third
            if (scrollLeft <= 0) {
                container.scrollLeft = oneThird;
            }
            // If we scroll too far right, jump back to the middle
            else if (scrollLeft >= oneThird * 2) {
                container.scrollLeft = oneThird;
            }
        };

        container.addEventListener('scroll', handleScroll);
        return () => container.removeEventListener('scroll', handleScroll);
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
