
function LoginWindow() {

	var self = Ti.UI.createWindow({
		backgroundImage : "/login.png",
		width : Ti.UI.SIZE,
		height : Ti.UI.SIZE,
		fullscreen: false,
		exitOnclose:true,
	});

	actInd = Titanium.UI.createActivityIndicator({
		bottom : "6dp",
		width : Ti.UI.SIZE,
		height : Ti.UI.SIZE
	});
	if (ActivityIndicatorStyle) {
		actInd.style = ActivityIndicatorStyle.PLAIN;
	}
	actInd.font = {
		fontFamily : 'Helvetica Neue',
		fontSize : 15,
		fontWeight : 'bold'
	};
	actInd.color = 'white';
	actInd.message = 'Loading...';
	actInd.width = 210;

	var usernameField = Ti.UI.createTextField({
		value:Math.ceil(Math.random()*100000000),
		top : "100dp",
		width : "300dp",
		height : Ti.UI.SIZE
	});
	var passwordField = Ti.UI.createTextField({
		value:"123",
		top : "150dp",
		width : "300dp",
		height : Ti.UI.SIZE
	});

	var register = Ti.UI.createButton({
		top : "200dp",
		left: "100dp",
		width:"50dp",
		title : "注册"
	});
	var login = Ti.UI.createButton({
		top : "200dp",
		right: "100dp",
		title : "登陆"
	});

	login.addEventListener("click", function () {
		alert("fuck!");
	});

	register.addEventListener("click", function () {
		var register = require("/lib/register");
		actInd.show();
		var registerfunc = new register("register","POST",usernameField.value,passwordField.value);
	});

	// self.add(imageLeft);
	// self.add(imageRight);
	
	self.add(usernameField);
	self.add(passwordField);
	self.add(login);
	self.add(register);
	self.add(actInd);

	return self;
				
}

module.exports = LoginWindow;
