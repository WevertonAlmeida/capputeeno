import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import styled, { keyframes } from "styled-components";
import { FiArrowLeftCircle } from 'react-icons/fi';
import AppLoader from "../components/Loader";

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  /*margin-top: 71px;*/
  margin-bottom: 89px;

  @media (max-width: 1200px) {  
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-top: 0;
    margin-bottom: 20px;
  }
`;

const BtnReturn = styled.div`
  text-decoration: none;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: auto;
  height: 18px;
  margin: 26.5px 11px 20px 0;
  font-family: 'Saira';
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  color: #617480;

  &:hover:not(:disabled) {
        background-color: transparent;
        border-color: #555;
        color: #555;
        cursor: pointer;
    }

    &:disabled {
        background-color: #E9E9F0;
        border-color: #E9E9F0;
        color: #555;
        cursor: not-allowed;
    }

    a {
      text-decoration: none;
      color: #555;
    }
`;

const IconArrowLeftCircle = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center; 
  color: #555;
`;

const ImageWrapper = styled.div`
  position: relative;
  width: 640px;
  height: 580px;
  margin-right: 32px;

  @media (max-width: 1200px) {
    width: 100%;
    height: 300px;
  }
`;

const Image = styled.img`
  width: 640px;
  height: 100%;
  object-fit: cover;

  @media (max-width: 1200px) {
    width: 100%;
    height: 100%;
  }
`;

const Details = styled.div`
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  justify-content: space-between;
`;

const Detail = styled.div`
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  justify-content: normal;
`;

const Category = styled.h3`
  width: 100%;
  margin-block-start: 0;
  margin-block-end: 0;
  margin-bottom: 12px;
  font-size: 16px;
  font-family: Saira;
  font-weight: 400;
  font-style: normal;
  display: flex;
  color: #555;

  @media only screen and (max-width: 1200px) {
    display: block; 
  }
`;

const Name = styled.h2`
  width: 100%;
  margin-block-start: 0;
  margin-block-end: 0;
  font-family: Saira;
  font-size: 32px;
  font-weight: 300;
  font-style: normal;
  line-height: 48px;
  display: flex;
  align-items: center;
  color: #41414D;

  @media only screen and (max-width: 1200px) {
    display: block; 
  }
`;

const Price = styled.p`
  width: 100%;
  margin-block-start: 0;
  margin-block-end: 0;
  margin-bottom: 24px;
  font-family: Saira;
  font-size: 20px;
  font-weight: 600;
  font-style: normal;
  display: flex;
  align-items: center;
  color: #09090A;

  @media only screen and (max-width: 1200px) {
    display: block; 
  }
`;

const Shipping = styled.div`
  width: 100%;
  margin-bottom: 24px;
  font-family: 'Saira';
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 150%;
  display: flex;
  align-items: center;
  color: #41414D;

  @media only screen and (max-width: 1200px) {
    display: block; 
  }
`;

const DescricaoTitulo = styled.h3`
  width: 100%;
  font-family: 'Saira';
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  display: flex;
  text-transform: uppercase;
  align-items: center;
  color: #737380;  
  margin-top: 8px;

  @media only screen and (max-width: 1200px) {
    display: block; 
  }
`;

const Description = styled.p`
  margin: 20px 0;
  margin-block-start: 0;
  margin-block-end: 0;
  width: 100%;
  font-family: Saira;
  font-size: 14px;
  font-weight: 400;
  font-style: normal;
  line-height: 21px;
  text-align: left;
  display: flex;
  align-items: center;
  color: #41414D;

  @media only screen and (max-width: 1200px) {
    text-align: justify; 
  }
`;

const AddToCartButton = styled.button`   
  padding: 10px 20px;
  /*margin-top: 12.4rem;*/
  width: 100%;
  font-family: Saira;
  font-size: 16px;
  font-weight: 500;
  font-style: normal;
  color: #fff;
  background-color: #115D8C;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #DD571C;
  }

  @media (max-width: 1200px) {
    margin-top: 20px;
    margin-left: 0;
  }
`;

const fadeIn = keyframes`
  from {
    opacity: 0;
    right: 0;
  }
  to {
    opacity: 1;
    right: 30px;
  }
`;

