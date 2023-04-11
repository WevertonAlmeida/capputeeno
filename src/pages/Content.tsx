import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import MenuCategory from '../components/MenuCategory';
import ProductSearchBar from '../components/ProductSearchBar';
import CartIcon from '../components/ShoppingCartIcon';
import ProductDetails from "../pages/ProductDetails";
import ShoppingCart from "../pages/ShoppingCart";
import { BrowserRouter, Switch, Route, Link } from "react-router-dom";

const Header = styled.div`
  background-color: #ffffff;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  font-size: calc(10px + 2vmin);
  color: rgb(12, 12, 12);

  @media only screen and (max-width: 1200px) {
    flex-wrap: nowrap;
    flex-direction: column;    
  }
`;

const Logo = styled.div`    
  font-size: calc(10px + 2vmin);
  font-family: Saira Stencil One;
  font-weight: 400;
  font-style: normal;
  color: rgb(93, 93, 109);
  pointer-events: none;
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  padding: 0 0 0 100px;  

  @media only screen and (max-width: 1200px) {
    justify-content: center;
    padding: 0 0 0 0;
    width: 100%;
    font-size: calc(10px + 1vmin); 
  }
`;

const Search = styled.div`  
  display: flex;
  align-items: center;
  justify-content: flex-end;
  color: rgb(93, 93, 109);
  padding-right: 100px;

  @media only screen and (max-width: 1200px) {
    justify-content: center;
    padding-right: 0;
    flex-basis: 100%; 
  }
`;

const Body = styled.div`
  background-color: #DEDEDE;
  min-height: 100vh;
  margin: 0 100px 0 100px;
  display: flex;
  flex-direction: column;
  align-items: left;
  justify-content: space-between;
  font-size: calc(10px + 2vmin);
  color: rgb(12, 12, 12);

  @media only screen and (max-width: 1200px) {
    padding-right: 0;
    margin: 0 12px;
    align-items: center;
    width: 100%;
    flex-basis: 100%; 
  }
`;

const ProductCatalogWrapper = styled.div`
  display: flex;  
  flex-wrap: wrap;
  justify-content: space-between;

  @media only screen and (max-width: 1200px) {
    flex-direction: column;    
  }
`;

const ProductCard = styled.div`
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  width: 256px;
  margin-bottom: 20px;
  transition: all 0.3s;
`;

const ProductTitle = styled.h3`
  font-family: 'Saira';
  font-style: normal;
  font-weight: 300;
  font-size: 16px;
  align-items: left;
  color: #41414D;
  padding: 0 12px 0 12px;
  display: flex;
`;

const ProductDivisor = styled.hr` 
  border: none;
  border-top: 1px solid #41414D;
  margin: 0 12px 0 12px;
`;

const ProductPrice = styled.h3`
  font-family: 'Saira';
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  align-items: left;
  color: #09090A;
  padding: 0 12px 0 12px;
  display: flex;
`;

const Pagination = styled.div`
  display: flex;
  justify-content: flex-end;
  margin: 0 0 2rem 0;

  @media only screen and (max-width: 1200px) {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 2rem 0;  
  }
`;

const PageButton = styled.button`
    background-color: #E9E9F0;
    border: 1px solid #E9E9F0;
    border-radius: 5px;
    color: #737380;
    font-size: 18px;
    height: 32px;
    margin: 0 2px;
    width: 32px;
    transition: all 0.3s ease;

    &.arrow-button {
        margin: 0 8px;
    }

    &:hover:not(:disabled) {
        background-color: #F8F8F8;
        border-color: #DD571C;
        color: #DD571C;
        cursor: pointer;
    }

    &:disabled {
        background-color: #E9E9F0;
        border-color: #E9E9F0;
        color: #737380;
        cursor: not-allowed;
    }

    &.active {
        background-color: #DD571C;
        border-color: #DD571C;
        color: #fff;
    }
`;

const PaginationSpace = styled.div`
  margin-left: 8px;
`;

const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border: none;
  border-radius: 4px;

  &:not(:last-child) {
    margin-right: 0px;
  }

  &:not(:first-child) {
    margin-left: 0px;
  }
`;

const ImageContainer = styled.div`
  height: 300px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Image = styled.img`
  height: 100%;
  width: 100%;
  border-radius: 4px 4px 0 0;
`;

const Price = styled.span`
  font-size: 16px;
  font-weight: bold;
  border: none;
`;

const SortContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;

  @media only screen and (max-width: 1200px) {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;   
  }
`;

const SortSelect = styled.select`
  display: flex;
  justify-content: flex-end;
  background-color: transparent;
  border: none;
  outline: none;
  color: #737380;
  font-size: 16px;
