import React, { useState } from "react";
import styled from "styled-components";

const Wrapper = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-grow: 1;
  margin: 2rem 0;

  ul {
    display: flex;
    list-style: none;
    margin: 0;
    padding: 0;

    li {
      margin-right: 1rem;
      font-family: 'Saira';
      font-style: normal;
      font-weight: none;
      font-size: 16px;
      line-height: 22px;
      text-transform: uppercase;
      cursor: pointer;
      position: relative;

      &:hover {
        &:after {
          width: 100%;
        }
      }
      &.active {
        &:after {
          width: 100%;
          background-color: #DD571C;
        }
      }

      &:after {
        content: '';
        position: absolute;
        bottom: -4px;
        left: 0;
        width: 0;
        height: 2px;
        background-color: #DD571C;
        transition: width 0.2s ease-out;
      }
    }
  }

  @media only screen and (max-width: 1200px) {
    display: flex;
    justify-content: center;
    align-items: center;
    max-width: 100%;
    margin-right: auto;
    margin-left: auto;    
  }
`;

type Props = {
  categories: string[];
  activeCategory: string;
  onCategoryClick: (category: string) => void;
};

const Menu: React.FC<Props> = ({
  categories,
  activeCategory,
  onCategoryClick,
}) => {
  const [activeIndex, setActiveIndex] = useState<number>(1);
  return (    
    <Wrapper>
      <ul>
        <li
          className={activeCategory === "" ? "active" : ""}
          onClick={() => { 
            setActiveIndex(0);
            onCategoryClick("");
          }}
        >
        </li>
        {categories.map((category, index) => (
          <li
            key={category}
            className={activeCategory === category || activeIndex === index + 1 ? "active" : ""}
            onClick={() => {
                setActiveIndex(index + 1);
                onCategoryClick(category);
            }}
          >
            {category}
          </li>
        ))}
      </ul>
    </Wrapper>
  );
};

export default Menu;