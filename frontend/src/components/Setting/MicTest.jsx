import React, { useState } from 'react';
import '../../../src/Styles/Setting/MicTest.css'; // Import the external CSS

const MicTest = () => {
    const [isTesting, setIsTesting] = useState(false);

    const handleTestClick = () => {
        setIsTesting(!isTesting);
        // Add logic to start/stop mic test
    };

    return (

        <div className="mic-test-container">
            
            <div
                className="test-button"
                onClick={handleTestClick}
            >
                {isTesting ? '  Stop Test  ' : 'Let\'s check'}
            </div>
            <div className="mic-bars">
                {[...Array(54)].map((_, index) => (
                    <div
                        key={index}
                        className={`mic-bar ${isTesting ? 'active' : ''}`}
                    />
                ))}
            </div>
            <div>
                {/* Optional: Add other elements if needed */}
            </div>
        </div>
    );
};

export default MicTest;
