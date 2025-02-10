# import re
# from transformers import pipeline
# import nltk

# # Download required NLTK data
# nltk.download("punkt")

# # Initialize pipelines from Hugging Face
# # 1. Named Entity Recognition (NER) to help identify candidate names and other entities.
# ner_pipeline = pipeline("ner", model="dslim/bert-base-NER", aggregation_strategy="simple")
# # 2. Summarization to condense long sections (like a verbose summary).
# summarization_pipeline = pipeline("summarization", model="facebook/bart-large-cnn")
# # 3. Question Answering (QA) to extract detailed information (e.g. education background) from specific sections.
# qa_pipeline = pipeline("question-answering", model="distilbert-base-cased-distilled-squad")


# def extract_email(text: str) -> str:
#     """Extract email using a regex pattern."""
#     email_pattern = r'[\w\.-]+@[\w\.-]+'
#     match = re.search(email_pattern, text)
#     return match.group(0) if match else ""


# def extract_phone(text: str) -> str:
#     """Extract phone number using a regex pattern (supports country code and dashes/spaces)."""
#     phone_pattern = r'(\+?\d[\d\-\s]{7,}\d)'
#     match = re.search(phone_pattern, text)
#     return match.group(0) if match else ""


# def extract_name(text: str) -> str:
#     """
#     Extract a candidate's name using the NER pipeline.
#     If no PERSON entity is found, fall back to assuming the first line contains the name.
#     """
#     entities = ner_pipeline(text)
#     # Collect all entities tagged as PERSON
#     names = [entity["word"] for entity in entities if entity["entity_group"] == "PER"]
#     if names:
#         return names[0]
#     # Fallback: assume the first non-empty line is the candidate's name.
#     first_line = text.strip().split("\n")[0]
#     return first_line.strip()


# def extract_section(text: str, section_title: str, next_section_titles: list) -> str:
#     """
#     Generic helper to extract a section from the resume.
#     It finds the text after the given section_title and stops at the first occurrence of any next section.
#     """
#     start_index = text.find(section_title)
#     if start_index == -1:
#         return ""
#     # Get text after the section title.
#     section_text = text[start_index + len(section_title):]
#     # Look for the earliest index of any subsequent section.
#     indices = [section_text.find(title) for title in next_section_titles if section_text.find(title) != -1]
#     if indices:
#         end_index = min(indices)
#         section_text = section_text[:end_index]
#     return section_text.strip(" :\n")


# def extract_summary(text: str) -> str:
#     """
#     Extract the summary section and, if it is too verbose,
#     use a summarization model to generate a concise summary.
#     """
#     summary_text = extract_section(text, "Summary", ["Education", "Experience", "Projects", "Achievements", "Skills"])
#     if summary_text:
#         # If the extracted summary is long, generate a concise summary.
#         if len(summary_text.split()) > 100:
#             summarized = summarization_pipeline(summary_text, max_length=100, min_length=30, do_sample=False)
#             return summarized[0]['summary_text']
#         return summary_text
#     return ""


# def extract_education(text: str) -> list:
#     """
#     Extract education details.
#     First, extract the education section, then use a QA pipeline to ask for education details.
#     If the QA model returns a high-confidence answer, include it; otherwise, fall back to heuristic extraction.
#     """
#     education_section = extract_section(text, "Education", ["Experience", "Projects", "Achievements", "Skills", "Summary"])
#     education_list = []
#     if education_section:
#         # Use QA to ask a specific question on the education section.
#         qa_input = {
#             "question": "What is the candidate's education background?",
#             "context": education_section
#         }
#         try:
#             answer = qa_pipeline(qa_input)
#             if answer and answer.get('score', 0) > 0.3:
#                 education_list.append(answer['answer'])
#         except Exception as e:
#             pass
#         # Fallback: use line heuristics if QA did not return a strong result.
#         if not education_list:
#             lines = education_section.splitlines()
#             for line in lines:
#                 if any(keyword in line for keyword in ["Bachelor", "Diploma", "High School", "School", "College", "Institute"]):
#                     education_list.append(line.strip())
#     return list(set(education_list))


# def extract_skills(text: str) -> list:
#     """
#     Extract skills from the 'Skills Summary' section.
#     Assumes that skills may be listed after a colon or separated by commas.
#     """
#     skills_section = extract_section(text, "Skills Summary", ["Experience", "Projects", "Achievements", "Education", "Summary"])
#     skills = []
#     if skills_section:
#         lines = skills_section.splitlines()
#         for line in lines:
#             if ':' in line:
#                 _, skill_list = line.split(":", 1)
#                 skills.extend([s.strip() for s in skill_list.split(",") if s.strip()])
#             else:
#                 skills.extend([s.strip() for s in line.split(",") if s.strip()])
#     return list(set(skills))


