import { useContext } from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { ShopContext } from "./ShopContext";
import { underline, underlineTransition } from "./underline";
import Banner from "./Banner";
import allBrandPageBanner from "../data/banner6.jpeg";
//all brands page
//a route

const BrandsAllPage = () => {
  const { state } = useContext(ShopContext);


  //sorting brands alphabetically and seperate by letter in an array each
  const sortByLetter = state.brands.reduce((acc, brand) => {
    let firstLetter = brand[0].toUpperCase();
    if (!acc[firstLetter]) {
      acc[firstLetter] = { data: [brand] }
    }
    else {
      acc[firstLetter].data.push(brand)
    }
    return acc;
  }, {})

  return (
    <>
      <WrapAll>
        <Banner imageSrc={allBrandPageBanner} />
        <Wrapper>
          {/* sorting letters alphabetically and map each letter */}
          {Object.keys(sortByLetter).sort().map(letter => {
            return (
              <LetterWrapper key={letter}>
                <Letter>{letter}</Letter>
                <ItemList>
                  {/* mapping array assigned to letter */}
                  {sortByLetter[letter].data.map(brand => {
                    return (
                      <ItemWrapper key={brand}>
                        <Item to={`/brands/${brand}`}>
                          <ItemAfter>
                            {brand}
                          </ItemAfter>
                        </Item>
                      </ItemWrapper>
                    )
                  })}
                </ItemList>
              </LetterWrapper>
            )
          })}
        </Wrapper>
      </WrapAll>
    </>
  )
}

const WrapAll = styled.div`
  padding: 0 var(--padding-page);
`;

const Letter = styled.div`
  border-bottom: 1px solid black;
  width: 100%;
  font-size: 24px;
`

const LetterWrapper = styled.div`
  width: 20%;
`

const Wrapper = styled.div`
  max-height: 800px;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  padding: 0 48px ;
  margin-top: 30px;
`

const ItemWrapper = styled.div`
  padding: 4px 0;
`

const ItemList = styled.div`
  width: fit-content;
  padding: 10px 0;
  
`

const Item = styled(NavLink)`
  text-decoration: none;
  overflow: hidden;
  width: fit-content;
  margin: 10px 0;
`

const ItemAfter = styled.div`
  width: fit-content;
  font-size: 18px;
  position: relative;
  color: black;
  &:after{
    ${underline};
  }
  &:hover:after{
    ${underlineTransition};

  }
`


export default BrandsAllPage;

