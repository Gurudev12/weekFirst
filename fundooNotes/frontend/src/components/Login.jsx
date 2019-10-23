import React, { Component } from 'react';
import '../css/Login.css'
// import Button from '@material-ui/core/Button';
import { Card } from '@material-ui/core';
import { TextField } from '@material-ui/core';
import Link from '@material-ui/core/Link';
import { Button } from '@material-ui/core';
import InputAdornment from '@material-ui/core/InputAdornment';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import IconButton from '@material-ui/core/IconButton';

class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            'email': '',
            'password': '',
            showPassword: false,
        };
    }
    //this is handle for email
    handleChangeEmail = email => event => {
        console.log("===>email", event.target.value);
        this.setState({
            [email]: event.target.value,
        });
    };

    // This is handle for password
    handleChange = prop => event => {
        console.log("===>pass", event.target.value);

        this.setState({ [prop]: event.target.value });
    };

    handleClickShowPassword = () => {
        this.setState(state => ({ showPassword: !state.showPassword }));
    };

    render() {
        return (
            <div >

                <Card style={{
                    marginTop: "11.8%",
                    marginLeft: "20.8%",
                    position: "absolute",
                    width: "58.4%",
                    height: "63.5%"
                }}>

                    <div className="fundoo">
                        <b>
                            <span>
                                <label className="fStyle">f</label>
                                <label className="uStyle">u</label>
                                <label className="nStyle">n</label>
                                <label className="dStyle">d</label>
                                <label className="oStyle">o</label>
                                <label className="oOstyle">o</label>
                                <label className="nStyle">N</label>
                                <label className="o0Style">o</label>
                                <label className="tStyle">t</label>
                                <label className="eStyle">e</label>
                            </span>
                        </b>
                    </div>

                    <div className="signIn"><b>Sign in</b></div>

                    <div className="fundoo">
                        <TextField
                            id="outlined-email-input"
                            label="Email"
                            type="email"
                            className=""
                            value={this.state.email}
                            onChange={this.handleChangeEmail('email')}
                            name="email"
                            autoComplete="email"
                            
                            margin="normal"
                            variant="outlined"
                        />
                        <br></br>     <br></br>  

                        <TextField id="outlined-adornment-password" className=""
                            variant="outlined"
                            type={this.state.showPassword ? 'text' : 'password'}
                            label="Password"
                            value={this.state.password} 
                            onChange={this.handleChange('password')}
                            InputProps={{
                                endAdornment: (<InputAdornment position="end">
                                    <IconButton aria-label="Toggle password visibility" onClick={this.handleClickShowPassword} > {this.state.showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>),
                            }}
                        />
                    </div> <br></br>   <br></br>  
                    <div className="fundoo">
                        <Button variant="contained" color="primary" className="login">
                            Login
                    </Button>
                        <Button variant="contained" color="secondary" className="register">
                            Register
                    </Button>
                    </div>

                    <br></br><br></br><br></br><br></br>
                    <Link href="#" onClick="" className="forgotPassword">
                        forgot password?
                    </Link>

                </Card>
            </div>
        )
    }
}
export default Login;