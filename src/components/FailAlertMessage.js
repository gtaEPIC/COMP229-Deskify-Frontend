// FailAlertMessage.js
import React, { useState, useEffect } from 'react';
import '../alertMessage.css';

function FailAlertMessage({ message, visible, handleDismiss }) {
    useEffect(() => {
        const timer = setTimeout(() => {
            handleDismiss();
        }, 4000);

        return () => {
            clearTimeout(timer);
        };
    }, [visible, handleDismiss]);

    console.log('Rendering FailAlertMessage:', visible);

    return (
        <>
            {visible && (
                <div className="alert alert-danger alert-dismissible fade show">
                    <button type="button" className="btn-close" onClick={handleDismiss}></button>
                    <strong>Fail - </strong> {message}
                </div>
            )}
        </>
    );
}

export default FailAlertMessage;
