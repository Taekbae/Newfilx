import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Helmet from "react-helmet";
import Loader from "Components/Loader";
import Message from "Components/Message";
import ReactTooltip from "react-tooltip";

const Container = styled.div`
  height: calc(100vh - 50px);
  width: 100%;
  padding: 2%;
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

  @media (max-width: 800px) {
    flex-wrap: wrap;
    text-align: center;
  }
`;

const Cover = styled.div`
  width: 30%;
  background-image: url(${props => props.bgImage});
  background-position: center center;
  background-size: cover;
  height: 100%;

  @media (max-width: 800px) {
    width: 100%;
    transition: 0.5s ease-in-out;
  }

  @media (min-width: 800px) {
    width: 30%;
    transition: 0.5s ease-in-out;
  }
`;

const Data = styled.div`
  width: 70%;
  margin-left: 50px;

  @media (max-width: 800px) {
    width: 90%;
    margin-top: 4vw;
    margin-left: 5vw;
  }
`;

const Title = styled.h3`
  font-size: 2.3vw;
  margin-bottom: 10px;
  font-weight: 600;

  @media (max-width: 800px) {
    font-size: 6vw;
  }
`;

const ItemContainer = styled.div`
  margin: 15px 0;
`;

const Item = styled.span`
  font-size: 1.2vw;

  @media (max-width: 800px) {
    font-size: 3vw;
  }
`;

const Overview = styled.p`
  font-size: 1vw;
  opacity: 0.7;
  line-height: 1.5;
  width: 60%;

  @media (max-width: 800px) {
    width: 100%;
    font-size: 2vw;
    margin-bottom: 1.3vw;
  }
`;

const TabMenu = styled.div`
  width: 100%;
  height: 50px;
  background-color: none;
  margin-bottom: 10px;
`;

const List = styled.ul`
  display: flex;
  align-items: center;

  @media (max-width: 800px) {
    font-size: 2vw;
  }
`;

const TabItem = styled.li`
  width: 12%;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  margin-right: 2vw;
  border-bottom: 3px solid
    ${props => (props.current ? "#76b900" : "transparent")};
  transition: border-bottom 0.5s ease-in-out;
  cursor: pointer;
  font-size: 0.7vw;

  @media (max-width: 800px) {
    width: 100%;
    font-size: 2vw;
  }
`;

const TabContainer = styled.div`
  height: 25vh;
`;

const TabContent = styled.div`
  width: 100%;
  display: block;
`;

const CompanyContainer = styled.div`
  display: inline-block;
  width: 140px;
  margin-right: 20px;
  text-align: center;
`;

const CompanyLogo = styled.div`
  display: inline-block;
  width: 100%;
  height: 77px;
  overflow: hidden;
  background-image: url(${props => props.companyImg});
  background-repeat: no-repeat;
  background-position: center center;
  background-size: contain;
  margin-bottom: 10px;
`;

const TabText = styled.span``;

const SeasonsPresenter = ({ showResult, result, loading, error }) =>
  loading ? (
    <>
      <Helmet>
        <title>Loading | Newfilx</title>
      </Helmet>
      <Loader />
    </>
  ) : error ? (
    <Message />
  ) : (
    <Container>
      <Helmet>
        <title>{result.name} | Newfilx</title>
      </Helmet>
      <Backdrop
        bgImage={`https://image.tmdb.org/t/p/original${result.poster_path}`}
      />

      <Content>
        <Cover
          bgImage={
            result.poster_path
              ? `https://image.tmdb.org/t/p/original${result.poster_path}`
              : require("../../assets/poster-small.png")
          }
        />
        <Data>
          <Title>
            {showResult.name} {result.name}
          </Title>
          <ItemContainer>
            <Item>
              {result.episodes[0].air_date +
                " ~ " +
                result.episodes[result.episodes.length - 1].air_date}
            </Item>
          </ItemContainer>
          <Overview>{result.overview}</Overview>
          <TabContainer>
            <TabMenu>
              <List>
                <TabItem current={"episode"}>Episode</TabItem>
              </List>
            </TabMenu>
            <TabContent current={"episode"}>
              {result.episodes && result.episodes.length > 0 ? (
                result.episodes.map((episode, i) => (
                  <CompanyContainer>
                    <CompanyLogo
                      companyImg={
                        episode.still_path &&
                        `https://image.tmdb.org/t/p/w300${episode.still_path}`
                      }
                      data-tip={episode.name}
                    />
                    <ReactTooltip />
                  </CompanyContainer>
                ))
              ) : (
                <TabText>Sorry, Can't find Episodes!</TabText>
              )}
            </TabContent>
          </TabContainer>
        </Data>
      </Content>
    </Container>
  );

SeasonsPresenter.propTypes = {
  result: PropTypes.object,
  loading: PropTypes.bool.isRequired
};

export default SeasonsPresenter;
