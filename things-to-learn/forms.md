# Forms

**Base template**

```jsx
import React, { Component } from 'react';
import './App.css';

import TextInput from './TextInput';
import validate from './validate';
import TextArea from './TextArea';
import Email from './Email';
import Select from './Select';
import Radio from './Radio';

class App extends Component {
  

  constructor() {
    super();

    this.state = {
      formIsValid: false,
      formControls: {
        
        name: {
          value: '',
          placeholder: 'What is your name',
          valid: false,
          validationRules: {
            minLength: 4,
            isRequired: true
          },
          touched: false
        },
        address: {
          value: '',
          placeholder: 'What is your address',
          valid: false,
          validationRules: {
            minLength: 4,
            isRequired: true
          },
          touched: false
        },
        my_email: {
          value: '',
          placeholder: 'What is your email',
          valid: false,
          validationRules: {
            isRequired: true,
            isEmail: true
          },
          touched: false
        },
        gender: {
          value: '',
          placeholder: 'What is your gender',
          valid: false,
          touched: false,
          validationRules: {
            isRequired: true,
          },
          options: [
            { value: 'male', displayValue: 'Male' },
            { value: 'female', displayValue: 'Female'}
          ]
        },
        my_radio: {
          value: '',
          placeholder: 'Are you a frontend developer',
          valid: false,
          touched: false,
          validationRules: {
            // isRequired: true,
          },
          options: [
            { value: 0, displayValue: 'No' },
            { value: 1, displayValue: 'Yes' }
          ]
        }
        
      }

    }
  }


  changeHandler = event => {
    
      const name = event.target.name;
      const value = event.target.value;

      const updatedControls = {
        ...this.state.formControls
      };
      const updatedFormElement = {
        ...updatedControls[name]
      };
      updatedFormElement.value = value;
      updatedFormElement.touched = true;
      updatedFormElement.valid = validate(value, updatedFormElement.validationRules);

      updatedControls[name] = updatedFormElement;

      let formIsValid = true;
      for (let inputIdentifier in updatedControls) {
        formIsValid = updatedControls[inputIdentifier].valid && formIsValid;
      }

      this.setState({
        formControls: updatedControls,
        formIsValid: formIsValid
      });

  }
  
  
  formSubmitHandler = () => {
	const formData = {};
	for (let formElementId in this.state.formControls) {
	    formData[formElementId] = this.state.formControls[formElementId].value;
	}
    
    	console.dir(formData);
  }
  

  render() {
    
    return (
      <div className="App">
          <TextInput name="name" 
                     placeholder={this.state.formControls.name.placeholder}
                     value={this.state.formControls.name.value}
                     onChange={this.changeHandler}
                     touched={this.state.formControls.name.touched}
                     valid={this.state.formControls.name.valid}
          />

          <TextArea name="address"
                    placeholder={this.state.formControls.address.placeholder}
                    value={this.state.formControls.address.value}
                    onChange={this.changeHandler}
                    touched={this.state.formControls.address.touched}
                    valid={this.state.formControls.address.valid}
          />

          <Email name="my_email"
                  placeholder={this.state.formControls.my_email.placeholder}
                  value={this.state.formControls.my_email.value}
                  onChange={this.changeHandler}
                  touched={this.state.formControls.my_email.touched}
                  valid={this.state.formControls.my_email.valid}
          />

          <Select name="gender"
                  value={this.state.formControls.gender.value}
                  onChange={this.changeHandler}
                  options={this.state.formControls.gender.options}
                  touched={this.state.formControls.gender.touched}
                  valid={this.state.formControls.gender.valid}
          />

          <Radio name="my_radio"
            value={this.state.formControls.my_radio.value}
            onChange={this.changeHandler}
            options={this.state.formControls.my_radio.options}
            touched={this.state.formControls.my_radio.touched}
            valid={this.state.formControls.my_radio.valid}
          />

          <button onClick={this.formSubmitHandler} 
                  disabled={! this.state.formIsValid}
            > 
              Submit
          </button>
      </div>
    );

  }
}

export default App;
```

**Radio.js..**

```jsx
import React from 'react';

const Radio = props => {

    let formControl = "form-control";

    if (props.touched && !props.valid) {
        formControl = 'form-control control-error';
    }

    return (
        <div className="form-group">

            {props.options.map(option => (
                <div className="form-group" key={option.value}>
                    <label>{option.displayValue}</label>
                    <input type="radio"
                        name={props.name}
                        value={option.value}
                        onChange={props.onChange}
                        className={formControl}
                    />
                </div>
            ))}

        </div>
    );
}

export default Radio;
```

**TEXTINPUT**

```jsx
TextInput_with_style.js
import React from 'react';

const TextInput = props => {

    let formControl = "form-control";

    if (props.touched && !props.valid) {
        formControl = 'form-control control-error';
    }

    return (
        <div className="form-group">
            <input type="text" className={formControl} {...props} />
        </div>
    );
}

export default TextInput;
```

**SELECT**

```jsx
Select.js
import React from 'react';

const Select = props => {

    let formControl = "form-control";

    if (props.touched && !props.valid) {
        formControl = 'form-control control-error';
    }

    return (
        <div className="form-group">
            <select className={formControl} value={props.value} onChange={props.onChange} name={props.name}>
              {props.options.map(option => (
                <option value={option.value}>
                  {option.displayValue}
                </option>
              ))}
            </select>
        </div>
    );
}

export default Select;
```

**PASSWORD**

```jsx
Password.js
import React from 'react';

const Password = props => {

    let formControl = "form-control";

    if (props.touched && !props.valid) {
        formControl = 'form-control control-error';
    }

    return (
        <div className="form-group">
            <input type="password" className={formControl} {...props} />
        </div>
    );
}

export default Password;
```

**Email**

```jsx
import React from 'react';

const Email = props => {

    let formControl = "form-control";

    if (props.touched && !props.valid) {
        formControl = 'form-control control-error';
    }

    return (
        <div className="form-group">
            <input type="email" className={formControl} {...props} />
        </div>
    );
}

export default Email;
```

**TextArea**

```jsx
import React from 'react';

const TextArea = props => {

    let formControl = "form-control";

    if (props.touched && !props.valid) {
        formControl = 'form-control control-error';
    }

    return (
        <div className="form-group">
            <textarea {...props} className={formControl} />
        </div>
    );
}

export default TextArea;
```

