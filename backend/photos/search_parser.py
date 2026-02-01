import re
import calendar

MONTHS = {m.lower(): i for i, m in enumerate(calendar.month_name) if m}
MONTHS.update({m.lower(): i for i, m in enumerate(calendar.month_abbr) if m})


def parse_search_query(text):
    text = text.lower()

    filters = {
        "year": None,
        "month": None,
        "camera": None,
        "city": None,
        "keywords": [],
    }

    # 📅 Year (e.g. 2018)
    year_match = re.search(r"\b(19|20)\d{2}\b", text)
    if year_match:
        filters["year"] = int(year_match.group())

    # 📆 Month (February, Feb)
    for name, num in MONTHS.items():
        if name in text:
            filters["month"] = num
            break

    # 📷 Camera keywords
    CAMERAS = ["canon", "nikon", "sony", "iphone", "samsung", "pixel"]
    for cam in CAMERAS:
        if cam in text:
            filters["camera"] = cam
            break

    # 📍 City (simple heuristic: word after "in")
    city_match = re.search(r"in\s+([a-z\s]+)", text)
    if city_match:
        filters["city"] = city_match.group(1).strip().title()

    # 🏷 Remaining keywords
    used_words = set()
    if filters["camera"]:
        used_words.add(filters["camera"])
    if filters["year"]:
        used_words.add(str(filters["year"]))

    filters["keywords"] = [
        w for w in text.split()
        if w not in used_words and len(w) > 2
    ]

    return filters
