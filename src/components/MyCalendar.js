import React from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "../../node_modules/react-big-calendar/lib/css/react-big-calendar.css";
import { SECONDARY_LIGHT } from "../constants";

const localizer = momentLocalizer(moment);

// const CURRENT_DATE = moment().toDate().getDate();

// const ColoredDateCellWrapper = ({ children, value }) =>
//   React.cloneElement(Children.only(children), {
//     style: {
//       ...children.style,
//       backgroundColor:
//         moment(value).toDate().getDate() == CURRENT_DATE
//           ? SECONDARY_LIGHT
//           : "white",
//       color: "white",
//     },
//   });

const MyCalendar = () => {
  const events = [
    {
      title: "string",
      start: new Date(),
      end: new Date(),
    },
  ];

  const eventStyleGetter = (event, start, end, isSelected) => {
    console.log(event);
    var style = {
      backgroundColor: "#1a237e",
      borderRadius: "0px",
      opacity: 0.8,
      color: "white",
      border: "0px",
      display: "block",
    };
    return {
      style: style,
    };
  };

  return (
    <>
      <Calendar
        localizer={localizer}
        onSelectEvent={(event, syntheticEvent) => alert(JSON.stringify(event))}
        startAccessor="start"
        events={events}
        endAccessor="end"
        style={{ height: 600 }}
        eventPropGetter={eventStyleGetter}
      />
    </>
  );
};

export default MyCalendar;
