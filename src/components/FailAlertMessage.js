// FailAlertMessage.js
import React, { useEffect } from 'react';
import '../alertMessage.css';

function FailAlertMessage({ message, visible, handleDismiss, timeout }) {
    useEffect(() => {
        if (timeout) { // Allows the error to forever be displayed if timeout is not set
            const timer = setTimeout(() => {
                handleDismiss();
            }, timeout);

            return () => {
                clearTimeout(timer);
            };
        }
    }, [visible, handleDismiss, timeout]);

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
