(this["webpackJsonpschedule-kma"]=this["webpackJsonpschedule-kma"]||[]).push([[0],{253:function(e,t,n){e.exports=n.p+"static/media/avatar-default.17b08a8e.png"},271:function(e,t,n){e.exports=n(475)},466:function(e,t,n){},473:function(e,t,n){},474:function(e,t,n){},475:function(e,t,n){"use strict";n.r(t);var a=n(0),o=n.n(a),r=n(25),c=n.n(r),s=n(71),i=n(94),l=n(97),u=n(96),h=n(169),d=n(510),m=n(265),p=n(514),g=n(258),f=n.n(g),v=n(252),w=n.n(v),E=n(49),b=n(253),k=n.n(b),O=n(254),S=n.n(O),y=function e(t){var n=this;Object(s.a)(this,e),this.login=function(e,t){var a=new URLSearchParams;return a.append("studentAccount",e),a.append("studentPassword",t),S.a.post("".concat(n.domain),a).then((function(e){return Promise.resolve(e)}))},this.domain=t||"https://tkbkma.herokuapp.com/api/schedule/guest"},C=(n(466),["agenda","month","day","week"]),j=["1,2,3","1,2,3,4,5,6","4,5,6","7,8,9","7,8,9,10,11,12","10,11,12","13,14,15,16"],N=[7,7,9,12,12,15,18],A=[0,0,30,35,30,5,0],M=[9,12,12,14,17,17,21,17],P=[25,0,0,55,30,30,15],D=["1","1-2","2","3","3-4","4","5"],L=function(e){Object(l.a)(n,e);var t=Object(u.a)(n);function n(e){var a;return Object(s.a)(this,n),(a=t.call(this,e)).optionChanged=function(e){"currentDate"===e.studentAccount&&a.setState({currentDate:e.value})},a.handleMenuClose=function(){a.setState({anchorEl:null})},a.renderMenu=function(){var e=a.state.anchorEl,t=Boolean(e);return o.a.createElement(m.a,{className:"menu-account",anchorEl:e,anchorOrigin:{vertical:"top",horizontal:"right"},id:"menu",keepMounted:!0,transformOrigin:{vertical:"top",horizontal:"right"},open:t,onClose:a.handleMenuClose},o.a.createElement("div",{className:"user-account"},o.a.createElement(p.a,{onClick:a.logOut},"\u0110\u0103ng xu\u1ea5t")))},a.logOut=function(){a.props.history.push("/schedule"),localStorage.removeItem("studentAccount"),localStorage.removeItem("data")},a.handleProfileMenuOpen=function(e){a.setState({anchorEl:e.currentTarget})},a.state={data:[],anchorEl:null,studentAccount:null},a.Auth=new y,a}return Object(i.a)(n,[{key:"componentDidMount",value:function(){var e=this.props.history,t=localStorage.getItem("studentAccount");if(t){this.setState(Object(h.a)(Object(h.a)({},this.state),{},{studentAccount:t}));var n=JSON.parse(localStorage.getItem("data")),a=[];Object.keys(n).map((function(e){var t=1*e,o=new Date(t).getFullYear(),r=new Date(t).getMonth(),c=new Date(t).getDate();return n[e].map((function(e){var t={},n="".concat(e.address.split("_")[0],"-").concat(e.address.split(" ")[1]);j.map((function(a,s){a===e.lesson&&(t.shift=s+1,t.text="Ca ".concat(D[s]," : ").concat(e.subject.split("-")[0]," : ").concat(n),t.startDate=new Date(o,r,c,N[s],A[s]),t.endDate=new Date(o,r,c,M[s],P[s]))})),a.push(t)})),a.sort((function(e,t){return e.shift-t.shift}))})),this.setState({data:a})}else e.replace("/schedule")}},{key:"render",value:function(){var e=this.state,t=e.data,n=e.studentAccount;return o.a.createElement(o.a.Fragment,null,o.a.createElement("div",{className:"schedule-container"},o.a.createElement("div",{className:"schedule-title"},o.a.createElement(f.a,null),o.a.createElement("p",null,"Th\u1eddi kh\xf3a bi\u1ec3u KMA")),o.a.createElement("div",{className:"icon-account"},o.a.createElement("p",null,"Xin ch\xe0o ".concat(n)),o.a.createElement(d.a,{edge:"end","aria-label":"account of current user","aria-controls":"menu","aria-haspopup":"true",onClick:this.handleProfileMenuOpen,color:"inherit"},o.a.createElement("div",{className:"icon-account-avatar"},o.a.createElement("img",{className:"avatar-img",src:k.a,alt:"avatar"}))))),this.renderMenu(),o.a.createElement(w.a,{onOptionChanged:this.optionChanged,dataSource:t,views:C,adaptivityEnabled:!0,defaultCurrentView:"month",height:700,startDayHour:6,endDayHour:22}))}}]),n}(o.a.Component),I=Object(E.f)(L),x=n(138),T=n(512),J=n(511),B=n(513),F=n(261),z=n.n(F),H=n(263),K=n.n(H),U=n(262),V=n.n(U),W=n(260),$=n.n(W),R=n(102),X=n.n(R),Y=(n(473),function(e){Object(l.a)(n,e);var t=Object(u.a)(n);function n(e){var a;return Object(s.a)(this,n),(a=t.call(this,e)).onChangeInput=function(e){a.setState(Object(x.a)({},e.target.name,e.target.value))},a.onShowPassword=function(){var e=a.state.showPassword;a.setState({showPassword:!e})},a.onSubmitFormLogin=function(){var e=a.props.history,t=a.state,n=t.studentAccount,o=t.studentPassword;if(n&&o)if("undefined"===typeof n||n.trim().length<n.length||n.split(" ").length>1||null==n||!n.match(/^[0-9a-zA-Z]{0,}$/))X.a.fire("T\xe0i kho\u1ea3n ho\u1eb7c M\u1eadt kh\u1ea9u c\u1ee7a b\u1ea1n kh\xf4ng \u0111\xfang \u0111\u1ecbnh d\u1ea1ng !","","error");else{var r=n.toUpperCase(),c=$()(o);a.showLoadding(),a.Auth.login(r,c).then((function(t){var n=t.data,o=n.dataJson,c=n.status;a.showAlert(c),a.hideLoadding(),c&&(localStorage.setItem("data",JSON.stringify(o)),localStorage.setItem("studentAccount",JSON.stringify(r)),e.replace("/schedule/view"))}))}else X.a.fire("Vui l\xf2ng nh\u1eadp \u0111\u1ee7 T\xe0i kho\u1ea3n v\xe0 M\u1eadt kh\u1ea9u sinh vi\xean c\u1ee7a b\u1ea1n !","","error")},a.showAlert=function(e){X.a.mixin({toast:!0,position:"top-end",showConfirmButton:!1,timer:5e3,timerProgressBar:!0,onOpen:function(e){e.addEventListener("mouseenter",X.a.stopTimer),e.addEventListener("mouseleave",X.a.resumeTimer)}}).fire({icon:"".concat(e?"success":"error"),title:"".concat(e?"\u0110\u0103ng nh\u1eadp th\xe0nh c\xf4ng !":"T\xe0i kho\u1ea3n ho\u1eb7c m\u1eadt kh\u1ea9u kh\xf4ng ch\xednh x\xe1c ! H\xe3y ki\u1ec3m tra l\u1ea1i !")})},a.showLoadding=function(){a.setState({showLoadding:!0})},a.hideLoadding=function(){a.setState({showLoadding:!1})},a.state={showLoadding:!1,showPassword:!1,studentAccount:"",studentPassword:""},a.Auth=new y,a}return Object(i.a)(n,[{key:"componentDidMount",value:function(){JSON.parse(localStorage.getItem("data"))&&this.props.history.replace("/schedule/view")}},{key:"render",value:function(){var e=this.state,t=e.showPassword,n=e.showLoadding;return o.a.createElement("div",{className:"container"},n?o.a.createElement("div",{className:"loadding"},o.a.createElement(J.a,null)):"",o.a.createElement("div",{className:"background"},o.a.createElement("div",{className:"login"},o.a.createElement("h1",null,"Th\u1eddi Kh\xf3a bi\u1ec3u KMA"),o.a.createElement("form",{className:"login-form"},o.a.createElement("div",{className:"login-form-account"},o.a.createElement(B.a,{type:"text",name:"studentAccount",label:"T\xe0i kho\u1ea3n",variant:"outlined",onChange:this.onChangeInput}),o.a.createElement("span",{className:"login-form-icon"},o.a.createElement(z.a,null))),o.a.createElement("div",{className:"login-form-password"},o.a.createElement(B.a,{type:t?"text":"password",name:"studentPassword",label:"M\u1eadt kh\u1ea9u",variant:"outlined",onChange:this.onChangeInput}),o.a.createElement("span",{className:"login-form-icon",onClick:this.onShowPassword},t?o.a.createElement(V.a,null):o.a.createElement(K.a,null))),o.a.createElement(T.a,{onClick:this.onSubmitFormLogin,variant:"contained",color:"primary"},"\u0110\u0103ng nh\u1eadp")))))}}]),n}(a.Component)),Z=Object(E.f)(Y),_=n(264),q=(n(474),function(e){Object(l.a)(n,e);var t=Object(u.a)(n);function n(){return Object(s.a)(this,n),t.apply(this,arguments)}return Object(i.a)(n,[{key:"render",value:function(){return o.a.createElement(_.a,null,o.a.createElement(E.c,null,o.a.createElement(E.a,{path:"/schedule/view",component:function(){return o.a.createElement(I,null)}}),o.a.createElement(E.a,{path:"/schedule",exact:!0,component:function(){return o.a.createElement(Z,null)}})))}}]),n}(a.Component));Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));c.a.render(o.a.createElement(q,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[271,1,2]]]);
//# sourceMappingURL=main.10e4a5da.chunk.js.map