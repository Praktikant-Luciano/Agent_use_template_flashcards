# Progress

## Done

- F1: Added the date, time, NRS 0-10, measure, and note fields; valid entries transfer to the six-column table, the form clears, and two empty rows remain available.
- F2: Added an NRS bar with value-based width and green (0-3), orange (4-6), and red (7-10) colors.
- F3: Added the note field and transfer to the table's note column.
- F4: Added keyboard shortcuts: `h` for today, `g` for yesterday, and `j` for the current time.
- F5: Made date, time, NRS, and bar columns fixed-width; the bar fits the maximum NRS value. The measure and note columns expand without wrapping, and the table can scroll horizontally. Widened the page to 900px.
- F6: Added a warning triangle with `!` beside NRS values above 3.
- F9: Changed the note field to a dropdown with the specified exercise options and “No exercise” preset.
- F8: Matched warning triangle colors to the NRS bar: orange for values 4-6 and red for values 7-10.
- F10: Added browser storage using `localStorage`, restored saved entries after reload, and validated saved and submitted NRS values.

## Next

## Decisions & notes

## Known problems
