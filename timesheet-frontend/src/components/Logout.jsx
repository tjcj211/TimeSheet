import {Component} from 'react';
import loginService from '../service/logService';

class Logout extends Component {
    componentDidMount() {
        loginService.logout();
        window.location = "/login";
        console.log(window.URL);
    }

    render() {
        return;
    }
}

export default Logout;