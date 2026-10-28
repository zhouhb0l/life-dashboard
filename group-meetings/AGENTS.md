# Group meeting slides

This project is for preparing slides for group meetings held every two weeks.

## Required workflow

1. **Each meeting gets a new deck.** Never overwrite a previous meeting's deck or its meeting-specific assets when preparing a new meeting. Preserve earlier presentations as dated snapshots.
2. **Adapt the previous deck; do not start from scratch.** Copy the most recent meeting's HTML page and deck-specific asset directory to new dated paths, unless the user specifies another existing deck. Carry forward its structure, styling, navigation, and relevant content, then update it for the new meeting.

## Repository conventions

- Create the new meeting page as `meeting-YYYY-MM-DD.html`, with its own supporting files under `assets/decks/meeting-YYYY-MM-DD/`.
- Update copied references to figures, scripts, embedded decks, dates, links, and presentation state keys for the new meeting. Copy meeting-specific assets before modifying them so changes do not affect earlier decks. Shared vendor libraries can remain shared.
- Update `index.html` to include the new meeting while retaining all previous entries.
- Read the previous deck and its content modules before editing. Keep reused background distinct from new results; do not present old status information as a current update.
- Create or edit slides only when requested. Reviewing the project or recording these instructions does not itself require a new deck.
