Framework used: ShadUI/useForms/Tailwind CSS/lucide react

Fix:

- Refactor everything especially components that uses a lot of props. Break it down into smaller pieces
- UseEffect problems must use async like for things with setLoading
- Datakey from updateEntries needs to be centralized
- Determine if using data provider is still necessary, since most of the functions needed has been reduced because of onSnapshot

Features:

- Sort and filter
- Score
- Add a droplist
