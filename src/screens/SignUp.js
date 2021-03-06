import React from 'react';
import { Alert, ActivityIndicator, Keyboard, KeyboardAvoidingView, StyleSheet, Platform, ScrollView } from 'react-native';
import { Button, Block, Input, Text } from '../components';
import { theme } from '../constants';

export default class SignUp extends React.Component {

  state = {
    email: null,
    username: null,
    password: null,
    errors: [],
    loading: false,
  }

  handleSignUp() {
    const { navigation } = this.props;
    const { email, username, password } = this.state;
    const errors = [];

    Keyboard.dismiss();

    this.setState({ loading: true });
    // check with backend API or with some static data
    setTimeout(() => {
      if (!email) errors.push('email');
      if (!username) errors.push('username');
      if (!password) errors.push('password');

      this.setState({ errors, loading: false });

      if (!errors.length) {
        Alert.alert(
          'Success!',
          'Your account has been created',
          [
            {
              text: 'Continue', onPress: () => {
                navigation.navigate('Browse')
              }
            }
          ],
          { cancelable: false }
        )
      }
    }, 2000)
  }

  render(){
    const { navigation } = this.props;
    const { loading, errors } = this.state;
    const hasErrors = key => errors.includes(key) ? styles.hasErrors : null;

    return (
      <KeyboardAvoidingView style={styles.signup} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <Block padding={[0, theme.sizes.base * 2]}>
          <Text h1 bold>Sign Up</Text>
            <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
            <Block middle style={{color:theme.colors.accent}}> 
              <Input
                email
                label="Email"
                error={hasErrors('email')}
                style={[styles.input, hasErrors('email')]}
                defaultValue={this.state.email}
                onChangeText={text => this.setState({ email: text })}
              />

              <Input
                label="Username"
                error={hasErrors('username')}
                style={[styles.input, hasErrors('username')]}
                defaultValue={this.state.username}
                onChangeText={text => this.setState({ username: text })}
              />

              <Input
                secure
                label="Password"
                error={hasErrors('password')}
                style={[styles.input, hasErrors('password')]}
                defaultValue={this.state.password}
                onChangeText={text => this.setState({ password: text })}
              />

              <Button gradient onPress={() => this.handleSignUp()}>
                {loading ?
                  <ActivityIndicator size="small" color="white" /> :
                  <Text bold white center>Sign Up</Text>
                }
              </Button>

              <Button onPress={() => navigation.navigate('Welcome')}>
                <Text gray caption center style={{ textDecorationLine: 'underline' }}>
                  Back to Login
                </Text>
              </Button>
            </Block>
          </ScrollView>

        </Block>
          
      </KeyboardAvoidingView>
      
    );
  }
  
}

const styles = StyleSheet.create({
  signup: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: theme.colors.white
  },
  input: {
    borderRadius: 0,
    borderWidth: 0,
    borderBottomColor: theme.colors.gray2,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  hasErrors: {
    borderBottomColor: theme.colors.accent,
  },
});