`;

interface Product {
  id: number;
  name: string;
  description: string;
  price_in_cents: number;
  image_url: string;
  category: string;
}

interface ProductCatalogProps {
  category?: string;
}

interface Props {
    product: {
      id: number;
      name: string;
      price_in_cents: number;
      image_url: string;
      description: string;
    };
}

const ProductCatalog: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [page, setPage] = useState(1);
    const [category, setCategory] = useState("");
    const [categories, setCategories] = useState<string[]>([]);
    const [query, setQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState<string>("Todos os Produtos");

    const options = [  { value: '', label: 'Organizar por' }, 
                       { value: 'created_at', label: 'Novidades' },  
                       { value: 'price_in_cents_maior', label: 'Preço: Marior - menor' },  
                       { value: 'price_in_cents_menor', label: 'Preço: Menor - maior' },  
                       { value: 'sales', label: 'Mais vendidos' },
                    ];
    const [sortBy, setSortBy] = useState<string>(options[0].value);

    const filteredProducts =
        selectedCategory === "Todos os Produtos"
        ? products
        : products.filter((product) => product.category === selectedCategory);

    const totalProducts = filteredProducts.length;
    const totalPages = Math.ceil(totalProducts / 12);

    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {        
        pageNumbers.push(i);
    }

    const startIndex = (page - 1) * 12;
    const endIndex = startIndex + 12;
    const displayedProducts = filteredProducts.slice(startIndex, endIndex);

    useEffect(() => {
        const queryParams = {
          _page: page,
          _limit: 60,
          _sort: sortBy,
          _order: 'desc',
          q: ''
        };

        if (query) {
          queryParams['q'] = query;
        }

        // Opções de ordenação
        if (sortBy === 'created_at') {
          queryParams._sort = 'created_at';
          queryParams._order = 'desc';
        } else if (sortBy === 'price_in_cents_maior') {
          queryParams._sort = 'price_in_cents';
          queryParams._order = 'desc';
        } else if (sortBy === 'price_in_cents_menor') {
          queryParams._sort = 'price_in_cents';
          queryParams._order = 'asc';
        } else if (sortBy === 'sales') {
          queryParams._sort = 'sales';
          queryParams._order = 'desc';
        }

        axios
        .get('http://localhost:3333/products', { params: queryParams })
        .then((response) => {
            setProducts(response.data);
            
            const categories = response.data.reduce((acc: string[], product: Product) => {
                if (!acc.includes(product.category)) {
                    acc.push(product.category);
                }
                return acc;
            }, []);
    
            setCategories(["Todos os Produtos"].concat(categories));
        });
    }, [query, sortBy]);

    const handleSearch = () => {
        setPage(1);
    };

    const handlePrevPage = () => {
        setPage((prevPage) => prevPage - 1);
    };

    const handleNextPage = () => {
        setPage((prevPage) => prevPage + 1);
    };

    const handlePageClick = (pageNumber: number) => {
        setPage(pageNumber);
    };

    const handleCategoryClick = (categoryName: string) => {
        setSelectedCategory(categoryName);
        setPage(1);
    };

    const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSortBy(e.target.value);
        setPage(1);
    };

    return (
      <> 
        <Header>
          <a href='/' style={{textDecoration: "none"}}>                           
          <Logo> 
            <h1>Capputeeno</h1>                           
          </Logo> 
          </a>    
          <Search>            
            <ProductSearchBar handleSearch={handleSearch} query={query} setQuery={setQuery} /> 
            <CartIcon />  
          </Search>   
        </Header>
        <Body> 
          <BrowserRouter>
            <Switch>
              <Route exact path="/">                                       
                <SortContainer>  
                  <MenuCategory categories={categories} activeCategory={selectedCategory} onCategoryClick={handleCategoryClick} />          
                  <SortSelect value={sortBy} onChange={handleSortChange} >
                    {options.map((option) => (
                        <option key={option.value} value={option.value}>
                        {option.label}
                        </option>
                    ))}
                  </SortSelect>            
                </SortContainer>
                <Pagination>            
                  {pageNumbers.map((pageNumber) => (               
                  <PageButton
                      key={pageNumber}
                      onClick={() => handlePageClick(pageNumber)}   
                      className={page === pageNumber ? "active" : ""}      
                  >
                      {pageNumber}
                  </PageButton>
                  ))}
                  <PaginationSpace />
                  <PageButton onClick={handlePrevPage} disabled={page === 1}>
                  {'<'}
                  </PageButton>
                  <PageButton onClick={handleNextPage} disabled={endIndex >= totalProducts}>
                  {'>'}
                  </PageButton>
                </Pagination>          
                <ProductCatalogWrapper>        
                  {displayedProducts.map((product) => (          
                      <CardContainer key={product.id}>                                                       
                        <ProductCard key={product.id}>
                          <Link to={`/details/${product.id}`}>
                            <ImageContainer>
                                <Image src={product.image_url} alt={product.name} />
                            </ImageContainer>
                          </Link> 
                          <ProductTitle>{product.name}</ProductTitle>
                          <ProductDivisor />
                          <ProductPrice>{(product.price_in_cents / 100).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</ProductPrice>
                        </ProductCard>                  
                      </CardContainer>          
                  ))}
                </ProductCatalogWrapper>               
                <Pagination>            
                    {pageNumbers.map((pageNumber) => (                
                    <PageButton
                        key={pageNumber}
                        onClick={() => handlePageClick(pageNumber)}   
                        className={page === pageNumber ? "active" : ""}      
                    >
                        {pageNumber}
                    </PageButton>
                    ))}
                    <PaginationSpace />
                    <PageButton onClick={handlePrevPage} disabled={page === 1}>
                    {'<'}
                    </PageButton>
                    <PageButton onClick={handleNextPage} disabled={endIndex >= totalProducts}>
                    {'>'}
                    </PageButton>
                </Pagination>  
              </Route>
              <Route exact path="/details/:id" component={ProductDetails} />
              <Route exact path="/cart" component={ShoppingCart} />
            </Switch>             
          </BrowserRouter>    
        </Body>              
      </>
    );
};
  

export default ProductCatalog;