const fadeOut = keyframes`
  from {
    opacity: 1;
    right: 30px;
  }
  to {
    opacity: 0;
    right: 0;
  }
`;

const Notification = styled.div`
  position: fixed;
  top: 20px;
  right: 20px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
  padding: 16px;
  z-index: 9999;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  font-size: 16px;

  animation: ${fadeIn} 0.3s ease-in-out, ${fadeOut} 0.3s ease-in-out 2.7s forwards;

  & i {
    margin-left: 8px;
    cursor: pointer;
  }
`;

const ProgressBar = styled.div`
  width: 100%;
  height: 10px;
  background-color: #f1f1f1;
  border-radius: 5px;
`;

const Progress = styled.div`
  height: 100%;
  background-color: #00cc00;
  border-radius: 5px;
  animation: progress 2s linear infinite;
  @keyframes progress {
    0% {
      width: 0%;
    }
    100% {
      width: 100%;
    }
  }
`;

const CloseButton = styled.button`
  position: fixed;
  display: flex;
  align-items: flex-end;
  top: 20px;
  right: 20px;
  border: none;
  background: none;
  font-size: 20px;
  cursor: pointer;
  color: #333;
`;

interface RouteParams {
  id: string;
  [key: string]: string | undefined;
}

interface Product {
  id: number;
  name: string;
  description: string;
  price_in_cents: number;
  image_url: string;
  category: string;
  quantity: number;
}

function ProductDetails() {
    const { id } = useParams<RouteParams>();
    const [product, setProduct] = useState<Product | null>(null);
    const [cartItems, setCartItems] = useState<Product[]>([]);
    const [isAddedToCart, setIsAddedToCart] = useState(false);

    const getCartItems = () => {
      const items = localStorage.getItem("cart");
      if (items) {
        setCartItems(JSON.parse(items).filter((item: Product | null) => item !== null) as Product[]);
      }
    };

    useEffect(() => {
      const fetchProduct = async () => {
        const { data } = await axios.get(
          `http://localhost:3333/products/${id}`
        );
        setProduct(data);
      };

      fetchProduct();
    }, [id]);

    const handleFromCart = () => {
      if (product) {
        const productIndex = cartItems.findIndex((item) => item.id === product.id);
        if (productIndex >= 0) {
          const updatedCartItems = [...cartItems];
          updatedCartItems[productIndex].quantity += 1;
          setCartItems(updatedCartItems);
          localStorage.setItem('cart', JSON.stringify(updatedCartItems));
        } else {
          const updatedCartItems = [...cartItems, {...product, quantity: 1}];
          setCartItems(updatedCartItems);
          localStorage.setItem('cart', JSON.stringify(updatedCartItems));
        }

        setIsAddedToCart(true);

        setTimeout(() => {
          setIsAddedToCart(false);
        }, 2000);
      }
    };

    useEffect(() => {
      getCartItems();
    }, []);

    if (!product) {
      return <AppLoader />;
    }

    return (
      <>
        <BtnReturn onClick={() => window.history.back()}>
          <IconArrowLeftCircle><FiArrowLeftCircle /><span style={{marginLeft: "6px"}}>Voltar</span></IconArrowLeftCircle>
        </BtnReturn>
        <Wrapper>          
          <ImageWrapper>
              <Image src={product.image_url} />
          </ImageWrapper>
          <Details>
              <Detail>
              <Category>{product.category}</Category>
              <Name>{product.name}</Name>
              <Price>{(product.price_in_cents / 100).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</Price>
              <Shipping>*Frete de R$40,00 para todo o Brasil. Grátis para compras acima de R$900,00.</Shipping>
              <DescricaoTitulo>DESCRIÇÃO</DescricaoTitulo>
              <Description>{product.description}</Description>
              </Detail>
              <AddToCartButton onClick={() => handleFromCart()}>Adicionar ao carrinho</AddToCartButton>
          </Details>
          {isAddedToCart && 
            <Notification>
              Produto adicionado ao carrinho
              <CloseButton onClick={() => setIsAddedToCart(false)}>×</CloseButton>
              <ProgressBar>
                <Progress />
              </ProgressBar>
            </Notification>
          }
        </Wrapper>
        </>
    );
};

export default ProductDetails;