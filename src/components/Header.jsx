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
   const [index, setIndex] = useState('');
  const [productObjs, setProductObjs] = useState();
  let resultArray = [];

  

  const productList = () => {
     setSearchResults(arraySet);
  };

  useEffect(() => {
    productList();
    console.log('useEffect');
  }, []);
 

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

const arraySet =     [{"ProductID":1,"ProductName":"Vitamin C","CategoryName":"Vitamins","Price":10,"Stock":268,"ProductDescription":"","ProductOverview":"","ProductImage":"https://image.flaticon.com/icons/png/512/1052/1052788.png"},
{"ProductID":2,"ProductName":"Protein powder","CategoryName":"Protein Blends","Price":26,"Stock":290,"ProductDescription":"","ProductOverview":"","ProductImage":"https://image.flaticon.com/icons/png/512/1181/1181620.png"},
     {"ProductID":3,"ProductName":"Multi Vitamins Lorem","CategoryName":"Multivitamin","Price":17.5,"Stock":290,"ProductDescription":"","ProductOverview":"","ProductImage":"https://image.freepik.com/free-vector/realistic-vitamin-complex-package_52683-35112.jpg"},
     {"ProductID":4,"ProductName":"Multi Vitamins","CategoryName":"Multivitamin","Price":18,"Stock":203,"ProductDescription":"","ProductOverview":"","ProductImage":"https://image.freepik.com/free-vector/realistic-design-vitamin-complex-package_23-2148484769.jpg"},
     {"ProductID":5,"ProductName":"Complex B","CategoryName":"Vitamins","Price":12.8,"Stock":2,"ProductDescription":"","ProductOverview":"","ProductImage":"https://image.freepik.com/free-psd/amber-medicine-bottle-mockup_358694-422.jpg"},
     {"ProductID":6,"ProductName":"Vitamin D","CategoryName":"Vitamins","Price":19,"Stock":120,"ProductDescription":"","ProductOverview":"","ProductImage":"https://image.freepik.com/free-psd/amber-medicine-bottle-mockup_358694-432.jpg"},
     {"ProductID":7,"ProductName":"Zinc 23 mg","CategoryName":"Vitamins","Price":23,"Stock":200,"ProductDescription":"","ProductOverview":"","ProductImage":"https://image.freepik.com/free-psd/suplement-bottle-mockup_368303-59.jpg"}];
  };