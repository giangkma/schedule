import { IconButton } from "@material-ui/core";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import DateRangeIcon from "@material-ui/icons/DateRange";
import Scheduler from "devextreme-react/scheduler";
import React from "react";
import { withRouter } from "react-router";
import avatar from "../../image/avatar-default.png";
import AuthService from "../../AuthService";
import "./style.css";

const views = ["agenda", "month", "day", "week"];
const lessons = ["1,2,3", "1,2,3,4,5,6", "4,5,6", "7,8,9", "7,8,9,10,11,12", "10,11,12", "13,14,15,16"];
const startTimeHours = [7, 7, 9, 12, 12, 15, 18];
const startTimeMinutes = [0, 0, 30, 35, 30, 5, 0];
const endTimeHours = [9, 12, 12, 14, 17, 17, 21, 17];
const endTimeMinutes = [25, 0, 0, 55, 30, 30, 15];
const shift = ["1", "1-2", "2", "3", "3-4", "4", "5"];

class Schedule extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            anchorEl: null,
            studentAccount: null,
        };
        this.Auth = new AuthService();
    }
    componentDidMount() {
        const { history } = this.props;
        const studentAccount = localStorage.getItem("studentAccount");
        if (!studentAccount) {
            history.replace("/schedule");
        } else {
            this.setState({
                ...this.state,
                studentAccount: studentAccount,
            });
            const getData = JSON.parse(localStorage.getItem("data"));
            const newData = [];
            const listDays = Object.keys(getData);
            listDays.map((day) => {
                const dayMiniSecond = day * 1;
                const YEAR = new Date(dayMiniSecond).getFullYear();
                const MONTH = new Date(dayMiniSecond).getMonth();
                const DAY = new Date(dayMiniSecond).getDate();
                getData[day].map((item) => {
                    const subject = {};
                    const _class = `${item.address.split("_")[0]}-${item.address.split(" ")[1]}`;
                    lessons.map((lesson, index) => {
                        if (lesson === item.lesson) {
                            subject.shift = index + 1;
                            subject.text = `Ca ${shift[index]} : ${item.subject.split("-")[0]} : ${_class}`;
                            subject.startDate = new Date(YEAR, MONTH, DAY, startTimeHours[index], startTimeMinutes[index]);
                            subject.endDate = new Date(YEAR, MONTH, DAY, endTimeHours[index], endTimeMinutes[index]);
                        }
                    });
                    newData.push(subject);
                });
                return newData.sort((a, b) => a.shift - b.shift);
            });
            this.setState({
                data: newData,
            });
        }
    }
    optionChanged = (e) => {
        if (e.studentAccount === "currentDate") {
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
                anchorOrigin={{ vertical: "top", horizontal: "right" }}
                id="menu"
                keepMounted
                transformOrigin={{ vertical: "top", horizontal: "right" }}
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
        history.push("/schedule");
        localStorage.removeItem("studentAccount");
        localStorage.removeItem("data");
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
                        <p>{`Xin chào ${studentAccount}`}</p>
                        <IconButton edge="end" aria-label="account of current user" aria-controls="menu" aria-haspopup="true" onClick={this.handleProfileMenuOpen} color="inherit">
                            <div className="icon-account-avatar">
                                <img className="avatar-img" src={avatar} alt="avatar" />
                            </div>
                        </IconButton>
                    </div>
                </div>
                {this.renderMenu()}
                <Scheduler
                    onOptionChanged={this.optionChanged}
                    dataSource={data}
                    views={views}
                    adaptivityEnabled={true}
                    defaultCurrentView={"month"}
                    height={700}
                    startDayHour={6}
                    endDayHour={22}
                />
            </React.Fragment>
        );
    }
}

export default withRouter(Schedule);
