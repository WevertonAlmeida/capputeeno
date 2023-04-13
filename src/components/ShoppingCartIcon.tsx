import React, { useState, useEffect } from 'react';
import { FiShoppingBag } from 'react-icons/fi';
import styled from 'styled-components';
import { BrowserRouter, Link } from "react-router-dom";
import { useCart } from "../components/CartContext";

const CartIconWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: flex-end;
  flex-direction: row;
  justify-content: space-between;
  text-decoration: none;
  color: #737380;
`;

const Icon = styled.div`
  position: absolute; 
  background-color: red;
  color: white;
  border-radius: 50%;
  top: 12px;
  right: -5px;
  width: 12px;
  height: 12px;
  font-size: 8px;  
`;

const CartIcon = () => {
  const { itemCount } = useCart();

  return (
    <>
      <a href='/cart'>
        <CartIconWrapper>      
          <FiShoppingBag size={18} />
          {itemCount >= 0 && (
            <Icon className="IconCount">
              {itemCount}
            </Icon>
          )}      
        </CartIconWrapper>
      </a>
    </>
  );
};

export default CartIcon;