Framework used: ShadUI/useForms/Tailwind CSS/lucide react/Tanshack Table

Fix:
- I noticed the useEffect from the initial fetch is running again after adding data. Must be because of the modalState dependancy.
Since opening the adding data modal changes the state

Features:


