import React from 'react';
import { Drawer } from 'antd';
import { CloseOutlined } from '@ant-design/icons';
import type { KanjiCardProps } from './types';
import './KanjiCard.css';

/**
 * KanjiCard component implementation following DbC principles.
 * Implemented as a floating bottom card for premium mobile-first aesthetics.
 * 
 * @precondition props.kanji must be defined
 * @precondition props.onClose must be a function
 * @invariant The content is centered within the card
 * @invariant The kanji is displayed at the top/left with pronunciations to the right
 * @postcondition The card appears from the bottom overlaying the application
 */
const KanjiCard: React.FC<KanjiCardProps> = ({ kanji, onClose }) => {
    return (
        <Drawer
            placement="bottom"
            onClose={onClose}
            open={true}
            height="auto"
            closable={false}
            className="kanji-card-drawer"
            destroyOnClose={true}
        >
            <div className="kanji-card-wrapper">
                <button className="kanji-card-close-btn" onClick={onClose} aria-label="Close">
                    <CloseOutlined />
                </button>

                <div className="kanji-card-content">
                    <div className="kanji-header">
                        <div className="kanji-character-box">
                            <h1 className="kanji-main-char">{kanji.character}</h1>
                            <span className="kanji-match-badge">{Math.round(kanji.confidence * 100)}% Match</span>
                        </div>

                        <div className="kanji-readings-box">
                            <div className="reading-group">
                                <label>Kunyomi</label>
                                <div className="reading-list">
                                    {kanji.kunyomi.length > 0 ? (
                                        kanji.kunyomi.map((r, i) => (
                                            <span key={i} className="reading-text kunyomi-text">{r}</span>
                                        ))
                                    ) : (
                                        <span className="reading-none">—</span>
                                    )}
                                </div>
                            </div>

                            <div className="reading-group">
                                <label>Onyomi</label>
                                <div className="reading-list">
                                    {kanji.onyomi.length > 0 ? (
                                        kanji.onyomi.map((r, i) => (
                                            <span key={i} className="reading-text onyomi-text">{r}</span>
                                        ))
                                    ) : (
                                        <span className="reading-none">—</span>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Drawer>
    );
};

export default KanjiCard;
