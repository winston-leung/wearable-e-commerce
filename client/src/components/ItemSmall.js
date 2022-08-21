// -----------------------------------------------------------
// ---- Component for every small product card in the app ----
// -----------------------------------------------------------

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const ItemSmall = ({ imageSrc, name, price, companyId, id }) => {
  let navigate = useNavigate();
  const [brandName, setBrandName] = useState(""); // set brand name, using the companyId

  // Handler for when product card is clicked
  const handleClickItem = (ev) => {
    ev.preventDefault();
    navigate(`/item/${id}`);
    window.scrollTo(0, 0);
    setBrandName("");
  };

  // Handler for when brand name (on product card) is clicked
  const handleClickBrand = (ev) => {
    ev.preventDefault();
    navigate(`/brands/${brandName}`);
    ev.stopPropagation();
  };

  // FETCH brand name using companyId
  useEffect(() => {
    if (companyId) {
      fetch(`/api/get-brand-name/${companyId}`)
        .then((res) => res.json())
        .then((data) => {
          setBrandName(data.data);
        });
    }
    // eslint-disable-next-line
  }, []);

  return (
    brandName && (
      <Wrapper onClick={handleClickItem}>
        <Image src={imageSrc} alt={name} />
        <Name>{name}</Name>
        <Company onClick={handleClickBrand}>{brandName.toUpperCase()}</Company>
        <Price>{price}</Price>
      </Wrapper>
    )
  );
};

// -----------------------------------------------------------

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 300px;
  margin: 10px;
  padding: 10px;
  box-shadow: rgba(14, 30, 37, 0.12) 0px 2px 4px 0px,
    rgba(14, 30, 37, 0.32) 0px 2px 16px 0px;
  cursor: pointer;
`;

const Image = styled.img`
  height: 170px;
  margin-bottom: 20px;
  border-radius: 10px;
  transition: transform 0.5s;
  &:hover {
    transform: scale(1.05);
  }
`;

const Company = styled.div`
  font-weight: 900;
  transition: transform 0.2s;
  &:hover {
    transform: scale(1.05);
  }
`;

const Name = styled.div`
  margin: 10px 0px;
  height: fit-content;
  text-align: center;
  max-width: 250px;
  line-height: 1.2;
`;
const Price = styled.div`
  margin: 5px 0px;
`;

export default ItemSmall;
