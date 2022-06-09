import React from 'react'
import ComicsList from "../comicsList/ComicsList";
import Helmet from 'react-helmet';

function ComicsPage() {
  return (
    <>
    <Helmet>
        <meta
          name="description"
          content="Marvel Comics Page"
        />
    <title>Marvel All Comics Page</title>
        </Helmet>
    <ComicsList /> 
    </>
  )
}

export default ComicsPage