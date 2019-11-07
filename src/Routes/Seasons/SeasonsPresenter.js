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
  height: 110px;
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

// loading ? (
//   <>
//     <Helmet>
//       <title>Loading | Newfilx</title>
//     </Helmet>
//     <Loader />
//   </>
// ) : error ? (
//   <Message />
// ) : (
//   <Container>
//     {showResult.name}
//     {/* <Helmet>
//       <title>{result.name} | Newfilx</title>
//     </Helmet>
//     <Content>
//       <Cover
//         bgImage={
//           result.poster_path
//             ? `https://image.tmdb.org/t/p/original${result.poster_path}`
//             : require("../../assets/poster-small.png")
//         }
//       />
//       <Data>
//         <Title>
//           {showResult.name} {result.name}
//         </Title>
//         <ItemContainer>
//           <Item>{result.air_date}</Item>
//         </ItemContainer>
//         <Overview>{result.overview}</Overview>
//         <TabContainer>
//           <TabMenu>
//             <List>
//               <TabItem>Episode</TabItem>
//               <TabContent>
//                 {result.episodes && result.episodes.length > 0 ? (
//                   result.episodes.map((episode, i) => (
//                     <CompanyContainer>
//                       <CompanyLogo
//                         companyImg={
//                           episode.still_path &&
//                           `https://image.tmdb.org/t/p/w300${episode.still_path}`
//                         }
//                         data-tip={episode.name}
//                       />
//                       <ReactTooltip />
//                     </CompanyContainer>
//                   ))
//                 ) : (
//                   <TabText>Sorry, Can't find Episodes!</TabText>
//                 )}
//               </TabContent>
//             </List>
//           </TabMenu>
//         </TabContainer>
//       </Data>
//     </Content> */}
//   </Container>
// );

SeasonsPresenter.propTypes = {
  result: PropTypes.object,
  loading: PropTypes.bool.isRequired
};

export default SeasonsPresenter;
