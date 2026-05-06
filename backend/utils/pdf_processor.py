import PyPDF2
import io

def extract_text_from_pdf(pdf_file):
    """
    Extracts text from a PDF file object.
    """
    text = ""
    try:
        reader = PyPDF2.PdfReader(io.BytesIO(pdf_file))
        for page_num in range(len(reader.pages)):
            page = reader.pages[page_num]
            text += page.extract_text()
    except Exception as e:
        print(f"Error extracting text from PDF: {e}")
    return text
