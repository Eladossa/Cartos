import React, {
  useEffect,
  useState,
  useRef,
  useMemo,
  memo,
  useCallback,
} from 'react';
import { Link } from 'react-router-dom';
import { FaShoppingCart } from 'react-icons/fa';
import useCartQuantity from '../customHooks/useCartQuantity';

import './Header.css';
import {
  BrowserRouter,
  Switch,
  Route,
  Router,
  useHistory,
} from 'react-router-dom';

const URL = 'http://localhost:63579/WebService.asmx';

function Header({
  setSearchResults,
  itemsInCart,
  itemsCartQuantity,
  setPageIndex,
  defaultRouter,
  numberOfProducts,
}) {
  const [productsObj, setObjs] = useState([]);
  const [searchString, setString] = useState('');
  //const [numberOfProducts, setNumberOfProducts] = useState('');
  const [index, setIndex] = useState('');
  const [productObjs, setProductObjs] = useState();
  let resultArray = [];

  // const productList = () => {
  //   fetch('http://localhost:50496/WebService.asmx/ProductList')
  //     .then((response) => response.text())
  //     .then((data) => {
  //       console.log('fetch setSearchResults', data);
  //     });
  // };

  const productList = () => {
    console.log('fetch localhost');
    fetch('http://localhost:50496/WebService.asmx/ProductList')
      .then((response) => response.text())
      .then(
        (xml) =>
          new window.DOMParser().parseFromString(xml, 'text/xml')
            .documentElement.firstChild.textContent
      )
      .then((jsonStr) => JSON.parse(jsonStr))
      .then((data) => setSearchResults(data));
  };

  useEffect(() => {
    productList();
    console.log('useEffect');
  }, []);
  // }, [setSearchResults(productsObj)]);

  // const numberofItems = useMemo(() => {
  //   console.log('numberofItems = useMemo');
  //   if (itemsInCart === undefined) {
  //     // (itemsInCart.?current.length === 0)
  //     setNumberOfProducts('');
  //     console.log('itemsInCart', itemsInCart);
  //     return itemsQuantity;
  //   } else if (itemsInCart.current.length > 99) {
  //     setNumberOfProducts('99+');
  //     return itemsQuantity;
  //   } else {
  //     setNumberOfProducts(itemsInCart.current.length);
  //     console.log(itemsInCart.current.length);
  //     return itemsQuantity;
  //   }
  // }, [itemsInCart?.current]);

  const onChangHandler = (e) => {
    setString(e.target.value);
    console.log(searchString);
  };

  const activeSearch = useMemo(() => {
    // This function is searching for the product user searched by letters in the input
    console.log('activeSearch');
    console.log('searchString', searchString);
    if (searchString.length > 0) {
      console.log(productsObj);
      resultArray = productsObj.filter((obj) =>
        obj.ProductName.toLowerCase().includes(searchString.toLowerCase())
      );
      console.log('result', resultArray);
      if (resultArray.length !== 0) {
        console.log('typeof', typeof resultArray);
        setSearchResults(resultArray);
      }
    }

    resultArray = [];
  }, [searchString]);

  return (
    <div>
      <header className='header-shop'>
        {/*<Link onClick={() => defaultRouter()} className='text-to-home'>*/}{' '}
        <Link to='/' className='text-to-home'>
          Welcome to Vitamins Store
        </Link>
        <br />
        <input
          style={{}}
          placeholder='Search here'
          // ref={}
          value={searchString}
          onChange={(e) => onChangHandler(e)}
        />
        <button onClick={activeSearch}>Search</button>
        <Link to={{ pathname: '/cart' }}>
          <div className='cart-icon' value={numberOfProducts}>
            <FaShoppingCart size={40} />
          </div>
        </Link>
        <br />
        <button
          style={{ float: 'left' }}
          onClick={() => {
            localStorage.clear();
            window.location.reload();
          }}
        >
          Clear localStorage
        </button>
        <button
          style={{ marginRight: '100px' }}
          onClick={() => defaultRouter(1)}
        >
          Show all products
        </button>
      </header>
    </div>
  );
}
export default Header;
