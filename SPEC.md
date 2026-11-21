# Spec: Pain-Diary
## Goal (one or two sentences)
A single-page website where I can enter Date and Person Identfiers and a Table where the User can record the time of measurement, the level of pain he/she experiences represented by the value of a numeric rating scale (NRS) and, if needed, the measure taken to reduce the pain.
## Users
Just me, on a laptop browser.
## Features (numbered, so prompts can refer to them)
F1. create the head of the form with: date and time, a dropdown menu for the value of the NRS 0-10, a field for the taken measure, a table below with 2 lines and 6 columns, a button "add entry" to transfer the values of the head to the table
F2. in the column bar it shows depending on the value of the nrs: 0-3 green, 4-6 orange, 7-10 red a bar, which has the width of NRS x 10% (bar  is a visual representation of the nrs value)
F3. add note field to the head which transfers to the note column in the table
F4. add funtionality for date: pressing h sets date to current date, pressing g sets date to yesterday; add functionalty for time: pressing j sets time to now
F5. the table line and column adapts its width/lenght dynamically to the text
F6. Mark nrs values > 3 in the table with a ! in a triangle 
F7. add drop-down menu to measures: none (preset), pain medication as prescribed, physical measure cold, physical measure warm, other non-pharmacological measure
F8. the warning triangle from F6 has the corresponding color of the bar
F9. add drop-down-menu in field note: no exercise (preset), early mobilization, assisted bed-to-chair transfer, assisted standing trial, assisted walking > 20 m, breathing trial
## Acceptance criteria (how I know a feature works)
- F1: Empty fields cannot be submitted. After adding, the form is cleared.
- F4: After reload, all submissions are still there
- F6: values outside the range arent accepted
## Out of scope (do NOT build)
- No login, no server, no database
- No frameworks or libraries (no React, no jQuery, no Bootstrap)
- No sound, no animations beyond simple CSS transitions
- No mobile app
## Look & feel
Simple, readable, one column, max width ~600px, one accent colour.
