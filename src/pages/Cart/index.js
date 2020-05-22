import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialIcons';

import * as CartActions from '../../store/modules/cart/actions';

import { formatPriceBRL } from '../../util/format';

import colors from '../../styles/colors';

import {
  CartContainer,
  ProductList,
  Product,
  ProductContainer,
  ProductImage,
  DescriptionContainer,
  Description,
  DescriptionPrice,
  ProductDeleteButton,
  AmountContainer,
  AmountButton,
  AmountInputContainer,
  AmountInput,
  AmountSubTotal,
  Separator,
  TotalContainer,
  TotalLabel,
  TotalNumber,
  SubmitButton,
  SubmitText,
  EmptyCartContainer,
  EmptyMsg,
} from './styles';

export default function Cart() {
  const cart = useSelector((state) =>
    state.cart.map((product) => ({
      ...product,
      subtotal: formatPriceBRL(product.price * product.amount),
    }))
  );

  const total = useSelector((state) =>
    formatPriceBRL(
      state.cart.reduce(
        (totalSum, product) => totalSum + product.price * product.amount,
        0 // valor inicial
      )
    )
  );

  const dispatch = useDispatch();

  function handleRemoveFromCart(id) {
    dispatch(CartActions.removeFromCart(id));
  }

  function handleAmountDown(product) {
    dispatch(CartActions.updateAmountRequest(product.id, product.amount - 1));
  }

  function handleAmountUp(product) {
    dispatch(CartActions.updateAmountRequest(product.id, product.amount + 1));
  }

  function renderProduct(product) {
    return (
      <Product>
        <ProductContainer>
          <ProductImage
            source={{
              uri: product.image,
            }}
          />
          <DescriptionContainer>
            <Description>{product.title}</Description>
            <DescriptionPrice>{product.priceBRL}</DescriptionPrice>
          </DescriptionContainer>
          <ProductDeleteButton onPress={() => handleRemoveFromCart(product.id)}>
            <Icon name="delete-forever" color={colors.primary} size={25} />
          </ProductDeleteButton>
        </ProductContainer>
        <AmountContainer>
          <AmountInputContainer>
            <AmountButton onPress={() => handleAmountDown(product)}>
              <Icon
                name="remove-circle-outline"
                color={colors.primary}
                size={25}
              />
            </AmountButton>
            <AmountInput>{product.amount}</AmountInput>
            <AmountButton onPress={() => handleAmountUp(product)}>
              <Icon
                name="add-circle-outline"
                color={colors.primary}
                size={25}
              />
            </AmountButton>
          </AmountInputContainer>
          <AmountSubTotal>{product.subtotal}</AmountSubTotal>
        </AmountContainer>
      </Product>
    );
  }

  return (
    <CartContainer>
      {cart.length ? (
        <>
          <ProductList
            data={cart}
            keyExtractor={(product) => String(product.id)}
            renderItem={({ item }) => renderProduct(item)}
            ItemSeparatorComponent={() => <Separator />}
          />
          <TotalContainer>
            <TotalLabel>TOTAL</TotalLabel>
            <TotalNumber>{total}</TotalNumber>
          </TotalContainer>
          <SubmitButton>
            <SubmitText>FINALIZAR PEDIDO</SubmitText>
          </SubmitButton>
        </>
      ) : (
        <EmptyCartContainer>
          <Icon name="remove-shopping-cart" color="#ccc" size={80} />
          <EmptyMsg>Seu carrinho está vazio</EmptyMsg>
        </EmptyCartContainer>
      )}
    </CartContainer>
  );
}
