import React, { useEffect, useState } from 'react';

const PastTranscriptions = () => {
    const [transcriptions, setTranscriptions] = useState([]);

    useEffect(() => {
        const storedTranscriptions = JSON.parse(localStorage.getItem('transcriptions')) || [];
        setTranscriptions(storedTranscriptions);
    }, []);

    const clearTranscriptions = () => {
        localStorage.removeItem('transcriptions');
        setTranscriptions([]);
    };

    return (
        <div className="mt-8">
            <h2 className="font-bold text-lg">Past Transcriptions</h2>
            <button
                onClick={clearTranscriptions}
                className="mt-2 p-2 bg-red-500 text-white rounded"
            >
                Clear All Transcriptions
            </button>
            <ul className="list-disc pl-5 mt-2">
                {transcriptions.length > 0 ? (
                    transcriptions.map((transcription, index) => (
                        <li key={index} className="mb-2">{transcription}</li>
                    ))
                ) : (
                    <li>No past transcriptions available.</li>
                )}
            </ul>
        </div>
    );
};

export default PastTranscriptions;
