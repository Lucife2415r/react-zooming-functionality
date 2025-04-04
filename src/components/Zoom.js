import React, { useRef, useState, useEffect } from 'react';
import './Zoom.css';

const Zoom = () => {
    useEffect(() => {
        document.title = 'Zoom-App';
    }, []);

    const containerRef = useRef(null);
    const [zoom, setZoom] = useState(1);
    const [transform, setTransform] = useState({ x: '50%', y: '50%' });

    const min = 0.5;
    const max = 4;
    const zoomlevel = 0.1;

    const handleMouse = (e) => {
        e.preventDefault();
        adjustZoom(e.deltaY < 0 ? zoomlevel : -zoomlevel, e.clientX, e.clientY);
    };

    const adjustZoom = (step, clientX, clientY) => {
        const newZoom = Math.min(Math.max(min, zoom + step), max);
        if (containerRef.current) {
            const rect = containerRef.current.getBoundingClientRect();
            const offsetX = clientX ? clientX - rect.left : rect.width / 2;
            const offsetY = clientY ? clientY - rect.top : rect.height / 2;

            setTransform({
                x: `${(offsetX / rect.width) * 100}%`,
                y: `${(offsetY / rect.height) * 100}%`,
            });
        }
        setZoom(newZoom);
    };

    useEffect(() => {
        const container = containerRef.current;
        if (container) {
            container.addEventListener('wheel', handleMouse, { passive: false });
        }
        return () => {
            if (container) {
                container.removeEventListener('wheel', handleMouse);
            }
        };
    }, [zoom]);

    return (
        <div className="container" ref={containerRef}>
            <div
                className="content"
                style={{
                    transform: `scale(${zoom})`,
                    transformOrigin: `${transform.x} ${transform.y}`,
                }}
            >
                <div className="content-box">
                    <h2>Zoom Level: {zoom.toFixed(2)}x</h2>
                    <p>Use mouse or buttons to zoom.</p>
                    <p>Scrollbars appear when zooming beyond container size.</p>
                </div>
            </div>

            <div className="Zoombutton">
                <button onClick={() => adjustZoom(zoomlevel)}>Zoom In</button>
                <button onClick={() => adjustZoom(-zoomlevel)}>Zoom Out</button>
                <button onClick={() => setZoom(1)}>Reset</button>
            </div>
        </div>
    );
};

export default Zoom;
