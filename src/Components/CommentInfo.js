import React from "react";
import styled from "styled-components";

const CommentContainer = styled.div`
  display: flex;
  border-radius: 0.1rem;
  padding: 10px;
  margin: 8px;
`;

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

const Name = styled.div`
  font-weight: 600;
  font-size: 15px;
  margin-right: 15px;
`;

const Comment = styled.div`
  font-size: 15px;
  margin-right: 15px;
`;

const EditButton = styled.button`
  border: none;
  background-color: #76b900;
  border-radius: 0.1rem;
  color: white;
  opacity: 0.7;
  margin-right: 5px;
`;

const Button = styled.button`
  border: none;
  background-color: #e74c3c;
  border-radius: 0.1rem;
  color: white;
  opacity: 0.7;
  margin-right: 5px;
`;

export default class extends React.Component {
  static defaultProps = {
    info: {
      id: 0,
      name: "Name",
      comment: "Comment"
    }
  };

  state = {
    editing: false,
    name: "",
    comment: ""
  };

  handleRemove = () => {
    const { info, onRemove } = this.props;
    onRemove(info.id);
  };

  handleToggleEdit = () => {
    const { editing } = this.state;
    this.setState({ editing: !editing });
  };

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
  };

  componentDidUpdate(prevProps, prevState) {
    const { info, onUpdate } = this.props;
    if (!prevState.editing && this.state.editing) {
      this.setState({
        name: info.name,
        comment: info.comment
      });
    }
    if (prevState.editing && !this.state.editing) {
      onUpdate(info.id, {
        name: this.state.name,
        comment: this.state.comment
      });
    }
  }

  render() {
    const { editing } = this.state;
    const { name, comment } = this.props.info;

    if (editing) {
      return (
        <CommentContainer>
          <CommentInputName
            value={this.state.name}
            name="name"
            placeholder="Name"
            onChange={this.handleChange}
          />
          <CommentInputBody
            value={this.state.comment}
            name="comment"
            placeholder="Comment"
            onChange={this.handleChange}
          />
          <EditButton onClick={this.handleToggleEdit}>Edit</EditButton>
          <Button onClick={this.handleRemove}>Delete</Button>
        </CommentContainer>
      );
    }

    return (
      <CommentContainer>
        <Name>{name}</Name>
        <Comment>{comment}</Comment>
        <EditButton onClick={this.handleToggleEdit}>Edit</EditButton>
        <Button onClick={this.handleRemove}>Delete</Button>
      </CommentContainer>
    );
  }
}
