import React, { useState, useEffect } from 'react';

const Microphone = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [transcript, setTranscript] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    // Request microphone access when the component mounts
    const initMediaRecorder = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        const recorder = new MediaRecorder(stream);
        setMediaRecorder(recorder);
      } catch (err) {
        console.error("Error accessing microphone:", err);
        setError("Unable to access the microphone. Please check your permissions.");
      }
    };

    initMediaRecorder();
  }, []);

  const startRecording = () => {
    if (mediaRecorder) {
      setIsRecording(true);
      mediaRecorder.start();

      mediaRecorder.ondataavailable = async (event) => {
        if (event.data.size > 0) {
          // Send the audio data to the backend for transcription
          const formData = new FormData();
          formData.append('audio', event.data, 'recording.wav');
          
          try {
            const response = await fetch('http://localhost:8000/transcribe', {
              method: 'POST',
              body: formData,
            });
            const result = await response.json();
            if (response.ok) {
              setTranscript(result.transcription);
            } else {
              setError(result.error || 'Transcription failed.');
            }
          } catch (error) {
            console.error("Error during transcription:", error);
            setError('An error occurred while transcribing audio.');
          }
        }
      };

      mediaRecorder.onstop = () => {
        setIsRecording(false);
      };
    }
  };

  const stopRecording = () => {
    if (mediaRecorder && isRecording) {
      mediaRecorder.stop();
    }
  };

  return (
    <div className="microphone-component">
      <h2>Audio Transcription</h2>
      <button onClick={isRecording ? stopRecording : startRecording}>
        {isRecording ? 'Stop Recording' : 'Start Recording'}
      </button>
      {isRecording && <p>Recording...</p>}
      {transcript && (
        <div>
          <h3>Transcription:</h3>
          <p>{transcript}</p>
        </div>
      )}
      {error && <p className="error">{error}</p>}
    </div>
  );
};

export default Microphone;
