from docx import Document


def extract_docx(path: str) -> str:
    doc = Document(path)

    return "\n".join(
        paragraph.text
        for paragraph in doc.paragraphs
        if paragraph.text.strip()
    )