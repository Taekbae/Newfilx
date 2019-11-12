import React from "react";
import DetailPresenter from "./DetailPresenter";
import { moviesApi, tvApi } from "api";

export default class extends React.Component {
  id = 0;
  constructor(props) {
    super(props);
    const {
      match: {
        params: { id }
      },
      location: { pathname }
    } = props;
    this.state = {
      id: id,
      result: null,
      recommend: null,
      error: null,
      loading: true,
      isMovie: pathname.includes("/movie/"),
      current: "youtube",
      youtubeKey: "",
      selectedVideo: "",
      commentlist: []
    };
  }

  handleCurrent = currentState => {
    this.setState({
      current: currentState
    });
  };

  handleYoutube = youtubeKey => {
    this.setState({
      youtubeKey
    });
  };

  handleCreate = data => {
    let { commentlist } = this.state;
    if (localStorage.getItem(this.state.id)) {
      commentlist = JSON.parse(localStorage.getItem(this.state.id));
    }

    this.setState(
      {
        commentlist: commentlist.concat({ id: this.id++, ...data })
      },
      () => {
        localStorage.setItem(
          this.state.id,
          JSON.stringify(this.state.commentlist)
        );
        this.setState(this.state);
      }
    );
  };

  handleRemove = id => {
    let { commentlist } = this.state;
    this.setState(
      {
        commentlist: commentlist.filter(info => info.id !== id)
      },
      () => {
        localStorage.setItem(this.state.id, JSON.stringify(commentlist));
        this.setState(this.state);
      }
    );
  };

  handleUpdate = (id, data) => {
    let { commentlist } = this.state;
    if (localStorage.getItem(this.state.id)) {
      commentlist = JSON.parse(localStorage.getItem(this.state.id));
    }
    this.setState(
      {
        commentlist: commentlist.map(info =>
          id === info.id ? { ...info, ...data } : info
        )
      },
      () => {
        localStorage.setItem(
          this.state.id,
          JSON.stringify(this.state.commentlist)
        );
        this.setState(this.state);
      }
    );
  };

  onReady = event => {
    event.target.mute();
  };

  onPlayerStateChange = event => {
    if (event.data === 0) {
      this.randomVideo();
    }
  };

  randomVideo = () => {
    this.setState({
      selectedVideo: this.state.result.videos.results[
        Math.floor(
          Math.random() * (this.state.result.videos.results.length - 1)
        )
      ].key
    });
  };

  resizeIframe(obj) {
    obj.style.width = obj.contentWindow.document.body.scrollWidth + "px";
    obj.style.height = obj.contentWindow.document.body.scrollHeight + "px";
  }

  async componentDidMount() {
    const {
      match: {
        params: { id }
      },
      history: { push }
    } = this.props;
    const { isMovie } = this.state;
    const parsedId = parseInt(id);
    if (isNaN(parsedId)) {
      return push("/");
    }
    let result = null;
    let recommend = null;
    try {
      if (isMovie) {
        ({ data: result } = await moviesApi.movieDetail(parsedId));
        ({ data: recommend } = await moviesApi.movieSimilar(parsedId));
      } else {
        ({ data: result } = await tvApi.showDetail(parsedId));
        ({ data: recommend } = await tvApi.showSimilar(parsedId));
      }
    } catch (error) {
      this.setState({
        error: "Cant find anything"
      });
    } finally {
      this.setState({
        loading: false,
        result,
        recommend
      });
      if (result.videos.results[0]) {
        this.randomVideo();
      }
    }
  }

  async componentDidUpdate(prevProps) {
    if (this.props.match.params.id !== prevProps.match.params.id) {
      const {
        match: {
          params: { id }
        }
      } = this.props;
      const { isMovie } = this.state;
      const parsedId = parseInt(id);
      let result = null;
      let recommend = null;
      try {
        if (isMovie) {
          ({ data: result } = await moviesApi.movieDetail(parsedId));
          ({ data: recommend } = await moviesApi.movieSimilar(parsedId));
        } else {
          ({ data: result } = await tvApi.showDetail(parsedId));
          ({ data: recommend } = await tvApi.showSimilar(parsedId));
        }
      } finally {
        this.setState({
          loading: false,
          result,
          recommend,
          current: "youtube"
        });
      }
    }
  }

  render() {
    const {
      id,
      result,
      recommend,
      error,
      loading,
      isMovie,
      current,
      youtubeKey,
      selectedVideo,
      commentlist
    } = this.state;
    return (
      <DetailPresenter
        id={id}
        result={result}
        recommend={recommend}
        error={error}
        loading={loading}
        handleCurrent={this.handleCurrent}
        isMovie={isMovie}
        current={current}
        handleYoutube={this.handleYoutube}
        youtubeKey={youtubeKey}
        selectedVideo={selectedVideo}
        randomVideo={this.randomVideo}
        onReady={this.onReady}
        onPlayerStateChange={this.onPlayerStateChange}
        handleChange={this.handleChange}
        comment={commentlist}
        handleCreate={this.handleCreate}
        handleSubmit={this.handleSubmit}
        handleRemove={this.handleRemove}
        handleUpdate={this.handleUpdate}
        resizeIframe={this.resizeIframe}
      />
    );
  }
}
