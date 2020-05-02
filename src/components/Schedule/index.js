import { IconButton } from '@material-ui/core';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import DateRangeIcon from '@material-ui/icons/DateRange';
import Scheduler from 'devextreme-react/scheduler';
import React from 'react';
import { withRouter } from 'react-router';
import Swal from 'sweetalert2';
import avatar from '../../image/avatar-default.png';
import './style.css';

const views = ['agenda', 'month', 'day', 'week'];
const lessons = ['1,2,3', '4,5,6', '7,8,9', '10,11,12', '13,14,15,16'];
const startTimeMiniSecond = [
    25200000, //7h00
    34500000, //9h35
    45000000, //12h30
    54300000, //15h05
    64800000, //18h00
];
const endTimeMiniSecond = [
    33900000, //9h25
    43200000, //12h00
    53700000, //14h55
    63000000, //17h30
    76500000, //21h15
];

class Schedule extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentDate: new Date(),
            data: [],
            studentAccount: '',
            anchorEl: null,
        };
    }

    componentDidMount() {
        const getData = JSON.parse(localStorage.getItem('data'));
        const studentAccount = JSON.parse(
            localStorage.getItem('studentAccount')
        );
        if (getData) {
            const newData = [];
            const list60Days = Object.keys(getData);
            list60Days.map((day) => {
                const subject = {};
                const dayMiniSecond = day * 1;
                getData[day].map((item) => {
                    subject.text = `${item.subject} - ${item.address}`;
                    lessons.map((lesson, index) => {
                        if (lesson === item.lesson) {
                            subject.startDate = new Date(
                                dayMiniSecond + startTimeMiniSecond[index]
                            );
                            subject.endDate = new Date(
                                dayMiniSecond + endTimeMiniSecond[index]
                            );
                        }
                        return 1;
                    });
                    return 1;
                });
                return newData.push(subject);
            });
            this.setState({
                data: newData,
                studentAccount,
            });
        } else {
            const { history } = this.props;
            history.replace('/');
            Swal.fire(
                'Bạn chưa đăng nhập?',
                'Hãy đăng nhập tài khoản sinh viên của mình !',
                'question'
            );
        }
    }

    optionChanged = (e) => {
        if (e.fullName === 'currentDate') {
            this.setState({
                currentDate: e.value,
            });
        }
    };

    handleMenuClose = () => {
        this.setState({
            anchorEl: null,
        });
    };

    renderMenu = () => {
        const { anchorEl } = this.state;
        const isMenuOpen = Boolean(anchorEl);
        return (
            <Menu
                className="menu-account"
                anchorEl={anchorEl}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                id="menu"
                keepMounted
                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                open={isMenuOpen}
                onClose={this.handleMenuClose}
            >
                <div className="user-account">
                    <MenuItem onClick={this.logOut}>Đăng xuất</MenuItem>
                </div>
            </Menu>
        );
    };

    logOut = () => {
        const { history } = this.props;
        history.replace('/');
        localStorage.removeItem('data');
        localStorage.removeItem('studentAccount');
    };

    handleProfileMenuOpen = (e) => {
        this.setState({
            anchorEl: e.currentTarget,
        });
    };

    render() {
        const { data, studentAccount } = this.state;
        return (
            <React.Fragment>
                <div className="schedule-container">
                    <div className="schedule-title">
                        <DateRangeIcon />
                        <p>Thời khóa biểu KMA</p>
                    </div>
                    <div className="icon-account">
                        <p>{`Xin chào ${studentAccount} !`}</p>
                        <IconButton
                            edge="end"
                            aria-label="account of current user"
                            aria-controls="menu"
                            aria-haspopup="true"
                            onClick={this.handleProfileMenuOpen}
                            color="inherit"
                        >
                            <div className="icon-account-avatar">
                                <img
                                    className="avatar-img"
                                    src={avatar}
                                    alt="avatar"
                                />
                            </div>
                        </IconButton>
                    </div>
                </div>
                {this.renderMenu()}
                <Scheduler
                    onOptionChanged={this.optionChanged}
                    dataSource={data}
                    views={views}
                    defaultCurrentView={'month'}
                    currentDate={this.state.currentDate}
                    height={600}
                    startDayHour={6}
                    endDayHour={22}
                />
            </React.Fragment>
        );
    }
}

export default withRouter(Schedule);
