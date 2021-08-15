import React, {
  useEffect,
  useState,
  useCallback,
  useMemo,
  useRef,
} from 'react';
import {
  BrowserRouter,
  Switch,
  Route,
  Router,
  Redirect,
  useHistory,
} from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Search from '../components/Search';
import Home from '../components/Home';
import Cart from '../components/Cart';
import PageNotFound from '../components/PageNotFound';
import useCartQuantity from '../customHooks/useCartQuantity';

import './App.css';

//localStorage.clear();
// To clean storage use - localStorage.clear(); !!!

const useStateWithLocalStorage = (userItems) => {
  const [itemsQuantity, setItemsQuantity] = useState(
    JSON.parse(localStorage.getItem(userItems)) || []
  );
  useEffect(() => {
    console.log('localStorage setItem');
    localStorage.setItem(userItems, JSON.stringify(itemsQuantity));
    console.log('localStorage.setItem', itemsQuantity);
  }, [itemsQuantity]);

  return [itemsQuantity, setItemsQuantity];
};

function App() {
  const history = useHistory();
  const [searchResults, setSearchResults] = useState([]);

  // const [itemsQuantity, setItemsQuantity] = useState(
  //   JSON.parse(localStorage.getItem('userItems')) || []
  // );

  // useEffect(() => {
  //   localStorage.setItem('userItems', JSON.stringify(itemsQuantity));
  // }, [itemsQuantity]);

  const [itemsQuantity, setItemsQuantity] = useStateWithLocalStorage(
    'itemsQuantityString'
  ); // When passing to the function above

  const { numberOfProducts, updateCartQuantity } =
    useCartQuantity(itemsQuantity);

  const [pageIndex, setPageIndex] = useState();

  const defaultRouter = (index) => {
    console.log(index);
    switch (index) {
      case 1:
        history.push({ pathname: '/search' }); //state: searchResults
        break;
      case 2:
        history.push({
          pathname: '/cart',
          state: { itemsQuantitys: itemsQuantity },
        });
        break;
      default:
        history.push('/');
        break;
    }
  };

  return (
    <div className='App'>
      <div className='header'>
        <Header
          setSearchResults={setSearchResults}
          itemsCartQuantity={itemsQuantity}
          setPageIndex={setPageIndex}
          defaultRouter={defaultRouter}
          numberOfProducts={numberOfProducts}
        />
      </div>
      <div className='contant-page'>
        <Switch>
          <Route exact path='/'>
            <Home />
          </Route>
          <Route exact path='/search'>
            <Search
              searchResults={searchResults}
              setItemsQuantity={setItemsQuantity}
              itemsCartQuantity={itemsQuantity}
            />
          </Route>
          <Route exact path='/cart'>
            <Cart
              setItemsQuantity={setItemsQuantity}
              itemsCartQuantity={itemsQuantity}
              numberOfProducts={numberOfProducts}
            />
          </Route>
          <Route component={PageNotFound} />
        </Switch>
      </div>
      {/* <Footer /> */}
    </div>
  );
}

export default App;
