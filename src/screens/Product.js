import React from 'react';
import { StyleSheet, ScrollView, Image, Dimensions } from 'react-native';
import { Button, Block, Text} from '../components';
import { theme, mocks } from '../constants';
import Entypo from 'react-native-vector-icons/Entypo';

const { width, height } = Dimensions.get('window');

export default class Product extends React.Component {

  static navigationOptions = ({navigation}) => {
    return {
      headerRight: () =>
        <Button onPress={() => {}}>
          <Entypo name="dots-three-horizontal" color={theme.colors.gray} />
        </Button>
    }
  }

  render(){
    const { product, images } = this.props;
    const mainImage = images[0];
  
    return (
      <ScrollView showsVerticalScrollIndicator={false} style={styles.product}>  
        <Block style={styles.detail}>
          <Image source={mainImage} style={styles.mainImage} />
          <Text h2 bold>{product.name}</Text>
          <Block flex={false} row margin={[theme.sizes.base, 0]}>
            {product.tags.map(tag => (
              <Text key={`tag-${tag}`} caption gray style={styles.tag}>
                {tag}
              </Text>
            ))}
          </Block>
          <Text gray light height={22}>{product.description}</Text>
        </Block>
      </ScrollView>
    );
  }
}

Product.defaultProps = {
  product: mocks.products[0],
  images: mocks.explore,
}

const styles = StyleSheet.create({
  product: {
    backgroundColor: theme.colors.white
  },
  detail: {
    paddingHorizontal: theme.sizes.base * 2,
    paddingVertical: theme.sizes.padding,
  },
  tag: {
    borderColor: theme.colors.gray2,
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: theme.sizes.base,
    paddingHorizontal: theme.sizes.base,
    paddingVertical: theme.sizes.base / 2.5,
    marginRight: theme.sizes.base * 0.625,
  },
  mainImage: {
    maxHeight: 130,
    minHeight: width - (theme.sizes.padding * 2.5),
    maxWidth: width - (theme.sizes.padding * 2.5),
    minWidth: width - (theme.sizes.padding * 2.5),
    marginBottom: theme.sizes.base,
    borderRadius: 4,
  },
});