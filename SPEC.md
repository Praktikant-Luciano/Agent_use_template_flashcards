# Spec: Pain-Diary
## Goal (one or two sentences)
A single-page website where I can enter Date and Person Identfiers and a Table where the User can record the time of measurement, the level of pain he/she experiences represented by the value of a numeric rating scale (NRS) and, if needed, the measure taken to reduce the pain.
## Users
Just me, on a laptop browser.
## Features (numbered, so prompts can refer to them)
F1. create the head of the form with: date and time, a dropdown menu for the value of the NRS 0-10, a field for the taken measure, a table below with 2 lines and 6 columns, a button "add entry" to transfer the values of the head to the table
F2. name the columns 1 date 2 time 3 nrs 4 bar 5 measure 6 note
F3. in the column bar it shows depending on the value of the nrs: 0-3 green, 4-6 orange, 7-10 red a bar, which has the lenght of 10-value of the entrya bar which is a visual representation of the nrs value 
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
