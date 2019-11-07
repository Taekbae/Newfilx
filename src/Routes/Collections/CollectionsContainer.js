import React from "react";
import CollectionsPresenter from "./CollectionsPresenter";
import { moviesApi } from "api";

export default class extends React.Component {
  state = {
    result: null,
    loading: true,
    error: null
  };

  async componentDidMount() {
    const {
      match: {
        params: { id }
      },
      history: { push }
    } = this.props;
    const parsedId = parseInt(id);
    if (isNaN(parsedId)) {
      return push("/");
    }
    let result,
      error = null;

    try {
      ({ data: result } = await moviesApi.collections(parsedId));
    } catch {
      error = "Can't find collections!";
    } finally {
      this.setState({
        result,
        loading: false,
        error
      });
    }
  }

  render() {
    const { result, loading, error } = this.state;
    return (
      <CollectionsPresenter
        collectionName={result && result.name}
        result={result && result.parts}
        loading={loading}
        error={error}
      />
    );
  }
}
