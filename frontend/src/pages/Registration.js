import React from 'react';
import './Registration.css';
import {
  Typography,
  FormControl,
  OutlinedInput,
  InputLabel,
  TextField,
} from '@material-ui/core';
import StatusAlert from '../components/status-alert/StatusAlert';
import ButtonLoader from '../components/button-loader/ButtonLoader';
const axios = require('axios');

class Registration extends React.Component {
    constructor() {
      super();
      this.state = {
        nameOne: '',
        platformOne: '',
        nameTwo: '',
        platformTwo: '',
        loading: false,
        submitSuccess: false,
        submitError: false,
        contractAddress: '',
        userAddress : '',
      };
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange = (event) => {
      this.setState({
        [event.target.name]: event.target.value
      });
    }

    isValid = () => {
      return (
        this.state.nameOne !== '' &&
        this.state.platformOne !== '' &&
        this.state.nameTwo !== '' &&
        this.state.platformTwo !== '' &&
        this.state.userAddress !== ''
      );
    }

    handleSubmit = async (event) => {
      try {
        this.setState({'loading': true});
        event.preventDefault();
        const payload = {
          userAddress: this.state.userAddress,
          candidateOne: {
            name: this.state.nameOne,
            platform: this.state.platformOne,
            index: 0
          },
          candidateTwo: {
            name: this.state.nameTwo,
            platform: this.state.platformTwo,
            index: 1
          },
        };

        const response = await axios.post(
          'http://localhost:4000/api/election/',
          payload
        );

        const address = response.data.contractAddress || '';
        this.setState({'contractAddress': address});
        this.setState({'loading': false});
        this.setState({'submitError': false});
        this.setState({'submitSuccess': true});
      } catch (error) {
        this.setState({'loading': false});
        this.setState({'submitSuccess': false});
        this.setState({'submitError': true});
      }
    }

    render() {
      return (
        //TODO: turn these forms into a component for reuse
        <form className="wrapper" onSubmit={this.handleSubmit}>
          <div className="card">
            <Typography variant="h4">
              Candidate Registration
            </Typography>
            <div className="form-wrapper">
              <div className="form">
                <Typography gutterBottom={true} variant="h6">
                  Candidate One
                </Typography>
                <FormControl required variant="outlined">
                  <InputLabel htmlFor="name1-outlined">
                    Name
                  </InputLabel>
                  <OutlinedInput
                    name="nameOne"
                    label="name"
                    id="name1-outlined"
                    value={this.state.nameOne}
                    onChange={this.handleChange}
                  />
                </FormControl>
                <div className="half-margin-top">
                  <TextField
                    required
                    id="platform1-textarea"
                    label="Platform"
                    multiline
                    rows={3}
                    rowsMax={3}
                    variant="outlined"
                    name="platformOne"
                    value={this.state.platformOne}
                    onChange={this.handleChange}
                  />
                </div>
              </div>
              <div className="form">
                <Typography gutterBottom={true} variant="h6">
                  Candidate Two
                </Typography>
                <FormControl required variant="outlined">
                  <InputLabel htmlFor="name2-outlined">
                    Name
                  </InputLabel>
                  <OutlinedInput
                    name="nameTwo"
                    label="name"
                    id="name2-outlined"
                    value={this.state.nameTwo}
                    onChange={this.handleChange}
                  />
                </FormControl>
                <div className="half-margin-top">
                  <TextField
                    required
                    id="platform1-textarea"
                    label="Platform"
                    multiline
                    rows={3}
                    rowsMax={3}
                    variant="outlined"
                    name="platformTwo"
                    value={this.state.platformTwo}
                    onChange={this.handleChange}
                  />
                </div>
              </div>
            </div>
            <TextField
              id="outlined-basic"
              required
              label="User address"
              variant="outlined"
              margin="normal"
              name="userAddress"
              value={this.state.userAddress}
              onChange={this.handleChange}
            />
            <ButtonLoader
              isValid={this.isValid()}
              loading={this.state.loading}
            />
            <StatusAlert
              success={this.state.submitSuccess}
              error={this.state.submitError}
              errorMessage="Could not submit registration!"
            >
            </StatusAlert>
          </div>
        </form>
      );
    }
}

export default Registration;
