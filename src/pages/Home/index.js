import React, { useState, useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialIcons';
import * as CartActions from '../../store/modules/cart/actions';

import api from '../../services/api';
import { formatPriceBRL } from '../../util/format';

import {
  Container,
  ProductList,
  ProductContainer,
  ProductImage,
  ProductTitle,
  ProductPrice,
  AddCartButton,
  AddCartText,
  ProductAmount,
  ProductAmountText,
} from './styles';

export default function Home() {
  const dispatch = useDispatch();

  const [products, setProducts] = useState([]);

  const amount = useSelector((state) =>
    state.cart.reduce((sumAmount, product) => {
      sumAmount[product.id] = product.amount;

      return sumAmount;
    }, {})
  );

  useEffect(() => {
    async function getProducts() {
      try {
        const response = await api.get('products');

        const data = response.data.map((product) => ({
          ...product,
          priceBRL: formatPriceBRL(product.price),
        }));

        setProducts(data);
      } catch (error) {
        console.tron.error(error.response.data);
      }
    }

    getProducts();
  }, []);

  function handleAddProduct(id) {
    dispatch(CartActions.addToCartRequest(id));
  }

  function renderProduct({ item }) {
    return (
      <ProductContainer>
        <ProductImage source={{ uri: item.image }} />
        <ProductTitle>{item.title}</ProductTitle>
        <ProductPrice>{item.priceBRL}</ProductPrice>
        <AddCartButton onPress={() => handleAddProduct(item.id)}>
          <ProductAmount>
            <Icon name="add-shopping-cart" color="#fff" size={20} />
            <ProductAmountText>{amount[item.id] || ''}</ProductAmountText>
          </ProductAmount>
          <AddCartText>ADICIONAR</AddCartText>
        </AddCartButton>
      </ProductContainer>
    );
  }

  return (
    <Container>
      <ProductList
        data={products}
        keyExtractor={(product) => String(product.id)}
        renderItem={renderProduct}
      />
    </Container>
  );
}
