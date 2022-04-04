import React, { useState, useEffect } from 'react';
import { Jumbotron, Container, CardColumns, Card, Button } from 'react-bootstrap';

import Auth from '../utils/auth';
import { removeBookId } from '../utils/localStorage';
import { useParams } from 'react-router-dom';

import { useQuery } from '@apollo/client';
import { QUERY_USER } from '../utils/queries';

import { useMutation } from '@apollo/client';
import { REMOVE_BOOK } from '../utils/mutations';

const SavedBooks = () => {
  const { username: userParam } = useParams();
  const [removeBook, { error }] = useMutation(REMOVE_BOOK);
  
  const { loading, data } = useQuery(QUERY_USER, {
    variables: { username: userParam }
  });

  const handleDeleteBook = async function(bookId) {
    console.log("delete book")
    removeBookId(bookId);

    const { data } = await removeBook({
      variables: { "bookId": bookId },
    });

    console.log("After delete book");
   };

  const user = data?.me || {};

  console.log("Log data", user?.savedBooks);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Jumbotron fluid className='text-light bg-dark'>
        <Container>
          <h1>Viewing saved books!</h1>
        </Container>
      </Jumbotron>
      <Container>
        <h2>
          {user.savedBooks.length
            ? `Viewing ${user.savedBooks.length} saved ${user.savedBooks.length === 1 ? 'book' : 'books'}:`
            : 'You have no saved books!'}
        </h2>
        <CardColumns>
          {user.savedBooks.map((book) => {
            return (
              <Card key={book.bookId} border='dark'>
                {book.image ? <Card.Img src={book.image} alt={`The cover for ${book.title}`} variant='top' /> : null}
                <Card.Body>
                  <Card.Title>{book.title}</Card.Title>
                  <p className='small'>Authors: {book.authors}</p>
                  <Card.Text>{book.description}</Card.Text>
                  <Button className='btn-block btn-danger' onClick={() => handleDeleteBook(book.bookId)}>
                    Delete this Book!
                  </Button>
                </Card.Body>
              </Card>
            );
          })}
        </CardColumns>
      </Container>
    </>
  );
};

export default SavedBooks;
