import pymupdf
import re
import json


PDF_PATH = "data/input/ZIMSEC_Mathematics_2014_2020.pdf"
OUTPUT_PATH = "data/output/detected_papers.json"


def normalize_text(text):
    text = text.replace("\n", " ")
    text = re.sub(r"\s+", " ", text)
    return text.strip()


def detect_metadata(text):
    """
    Detect year, session and paper number from a page.
    """

    # Detect year
    year_match = re.search(
        r"\b(2014|2015|2016|2017|2018|2019|2020)\b",
        text
    )

    year = int(year_match.group(1)) if year_match else None

    # Detect session
    session = None

    if re.search(r"\bJUNE\b", text, re.IGNORECASE):
        session = "june"

    elif re.search(r"\bNOVEMBER\b", text, re.IGNORECASE):
        session = "november"

    # Detect paper number
    paper_match = re.search(
        r"\bPAPER\s*([12])\b",
        text,
        re.IGNORECASE
    )

    paper = int(paper_match.group(1)) if paper_match else None

    # Detect paper code
    code_match = re.search(
        r"\b4008\s*/\s*([12])\b",
        text,
        re.IGNORECASE
    )

    if not code_match:
        code_match = re.search(
            r"\b4004\s*/\s*([12])\b",
            text,
            re.IGNORECASE
        )

    paper_code = None

    if code_match:
        paper_code = code_match.group(0).replace(" ", "")

    return {
        "year": year,
        "session": session,
        "paper": paper,
        "paper_code": paper_code
    }


def is_new_paper(metadata):
    """
    A page is considered a paper-start page when
    year + session + paper are detected.
    """

    return (
        metadata["year"] is not None
        and metadata["session"] is not None
        and metadata["paper"] is not None
    )


def detect_papers(pdf_path):

    document = pymupdf.open(pdf_path)

    papers = []

    current_paper = None

    print(f"Total pages: {len(document)}")
    print("\nDetecting examination papers...\n")

    for page_number, page in enumerate(document, start=1):

        raw_text = page.get_text("text")
        text = normalize_text(raw_text)

        metadata = detect_metadata(text)

        # Check whether this page starts a new paper
        if is_new_paper(metadata):

            # If another paper is currently open,
            # close it before starting the new one.
            if current_paper is not None:

                current_paper["end_page"] = page_number - 1

                papers.append(current_paper)

            # Start new paper
            current_paper = {
                "year": metadata["year"],
                "session": metadata["session"],
                "paper": metadata["paper"],
                "paper_code": metadata["paper_code"],
                "start_page": page_number,
                "end_page": None
            }

            print(
                f"FOUND: "
                f"{metadata['year']} "
                f"{metadata['session'].upper()} "
                f"Paper {metadata['paper']} "
                f"at PDF page {page_number}"
            )

    # Close final paper
    if current_paper is not None:

        current_paper["end_page"] = len(document)

        papers.append(current_paper)

    document.close()

    return papers


def save_results(papers):

    with open(
        OUTPUT_PATH,
        "w",
        encoding="utf-8"
    ) as file:

        json.dump(
            papers,
            file,
            indent=4,
            ensure_ascii=False
        )

    print("\n")
    print("=" * 80)
    print(f"Detected {len(papers)} papers")
    print(f"Saved to: {OUTPUT_PATH}")
    print("=" * 80)


if __name__ == "__main__":

    papers = detect_papers(PDF_PATH)

    save_results(papers)

    print("\nDetected papers:\n")

    for paper in papers:

        print(
            f"{paper['year']} "
            f"{paper['session'].upper()} "
            f"Paper {paper['paper']} "
            f"| Pages "
            f"{paper['start_page']}-{paper['end_page']}"
        )