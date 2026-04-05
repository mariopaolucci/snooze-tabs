# Snooze tabs

Snooze tabs to open at a specific time. Select any predefined options such as tomorrow, next week etc., or pick your date and time.

**Note:** This is a personal project based on the original [snooze-tabs](https://github.com/ramkumar-kr/snooze-tabs) extension. Thank you to the original author for the foundation!
Changes are ideated and checked by me, but performed by AI (gasp!). I am not proficient in javascript, so beware!

## Description
Snooze tabs to open at a specific time in the future.
Ex: Open this website after 4 hours.

### Features
- **Flexible Snooze Options**: Choose from preset options (Later, Tomorrow, This weekend, Next week, Next month) or pick a custom date and time
- **EU Date Format**: Enter dates in DD/MM/YYYY format with time in HH:MM, defaulting to today's date and current time
- **Recurring Snoozes**: Enable the "Recurring snooze" checkbox to make any snooze repeat periodically:
  - _Later_: Repeats every X hours
  - _Tomorrow_: Repeats daily at your preferred time
  - _This weekend_: Repeats weekly on weekends
  - _Next week_: Repeats weekly at your preferred time
  - _Next month_: Repeats monthly at your preferred time
- **Import/Export**: Backup and restore your snoozed tabs list as JSON files through the Preferences page
- **Notifications**: Get alerts when a tab is snoozed and when it's time to open it
- **Sidebar Access**: View and manage snoozed tabs from the sidebar
- **Incognito Support**: Snoozed incognito tabs open in incognito windows
- **Pin Preservation**: Tabs maintain their pinned status when they reopen

### User Interface
- Click on the extension icon and select when you want the tab to open
- A notification confirms the tab has been snoozed
- Use "Manage snoozed tabs" to view all snoozed tabs and remove them if needed
- Access preferences to set your default "Later" duration and preferred time of day

### Some drawbacks
- Tabs will always be opened in the background
- Snoozed incognito tabs will always open in a new incognito window even if an incognito window is already present
- A tab which is pinned in incognito and snoozed will not respect the tab pinned status

## Contributions
Please create an issue or more preferably a pull request and we can discuss about it

## Building
There is no build step. Just load the extension from chrome://extensions or about:debugging#addons to get started.

## Todo items
- [x] Custom date and time picker with EU date format
- [x] Recurring/periodic snooze functionality
- [x] Import/Export snoozed tabs
- [ ] Multi account Containers support
