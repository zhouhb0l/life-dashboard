from __future__ import annotations

import argparse
import html
import json
import re
import webbrowser
from dataclasses import dataclass
from pathlib import Path

from deep_translator import GoogleTranslator, MyMemoryTranslator
from pypinyin import Style, pinyin


ROOT = Path(__file__).resolve().parent
DEFAULT_INPUT = ROOT / "dictation_items.txt"
OUTPUT_DIR = ROOT / "output"
CACHE_FILE = ROOT / ".translation_cache.json"


@dataclass
class RawItem:
    text: str
    explicit_translation: str = ""


@dataclass
class DictationItem:
    text: str
    pinyin_text: str
    translation: str


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(
        description="Generate printable Chinese dictation worksheet and answer sheet."
    )
    parser.add_argument(
        "--input",
        default=str(DEFAULT_INPUT),
        help="Path to the input text file.",
    )
    parser.add_argument(
        "--title",
        default="",
        help="Optional worksheet title. Overrides title: in the input file.",
    )
    parser.add_argument(
        "--open",
        action="store_true",
        help="Open the generated worksheet and answer sheet in your browser.",
    )
    return parser.parse_args()


def parse_input_text(input_text: str) -> tuple[str, list[RawItem]]:
    title = "Chinese Dictation"
    items: list[RawItem] = []

    for raw_line in input_text.splitlines():
        line = raw_line.strip()
        if not line or line.startswith("#"):
            continue

        if line.lower().startswith("title:"):
            candidate = line.split(":", 1)[1].strip()
            if candidate:
                title = candidate
            continue

        text = line
        explicit_translation = ""
        if "|" in line:
            text, explicit_translation = [part.strip() for part in line.split("|", 1)]

        if text:
            items.append(RawItem(text=text, explicit_translation=explicit_translation))

    if not items:
        raise ValueError("No Chinese dictation items were found in the input text.")

    return title, items


def load_items(input_path: Path) -> tuple[str, list[RawItem]]:
    if not input_path.exists():
        raise FileNotFoundError(f"Input file not found: {input_path}")

    return parse_input_text(input_path.read_text(encoding="utf-8"))


def load_cache() -> dict[str, str]:
    if not CACHE_FILE.exists():
        return {}

    try:
        return json.loads(CACHE_FILE.read_text(encoding="utf-8"))
    except json.JSONDecodeError:
        return {}


def save_cache(cache: dict[str, str]) -> None:
    CACHE_FILE.write_text(
        json.dumps(cache, ensure_ascii=False, indent=2),
        encoding="utf-8",
    )


def format_pinyin(text: str) -> str:
    syllables = [chunk[0] for chunk in pinyin(text, style=Style.TONE, errors="keep")]
    rendered = " ".join(syllables)
    rendered = re.sub(r"\s+([,.;:!?])", r"\1", rendered)
    rendered = re.sub(r"\s+([\uFF0C\u3002\uFF01\uFF1F\uFF1B\uFF1A\u3001])", r"\1", rendered)
    rendered = re.sub(r"([(\[{])\s+", r"\1", rendered)
    rendered = re.sub(r"\s+([)\]}])", r"\1", rendered)
    return rendered.strip()


def translate_text(text: str, cache: dict[str, str]) -> str:
    if text in cache:
        return cache[text]

    translators = (
        GoogleTranslator(source="zh-CN", target="en"),
        MyMemoryTranslator(source="zh-CN", target="en-US"),
    )

    for translator in translators:
        try:
            translated = translator.translate(text).strip()
        except Exception:
            continue

        if translated:
            cache[text] = translated
            return translated

    fallback = "[Translation unavailable]"
    cache[text] = fallback
    return fallback


def is_chinese_character(char: str) -> bool:
    code_point = ord(char)
    return (
        0x3400 <= code_point <= 0x4DBF
        or 0x4E00 <= code_point <= 0x9FFF
        or 0xF900 <= code_point <= 0xFAFF
    )


def chinese_character_count(text: str) -> int:
    return sum(1 for char in text if is_chinese_character(char))


def blank_box_count(text: str) -> int:
    base_count = chinese_character_count(text)
    if base_count <= 4:
        return 10
    if base_count <= 8:
        return 14
    return min(base_count + 6, 24)


def box_markup(count: int) -> str:
    return "".join('<span class="write-box" aria-hidden="true"></span>' for _ in range(count))


def item_markup(index: int, item: DictationItem, answer_mode: bool) -> str:
    answer_block = (
        f'<div class="answer-text">{html.escape(item.text)}</div>'
        if answer_mode
        else f'<div class="write-grid">{box_markup(blank_box_count(item.text))}</div>'
    )

    return f"""
    <section class="entry">
      <div class="entry-head">
        <div class="entry-number">{index}.</div>
        <div class="entry-meta">
          <div class="pinyin">{html.escape(item.pinyin_text)}</div>
          <div class="translation">{html.escape(item.translation)}</div>
        </div>
      </div>
      {answer_block}
    </section>
    """


