import React from "react";
import styled from "styled-components";

const StyledForm = styled.form`
  max-width: 50rem;
  padding: 3rem;
  border-radius: 1rem;
  background-color: #fff;
  text-align: center;
  width: 100%;
  h2 {
    margin-bottom: 2rem;
    color: #3f5f7f;
  }
  input,
  textarea {
    display: block;
    width: 100%;
    border: 1px solid #3f5f7f;
    border-radius: 5px;
    font-family: inherit;
    font-size: inherit;
    color: inherit;
    padding: 1rem;
    margin-bottom: 2rem;
    transition: all 0.3s;
    &:focus {
      outline: none;
      border-color: #3f5f7f;
    }
    &::placeholder {
      color: #3f5f7f;
    }
  }
  textarea {
    resize: none;
  }
  button {
    background-color: #3f5f7f;
    color: white;
    padding: 1rem 2rem;
    text-transform: uppercase;
    letter-spacing: 1px;
    font-size: 1.2rem;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    &:hover {
      background-color: white;
      color: #3f5f7f;
      border: 1px solid #3f5f7f;
    }
  }
`;

class Form extends React.Component {
  state = {
    title: "",
    time: "",
    description: ""
  };

  handleChange = e =>
    this.setState({
      [e.target.name]: e.target.value
    });

  handleSubmit = e => {
    e.preventDefault();

    this.props.onSubmit(this.state);
  };

  render() {
    return (
      <StyledForm onSubmit={this.handleSubmit}>
        <h2>{this.props.heading}</h2>
        <input
          type="text"
          name="title"
          value={this.state.title}
          onChange={this.handleChange}
          placeholder="Title"
        />
        <input
          type="text"
          name="time"
          value={this.state.time}
          onChange={this.handleChange}
          placeholder="Time"
        />
        <textarea
          value={this.state.description}
          name="description"
          onChange={this.handleChange}
          placeholder="Description"
        />
        <button type="submit">Submit</button>
      </StyledForm>
    );
  }
}

export default Form;
