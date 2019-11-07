import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Helmet from "react-helmet";
import Loader from "Components/Loader";
import Message from "Components/Message";
import Comment from "Components/Comment";
import { Link } from "react-router-dom";
import ReactTooltip from "react-tooltip";
import Youtube from "react-youtube";
import CommentInfoList from "Components/CommentInfoList";

const Container = styled.div`
  height: calc(100vh - 50px);
  width: 100%;
  padding: 2%;
`;

const YoutubeBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -99;

  iframe {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
  }
`;

const YoutubeForeground = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  filter: blur(5px);
  opacity: 0.2;

  @media (min-aspect-ratio: 16/9) {
    height: 300%;
    top: -100%;
  }

  @media (min-aspect-ratio: 16/9) {
    width: 300%;
    left: -100%;
  }
`;

const Backdrop = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url(${props => props.bgImage});
  background-position: center center;
  background-size: cover;
  filter: blur(5px);
  opacity: 0.3;
  z-index: 0;
`;

const Content = styled.div`
  display: flex;
  width: 100%;
  position: relative;
  z-index: 1;
  height: 100%;
`;

const Cover = styled.div`
  width: 30%;
  background-image: url(${props => props.bgImage});
  background-position: center center;
  background-size: cover;
  height: 100%;
`;

const Data = styled.div`
  width: 70%;
  margin-left: 50px;
`;

const Title = styled.h3`
  font-size: 35px;
  margin-bottom: 10px;
  font-weight: 600;
`;

const ItemContainer = styled.div`
  margin: 15px 0;
`;

const Item = styled.span`
  font-size: 18px;
`;

const Divider = styled.span`
  margin: 0 10px;
`;

const Overview = styled.p`
  font-size: 14px;
  opacity: 0.7;
  line-height: 1.5;
  width: 60%;
`;

const TabMenu = styled.div`
  width: 100%;
  height: 50px;
  background-color: none;
  margin-bottom: 10px;
`;

const List = styled.ul`
  display: flex;
`;

const TabItem = styled.li`
  width: 120px;
  height: 50px;
  line-height: 50px;
  text-align: center;
  margin-right: 20px;
  border-bottom: 3px solid
    ${props => (props.current ? "#76b900" : "transparent")};
  transition: border-bottom 0.5s ease-in-out;
  cursor: pointer;
`;

const TabContainer = styled.div``;

const TabContent = styled.div`
  width: 100%;
  display: ${props => (props.current ? "block" : "none")};
`;

const TabSubtitle = styled.div`
  font-size: 20px;
  margin-bottom: 10px;
  font-weight: 400;
  display: block;
`;
const YoutubeMain = styled.iframe`
  float: left;
  width: 60%;
  height: 500px;
  padding: 0 10px;
  margin-left: -10px;
  margin-right: 20px;
`;

const VideoThumb = styled.img`
  background-color: rgba(100, 100, 100, 0.3);
  border-radius: 2px;
  z-index: 10;
  padding: 3px;
  box-shadow: 0px 1px 5px 2px rgba(20, 20, 20, 0.2);
  display: inline-block;
  width: 150px;
  height: auto;
  background-size: cover;
  cursor: pointer;
  margin: 2px;
`;

const YoutubeList = styled.ul``;

const CompanyContainer = styled.div`
  display: inline-block;
  width: 140px;
  margin-top: 10px;
  margin-right: 20px;
  text-align: center;
`;

const CompanyLogo = styled.div`
  display: inline-block;
  width: 100%;
  height: 110px;
  background-image: url(${props => props.companyImg});
  background-repeat: no-repeat;
  background-position: center center;
  background-size: contain;
  margin-top: 10px;
  margin-bottom: 10px;
