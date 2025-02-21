import React from 'react';

const AlertComponent = ({ type, message }) => {
    const alertStyles = {
        success: 'bg-green-100 text-green-800 border-green-300',
        error: 'bg-red-100 text-red-800 border-red-300',
        warning: 'bg-yellow-100 text-yellow-800 border-yellow-300',
        info: 'bg-blue-100 text-blue-800 border-blue-300',
    };

    return (
        <div className={`border-l-4 p-3 mb-4 ${alertStyles[type]} rounded-md`}>
            <div className="flex items-center">
                <svg
                    className="w-5 h-5 mr-2"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    {/* SVG path for the icon */}
                </svg>
                <span className="text-sm">{message}</span>
            </div>
        </div>
    );
};

export default AlertComponent; 