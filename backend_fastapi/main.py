from fastapi import FastAPI, UploadFile, File, HTTPException
from pydantic import BaseModel
import io
from resume_parser import parse_resume_text

app = FastAPI()


# Define the response model for the parser
class ParseResult(BaseModel):
    name: str
    email: str
    phone: str
    summary: str
    education: list[str]
    skills: list[str]
    experience: list[str]
    projects: list[str]
    achievements: list[str]


@app.post("/parse", response_model=ParseResult)
async def parse_resume(file: UploadFile = File(...)):
    """
    Endpoint to parse the resume.
    Accepts a file (PDF or text) and returns parsed fields.
    """
    try:
        contents = await file.read()
        # If the file is a PDF, extract text using PyPDF2
        if file.filename.lower().endswith(".pdf"):
            from PyPDF2 import PdfReader
            reader = PdfReader(io.BytesIO(contents))
            text = ""
            for page in reader.pages:
                extracted = page.extract_text()
                if extracted:
                    text += extracted + "\n"
        else:
            # Assume text-based file
            text = contents.decode("utf-8")

        # Use our resume parsing algorithm
        result = parse_resume_text(text)
        return result

    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Could not process the resume file: {e}")


# To run the app, use:
# uvicorn main:app --reload
