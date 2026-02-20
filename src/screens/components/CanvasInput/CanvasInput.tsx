import React, { useRef, useEffect } from 'react';
import type { CanvasInputProps } from './types';
import './CanvasInput.css';


const CanvasInput: React.FC<CanvasInputProps> = ({ backgroundColor }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const ctxRef = useRef<CanvasRenderingContext2D | null>(null);
    const isDrawing = useRef(false);
    const pointsRef = useRef<{ x: number, y: number }[]>([]);

    const bgColor = backgroundColor === "white" ? "#ffffff" : "#000000";
    const strokeColor = backgroundColor === "white" ? "#000000" : "#ffffff";

    // Initialize or Update Canvas Color/Style  
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d', { alpha: false });
        if (!ctx) return;
        ctxRef.current = ctx;

        if (canvas.width !== canvas.offsetWidth || canvas.height !== canvas.offsetHeight) {
            canvas.width = canvas.offsetWidth;
            canvas.height = canvas.offsetHeight;
        }

        ctx.fillStyle = bgColor;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.strokeStyle = strokeColor;
        ctx.lineWidth = 8;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';

        // Separate responsibility: Listen for external clear command
        const handleExternalClear = () => {
            if (ctxRef.current) {
                ctxRef.current.fillStyle = bgColor;
                ctxRef.current.fillRect(0, 0, canvas.width, canvas.height);
                pointsRef.current = [];
            }
        };

        window.addEventListener('canvas:clear', handleExternalClear);
        return () => window.removeEventListener('canvas:clear', handleExternalClear);
    }, [bgColor, strokeColor]);

    const getCoords = (e: React.MouseEvent | React.TouchEvent | MouseEvent | TouchEvent): { x: number, y: number } | null => {
        const canvas = canvasRef.current;
        if (!canvas) return null;
        const rect = canvas.getBoundingClientRect();
        const clientX = 'touches' in e ? e.touches[0].clientX : (e as MouseEvent).clientX;
        const clientY = 'touches' in e ? e.touches[0].clientY : (e as MouseEvent).clientY;
        return {
            x: clientX - rect.left,
            y: clientY - rect.top
        };
    };

    const startDrawing = (e: React.MouseEvent | React.TouchEvent) => {
        const coords = getCoords(e);
        if (!coords) return;
        isDrawing.current = true;
        pointsRef.current = [coords];

        const ctx = ctxRef.current;
        if (ctx) {
            ctx.beginPath();
            ctx.moveTo(coords.x, coords.y);
        }
    };

    const draw = (e: React.MouseEvent | React.TouchEvent) => {
        if (!isDrawing.current || !ctxRef.current) return;
        const coords = getCoords(e);
        if (!coords) return;

        pointsRef.current.push(coords);
        ctxRef.current.lineTo(coords.x, coords.y);
        ctxRef.current.stroke();
    };

    const stopDrawing = () => {
        if (!isDrawing.current) return;
        isDrawing.current = false;

        // Dispatch custom event to notify features (DrawStrokeInterface)
        // This maintains separation of concerns while following DbC postconditions
        const strokePoints = [...pointsRef.current];
        window.dispatchEvent(new CustomEvent('canvas:stroke-end', { detail: { points: strokePoints } }));
    };

    return (
        <div className="canvas-wrapper">
            <canvas
                ref={canvasRef}
                className={`canvas-draw-area ${backgroundColor}`}
                onMouseDown={startDrawing}
                onMouseMove={draw}
                onMouseUp={stopDrawing}
                onMouseLeave={stopDrawing}
                onTouchStart={startDrawing}
                onTouchMove={draw}
                onTouchEnd={stopDrawing}
            />
        </div>
    );
};

export default CanvasInput;
