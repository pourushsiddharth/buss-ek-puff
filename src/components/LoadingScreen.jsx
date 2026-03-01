import React from 'react';

/**
 * Consistent full-screen loading animation used across the entire site.
 * Uses the /assets/loading.gif with a centered dark backdrop and optional label.
 */
const LoadingScreen = ({ label = '' }) => {
    return (
        <div
            style={{
                position: 'fixed',
                inset: 0,
                minHeight: '100vh',
                width: '100%',
                backgroundColor: '#000',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '1.25rem',
                zIndex: 9999,
            }}
        >
            <img
                src="/assets/loading.gif"
                alt="Loading..."
                style={{
                    width: '160px',
                    height: '160px',
                    objectFit: 'contain',
                }}
            />
            {label && (
                <p
                    style={{
                        color: 'rgba(255,255,255,0.45)',
                        fontSize: '0.95rem',
                        fontFamily: '"Outfit", sans-serif',
                        letterSpacing: '2px',
                        textTransform: 'uppercase',
                        margin: 0,
                    }}
                >
                    {label}
                </p>
            )}
        </div>
    );
};

export default LoadingScreen;
