import React, { useState, useMemo, memo } from 'react';
import { useLocation } from 'react-router-dom';
import './Search.css';

const Search = ({
  searchResults,
  itemsInCart,
  setItemsQuantity,
  itemsCartQuantity,
}) => {
  const [searchString, setString] = useState([]);
  let cartItems = [...itemsCartQuantity];
  console.log(' let cartItems ', cartItems);
  // const location = useLocation();

  const result = useMemo(() => {
    console.log(searchResults, 'searchResults');
    console.log('typeof +', typeof searchResults);
    return (
      <div style={{ paddingBottom: 56 }}>
        {' '}
        {searchResults.map((item, index) => {
          return (
            <div key={item.ProductID} className='product-row'>
              <img src={item.ProductImage} className='searched-product-img' />
              <div className='name-price-button'>
                {item.ProductName}
                <br />
                <div style={{ marginTop: '10px' }}> </div>
                <div className='price'> {item.Price}$ </div>
                <br />
                <button
                  onClick={() => addAndMergeItems(index)}
                  className='add-cart-btn'
                >
                  Add to Cart
                </button>
              </div>
              {/* <hr /> */}
            </div>
          );
        })}{' '}
      </div>
    );
    // setViewResult(itemsFound);
  }, [searchResults]);

  const addAndMergeItems = (i) => {
    // This function giving quantity property to all the duplicated products

    console.log('addAndMergeItems cartItems', [...cartItems]);
    const array = [...cartItems, { ...searchResults[i] }];
    console.log('array', array);

    // array.map((element) => {
    //   if (!element.Quantity) element.Quantity = 1;

    //   array.slice(array.indexOf(element) + 1).find((obj) => {
    //     if (obj.ProductID === element.ProductID) {
    //       console.log(array.indexOf(obj), array.indexOf(element));
    //       element.Quantity += 1;
    //       array.splice(array.indexOf(obj), 1);
    //     }
    //   }); // First product become last product if choosing it **again** after different product -!Wrong
    // });

    // console.log('array after map', array);
    // cartItems = [...array]; // Why must be like that and not setItemsQuantity([...array]) ? ASK
    // setItemsQuantity([...cartItems]);

    const finalArray = [];
    for (let i = 0; i < array.length; i++) {
      if (!array[i].Quantity) array[i]['Quantity'] = 1;

      for (let j = i + 1; j < array.length; j++) {
        // console.log('array[i]', array[i]);

        if (array[j].ProductID === array[i].ProductID) {
          array[i]['Quantity'] += 1;
          array.splice(j, 1);
          --j;
          //console.log('array[i]', array[i]);
        }
      }
      finalArray.push(array[i]);
    }

    cartItems = [...finalArray];
    setItemsQuantity([...cartItems]); // Setting itemsCartQuantity state with the chosen products and adding the product Counter property
    //setItemsQuantity([...finalArray]); //doesn't work
  };

  return <div className='page-style'>{result} </div>;
};

export default Search;
