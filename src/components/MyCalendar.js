import React, { useState, useEffect } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "../../node_modules/react-big-calendar/lib/css/react-big-calendar.css";
import { SECONDARY_LIGHT, PRIMARY, PRIMARY_LIGHT } from "../constants";
import "../UI/calendar.css";
import { useActivities } from "../useActivity";
import ActivityDialog from "./ActivityDialog";
import { useAppState } from "../context/app-state";

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

const MyCalendar = (props) => {
  const [activityDialog, setActivityDialog] = useState(false);
  const [event, setEvent] = useState();
  const [events, setEvents] = useState();
  const [{ user }] = useAppState();
  const activites = useActivities(user.uid);
  console.log(activites);

  useEffect(() => {
    const events = activites?.map(activity => {
      return {
        title: activity.activityName,
        start: activity.start.toDate(),
        end: activity.end.toDate()
      }
    })

    setEvents(events);
  },[activites])
  
  const activityDialogHandler = (passedEvent) => {
    console.log("passedEvent", passedEvent)
    setActivityDialog(true);
    const start = passedEvent?.start || passedEvent?.slots[0] ;
    const end = passedEvent?.end || passedEvent.slots.pop();
    setEvent({start, end});
  }

  const eventStyleGetter = (event, start, end, isSelected) => {
    var style = {
      backgroundColor: PRIMARY_LIGHT,
      borderRadius: "0px",
      color: "white",
      border: "0px",
      display: "block",
    };
    return {
      style: style,
    };
  };

  const dialogProps = {
      event: event,
      open: activityDialog,
      toggle: () => setActivityDialog(!activityDialog),
  }

  return (
    <>{ events &&
      <Calendar
        localizer={localizer}
        selectable
        onSelectSlot={(e) => activityDialogHandler(e)}
        onSelectEvent={(event) => activityDialogHandler(event)}
        startAccessor="start"
        events={events}
        endAccessor="end"
        style={{ height: 800 }}
        eventPropGetter={eventStyleGetter}
        defaultView={"day"}
      />
    }
      <ActivityDialog
        dialogProps={dialogProps}
        user={user}
        {...dialogProps.props}
      />
    </>
  );
};

export default MyCalendar;
