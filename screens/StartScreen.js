import React, { useState } from 'react'
import { View, StyleSheet, Text, TextInput, Alert, Button } from 'react-native'
import { CheckBox } from 'react-native-elements'

export default function StartScreen({ onRegister }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isCheckBoxChecked, setIsCheckBoxChecked] = useState(false);
  const [errorMsg, setErrorMsg] = useState({name: '', email: '', phoneNumber: ''});

  const validateName = (name) => {
    if (!name || name.length < 2 || !isNaN(name)) {
      return 'Please enter a valid name';
    }
    return '';
  }

  const validateEmail = (email) => {
    if (!email || !email.includes('@')) {
      return 'Please enter a valid email address';
    }
    return '';
  }

  const validatePhoneNumber = (phoneNumber) => {
    const lastDigit = phoneNumber.charAt(phoneNumber.length - 1);

    if (!phoneNumber || phoneNumber.length !== 10 
        || lastDigit === '1' || lastDigit === '0') {
      return 'Please enter a valid phone number';
    }
    return '';
  }

  const handleNameChange = (name) => {
    setName(name);
    setErrorMsg({...errorMsg, name: validateName(name)});
  }

  const handleEmailChange = (email) => {
    setEmail(email);
    setErrorMsg({...errorMsg, email: validateEmail(email)});
  }

  const handlePhoneNumberChange = (phoneNumber) => {
    setPhoneNumber(phoneNumber);
    setErrorMsg({...errorMsg, phoneNumber: validatePhoneNumber(phoneNumber)});
  }

  const handleCheckBox = () => {
    setIsCheckBoxChecked(!isCheckBoxChecked);
  }

  const handleRegister = () => {
    if (!errorMsg.name && !errorMsg.email && !errorMsg.phoneNumber) {
      onRegister({ name, email, phoneNumber });
    } else {
      Alert.alert('Invalid input', 'Please check your input', [{text: 'OK'}]);
    }
  }

  const handleReset = () => {
    setName('');
    setEmail('');
    setPhoneNumber('');
    setIsCheckBoxChecked(false);
    setErrorMsg({name: '', email: '', phoneNumber: ''});
  }

  return (
    <View style={styles.container}>
      <View style={styles.form}>
        <Text style={styles.label}>Name: </Text>
        <TextInput 
          style={styles.input}
          value={name}
          onChangeText={handleNameChange}
        />
        {errorMsg.name ? <Text style={styles.errorMsg}>{errorMsg.name}</Text> : null}

        <Text style={styles.label}>Email Address: </Text>
        <TextInput 
          style={styles.input}
          value={email}
          onChangeText={handleEmailChange}
          keyboardType="email-address"
        />
        {errorMsg.email ? <Text style={styles.errorMsg}>{errorMsg.email}</Text> : null}

        <Text style={styles.label}>Phone Number: </Text>
        <TextInput 
          style={styles.input}
          value={phoneNumber}
          onChangeText={handlePhoneNumberChange}
          keyboardType="numeric"
        />
        {errorMsg.phoneNumber ? <Text style={styles.errorMsg}>{errorMsg.phoneNumber}</Text> : null}
      
        <View style={styles.checkboxContainer}>
          <CheckBox 
            checked={isCheckBoxChecked}
            onPress={handleCheckBox}
            iconType="material-community"
            checkedIcon="checkbox-outline"
            uncheckedIcon="checkbox-blank-outline"
          />
          <Text>I am not a robot</Text>
        </View>

        <View style={styles.buttonContainer}>
          <View style={styles.button}>
            <Button 
              title="Reset" 
              onPress={handleReset} 
              color="red"/>
          </View>
          <View style={styles.button}>
            <Button 
              title="Register" 
              onPress={handleRegister} 
              disabled={!isCheckBoxChecked}
              color="blue"
            />
          </View>
        </View>
      </View>
    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'grey',
    alignItems: 'center',
    justifyContent: 'center',
  },

  form: {
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    padding: 20,
    width: '80%',
  },

  label: {
    color: "blue",
    fontSize: 16,
    marginBottom: 5,
    marginTop: 10,
  },

  input: {
    borderBottomColor: "blue",
    borderBottomWidth: 2,
    marginBottom: 10,
  },

  errorMsg: {
    color: 'red',
    fontSize: 12,
    marginBottom: 5,
  },

  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingRight: 0,
    marginBottom: 10,
  },

  buttonContainer: {
    marginVertical: 5,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },

  button: {
    marginHorizontal: 30,
    borderColor: 'blue',
  },
});
