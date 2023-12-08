import React, { useState, useEffect } from 'react';
import './alertMessage.css';

function SuccessAlertMessage() {
    const [visible, setVisible] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setVisible(false);
        }, 4000);

        return () => {
            clearTimeout(timer);
        };
    }, []);

    const handleDismiss = () => {
        setVisible(false);
    };

    return (
        <>
            {visible && (
                <div className="alert alert-success alert-dismissible fade show" style={{ margin: "0px", borderRadius: "0px" }}>
                    <button type="button" className="btn-close" onClick={handleDismiss}></button>
                    <strong>Success!</strong> You have logged into your account!
                </div>
            )}
        </>
    );
}

export default SuccessAlertMessage;
