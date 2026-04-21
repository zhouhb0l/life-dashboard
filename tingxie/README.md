# Chinese Dictation Generator

You now have two ways to use this project.

## Quick App

Double-click `open_dictation_app.bat`.

That opens a small desktop window where you can:

- type or paste Chinese words and sentences
- set the worksheet title
- click `Generate Sheets`
- automatically open the student worksheet and answer sheet

The app also saves your latest input into `dictation_items.txt`.

## Text File Mode

Put your Chinese dictation items into `dictation_items.txt`, one item per line.

You can also set a title on the first line:

```text
title: Primary Chinese Dictation
学校
老师
今天很热。
```

Optional custom translation:

```text
请坐下。 | Please sit down.
```

Then run:

```powershell
.venv\Scripts\python generate_dictation.py --open
```

Or double-click `generate_dictation.bat`.

## Output Files

- `output/worksheet.html` for students
- `output/answer_sheet.html` for teachers

Both files are ready to print from the browser.
