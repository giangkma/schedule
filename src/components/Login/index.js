import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import TextField from '@material-ui/core/TextField';
import PersonIcon from '@material-ui/icons/Person';
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import md5 from 'md5';
import React, { Component } from 'react';
import { withRouter } from 'react-router';
import Swal from 'sweetalert2';
import AuthService from '../../AuthService';
import './style.css';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showLoadding: false,
            showPassword: false,
            studentAccount: '',
            studentPassword: '',
        };
        this.Auth = new AuthService();
    }

    componentDidMount() {
        const getData = JSON.parse(localStorage.getItem('data'));
        if (getData) {
            const { history } = this.props;
            history.replace('/schedule/view');
        }
    }

    onChangeInput = (e) => {
        this.setState({
            [e.target.name]: e.target.value,
        });
    };

    onShowPassword = () => {
        const { showPassword } = this.state;
        this.setState({
            showPassword: !showPassword,
        });
    };

    onSubmitFormLogin = () => {
        const { history } = this.props;
        const { studentAccount, studentPassword } = this.state;
        if (!studentAccount || !studentPassword) {
            Swal.fire(
                'Vui lòng nhập đủ Tài khoản và Mật khẩu sinh viên của bạn !',
                '',
                'error'
            );
        } else if (
            typeof studentAccount === 'undefined' ||
            studentAccount.trim().length < studentAccount.length ||
            studentAccount.split(' ').length > 1 ||
            studentAccount == null ||
            !studentAccount.match(/^[0-9a-zA-Z]{0,}$/)
        ) {
            Swal.fire(
                'Tài khoản hoặc Mật khẩu của bạn không đúng định dạng !',
                '',
                'error'
            );
        } else {
            const upperCasestudentAccount = studentAccount.toUpperCase();
            const encodeStudentPassword = md5(studentPassword);
            this.showLoadding();
            this.Auth.login(
                upperCasestudentAccount,
                encodeStudentPassword
            ).then((res) => {
                const { dataJson, status } = res.data;
                this.showAlert(status);
                this.hideLoadding();
                if (status) {
                    localStorage.setItem('data', JSON.stringify(dataJson));
                    localStorage.setItem(
                        'studentAccount',
                        JSON.stringify(upperCasestudentAccount)
                    );
                    history.replace('/schedule/view');
                }
            });
        }
    };
    showAlert = (status) => {
        const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 5000,
            timerProgressBar: true,
            onOpen: (toast) => {
                toast.addEventListener('mouseenter', Swal.stopTimer);
                toast.addEventListener('mouseleave', Swal.resumeTimer);
            },
        });
        Toast.fire({
            icon: `${status ? 'success' : 'error'}`,
            title: `${
                status
                    ? 'Đăng nhập thành công !'
                    : 'Tài khoản hoặc mật khẩu không chính xác ! Hãy kiểm tra lại !'
            }`,
        });
    };
    showLoadding = () => {
        this.setState({
            showLoadding: true,
        });
    };
    hideLoadding = () => {
        this.setState({
            showLoadding: false,
        });
    };
    render() {
        const { showPassword, showLoadding } = this.state;
        return (
            <div className="container">
                {showLoadding ? (
                    <div className="loadding">
                        <CircularProgress />
                    </div>
                ) : (
                    ''
                )}
                <div className="background">
                    <div className="login">
                        <h1>Thời Khóa biểu KMA</h1>
                        <form className="login-form">
                            <div className="login-form-account">
                                <TextField
                                    type="text"
                                    name="studentAccount"
                                    label="Tài khoản"
                                    variant="outlined"
                                    onChange={this.onChangeInput}
                                />
                                <span className="login-form-icon">
                                    <PersonIcon />
                                </span>
                            </div>
                            <div className="login-form-password">
                                <TextField
                                    type={showPassword ? 'text' : 'password'}
                                    name="studentPassword"
                                    label="Mật khẩu"
                                    variant="outlined"
                                    onChange={this.onChangeInput}
                                />
                                <span
                                    className="login-form-icon"
                                    onClick={this.onShowPassword}
                                >
                                    {showPassword ? (
                                        <VisibilityOffIcon />
                                    ) : (
                                        <VisibilityIcon />
                                    )}
                                </span>
                            </div>
                            <Button
                                onClick={this.onSubmitFormLogin}
                                variant="contained"
                                color="primary"
                            >
                                Đăng nhập
                            </Button>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}
export default withRouter(Login);
