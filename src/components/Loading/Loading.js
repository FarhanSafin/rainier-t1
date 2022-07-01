import React from 'react';

const Loading = () => {
    return (
        <span className="flex h-3 w-3 mx-auto mt-40 mb-40">
            <span className="animate-ping absolute inline-flex h-10 w-10 rounded-full  opacity-75 bg-teal-400"></span>
        </span>
    );
};

export default Loading;