`;

const TabText = styled.span``;

const DetailPresenter = ({
  id,
  result,
  recommend,
  loading,
  error,
  current,
  isMovie,
  handleCurrent,
  handleYoutube,
  youtubeKey,
  selectedVideo,
  randomVideo,
  onReady,
  onPlayerStateChange,
  handleCreate,
  comment,
  handleRemove,
  handleUpdate
}) =>
  loading ? (
    <>
      <Helmet>
        <title>Loading | Newflix</title>
      </Helmet>
      <Loader />
    </>
  ) : error ? (
    <Message />
  ) : (
    <Container>
      <Helmet>
        <title>{result.title ? result.title : result.name} | Newflix</title>
      </Helmet>
      {result.videos.results[0] ? (
        <YoutubeBackground>
          <YoutubeForeground>
            <Youtube
              videoId={selectedVideo}
              className="video-iframe"
              opts={{
                height: "100%",
                width: "100%",
                playerVars: {
                  autoplay: 1,
                  controls: 0
                }
              }}
              onReady={onReady}
              onEnd={randomVideo}
              onStateChange={onPlayerStateChange}
            />
          </YoutubeForeground>
        </YoutubeBackground>
      ) : (
        <Backdrop
          bgImage={`https://image.tmdb.org/t/p/original${result.backdrop_path}`}
        />
      )}

      <Content>
        <Cover
          bgImage={
            result.poster_path
              ? `https://image.tmdb.org/t/p/original${result.poster_path}`
              : require("../../assets/poster-small.png")
          }
        />
        <Data>
          <Title>{result.title ? result.title : result.name}</Title>
          <ItemContainer>
            <Item>
              {result.release_date
                ? result.release_date.substring(0, 4)
                : result.first_air_date.substring(0, 4)}
            </Item>
            <Divider>·</Divider>
            <Item>
              {result.runtime
                ? result.runtime + "분"
                : result.runtime === 0
                ? "상영시간 미정"
                : result.episode_run_time[0] + "분"}
            </Item>
            <Divider>·</Divider>
            <Item>
              {result.genres &&
                result.genres.map((genre, index) =>
                  index === result.genres.length - 1
                    ? genre.name
                    : `${genre.name} / `
                )}
            </Item>
          </ItemContainer>
          <Overview>{result.overview}</Overview>
          <TabContainer>
            <TabMenu>
              <List>
                <TabItem
                  onClick={() => handleCurrent("youtube")}
                  current={current === "youtube"}
                >
                  Teaser
                </TabItem>
                <TabItem
                  onClick={() => handleCurrent("company")}
                  current={current === "company"}
                >
                  Production Company
                </TabItem>
                {isMovie ? (
                  <TabItem
                    onClick={() => handleCurrent("collection")}
                    current={current === "collection"}
                  >
                    Collection
                  </TabItem>
                ) : (
                  <TabItem
                    onClick={() => handleCurrent("series")}
                    current={current === "series"}
                  >
                    Seasons
                  </TabItem>
                )}
                <TabItem
                  onClick={() => handleCurrent("Recommendations")}
                  current={current === "Recommendations"}
                >
                  Recommendations
                </TabItem>
                <TabItem
                  onClick={() => handleCurrent("Comment")}
                  current={current === "Comment"}
                >
                  Leave a Reply
                </TabItem>
              </List>
            </TabMenu>
            <TabContent current={current === "youtube"}>
              <YoutubeList>
                {result.videos.results && result.videos.results.length > 0 ? (
                  result.videos.results.map((video, index) =>
                    index === 0 ? (
                      <>
                        <YoutubeMain
                          key={video.id}
                          title={video.name}
                          src={`https://www.youtube.com/embed/${
                            youtubeKey !== "" ? youtubeKey : video.key
                          }`}
                          frameborder="0"
                          allowFullScreen
                        />
                        <TabSubtitle>Other Videos</TabSubtitle>
                      </>
                    ) : (
                      <>
                        <VideoThumb
                          key={video.id}
                          src={`https://img.youtube.com/vi/${video.key}/0.jpg`}
                          alt={video.name}
                          onClick={() => handleYoutube(video.key)}
                          data-tip={video.name}
                        />
                        <ReactTooltip />
                      </>
                    )
                  )
                ) : (
                  <TabText>Sorry, Can't find video!</TabText>
                )}
              </YoutubeList>
            </TabContent>
            <TabContent current={current === "company"}>
              {result.production_companies &&
              result.production_companies.length > 0 ? (
                result.production_companies.map(
                  company =>
                    company.logo_path && (
                      <CompanyContainer
                        key={company.id}
                        data-tip={company.name}
                      >
                        <CompanyLogo
                          companyImg={`https://image.tmdb.org/t/p/w300${company.logo_path}`}
                        />
                        <ReactTooltip />
                      </CompanyContainer>
                    )
                )
              ) : (
                <TabText>Sorry, Can't find production company!</TabText>
              )}
            </TabContent>
            <TabContent current={current === "collection"}>
              {result.belongs_to_collection ? (
                <Link to={`/collections/${result.belongs_to_collection.id}`}>
                  <CompanyContainer>
                    <CompanyLogo
                      companyImg={
                        result.belongs_to_collection.poster_path &&
                        `https://image.tmdb.org/t/p/w300${result.belongs_to_collection.poster_path}`
                      }
                      data-tip={result.belongs_to_collection.name}
                    />
                    <ReactTooltip />
                  </CompanyContainer>
                </Link>
              ) : (
                <TabText>Sorry, Can't find Collections!</TabText>
              )}
            </TabContent>
            <TabContent current={current === "series"}>
              {result.seasons && result.seasons.length > 0 ? (
                result.seasons.map((season, i) => (
                  <Link to={`/show/${result.id}/seasons/${i}`}>
                    <CompanyContainer>
                      <CompanyLogo
                        companyImg={
                          season.poster_path &&
                          `https://image.tmdb.org/t/p/w300${season.poster_path}`
                        }
                        data-tip={season.name}
                      />
                      <ReactTooltip />
                    </CompanyContainer>
                  </Link>
                ))
              ) : (
                <TabText>Sorry, Can't find Seasons!</TabText>
              )}
            </TabContent>
            <TabContent current={current === "creator"}>
              {result.production_companies &&
              result.production_companies.length > 0 ? (
                result.production_companies.map(
                  company =>
                    company.logo_path && (
                      <CompanyContainer key={company.id}>
                        <CompanyLogo
                          companyImg={`https://image.tmdb.org/t/p/w300${company.logo_path}`}
                        />
                        <TabText>
                          {company.name}({company.origin_country})
                        </TabText>
                      </CompanyContainer>
                    )
                )
              ) : (
                <TabText>Sorry, Can't find Company!</TabText>
              )}
            </TabContent>
            <TabContent current={current === "Recommendations"}>
              {recommend.similar && recommend.similar.results.length > 0 ? (
                recommend.similar.results.slice(0, 10).map(similar =>
                  isMovie ? (
                    <Link to={`/movie/${similar.id}`}>
                      <CompanyContainer>
                        <CompanyLogo
                          companyImg={
                            similar.poster_path &&
                            `https://image.tmdb.org/t/p/w300${similar.poster_path}`
                          }
                          data-tip={similar.title}
                        />
                        <ReactTooltip />
                      </CompanyContainer>
                    </Link>
                  ) : (
                    <Link to={`/show/${similar.id}`}>
                      <CompanyContainer>
                        <CompanyLogo
                          companyImg={
                            similar.poster_path &&
                            `https://image.tmdb.org/t/p/w300${similar.poster_path}`
                          }
                          data-tip={similar.name}
                        />
                        <ReactTooltip />
                      </CompanyContainer>
                    </Link>
                  )
                )
              ) : (
                <TabText>Sorry, Can't find recommendations!</TabText>
              )}
            </TabContent>
            <TabContent current={current === "Comment"}>
              <Comment
                movieid={id}
                data={comment}
                onCreate={data => {
                  handleCreate(data);
                }}
              />
              <CommentInfoList
                data={JSON.parse(localStorage.getItem(id)) || comment}
                onRemove={handleRemove}
                onUpdate={handleUpdate}
              />
            </TabContent>
          </TabContainer>
        </Data>
      </Content>
    </Container>
  );

DetailPresenter.propTypes = {
  result: PropTypes.object,
  recommend: PropTypes.object,
  error: PropTypes.string,
  loading: PropTypes.bool.isRequired,
  handleCurrent: PropTypes.func,
  isMovie: PropTypes.bool,
  current: PropTypes.string,
  handleYoutube: PropTypes.func,
  youtubeKey: PropTypes.string,
  selectedVideo: PropTypes.string,
  randomVideo: PropTypes.func
};

export default DetailPresenter;
