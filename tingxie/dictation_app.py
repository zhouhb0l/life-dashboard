from __future__ import annotations

import threading
import tkinter as tk
from pathlib import Path
from tkinter import messagebox, ttk

from generate_dictation import (
    DEFAULT_INPUT,
    OUTPUT_DIR,
    generate_from_text,
    open_in_browser,
    parse_input_text,
)


class DictationApp:
    def __init__(self, root: tk.Tk) -> None:
        self.root = root
        self.root.title("Chinese Dictation Generator")
        self.root.geometry("920x700")
        self.root.minsize(760, 560)

        self.title_var = tk.StringVar(value="Chinese Dictation")
        self.status_var = tk.StringVar(value="Enter Chinese words or sentences, then click Generate.")
        self.generate_button: ttk.Button | None = None

        self.build_ui()
        self.load_existing_input()

    def build_ui(self) -> None:
        self.root.columnconfigure(0, weight=1)
        self.root.rowconfigure(0, weight=1)

        outer = ttk.Frame(self.root, padding=18)
        outer.grid(sticky="nsew")
        outer.columnconfigure(0, weight=1)
        outer.rowconfigure(2, weight=1)

        header = ttk.Frame(outer)
        header.grid(row=0, column=0, sticky="ew")
        header.columnconfigure(1, weight=1)

        ttk.Label(header, text="Worksheet Title").grid(row=0, column=0, sticky="w", padx=(0, 10))
        ttk.Entry(header, textvariable=self.title_var).grid(row=0, column=1, sticky="ew")

        ttk.Label(
            outer,
            text=(
                "One line = one dictation item. "
                "Optional custom translation: Chinese text | English translation"
            ),
            wraplength=820,
            justify="left",
        ).grid(row=1, column=0, sticky="w", pady=(10, 10))

        editor_frame = ttk.Frame(outer)
        editor_frame.grid(row=2, column=0, sticky="nsew")
        editor_frame.columnconfigure(0, weight=1)
        editor_frame.rowconfigure(0, weight=1)

        self.textbox = tk.Text(
            editor_frame,
            wrap="word",
            font=("Microsoft YaHei UI", 13),
            undo=True,
            padx=12,
            pady=12,
        )
        self.textbox.grid(row=0, column=0, sticky="nsew")

        scrollbar = ttk.Scrollbar(editor_frame, orient="vertical", command=self.textbox.yview)
        scrollbar.grid(row=0, column=1, sticky="ns")
        self.textbox.configure(yscrollcommand=scrollbar.set)

        controls = ttk.Frame(outer)
        controls.grid(row=3, column=0, sticky="ew", pady=(14, 10))

        self.generate_button = ttk.Button(controls, text="Generate Sheets", command=self.generate_clicked)
        self.generate_button.grid(row=0, column=0, sticky="w")

        ttk.Button(controls, text="Open Worksheet", command=self.open_worksheet).grid(
            row=0, column=1, sticky="w", padx=(10, 0)
        )
        ttk.Button(controls, text="Open Answer Sheet", command=self.open_answer_sheet).grid(
            row=0, column=2, sticky="w", padx=(10, 0)
        )
        ttk.Button(controls, text="Clear", command=self.clear_text).grid(
            row=0, column=3, sticky="w", padx=(10, 0)
        )

        ttk.Label(outer, textvariable=self.status_var, wraplength=820, justify="left").grid(
            row=4, column=0, sticky="ew"
        )

    def load_existing_input(self) -> None:
        if not DEFAULT_INPUT.exists():
            return

        title, items = parse_input_text(DEFAULT_INPUT.read_text(encoding="utf-8"))
        self.title_var.set(title)
        lines = []
        for item in items:
            if item.explicit_translation:
                lines.append(f"{item.text} | {item.explicit_translation}")
            else:
                lines.append(item.text)
        self.textbox.delete("1.0", "end")
        self.textbox.insert("1.0", "\n".join(lines))

    def clear_text(self) -> None:
        self.textbox.delete("1.0", "end")
        self.status_var.set("Input cleared.")

    def generate_clicked(self) -> None:
        raw_text = self.textbox.get("1.0", "end").strip()
        title = self.title_var.get().strip() or "Chinese Dictation"

        if not raw_text:
            messagebox.showwarning("Missing Input", "Please enter at least one Chinese word or sentence.")
            return

        if self.generate_button is not None:
            self.generate_button.configure(state="disabled")
        self.status_var.set("Generating worksheet and answer sheet...")

        threading.Thread(target=self.run_generation, args=(title, raw_text), daemon=True).start()

    def run_generation(self, title: str, raw_text: str) -> None:
        try:
            input_path, worksheet_path, answer_path = generate_from_text(title, raw_text)
        except Exception as exc:
            self.root.after(0, lambda: self.on_generation_error(exc))
            return

        self.root.after(
            0,
            lambda: self.on_generation_success(input_path, worksheet_path, answer_path),
        )

    def on_generation_success(self, input_path: Path, worksheet_path: Path, answer_path: Path) -> None:
        if self.generate_button is not None:
            self.generate_button.configure(state="normal")
        self.status_var.set(
            f"Done. Saved input to {input_path.name} and updated {worksheet_path.name} and {answer_path.name}."
        )
        open_in_browser(worksheet_path, answer_path)

    def on_generation_error(self, exc: Exception) -> None:
        if self.generate_button is not None:
            self.generate_button.configure(state="normal")
        self.status_var.set("Generation failed.")
        messagebox.showerror("Generation Failed", str(exc))

    def open_worksheet(self) -> None:
        worksheet_path = OUTPUT_DIR / "worksheet.html"
        if not worksheet_path.exists():
            messagebox.showinfo("Not Ready", "Generate the sheets first.")
            return
        open_in_browser(worksheet_path)

    def open_answer_sheet(self) -> None:
        answer_path = OUTPUT_DIR / "answer_sheet.html"
        if not answer_path.exists():
            messagebox.showinfo("Not Ready", "Generate the sheets first.")
            return
        open_in_browser(answer_path)


def main() -> None:
    root = tk.Tk()
    DictationApp(root)
    root.mainloop()


if __name__ == "__main__":
    main()
