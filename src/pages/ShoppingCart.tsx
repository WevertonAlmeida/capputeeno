import React, { useState } from "react";
import styled, {keyframes} from 'styled-components';
import { FiTrash2, FiArrowLeftCircle } from "react-icons/fi";
import MessageModal from '../components/MessageModal';

const ModalStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  @media (max-width: 1200px) {  
    flex-direction: column;
    justify-content: center;
  }
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
`;

const ShoppingHeader = styled.div`
  display: flex;
  flex-direction: column;
  text-align: left;
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

const TitleHeader = styled.h3`
  text-align: left;
  font-size: 14px;
  font-family: 'Saira';
  font-style: normal;
  font-weight: 500;
  font-size: 24px;
  line-height: 150%;
  text-transform: uppercase;
  color: #41414D;
  margin-bottom: 16px;
  margin-block-start: 0;
`;

const DescriptionHeader = styled.p`
  text-align: left;
  font-size: 14px;
  font-family: 'Saira';
  font-style: normal;
  font-weight: 300;
  font-size: 16px;
  line-height: 150%;
  color: #41414D;
  margin-bottom: 16px;
  margin-block-start: 0;
`;

const ShoppingContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const ShoppingInfoProduct = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 736px;
  height: 211px;
  margin: 8px 16px 8px 0;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
  padding-right: 16px;

  @media (max-width: 1200px) {  
    flex-direction: column;
    justify-content: center;
    width: auto;
    height: auto;
    margin: 8px 0;
    padding-right: 0;    
  }
`;

const ShoppingResume = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 300px;
  height: 700px;
  margin: 32px 0 32px 0;
  background-color: #fff;
  border-radius: 4px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
  padding: 16px;

  @media (max-width: 1200px) {
    width: auto;  
    height: auto;
    flex-direction: column;
    justify-content: center;
  }
`;

const ShoppingResumeHeader = styled.div`
  display: flex;
  align-items: stretch;
  flex-direction: column;
  justify-content: flex-start;
`;

const ShoppingResumeTitle = styled.h3`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  font-family: 'Saira';
  font-style: normal;
  font-weight: 600;
  font-size: 20px;
  text-transform: uppercase;
  color: #41414D;
  margin-block-start: 0;
`;

const ShoppingResumeSubtotal = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  font-family: 'Saira';
  font-style: normal;
  font-size: 16px;
  line-height: 150%;
  color: #41414D;
  margin-bottom: 12px;
`;

const ResumeSubtotalTitle = styled.span`
  font-weight: 400;
`;

const ResumeSubtotalPrice = styled.span`
  font-weight: 400;
`;

const ShoppingResumeEntrega = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  font-family: 'Saira';
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 150%;
  color: #41414D;
  margin-bottom: 12px;
`;

const ResumeEntregaTitle = styled.span`
  font-weight: 400;
`;

const ResumeEntregaPrice = styled.span`
  font-weight: 400;
`;

const ProductDivisor = styled.hr` 
  border: 1px solid #DCE2E6;
  margin: 0 0 12px 0;
`;

const ShoppingResumeTotal = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  font-family: 'Saira';
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 150%;
  color: #41414D;
  margin-bottom: 32px;
`;

const ResumeTotalTitle = styled.span`
  font-weight: 600;
`;

const ResumeTotalPrice = styled.span`
  font-weight: 600;
`;

const AddToCartButton = styled.button`   
  padding: 10px 20px;
  margin-bottom: 32px;
  font-family: 'Saira';
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 150%;
  text-transform: uppercase;
  color: #F5F5FA;
  background-color: #1ab159;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;

const ShoppingResumeFooter = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
  font-family: 'Saira';
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  text-transform: uppercase;
  color: #41414D;
  text-decoration: underline;
`;

const ResumeFooter1 = styled.span`
  font-weight: 400;
`;

const ResumeFooter2 = styled.span`
  font-weight: 400;
