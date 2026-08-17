import pymupdf
import re


PDF_PATH = "data/input/ZIMSEC_Mathematics_2014_2020.pdf"


def normalize_text(text):
    text = text.replace("\n", " ")
    text = re.sub(r"\s+", " ", text)
    return text.strip()


def inspect_exam_markers(pdf_path):
    document = pymupdf.open(pdf_path)

    print(f"Total pages: {len(document)}")
    print("\nSearching for examination markers...\n")

    for page_number, page in enumerate(document, start=1):

        raw_text = page.get_text("text")
        text = normalize_text(raw_text)

        years = re.findall(
            r"\b(2014|2015|2016|2017|2018|2019|2020)\b",
            text
        )

        paper_numbers = re.findall(
            r"\bPAPER\s*([12])\b",
            text,
            re.IGNORECASE
        )

        sessions = []

        if re.search(r"\bJUNE\b", text, re.IGNORECASE):
            sessions.append("JUNE")

        if re.search(r"\bNOVEMBER\b", text, re.IGNORECASE):
            sessions.append("NOVEMBER")

        paper_codes = re.findall(
            r"\b4008\s*/\s*[12]\b",
            text,
            re.IGNORECASE
        )

        if years or paper_numbers or sessions or paper_codes:

            print("=" * 80)
            print(f"PAGE {page_number}")

            if years:
                print(f"Years: {sorted(set(years))}")

            if sessions:
                print(f"Sessions: {sessions}")

            if paper_numbers:
                print(f"Papers: {sorted(set(paper_numbers))}")

            if paper_codes:
                print(f"Paper codes: {sorted(set(paper_codes))}")

            print("\nText preview:")
            print(text[:500])

    document.close()


if __name__ == "__main__":
    inspect_exam_markers(PDF_PATH)