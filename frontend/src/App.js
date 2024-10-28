import React from 'react';
import Microphone from './Microphone';
import PastTranscriptions from './PastTranscriptions';

const App = () => {
    return (
        <div className="app-container p-4">
            <h1 className="text-2xl font-bold">Audio Transcription App</h1>
            <Microphone />
            <PastTranscriptions />
        </div>
    );
};

export default App;
