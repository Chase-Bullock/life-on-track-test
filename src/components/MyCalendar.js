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
  const today = new Date();
  const events = [
    {
      title: "Game",
      start: new Date().setHours(9),
      end: new Date().setHours(12),
    },
    {
      title: "Develop 4:30hrs",
      start: today.setHours(12),
      end: today.setHours(4),
    },
    {
      title: "Game",
      start: new Date().setDate(today.getDate() + 1),
      end: new Date().setDate(today.getDate() + 1),
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
