import React from "react";
import CommentInfo from "./CommentInfo";

export default class extends React.Component {
  static defaultProps = {
    data: [],
    onRemove: () => console.warn("onRemove not defined"),
    onUpdate: () => console.warn("onUpdate not defined")
  };

  render() {
    const { data, onRemove, onUpdate } = this.props;
    const list = data.map(info => (
      <CommentInfo
        key={info.id}
        info={info}
        onRemove={onRemove}
        onUpdate={onUpdate}
      />
    ));

    return <div>{list}</div>;
  }
}
