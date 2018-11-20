import React from "react";
import PropTypes from "prop-types";
// import moment from "../momentRange";
import styled from "styled-components";

const DayWrap = styled.div`
  height: 100px;
  width: 100%;
  display: flex;
  padding: 1%;
  border: 1px solid lightslategrey;
  border-bottom: none;
  &:last-child {
    border-bottom: 1px solid lightslategrey;
  }
`;

const Event = styled.div`
  font-weight: bold;
  margin-left: 2%;
  display: flex;
  justify-content: space-between;

  p {
    margin: 0;
    margin-left: 2%;
    border: 1px solid lightblue;
    text-align: center;
    &:hover {
      background-color: lightlblue;
      color: lightblue;
      cursor: pointer;
    }
  }
`;

const Day = props => {
  return (
    <DayWrap>
      {props.date.format("ddd, DD")}
      <Event>
        {props.events &&
          Object.keys(props.events).map(key => {
            return (
              <p key={props.events[key].time}>{props.events[key].title}</p>
            );
          })}
      </Event>
    </DayWrap>
  );
};

Day.propTypes = {
  date: PropTypes.object.isRequired,
  events: PropTypes.objectOf(PropTypes.object.isRequired)
};

export default Day;
