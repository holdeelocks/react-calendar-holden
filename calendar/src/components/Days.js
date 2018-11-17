import React from "react";
import PropTypes from "prop-types";
import moment from "../momentRange";

const Day = props => {
  return (
    <div>
      {props.date.format("ddd, DD")}
      <div>
        {props.events &&
          Object.keys(props.events).map(key => {
            return props.events[key].title;
          })}
      </div>
    </div>
  );
};

Day.propTypes = {
  date: PropTypes.object.isRequired,
  events: PropTypes.objectOf(PropTypes.object.isRequired)
};

export default Day;