# def extract_experience(text: str) -> list:
#     """
#     Extract experience details from the 'Experience' section.
#     This function uses simple heuristics such as checking for month abbreviations.
#     """
#     experience_section = extract_section(text, "Experience", ["Projects", "Achievements", "Education", "Skills", "Summary"])
#     experience_list = []
#     lines = experience_section.splitlines()
#     for line in lines:
#         if line.strip() and any(month in line for month in ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]):
#             experience_list.append(line.strip())
#     return experience_list


# def extract_projects(text: str) -> list:
#     """
#     Extract project details from the 'Projects' section.
#     Collects each non-empty line following the section header.
#     """
#     projects_section = extract_section(text, "Projects", ["Experience", "Achievements", "Education", "Skills", "Summary"])
#     projects_list = [line.strip() for line in projects_section.splitlines() if line.strip()]
#     return projects_list


# def extract_achievements(text: str) -> list:
#     """
#     Extract achievements from the 'Achievements' section.
#     """
#     achievements_section = extract_section(text, "Achievements", ["Experience", "Projects", "Education", "Skills", "Summary"])
#     achievements_list = [line.strip() for line in achievements_section.splitlines() if line.strip()]
#     return achievements_list


# def parse_resume_text(text: str) -> dict:
#     """
#     Main function to parse resume text into structured fields.
#     Combines regex methods and multiple deep learning pipelines to extract key resume information.
#     """
#     result = {
#         "name": extract_name(text),
#         "email": extract_email(text),
#         "phone": extract_phone(text),
#         "summary": extract_summary(text),
#         "education": extract_education(text),
#         "skills": extract_skills(text),
#         "experience": extract_experience(text),
#         "projects": extract_projects(text),
#         "achievements": extract_achievements(text),
#     }
#     return result



import re
from transformers import pipeline
import nltk
import spacy

# Download required NLTK data
nltk.download("punkt")

# Initialize Hugging Face pipelines
ner_pipeline = pipeline("ner", model="dslim/bert-base-NER", aggregation_strategy="simple")
summarization_pipeline = pipeline("summarization", model="facebook/bart-large-cnn")
qa_pipeline = pipeline("question-answering", model="distilbert-base-cased-distilled-squad")

# Optionally, initialize spaCy for a secondary NER (if you fine-tune it on resume data, that can be very useful)
try:
    nlp = spacy.load("en_core_web_sm")
except OSError:
    # Download spaCy model if not present
    from spacy.cli import download
    download("en_core_web_sm")
    nlp = spacy.load("en_core_web_sm")


def extract_email(text: str) -> str:
    """Extract email using an improved regex pattern."""
    email_pattern = r'[\w\.-]+@[\w\.-]+\.\w+'
    match = re.search(email_pattern, text)
    return match.group(0) if match else ""


def extract_phone(text: str) -> str:
    """Extract phone number using a refined regex pattern."""
    phone_pattern = r'(\+?\d{1,3}[\s\-]?)?(\(?\d{3}\)?[\s\-]?)?\d{3}[\s\-]?\d{4}'
    match = re.search(phone_pattern, text)
    return match.group(0) if match else ""


def extract_name(text: str) -> str:
    """
    Extract a candidate's name using both Hugging Face NER and spaCy for ensemble results.
    Fallback to the first non-empty line if no confident extraction is found.
    """
    names = []

    # Using Hugging Face pipeline
    hf_entities = ner_pipeline(text)
    names.extend([entity["word"] for entity in hf_entities if entity["entity_group"] == "PER"])

    # Using spaCy as a secondary check
    doc = nlp(text)
    names.extend([ent.text for ent in doc.ents if ent.label_ == "PERSON"])

    # Return the most common name if available
    if names:
        # Simple heuristic: choose the longest name (could be adjusted)
        return max(names, key=len)
    return text.strip().split("\n")[0].strip()


def extract_section(text: str, section_title: str, next_section_titles: list) -> str:
    """
    Extract a section from the resume based on headers.
    """
    start_index = text.find(section_title)
    if start_index == -1:
        return ""
    section_text = text[start_index + len(section_title):]
    # Find the first occurrence of any next section title
    end_indices = [section_text.find(title) for title in next_section_titles if section_text.find(title) != -1]
    if end_indices:
        section_text = section_text[:min(end_indices)]
    return section_text.strip(" :\n")


