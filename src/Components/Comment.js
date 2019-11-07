import React from "react";
import styled, { keyframes } from "styled-components";

const CommentInputName = styled.input`
  background: rgba(255, 255, 255, 1);
  border: none;
  border-radius: 0.1rem
  width: 20%;
  height: 30px;
  margin: 5px;
  padding: 5px;
  color: #3f3f3f;

  &:focus {
    outline: none;
  }
`;

const CommentInputBody = styled.input`
  background: rgba(255, 255, 255, 1);
  border: none;
  border-radius: 0.1rem
  width: 50%;
  height: 30px;
  margin: 5px;
  padding: 5px;
  color: #3f3f3f;

  &:focus {
    outline: none;
  }
`;

const gradient = keyframes`
0% {
  opacity: 1;
}
50% {
  opacity: 0.7;
}
100% {
  opacity: 1;
}
`;

const CommentSend = styled.button`
  background: #76b900;
  border: none;
  border-radius: 1rem
  color: white;
  text-align: center;
  display: inline-block;
  font-size: 12px;
  margin: 2px 5px;
  padding: 8px;
  cursor: pointer;
  opacity: 1;

  &:focus {
    outline: none;
  }

  &:hover {
    animation: ${gradient} 1.5s infinite linear alternate
  }
`;

export default class extends React.Component {
  state = {
    name: "",
    comment: ""
  };
  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    if (this.state.name && this.state.comment) {
      this.props.onCreate(this.state);
      this.setState({
        name: "",
        comment: ""
      });
    }
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit} method="POST">
        <CommentInputName
          placeholder="Name"
          value={this.state.name}
          onChange={this.handleChange}
          name="name"
        />
        <CommentInputBody
          placeholder="Comment"
          value={this.state.comment}
          onChange={this.handleChange}
          name="comment"
        />
        <CommentSend type="submit">Post Comment</CommentSend>
      </form>
    );
  }
}
