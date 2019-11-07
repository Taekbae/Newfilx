import React from "react";
import SeasonsPresenter from "./SeasonsPresenter";
import { tvApi } from "api";

export default class extends React.Component {
  state = {
    showResult: null,
    result: null,
    loading: true,
    error: null
  };

  async componentDidMount() {
    const {
      match: {
        params: { id, season_number }
      },
      history: { push }
    } = this.props;
    const parsedId = parseInt(id);
    const parsedSid = parseInt(season_number);
    if (isNaN(parsedId)) {
      return push("/");
    }
    let showResult = null;
    let result = null;
    let error = null;

    try {
      ({ data: showResult } = await tvApi.showDetail(parsedId));
      ({ data: result } = await tvApi.seasons(parsedId, parsedSid));
    } catch (error) {
      this.setState({
        error: "Can't find seasons!"
      });
    } finally {
      this.setState({
        showResult,
        result,
        loading: false,
        error
      });
    }
  }

  render() {
    const { showResult, result, loading, error } = this.state;
    return (
      <SeasonsPresenter
        showResult={showResult}
        result={result}
        loading={loading}
        error={error}
      />
    );
  }
}
