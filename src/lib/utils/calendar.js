// @ts-nocheck
import ICAL  from "ical.js";

export function convertIcalToJson(icalString) {
    const jcalData = ICAL.parse(icalString); 
    const calendar = new ICAL.Component(jcalData);
    const events = calendar.getAllSubcomponents('vevent'); 

    const result = [];

    events.forEach(event => {
        const eventComponent = new ICAL.Event(event);

        const start = eventComponent.startDate.toJSDate(); 
        const end = eventComponent.endDate.toJSDate();
        const name = eventComponent.summary;

        const formattedDate = start.toLocaleDateString("en-US");

        let dateEntry = result.find(entry => entry.date === formattedDate);
        if (!dateEntry) {
            dateEntry = { date: formattedDate, periods: [] };
            result.push(dateEntry);
        }

        dateEntry.periods.push({
            name: name,
            start: start.getTime(), 
            end: end.getTime()
        });
    });

    return result;
}