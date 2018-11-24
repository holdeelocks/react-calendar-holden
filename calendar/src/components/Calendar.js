import React from "react";
import PropTypes from "prop-types";
import Day from "./Day";

import styled from "styled-components";
import moment from "../momentRange";

const StyledDay = styled.div`
  width: 100%;
  padding: 1rem 0;
  border-bottom: 1px solid #eee;
  display: flex;
  flex-direction: column;
`;

const Calendar = props => {
  const range = moment(props.month, "YYYYMM").range("month");
  const days = Array.from(range.by("days")).map(day => {
    const key = day.format("YYYYMMDD");
    return (
      <Day
        key={key}
        addr={key}
        events={props.days[key]}
        addOrEditEvent={props.addOrEditEvent}
        deleteEvent={props.deleteEvent}
        day={day.format("ddd, Do")}
      />
    );
  });
  return <StyledDay>{days}</StyledDay>;
};

Calendar.propTypes = {
  month: PropTypes.string.isRequired,
  days: PropTypes.objectOf(PropTypes.object)
};

export default Calendar;

// {props.events &&
//   Object.keys(props.events).map(key => {
//     return (
//       <Event key={props.events[key].time}>
//         <p key={props.events[key].time}>{props.events[key].title}</p>
//         <p>{props.events[key].time}</p>
//         <p>{props.events[key].description}</p>
//       </Event>
//     );
//   })}
