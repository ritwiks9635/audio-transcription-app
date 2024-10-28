# backend/transcriber.py

import os
import asyncio
import nest_asyncio
from deepgram import DeepgramClient, PrerecordedOptions
from dotenv import load_dotenv

# Apply nest_asyncio to handle nested event loops
nest_asyncio.apply()

# Load Deepgram API key
load_dotenv("api_key.env")
DEEPGRAM_API_KEY = os.getenv("DEEPGRAM_API_KEY")
deepgram = DeepgramClient(DEEPGRAM_API_KEY)

async def transcribe_audio(file):
    try:
        # Configure transcription options
        options = PrerecordedOptions(
            punctuate=True,
            language="en"
        )

        # Read audio file data
        payload = {"buffer": file.read()}

        # Send the file to Deepgram for transcription
        response = deepgram.listen.rest.v("1").transcribe_file(payload, options, timeout=300)

        # Extract the transcript from the response
        transcript = response.results.channels[0].alternatives[0].transcript
        return transcript
    except Exception as e:
        print("Error during transcription:", e)
        return None
