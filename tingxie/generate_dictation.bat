@echo off
setlocal

if not exist ".venv\Scripts\python.exe" (
  echo Setting up Python environment...
  python -m venv .venv
  .venv\Scripts\python.exe -m pip install -r requirements.txt
)

.venv\Scripts\python.exe generate_dictation.py --open
if errorlevel 1 (
  exit /b %errorlevel%
)
