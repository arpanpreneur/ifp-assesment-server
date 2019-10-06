(this.webpackJsonpifpclient=this.webpackJsonpifpclient||[]).push([[0],{101:function(e,t,n){},106:function(e,t,n){"use strict";n.r(t);var a=n(0),o=n.n(a),r=n(49),i=n.n(r),s=(n(62),n(29)),c=n.n(s),l=n(50),u=n(4),h=n(5),d=n(11),m=n(10),p=n(12),f=(n(64),n(65),n(21)),g=n(30),v=n.n(g);function b(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}var y=function(){function e(t){Object(u.a)(this,e),this.domain=t||"",this.fetch=this.fetch.bind(this),this.login=this.login.bind(this),this.getProfile=this.getProfile.bind(this)}return Object(h.a)(e,[{key:"login",value:function(e,t){var n=this;return this.fetch("".concat(this.domain,"/login"),{method:"POST",mode:"cors",body:JSON.stringify({username:e,password:t})}).then((function(e){return n.setToken(e.token),Promise.resolve(e)}))}},{key:"loggedIn",value:function(){var e=this.getToken();return!!e&&!this.isTokenExpired(e)}},{key:"isTokenExpired",value:function(e){try{return v()(e).exp<Date.now()/1e3}catch(t){return!1}}},{key:"setToken",value:function(e){localStorage.setItem("id_token",e)}},{key:"getToken",value:function(){return localStorage.getItem("id_token")}},{key:"logout",value:function(){localStorage.removeItem("id_token")}},{key:"getProfile",value:function(){return v()(this.getToken())}},{key:"fetch",value:function(e){function t(t,n){return e.apply(this,arguments)}return t.toString=function(){return e.toString()},t}((function(e,t){var n={"Content-Type":"application/json",Accept:"application/json"};return this.loggedIn()&&(n.Authorization="Bearer "+this.getToken()),fetch(e,function(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?b(n,!0).forEach((function(t){Object(f.a)(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):b(n).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}({headers:n},t)).then(this._checkStatus).then((function(e){return e.json()}))}))},{key:"_checkStatus",value:function(e){if(e.status>=200&&e.status<300)return e;var t=new Error(e.statusText);throw t.response=e,t}}]),e}();var k=n(51),O=n.n(k),w=(n(99),n(7)),j=function(e){function t(e){return Object(u.a)(this,t),Object(d.a)(this,Object(m.a)(t).call(this,e))}return Object(p.a)(t,e),Object(h.a)(t,[{key:"componentDidMount",value:function(){var e=this.props.data.map((function(e){return{load:e.load,time:Date.parse(e.time)}}));console.log(e),this.drawMyChart(e)}},{key:"drawMyChart",value:function(e){var t=10,n=30,a=30,o=60,r=460-o-n,i=400-t-a,s=w.h(this.refs.my_dataviz).append("svg").attr("width",r+o+n).attr("height",i+t+a).append("g").attr("transform","translate("+o+","+t+")"),c=w.g().domain(w.c(e,(function(e){return e.time}))).range([0,r]);s.append("g").attr("transform","translate(0,"+i+")").call(w.a(c));var l=w.f().domain([0,w.e(e,(function(e){return+e.load}))]).range([i,0]);s.append("g").call(w.b(l)),s.append("path").datum(e).attr("fill","none").attr("stroke","steelblue").attr("stroke-width",1.5).attr("d",w.d().x((function(e){return c(e.time)})).y((function(e){return l(e.load)})))}},{key:"customTickFunc",value:function(e,t,n){var a=new Date(e),o=new Date(t),r=[];for(o.setUTCDate(o.getUTCDate()+1);a<o;)a.setUTCDate(a.getUTCDate()+2),r.push(new Date(a));return r}},{key:"render",value:function(){return o.a.createElement("div",{ref:"my_dataviz"})}}]),t}(o.a.Component),E=n(52);function D(e,t){var n=t[e.deviceid].currentStatusAndTime.status,a=t[e.deviceid].records;return o.a.createElement("div",{className:"device-holder",key:e.deviceid},o.a.createElement("b",null,"Device Id:\xa0")," ",e.deviceid,o.a.createElement("br",null),o.a.createElement("b",null,"Status:\xa0"),o.a.createElement("span",{className:n},n),o.a.createElement(j,{data:a}),o.a.createElement("br",null),o.a.createElement("button",{type:"button",className:"form-submit",onClick:function(e){return function(e){new E.ExportToCsv({fieldSeparator:",",quoteStrings:'"',decimalSeparator:".",showLabels:!0,showTitle:!0,title:"Device data",useTextFile:!1,useBom:!0,useKeysAsHeaders:!0}).generateCsv(e)}(a)}},"Dump"),o.a.createElement("br",null),o.a.createElement("hr",null))}var S=new y,_=function(e){var t=new y;return function(n){function a(){var e;return Object(u.a)(this,a),(e=Object(d.a)(this,Object(m.a)(a).call(this))).state={user:null},e}return Object(p.a)(a,n),Object(h.a)(a,[{key:"componentWillMount",value:function(){if(t.loggedIn())try{var e=t.getProfile();this.setState({user:e})}catch(n){t.logout(),this.props.history.replace("/login")}else this.props.history.replace("/login")}},{key:"render",value:function(){return this.state.user?o.a.createElement(e,{history:this.props.history,user:this.state.user}):null}}]),a}(a.Component)}(function(e){function t(e){var n;return Object(u.a)(this,t),(n=Object(d.a)(this,Object(m.a)(t).call(this,e))).state={graphData:{},deviceStatus:[]},n.deviceList=[],n.initialData=[],n.ready=!1,n.socket=O()(),n.socket.on("get_device_list",(function(e){n.deviceList=e,console.log("Device List"),console.log(e),n.socket.emit("get_initial_data")})),n.socket.on("get_initial_data",(function(e){n.setUpGraphData(e),console.log("Initial Data"),console.log(e),n.socket.emit("get_latest_device_status")})),n.socket.on("get_latest_device_status",(function(e){var t=n.state.graphData;console.log(e),console.log(t),e.forEach((function(e){t[e.deviceid].currentStatusAndTime={status:e.status,time:e.latest_time_entry}})),console.log("From listener of get_latest_devicew_status"),console.log(t),n.setState({graphData:t})})),n.socket.on("new_monitor_data",(function(e){if(console.log(e),n.ready){var t=e.deviceId,a=Date.parse(e.time),o=n.state.graphData;o[t].records.push(e);var r=o[t].currentStatusAndTime,i=Date.parse(r.time);console.log(r),console.log(i),a>=i&&(console.log("Change Detected"),r=e),o[t].currentStatusAndTime=r,console.log("From new_monitor_data"),console.log(o),n.setState({graphData:o})}})),n.socket.on("connect",(function(e){n.socket.on("authenticated",Object(l.a)(c.a.mark((function e(){return c.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:console.log("Authenticated"),setTimeout((function(){n.initiateProcess(),n.ready=!0}),600);case 2:case"end":return e.stop()}}),e)})))).emit("authenticate",{token:S.getToken()})})),n}return Object(p.a)(t,e),Object(h.a)(t,[{key:"setUpGraphData",value:function(e){var t={};this.deviceList.forEach((function(e){t[e.deviceid]={},t[e.deviceid].records=[],t[e.deviceid].currentStatusAndTime={},console.log(t)})),e.forEach((function(e){t[e.deviceid].records.push(e)})),console.log("setUpGraphData called"),this.setState({graphData:t})}},{key:"componentDidMount",value:function(){}},{key:"handleLogout",value:function(){S.logout(),this.props.history.replace("/login")}},{key:"initiateProcess",value:function(){this.socket.emit("get_device_list"),console.log(this.state.graphData)}},{key:"render",value:function(){return o.a.createElement("div",null,o.a.createElement("div",{className:"App-header"},"Load Monitor"),o.a.createElement("div",{className:"App"},this.devices(),o.a.createElement("button",{type:"button",className:"form-submit",onClick:this.handleLogout.bind(this)},"Logout"),o.a.createElement("br",null),o.a.createElement("br",null)))}},{key:"devices",value:function(){var e=this;return this.deviceList.map((function(t){return D(t,e.state.graphData)}))}},{key:"componentWillUnmount",value:function(){this.socket.disconnect()}}]),t}(o.a.Component));Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));var T=n(53),C=n(13),P=n(17),A=(n(101),function(e){function t(e){var n;return Object(u.a)(this,t),(n=Object(d.a)(this,Object(m.a)(t).call(this,e))).handleChange=n.handleChange.bind(Object(P.a)(n)),n.Auth=new y(""),n.handleFormSubmit=n.handleFormSubmit.bind(Object(P.a)(n)),n.Auth.loggedIn()&&n.props.history.replace("/"),n}return Object(p.a)(t,e),Object(h.a)(t,[{key:"render",value:function(){var e=this;return o.a.createElement("div",{className:"center"},o.a.createElement("div",{className:"card"},o.a.createElement("h1",null,"Login"),o.a.createElement("form",{onSubmit:function(t){return e.handleFormSubmit(t)},method:"POST"},o.a.createElement("input",{className:"form-item",placeholder:"Username goes here...",name:"username",type:"text",onChange:this.handleChange}),o.a.createElement("input",{className:"form-item",placeholder:"Password goes here...",name:"password",type:"password",onChange:this.handleChange}),o.a.createElement("input",{className:"form-submit",value:"SUBMIT",type:"submit"}))))}},{key:"handleChange",value:function(e){this.setState(Object(f.a)({},e.target.name,e.target.value))}},{key:"handleFormSubmit",value:function(e){var t=this;e.preventDefault(),this.state&&this.state.username&&this.state.password?this.Auth.login(this.state.username,this.state.password).then((function(e){t.props.history.replace("/")})).catch((function(e){alert(e)})):alert("Username/Password is invalid")}}]),t}(a.Component));i.a.render(o.a.createElement(T.a,null,o.a.createElement("div",null,o.a.createElement(C.a,{exact:!0,path:"/",component:_}),o.a.createElement(C.a,{exact:!0,path:"/login",component:A}))),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()}))},57:function(e,t,n){e.exports=n(106)},62:function(e,t,n){},64:function(e,t,n){e.exports=n.p+"static/media/logo.25bf045c.svg"},65:function(e,t,n){},96:function(e,t){},99:function(e,t,n){}},[[57,1,2]]]);
//# sourceMappingURL=main.365be131.chunk.js.map