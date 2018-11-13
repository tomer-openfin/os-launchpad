/* tslint:disable:no-console */

import * as React from 'react';
import { Link } from 'react-router-dom';

import { ErrorMessage, Form, Input, Label, Message, Select } from './NewUserForm.css';

interface Result {
  status: string;
  message: string;
}

interface FormContents {
  email: string;
  firstName: string;
  isAdmin: boolean;
  lastName: string;
  middleInitial?: string;
  organizationId: string;
  password: string;
  username: string;
}

interface Props {
  createUser: Function;
  existingEmailsList?: string[];
}

interface State {
  formContents: FormContents;
  formSubmitted: boolean;
  result: Result;
}

class NewUserForm extends React.Component<Props, State> {
  state = {
    formContents: {
      email: '',
      firstName: '',
      isAdmin: false,
      lastName: '',
      middleInitial: '',
      organizationId: '',
      password: '',
      username: '',
    },
    formSubmitted: false,
    result: {
      message: '',
      status: '',
    },
  };

  handleInputChange = (event: React.SyntheticEvent) => {
    const { formContents } = this.state;
    const target = event.target as HTMLInputElement;
    const name = target.name;
    const value = target.value;

    // TODO: validate email on submit initially -> dynamically after POC
    this.setState({ formContents: { ...formContents, [name]: value } });
  };

  handleFormSubmit = (event: React.SyntheticEvent) => {
    const { createUser } = this.props;
    const { formContents } = this.state;
    event.preventDefault();

    // POST to /users API
    createUser(formContents)
      .then(response => {
        if (response.status === 'error') {
          return this.setState({
            formSubmitted: true,
            result: {
              message: response.message,
              status: response.status,
            },
          });
        }

        return this.setState({ formContents: response, formSubmitted: true });
      })
      .catch(err => console.log('error in createUser:', err));

    // TODO: dispatch email to user (structure TBD)

    // TODO: decide on confirmation/edit flow following this screen
  };

  renderMessage = result => {
    const { formSubmitted, formContents } = this.state;

    if (formSubmitted) {
      if (result.status === 'error') {
        return <ErrorMessage>Error: {result.message}</ErrorMessage>;
      }

      if (formContents.username) {
        return <Message>Success! User '{formContents.username}' succesfully created.</Message>;
      }
    }

    return null;
  };

  render() {
    const {
      result,
      formContents: { email, firstName, isAdmin, lastName, middleInitial, organizationId, password, username },
    } = this.state;

    return (
      <Form onSubmit={this.handleFormSubmit}>
        {/* temp until admin flow is determined */}
        <Link to="/admin">Back to Admin Dashboard</Link>

        {this.renderMessage(result)}

        <Label>
          Username
          <Input name="username" onChange={this.handleInputChange} required={true} type="text" value={username} />
        </Label>

        <Label>
          Email
          <Input name="email" onChange={this.handleInputChange} required={true} type="email" value={email} />
        </Label>

        <Label>
          Password
          <Input name="password" onChange={this.handleInputChange} required={true} type="password" value={password} />
        </Label>

        <Label>
          First Name
          <Input name="firstName" onChange={this.handleInputChange} required={true} type="text" value={firstName} />
        </Label>

        <Label>
          Last Name
          <Input name="lastName" onChange={this.handleInputChange} required={true} type="text" value={lastName} />
        </Label>

        <Label>
          Middle Initial
          <Input name="middleInitial" onChange={this.handleInputChange} required={false} type="text" value={middleInitial} />
        </Label>

        <Label>
          OrganizationId
          <Input name="organizationId" onChange={this.handleInputChange} required={true} type="text" value={organizationId} />
        </Label>

        <Label>
          Make an administrator?
          <Select name="isAdmin" value={isAdmin ? 'yes' : 'no'} onChange={this.handleInputChange}>
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </Select>
        </Label>

        <Input type="submit" value="Submit" />
      </Form>
    );
  }
}

export default NewUserForm;