`;

const ResumeFooter3 = styled.span`
  font-weight: 400;
`;

const ResumeFooter4 = styled.span`
  font-weight: 400;
`;

const ProductImage = styled.img`
  height: 100%;
  border-radius: 8px 0px 0px 8px;
  margin-right: 16px;

  @media (max-width: 1200px) {
    border-radius: 8px 8px 0px 0px;
    width: 100%;
    height: auto;
    margin-right: 0;
  }
`;

const InfoProduct = styled.div`
  display: flex;
  flex-direction: column;
  
  @media (max-width: 1200px) {
    margin: 16px;
  }
`;

const TitleProduct = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const ProductName = styled.h3`
  display: flex;
  flex-direction: flex-start;
  justify-content: center;
  font-family: 'Saira';
  font-style: normal;
  font-weight: 300;
  font-size: 20px;
  line-height: 150%;
  color: #41414D;
`;

const RemoverProduto = styled.button`
  display: flex;
  justify-content: center;
  background-color: transparent;
  border: none;
  cursor: pointer;
  font-size: 16px;
  color: #DE3838;
`;

const DescriptionProduct = styled.p`
  text-align: justify;
  font-family: 'Saira';
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 150%;
  color: #41414D;
  margin-bottom: 16px;
  margin-block-start: 0;
`;

const QuantityPriceProduct = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  justify-content: space-between;
`;

const QuantityProduct = styled.select`
  margin-right: 16px;
  font-size: 16px;
  padding: 8px;
  width: 65px;
  height: 40px;
  border: 1px solid #A8A8B3;
  border-radius: 8px;
  box-sizing: border-box;
  background: #F3F5F6;
  font-family: 'Saira';
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 150%;
  text-transform: uppercase;
  color: #737380;
`;

