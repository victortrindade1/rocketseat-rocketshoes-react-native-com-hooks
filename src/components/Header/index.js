import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useSelector } from 'react-redux';

import Logo from '../Logo';

import {
  Container,
  Wrapper,
  BasketContainer,
  LogoContainer,
  ItemCount,
} from './styles';

export default function Header({ navigation }) {
  const cartSize = useSelector((state) => state.cart.length);

  return (
    <Wrapper>
      <Container>
        <LogoContainer onPress={() => navigation.navigate('Home')}>
          <Logo width={185} height={24} />
        </LogoContainer>

        <BasketContainer onPress={() => navigation.navigate('Cart')}>
          <Icon name="shopping-basket" size={20} color="#fff" />
          <ItemCount>{cartSize || 0}</ItemCount>
        </BasketContainer>
      </Container>
    </Wrapper>
  );
}
