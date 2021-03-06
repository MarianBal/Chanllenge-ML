import React, { useState, useEffect } from 'react';

import Product from '../Product/Product';
import Breadcrumb from '../Breadcrumb/Breadcrumb';
import Header from '../Header/Header';
import Spinner from '../Spinner/Spinner';
import apiCall from '../../utils/apiCall';
import { classNames } from './../../constants/classNames';

const Content = props => {
  const [results, setResults] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const search = props.match.params.category;

  const { content } = classNames.content;

  const url = `${process.env.REACT_APP_URL}/search/${search}`;

  useEffect(() => apiCall(url, setLoaded, setResults), [url]);

  return (
    <>
      <Header />
      {loaded ? (
        <div>
          <Breadcrumb category={results.items[0].category_id} />
          <div className={content}>
            {results.items.map(element => (
              <Product result={element} />
            ))}
          </div>
        </div>
      ) : (
        <Spinner />
      )}
    </>
  );
};
export default Content;
