import React, { useEffect, useState, memo, useReducer } from 'react';
//import { useLocation } from 'react-router-dom';
import './Cart.css';

const Cart = ({ itemsCartQuantity, setItemsQuantity, numberOfProducts }) => {
  const [userCart, setUserCart] = useState();
  console.log('Cart itemsCartQuantity', itemsCartQuantity);

  let finalArray = itemsCartQuantity.map((e) => Object.assign({}, e));
  let removedProArr = [];

  console.log('removedProArr', removedProArr);

  useEffect(() => {
    console.log('Cart', finalArray);
    if (finalArray.length > 0) itemsReadyInCart();
  }, []);

  const itemsReadyInCart = () => {
    console.log('finalArray', finalArray);
    return setUserCart(
      <div style={{ paddingBottom: 56 }}>
        {finalArray.map((obj, index) => {
          return (
            <div key={index} className='product-row'>
              {!obj['Removed'] ? (
                <div className='object-elements'>
                  <img src={obj.ProductImage} className='product-img' />
                  <div className='product-name'>{obj.ProductName}</div>
                  <div className='price'>Price - {obj.Price}$</div>
                  <div className='quantity-button'>
                    <button
                      className='add-remove'
                      onClick={() => addRemoveQuantity(index, 'remove')}
                    >
                      -
                    </button>
                    {obj.Quantity}
                    <button
                      className='add-remove'
                      onClick={() => addRemoveQuantity(index, 'add')}
                    >
                      +
                    </button>
                  </div>
                  <div
                    style={{ cursor: 'pointer' }}
                    className='remove'
                    onClick={() => removeItem(index)}
                  >
                    Remove{' '}
                  </div>
                </div>
              ) : (
                <div>
                  <div className='removed-product'> Removed</div>
                  <div className='removed'> {obj['Removed']}</div>
                  <div
                    className='undo'
                    onClick={() => undoRestore(index, obj.ProductID)}
                  >
                    Undo
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    );
  };

  const removeItem = (index) => {
    const removed = finalArray[index];
    removedProArr.push(Object.assign({}, finalArray[index]));

    let updatedCartArr = finalArray.map((e) => Object.assign({}, e)); // Deep copy of finalArray
    //let updatedCartArr = JSON.parse(JSON.stringify(finalArray));// Or deep copy this way
    updatedCartArr.splice(index, 1);

    console.log('updatedCartArr after splice', updatedCartArr);
    finalArray.splice(index, 1, {
      Removed: removed.ProductName,
      ProductID: removed.ProductID,
      //Quantity: 0,
    });
    itemsReadyInCart();

    console.log('updatedCartArr', updatedCartArr);
    //console.log('updatedCartArr', updatedCartArr); // How the 'Removed' property got in here ??!
    setItemsQuantity([
      ...itemsCartQuantity.filter((obj) => updatedCartArr.includes(obj)),
    ]);
  };

  const undoRestore = (index, i) => {
    console.log('removedProArr', removedProArr);
    let undoProduct = removedProArr.find((element) => element.ProductID === i); //Searching the removed product
    removedProArr.splice(removedProArr.indexOf(undoProduct), 1); // Removing the product from the array
    finalArray.splice(index, 1, undoProduct); // Replacing a removed product with the previous removed one
    setItemsQuantity([...finalArray]);

    itemsReadyInCart();
  };

  const addRemoveQuantity = (index, type) => {
    switch (type) {
      case 'add':
        finalArray[index]['Quantity'] += 1;

        break;
      case 'remove':
        if (finalArray[index]['Quantity'] > 1) {
          --finalArray[index]['Quantity'];
          break;
        } else return;

      default:
        break;
    }
    itemsReadyInCart();

    const chosenItemsArr = finalArray.filter((e) => {
      return !e.Removed;
    }); // Copy only objects that weren't removed

    //finalArray.filter((e) => !e.hasOwnProperty('Removed')); // Or this way

    console.log('finalArray.filter', chosenItemsArr);
    setItemsQuantity([...chosenItemsArr]);
    console.log('itemsCartQuantity', itemsCartQuantity);

    //  using  spread operator
    // let item = {...finalArray[index]}
    //   using  Object.assign() method
    // let item = Object.assign({}, finalArray[index]);
    //   using JSON
    // let item = JSON.parse(JSON.stringify(finalArray[index]));

    //}
    // localStorage.setItem(
    //   'itemsQuantityString',
    //   JSON.stringify(itemsCartQuantity)
    // );
  };
  return (
    <div className='cart-style'>
      <h1 style={{ marginLeft: '30px' }}>
        {numberOfProducts > 0 ? numberOfProducts : 0} Items in your cart <br />
        Product(s)
      </h1>
      {userCart}
    </div>
  );
};

export default memo(Cart);