def extract_summary(text: str) -> str:
    """
    Extract and optionally summarize the 'Summary' section.
    """
    summary_text = extract_section(text, "Summary", ["Education", "Experience", "Projects", "Achievements", "Skills"])
    if summary_text:
        # Use summarization if text is too verbose
        if len(summary_text.split()) > 100:
            try:
                summarized = summarization_pipeline(summary_text, max_length=100, min_length=30, do_sample=False)
                return summarized[0]['summary_text']
            except Exception as e:
                # If summarization fails, return original summary
                pass
        return summary_text
    return ""


def extract_education(text: str) -> list:
    """
    Extract education details using QA and heuristic methods.
    """
    education_section = extract_section(text, "Education", ["Experience", "Projects", "Achievements", "Skills", "Summary"])
    education_list = []
    if education_section:
        qa_input = {
            "question": "What is the candidate's education background?",
            "context": education_section
        }
        try:
            answer = qa_pipeline(qa_input)
            if answer and answer.get('score', 0) > 0.3:
                education_list.append(answer['answer'])
        except Exception:
            pass

        if not education_list:
            # Refined heuristics: split on newlines and check for degree-related keywords
            for line in education_section.splitlines():
                if any(keyword in line for keyword in ["Bachelor", "Master", "Diploma", "High School", "School", "College", "Institute", "PhD"]):
                    education_list.append(line.strip())
    return list(set(education_list))


def extract_skills(text: str) -> list:
    """
    Extract skills from the 'Skills Summary' section.
    """
    skills_section = extract_section(text, "Skills Summary", ["Experience", "Projects", "Achievements", "Education", "Summary"])
    skills = []
    if skills_section:
        for line in skills_section.splitlines():
            if ':' in line:
                _, skill_list = line.split(":", 1)
                skills.extend([s.strip() for s in skill_list.split(",") if s.strip()])
            else:
                skills.extend([s.strip() for s in line.split(",") if s.strip()])
    return list(set(skills))


def extract_experience(text: str) -> list:
    """
    Extract experience details using improved heuristics.
    """
    experience_section = extract_section(text, "Experience", ["Projects", "Achievements", "Education", "Skills", "Summary"])
    experience_list = []
    for line in experience_section.splitlines():
        if line.strip() and any(month in line for month in ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]):
            experience_list.append(line.strip())
    return experience_list


def extract_projects(text: str) -> list:
    """
    Extract project details.
    """
    projects_section = extract_section(text, "Projects", ["Experience", "Achievements", "Education", "Skills", "Summary"])
    return [line.strip() for line in projects_section.splitlines() if line.strip()]


def extract_achievements(text: str) -> list:
    """
    Extract achievements.
    """
    achievements_section = extract_section(text, "Achievements", ["Experience", "Projects", "Education", "Skills", "Summary"])
    return [line.strip() for line in achievements_section.splitlines() if line.strip()]


def parse_resume_text(text: str) -> dict:
    """
    Main function to parse resume text into structured fields.
    Combines regex, deep learning pipelines, and enhanced heuristics.
    """
    return {
        "name": extract_name(text),
        "email": extract_email(text),
        "phone": extract_phone(text),
        "summary": extract_summary(text),
        "education": extract_education(text),
        "skills": extract_skills(text),
        "experience": extract_experience(text),
        "projects": extract_projects(text),
        "achievements": extract_achievements(text),
    }


# Example usage:
if __name__ == "__main__":
    sample_resume = """
    Sudarshan Magar
    +91 8010411923 | magarsudarshan77@gmail.com
    LinkedIn | GitHub

    Summary
    A highly skilled MERN Stack and Flutter Developer with expertise in C++, React.js, Node.js, JavaScript, and Flutter.
    Experienced in both frontend and backend development.

    Education
    Smt. Kashibai Navale College of Engineering, Pune, India
    Bachelor of Engineering - Computer Engineering; CGPA: 9.11 (2023 - 2026)
    Government Polytechnic, Awasari, Pune, India
    Diploma in Information Technology; Percentage: 85.03% (2020 - 2023)

    Skills Summary
    Programming Languages: C++, Java, Python, PHP, JavaScript, TypeScript, Dart
    Frameworks: React.js, Node.js, Express.js, Redux, Flutter
    Databases: MySQL, MongoDB, PostgreSQL

    Experience
    LionelAgency Innovations Pvt. Ltd. - Backend Development Intern (Jan 2025 - Present)
    NPIT Solution Pvt. Ltd. - Full Stack Developer Intern (Jun 2022 - Aug 2022)

    Projects
    Basic Version Payment Web Application
    Amazon Clone

    Achievements
    Optimized backend development processes, leading to a 30% improvement in efficiency.
    """
    parsed = parse_resume_text(sample_resume)
    from pprint import pprint
    pprint(parsed)
