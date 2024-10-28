
import os
import asyncio
from fastapi import FastAPI, UploadFile, HTTPException
from dotenv import load_dotenv
from transcriber import transcribe_audio  # Import the transcribe function

# Load Deepgram API key from .env file
load_dotenv("api_key.env")

# Initialize the FastAPI app
app = FastAPI()

@app.post("/transcribe")
async def transcribe_endpoint(file: UploadFile):
    try:
        # Check if uploaded file is audio
        if not file.content_type.startswith("audio"):
            raise HTTPException(status_code=400, detail="Invalid file type. Please upload an audio file.")
        
        # Save uploaded audio to a temporary file
        audio_path = "temp_audio.mp3"  # or other supported format
        with open(audio_path, "wb") as audio_file:
            audio_file.write(await file.read())

        # Call the transcribe_audio function from transcriber.py
        transcript = await transcribe_audio(audio_path)

        # Delete the temporary audio file
        os.remove(audio_path)

        # Return the transcription result
        return {"transcription": transcript}
    except Exception as e:
        print("Error during transcription:", e)
        raise HTTPException(status_code=500, detail="Error during transcription.")
