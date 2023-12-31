import React, { useEffect } from 'react';

function FailAlertMessage({ message, visible, handleDismiss, timeout }) {
    useEffect(() => {
        if (timeout) {
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
                    <button style={{ height: '2px', width: '2px' }} type="button" className="btn-close" onClick={handleDismiss}></button>
                    <strong>Fail - </strong> {message}
                </div>
            )}
        </>
    );
}

export default FailAlertMessage;
