import { Central as Layout } from "@/layouts";
import { Section } from "./Section";
import { SearchSection } from "./SearchSection";
import { ResultsSection } from "./ResultsSection";
import { TimetableSection } from "./TimetableSection";
import { useState } from "react";
import { ServiceAPI } from "@/infrastructure";
import { ScheduledEvent } from "@/infrastructure/ServiceAPI";
import { WorksheetSection } from "./WorksheetSection";
import { useAccountContext } from "@/context";
import { useNavigate } from "react-router-dom";
import { scheduledEventToCalendarBlock } from "@/utils";
import "./BuildTimetable.style.scss";

function BuildTimetable() {
  const { jwt } = useAccountContext();
  const [scheduledEvents, setScheduledEvents] = useState<ScheduledEvent[]>([]);
  const [selectedEvents, setSelectedEvents] = useState<ScheduledEvent[]>([]);
  const [timetableName, setTimetableName] = useState(""); // State for the timetable name
  const navigate = useNavigate();

  const fetchScheduledEvents = async () => {
    const result = await ServiceAPI.fetchScheduledEvents();
    setScheduledEvents(result);
  };

  const createTimetable = async () => {
    console.log("Timetable Name:", timetableName); // Debugging
    const result = await ServiceAPI.createTimetable(
      new Date().toISOString(),
      selectedEvents.map((event) => event.id.toString()),
      jwt,
      timetableName // Ensure the name is being sent correctly
    );
    console.log("API Response:", result); // Debugging
    navigate(`/timetables/${result.data.id}`);
  };
  
  
  const addEvent = (event: ScheduledEvent) => {
    setSelectedEvents([...selectedEvents, event]);
  };

  const removeEvent = (event: ScheduledEvent) => {
    setSelectedEvents(selectedEvents.filter((e) => e.id !== event.id));
  };

  return (
    <Layout title={"My Course Worksheet"}>
      <div className="BuildTimetable">
        <Section title="Search">
          <SearchSection onSearch={fetchScheduledEvents} />
        </Section>
        {scheduledEvents.length > 0 && (
          <Section title="Results">
            <ResultsSection
              scheduledEvents={scheduledEvents}
              addEvent={addEvent}
            />
          </Section>
        )}
        {/* Input field for timetable name */}
        <Section title="Timetable Name">
          <div className="timetable-name-input">
            <label htmlFor="timetableName">Timetable Name:</label>
            <input
              type="text"
              id="timetableName"
              value={timetableName}
              onChange={(e) => setTimetableName(e.target.value)}
              placeholder="Enter a name for your timetable"
            />
          </div>
        </Section>
        {selectedEvents.length > 0 && (
          <Section title="Worksheet">
            <WorksheetSection
              selectedEvents={selectedEvents}
              removeEvent={removeEvent}
              createTimetable={createTimetable}
            />
          </Section>
        )}
        <Section title="Draft Timetable">
          <TimetableSection
            selectedEvents={selectedEvents.map((event: ScheduledEvent) =>
              scheduledEventToCalendarBlock(event)
            )}
          />
        </Section>
      </div>
    </Layout>
  );
}

export default BuildTimetable;
