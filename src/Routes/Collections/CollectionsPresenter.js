import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Loader from "Components/Loader";
import Section from "Components/Section";
import Helmet from "react-helmet";
import Message from "Components/Message";
import Poster from "Components/Poster";

const Container = styled.div`
  padding: 20px;
`;

const CollectionsPresenter = ({ collectionName, result, loading, error }) => (
  <Container>
    <Helmet>
      <title>Collections | Newflix</title>
    </Helmet>
    {loading ? (
      <Loader />
    ) : (
      <>
        {result && result.length > 0 && (
          <Section title={collectionName}>
            {result.map(movie => (
              <Poster
                key={movie.id}
                id={movie.id}
                imageUrl={movie.poster_path}
                title={movie.title}
                rating={movie.vote_average}
                year={movie.release_date && movie.release_date.substring(0, 4)}
                isMovie={true}
              />
            ))}
          </Section>
        )}
      </>
    )}
    {error && <Message color="#e74c3c" text={error} />}
    {result && result.length === 0 && (
      <Message text="Nothing found" color="#95a5a6" />
    )}
  </Container>
);

CollectionsPresenter.propTypes = {
  collectionName: PropTypes.string.isRequired,
  result: PropTypes.array,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.string
};

export default CollectionsPresenter;