const ProductPrice = styled.span`
  font-family: 'Saira';
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 150%;
  text-align: right;
  color: #09090A;
  margin-left: auto;
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
  background-color: #bf2d08;
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

interface Props {
  key: number;
  product: {    
    id: number;
    name: string;
    description: string;
    price_in_cents: number;
    image_url: string;
    category: string;
    quantity: number;
  };
  onRemove: (id: number) => void;
  onChangeQuantidade: (id: number, quantity: number) => void;
}

interface ProdutoCarrinho {
  id: number;
  name: string;
  description: string;
  price_in_cents: number;
  image_url: string;
  category: string;
  quantity: number;
}

const ShoppingCart: React.FC<Props> = ({ product, onRemove, onChangeQuantidade }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [produtos, setProdutos] = React.useState<ProdutoCarrinho[]>(() => {
    const produtosLocalStorage = localStorage.getItem('cart');
    if (produtosLocalStorage) {
      return JSON.parse(produtosLocalStorage);
    }
    return [];
  });

  const handleRemove = (id: number) => {
    const newProdutos = produtos.filter((produto) => produto.id !== id);
    setProdutos(newProdutos);
    localStorage.setItem('cart', JSON.stringify(newProdutos));

    setIsRemovedToCart(true);

    setTimeout(() => {
      setIsRemovedToCart(false);
    }, 2000);
  };

  const handleClearCart = () => {
    const newProdutos: React.SetStateAction<ProdutoCarrinho[]> = [];
    setProdutos(newProdutos);
    localStorage.setItem('cart', JSON.stringify(newProdutos));
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false); 
  }

  const handleChangeQuantidade = (id: number, quantidade: number) => {
    const newProdutos = produtos.map((produto) => {
      if (produto.id === id) {
        return { ...produto, quantity: quantidade };
      }
      return produto;
    });
    setProdutos(newProdutos);
    localStorage.setItem('cart', JSON.stringify(newProdutos));
  };

  const [isRemovedToCart, setIsRemovedToCart] = useState(false);

  const totalProdutos = produtos.reduce((total, produto) => total + produto.quantity, 0);
  const valorTotal = produtos.reduce((total, produto) => total + produto.price_in_cents * produto.quantity, 0) / 100;
  const valorFrete = valorTotal > 1 ? 40 : 0;

  return (
    <>
    <Container>
      <Wrapper>
        <ShoppingHeader>
          <BtnReturn onClick={() => window.history.back()}>
            <IconArrowLeftCircle><FiArrowLeftCircle /><span style={{marginLeft: "6px"}}>Voltar</span></IconArrowLeftCircle>
          </BtnReturn>      
          <TitleHeader>SEU CARRINHO</TitleHeader>
          <DescriptionHeader>Total (<b>{totalProdutos}</b> {totalProdutos > 1 ? 'produtos' : 'produto'}) <b>{valorTotal.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</b></DescriptionHeader>
        </ShoppingHeader>
        <ShoppingContent>
          {produtos.map((produto) => (
            <ShoppingInfoProduct key={produto.id}>
              <ProductImage src={produto.image_url} alt={produto.name} />
              <InfoProduct>
                <TitleProduct>
                  <ProductName>{produto.name}</ProductName>
                  <RemoverProduto onClick={() => handleRemove(produto.id)}>
                    <FiTrash2 />
                  </RemoverProduto>
                </TitleProduct>
                <DescriptionProduct>{produto.description}</DescriptionProduct>
                <QuantityPriceProduct>  
                  <QuantityProduct value={produto.quantity} onChange={(event) => handleChangeQuantidade(produto.id, parseInt(event.target.value))}>
                  {[...Array(10)].map((_, index) => (
                    <option key={index + 1} value={index + 1}>
                      {index + 1}
                    </option>
                  ))}
                </QuantityProduct>
                <ProductPrice>{((produto.price_in_cents * produto.quantity) / 100).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</ProductPrice> 
              </QuantityPriceProduct>         
              </InfoProduct>          
            </ShoppingInfoProduct>
          ))}
        </ShoppingContent>
      </Wrapper>
      <ShoppingResume>
        <ShoppingResumeHeader>
          <ShoppingResumeTitle>RESUMO DO PEDIDO</ShoppingResumeTitle>
          <ShoppingResumeSubtotal>
            <ResumeSubtotalTitle>Subtotal de produtos</ResumeSubtotalTitle>
            <ResumeSubtotalPrice>{(valorTotal).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</ResumeSubtotalPrice>
          </ShoppingResumeSubtotal>
          <ShoppingResumeEntrega>
            <ResumeEntregaTitle>Entrega</ResumeEntregaTitle>
            <ResumeEntregaPrice>{(valorFrete).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</ResumeEntregaPrice>
          </ShoppingResumeEntrega>   
          <ProductDivisor />  
          <ShoppingResumeTotal>
            <ResumeTotalTitle>Total</ResumeTotalTitle>
            <ResumeTotalPrice>{(valorTotal + valorFrete).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</ResumeTotalPrice>
          </ShoppingResumeTotal>

          <AddToCartButton onClick={() => handleClearCart()}>FINALIZAR A COMPRA</AddToCartButton> 
        </ShoppingResumeHeader> 
        <ShoppingResumeFooter>      
            <ResumeFooter1>AJUDA</ResumeFooter1>
            <ResumeFooter2>REEMBOLSOS</ResumeFooter2>
            <ResumeFooter3>ENTREGAS E FRETE</ResumeFooter3>
            <ResumeFooter4>TROCAS E DEVOLUÇÕES</ResumeFooter4> 
        </ShoppingResumeFooter>            
      </ShoppingResume> 
      {isRemovedToCart && 
        <Notification>
          Produto removido do carrinho
          <CloseButton onClick={() => setIsRemovedToCart(false)}>×</CloseButton>
          <ProgressBar>
            <Progress />
          </ProgressBar>
        </Notification>
      }    
    </Container>
    <MessageModal message="Obrigado pela compra!" isOpen={isModalOpen} onClose={handleCloseModal} />
    </>
  );
};

export default ShoppingCart;