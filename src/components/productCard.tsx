import React from "react";
import styled from "styled-components";

interface Props {
  product: {
    id: number;
    name: string;
    price: number;
    imageUrl: string;
    description: string;
  };
}

const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid #ccc;
  padding: 16px;
  border-radius: 8px;
`;

const ImageContainer = styled.div`
  height: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Image = styled.img`
  height: 100%;
`;

const ProductTitle = styled.h2`
  font-size: 20px;
  margin-top: 16px;
  margin-bottom: 8px;
`;

const Price = styled.span`
  font-size: 16px;
  font-weight: bold;
`;

const ProductCard: React.FC<Props> = ({ product }) => {
  return (
    <CardContainer>
      <ImageContainer>
        <Image src={product.imageUrl} alt={product.name} />
      </ImageContainer>
      <ProductTitle>{product.name}</ProductTitle>
      <Price>R$ {product.price.toFixed(2)}</Price>
      <p>{product.description}</p>
    </CardContainer>
  );
};

export default ProductCard;
