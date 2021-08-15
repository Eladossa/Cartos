import React, {
  useEffect,
  useState,
  useRef,
  useMemo,
  useContext,
  createContext,
  useLocation,
} from 'react';
import { useHistory } from 'react-router-dom';

import Header from './Header';
import Cart from './Cart';

import './Home.css';

function Home({ searchResults, setItemsAmount }) {
  const [itemsSearchResults, setResults] = useState([]);
  const [viewResults, setViewResult] = useState([]);
  const [hideRes, setHide] = useState(false);

  let itemsFound = [];

  function hideResults() {
    setHide(!hideRes);
  }

  return (
    <div className='home-style'>
      {/* <button onClick={hideResults} className='button-show'>
        Hide/Show products
      </button> */}

      {/* <div>{hideRes ? result : null} </div> */}
      <h1>Home</h1>
    </div>
  );
}
export default Home;