def build_html(title: str, items: list[DictationItem], answer_mode: bool) -> str:
    sheet_label = "Answer Sheet" if answer_mode else "Student Worksheet"
    rendered_items = "\n".join(
        item_markup(index, item, answer_mode) for index, item in enumerate(items, start=1)
    )

    return f"""<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>{html.escape(title)} - {sheet_label}</title>
  <style>
    @page {{
      size: A4;
      margin: 16mm;
    }}

    * {{
      box-sizing: border-box;
    }}

    body {{
      margin: 0;
      font-family: "Segoe UI", Arial, sans-serif;
      color: #1f2933;
      background: #ffffff;
    }}

    .page {{
      max-width: 820px;
      margin: 0 auto;
      padding: 18px 20px 28px;
    }}

    .page-header {{
      border-bottom: 2px solid #111827;
      padding-bottom: 12px;
      margin-bottom: 18px;
    }}

    .title {{
      margin: 0;
      font-size: 28px;
      line-height: 1.2;
      font-weight: 700;
    }}

    .subtitle {{
      margin-top: 6px;
      font-size: 16px;
      color: #52606d;
    }}

    .entry {{
      padding: 14px 0 18px;
      border-bottom: 1px solid #d9e2ec;
      page-break-inside: avoid;
    }}

    .entry:last-child {{
      border-bottom: 0;
      padding-bottom: 0;
    }}

    .entry-head {{
      display: flex;
      gap: 14px;
      align-items: flex-start;
      margin-bottom: 12px;
    }}

    .entry-number {{
      width: 34px;
      font-size: 20px;
      font-weight: 700;
      line-height: 1.4;
      flex: 0 0 auto;
    }}

    .entry-meta {{
      min-width: 0;
      flex: 1;
    }}

    .pinyin {{
      font-size: 23px;
      line-height: 1.35;
      font-weight: 600;
      color: #102a43;
    }}

    .translation {{
      margin-top: 4px;
      font-size: 17px;
      line-height: 1.45;
      color: #486581;
    }}

    .write-grid {{
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
      padding-left: 48px;
      min-height: 86px;
    }}

    .write-box {{
      width: 52px;
      height: 52px;
      border: 1.5px solid #9fb3c8;
      border-radius: 4px;
      background:
        linear-gradient(to right, transparent 49%, #d9e2ec 49%, #d9e2ec 51%, transparent 51%),
        linear-gradient(to bottom, transparent 49%, #d9e2ec 49%, #d9e2ec 51%, transparent 51%);
    }}

    .answer-text {{
      padding-left: 48px;
      font-size: 34px;
      line-height: 1.35;
      font-weight: 700;
      letter-spacing: 0;
      color: #111827;
      font-family: "Microsoft YaHei", "PingFang SC", "Noto Sans SC", sans-serif;
    }}

    @media print {{
      .page {{
        max-width: none;
        padding: 0;
      }}
    }}
  </style>
</head>
<body>
  <main class="page">
    <header class="page-header">
      <h1 class="title">{html.escape(title)}</h1>
      <div class="subtitle">{sheet_label}</div>
    </header>
    {rendered_items}
  </main>
</body>
</html>
"""


def build_items(raw_items: list[RawItem]) -> list[DictationItem]:
    cache = load_cache()
    items: list[DictationItem] = []

    for raw_item in raw_items:
        translation = raw_item.explicit_translation or translate_text(raw_item.text, cache)
        items.append(
            DictationItem(
                text=raw_item.text,
                pinyin_text=format_pinyin(raw_item.text),
                translation=translation,
            )
        )

    save_cache(cache)
    return items


def write_input_file(title: str, raw_text: str, input_path: Path = DEFAULT_INPUT) -> Path:
    lines = [f"title: {title.strip() or 'Chinese Dictation'}", ""]
    stripped = raw_text.strip()
    if stripped:
        lines.append(stripped)
    input_path.write_text("\n".join(lines) + "\n", encoding="utf-8")
    return input_path


def generate_from_text(title: str, raw_text: str) -> tuple[Path, Path, Path]:
    input_path = write_input_file(title, raw_text)
    title_from_input, raw_items = parse_input_text(input_path.read_text(encoding="utf-8"))
    return generate_outputs(title_from_input, raw_items, input_path=input_path)


def generate_outputs(
    title: str,
    raw_items: list[RawItem],
    input_path: Path | None = None,
) -> tuple[Path, Path, Path]:
    items = build_items(raw_items)
    OUTPUT_DIR.mkdir(exist_ok=True)

    worksheet_html = build_html(title, items, answer_mode=False)
    answers_html = build_html(title, items, answer_mode=True)

    worksheet_path = OUTPUT_DIR / "worksheet.html"
    answers_path = OUTPUT_DIR / "answer_sheet.html"

    worksheet_path.write_text(worksheet_html, encoding="utf-8")
    answers_path.write_text(answers_html, encoding="utf-8")

    return (
        input_path or DEFAULT_INPUT,
        worksheet_path,
        answers_path,
    )


def open_in_browser(*paths: Path) -> None:
    for path in paths:
        webbrowser.open(path.resolve().as_uri())


def main() -> None:
    args = parse_args()
    input_path = Path(args.input).resolve()

    title, raw_items = load_items(input_path)
    if args.title.strip():
        title = args.title.strip()

    saved_input_path, worksheet_path, answers_path = generate_outputs(
        title,
        raw_items,
        input_path=input_path,
    )

    print(f"Input: {saved_input_path}")
    print(f"Created: {worksheet_path}")
    print(f"Created: {answers_path}")

    if args.open:
        open_in_browser(worksheet_path, answers_path)


if __name__ == "__main__":
    main()
