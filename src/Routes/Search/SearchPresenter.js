import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Helmet from "react-helmet";
import Section from "Components/Section";
import Loader from "Components/Loader";
import Message from "Components/Message";
import Poster from "Components/Poster";

const Container = styled.div`
  padding: 20px;
`;

const Form = styled.form`
  margin-bottom: 50px;
  width: 100%;
`;

const InputContainer = styled.div`
  padding: 5px 0;
  border-bottom: 1px solid #575756;
  opacity: 0.5;
  transition: all 200ms ease-in;

  &:hover,
  &:focus {
    opacity: 1;
  }
`;

const Input = styled.input`
  all: unset;
  font-size: 28px;
  width: 100%;
  background-image: url(http://mihaeltomic.com/codepen/input-search/ic_search_black_24px.svg);
`;

const SearchPresenter = ({
  movieResults,
  tvResults,
  loading,
  searchTerm,
  handleSubmit,
  error,
  updateTerm,
  prvTerm
}) => (
  <Container>
    <Helmet>
      <title>Search | Newflix</title>
    </Helmet>
    <Form onSubmit={handleSubmit}>
      <InputContainer>
        <Input
          placeholder="Search Movies and TV Shows..."
          value={searchTerm}
          onChange={updateTerm}
        />
      </InputContainer>
    </Form>
    {loading ? (
      <Loader />
    ) : (
      <>
        {movieResults && movieResults.length > 0 && (
          <Section title="Movie Results">
            {movieResults.map(movie => (
              <Poster
                key={movie.id}
                id={movie.id}
                title={movie.title}
                imageUrl={movie.poster_path}
                rating={movie.vote_average}
                year={movie.release_date && movie.release_date.substring(0, 4)}
                isMovie={true}
              />
            ))}
          </Section>
        )}
        {tvResults && tvResults.length > 0 && (
          <Section title="TV Show Results">
            {tvResults.map(show => (
              <Poster
                key={show.id}
                id={show.id}
                title={show.title}
                imageUrl={show.poster_path}
                rating={show.vote_average}
                year={
                  show.first_air_date && show.first_air_date.substring(0, 4)
                }
              />
            ))}
          </Section>
        )}
      </>
    )}
    {error && <Message color="#e74c3c" text={error} />}
    {tvResults &&
      movieResults &&
      tvResults.length === 0 &&
      movieResults.length === 0 && (
        <Message text={`Nothing found for: ${prvTerm}`} color="#95a5a6" />
      )}
  </Container>
);

SearchPresenter.propTypes = {
  movieResults: PropTypes.array,
  tvResults: PropTypes.array,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.string,
  searchTerm: PropTypes.string,
  handleSubmit: PropTypes.func.isRequired,
  updateTerm: PropTypes.func.isRequired,
  prvTerm: PropTypes.string.isRequired
};

export default SearchPresenter;
