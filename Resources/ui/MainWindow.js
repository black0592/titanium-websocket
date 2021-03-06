//Application Window Component Constructor
function MainWindow() {

	var websocketIntent = Ti.Android.createServiceIntent( { url: 'websocket.js' } );
	if( Ti.Android.isServiceRunning(websocketIntent) ) {
		// var connect = ws._connect();
		if ("undefined" == typeof(ws)) {
			Ti.include('/websocket.js');
		};
		var isRunning = Ti.App.Properties.getBool("service_running", false);
	}else {
		var service = Ti.Android.createService(websocketIntent);
		service.start();
	};

	var networkIsOnline, networkType;
	var self = Ti.UI.createWindow({
		backgroundColor:'white',
		width : "100%",
		height : "100%",
		fullscreen: false,
		title:username || "You",
		navBarHidden : true,
		// exitOnClose: false,
		// modal:true,
		activity : {
			onCreateOptionsMenu : function(e) {
				var menu = e.menu;
				var m1 = menu.add({ title : '退出程序' });
				m1.setIcon(Ti.Android.R.drawable.ic_menu_close_clear_cancel);
				m1.addEventListener('click', function(e) {
					Ti.Android.stopService(websocketIntent);
					ws.close();
					ws = undefined;
					Ti.App.Properties.setBool("login", false);
					Ti.App.Properties.setList("user", []);
					Ti.Android.currentActivity.finish();
				});
			}
		}
	});
		
	//construct UI
	var FirstView = require('ui/common/FirstView');
	var firstview = new FirstView();
	var OnlineView = require('ui/common/OnlineView');
	var onlineview = new OnlineView();
	var FriendsView = require('ui/common/FriendsView');
	var friendsview = new FriendsView();
	var SettingsView = require('ui/common/SettingsView');
	var settingsview = new SettingsView();

	var bottom = Ti.UI.createLabel ({
		backgroundColor:'darkgray',
		text: '',
		textAlign: 'center',
		bottom:0,
		width: Titanium.UI.FILL, 
		backgroundImage:"/grad.png",
		zIndex : 500,
		height:"50dp"
	});

	var weixincont = Ti.UI.createLabel ({
		zIndex : 1000,
		bottom:0,
		left:"10dp",
		height:"50dp",
		width:"80dp",
		backgroundColor:"transparent"
	});
	var weixin = Ti.UI.createButton({
		backgroundImage : "/tab_weixin_pressed.png",
		zIndex : 800,
		bottom:"15dp",
		left:"20dp",
		height:"30dp",
		width:"30dp"
	});
	var weixinlabel = Ti.UI.createLabel({
		text:"微信",
		textAlign: 'center',
		backgroundColor:'transparent',
		zIndex : 800,
		bottom:0,
		left:"20dp",
		width:"30dp",
		font: {
		    fontSize: '11dp'
		},
		touchEnabled:false
	});

	var addresscont = Ti.UI.createLabel ({
		zIndex : 1000,
		bottom:0,
		left:"105dp",
		height:"50dp",
		width:"70dp",
		backgroundColor:"transparent"
	});
	var address = Ti.UI.createButton({
		backgroundImage : "/tab_address_normal.png",
		zIndex : 800,
		bottom:"15dp",
		left:"105dp",
		height:"30dp",
		width:"30dp"
	});
	var addresslabel = Ti.UI.createLabel({
		text:"通讯录",
		textAlign: 'center',
		backgroundColor:'transparent',
		zIndex : 900,
		bottom:0,
		left:"102dp",
		width:"35dp",
		touchEnabled:false,
	    font: {
		    fontSize: '11dp'
		}
	});

	var friendscont = Ti.UI.createLabel ({
		zIndex : 1000,
		bottom:0,
		left:"187dp",
		height:"50dp",
		width:"70dp",
		backgroundColor:"transparent"
	});
	var friends = Ti.UI.createButton({
		backgroundImage : "/tab_find_frd_normal.png",
		zIndex : 800,
		bottom:"15dp",
		left:"187dp",
		height:"30dp",
		width:"30dp"
	});
	var friendslabel = Ti.UI.createLabel({
		text:"朋友圈",
		textAlign: 'center',
		backgroundColor:'transparent',
		zIndex : 900,
		bottom:0,
		left:"182dp",
		width:"40dp",
	    font: {
		    fontSize: '11dp'
		},
		touchEnabled:false
	});

	var settingscont = Ti.UI.createLabel ({
		zIndex : 1000,
		bottom:0,
		right:"20dp",
		height:"50dp",
		width:"60dp",
		backgroundColor:"transparent"
	});
	var settings = Ti.UI.createButton({
		backgroundImage : "/tab_settings_normal.png",
		zIndex : 800,
		bottom:"15dp",
		right:"20dp",
		height:"30dp",
		width:"37dp"
	});
	var settingslabel = Ti.UI.createLabel({
		text:"设置",
		textAlign: 'center',
		backgroundColor:'transparent',
		zIndex : 900,
		bottom:0,
		right:"18dp",
		width:"40dp",
	    font: {
		    fontSize: '11dp'
		},
		touchEnabled:false
	});

	weixincont.addEventListener("click",function () {

		if (weixin.backgroundImage == "/tab_weixin_pressed.png") {
			return ;
		};

		weixin.backgroundImage = "/tab_weixin_pressed.png";
		// weixincont.backgroundImage = "/tab_bg2.png";
		address.backgroundImage = "/tab_address_normal.png";
		friends.backgroundImage = "/tab_find_frd_normal.png";
		settings.backgroundImage = "/tab_settings_normal.png";

		hideview();
		firstview.visible = true;

	});

	addresscont.addEventListener("click",function () {

		if (address.backgroundImage == "/tab_address_pressed.png") {
			return ;
		};

		weixin.backgroundImage = "/tab_weixin_normal.png";
		// addresscont.backgroundImage = "/tab_bg2.png";
		address.backgroundImage = "/tab_address_pressed.png";
		friends.backgroundImage = "/tab_find_frd_normal.png";
		settings.backgroundImage = "/tab_settings_normal.png";

		hideview();

		onlineview.visible = true;

	});

	friendscont.addEventListener("click",function () {

		if (friends.backgroundImage == "/tab_find_frd_pressed.png") {
			return ;
		};

		weixin.backgroundImage = "/tab_weixin_normal.png";
		// friendscont.backgroundImage = "/tab_bg2.png";
		address.backgroundImage = "/tab_address_normal.png";
		friends.backgroundImage = "/tab_find_frd_pressed.png";
		settings.backgroundImage = "/tab_settings_normal.png";

		hideview();
		friendsview.visible = true;

	});

	settingscont.addEventListener("click",function () {
		
		if (settings.backgroundImage == "/tab_settings_pressed.png") {
			return ;
		};

		weixin.backgroundImage = "/tab_weixin_normal.png";
		// settingscont.backgroundImage = "/tab_bg2.png";
		address.backgroundImage = "/tab_address_normal.png";
		friends.backgroundImage = "/tab_find_frd_normal.png";
		settings.backgroundImage = "/tab_settings_pressed.png";

		hideview();

		settingsview.visible = true;

	});

	self.add(bottom);

	self.add(weixincont);
	self.add(weixin);
	self.add(weixinlabel);

	self.add(addresscont);
	self.add(address);
	self.add(addresslabel);
	
	self.add(friendscont);
	self.add(friends);
	self.add(friendslabel);

	self.add(settingscont);
	self.add(settings);
	self.add(settingslabel);

	self.addEventListener('android:back', function(e){
		var intent = Ti.Android.createIntent({
		    action: Ti.Android.ACTION_MAIN
		});
		intent.addCategory(Ti.Android.CATEGORY_HOME);
		Ti.Android.currentActivity.startActivity(intent);
		IsBackground = true;
	});

	self.addEventListener("focus",function(e){
		IsBackground = false;
	});
	self.addEventListener("open",function(e) {
		self.activity.addEventListener('pause', function(e) {
		    IsBackground = true;
		});
		self.activity.addEventListener('resume', function(e) {
		    IsBackground = false;
		});
	})

	// self.addEventListener('android:home', function(){
	// 	self.hide();
	// });

	self.add(firstview);
	self.add(onlineview);
	self.add(friendsview);
	self.add(settingsview);
	onlineview.visible = false;
	friendsview.visible = false;
	settingsview.visible = false;

	function hideview () {

		for (var i = 0;i<self.children.length;i++) {

			if (self.children[i].accessibilityHint == "view") {
				self.children[i].visible = false;
			};
		};
	}

	Ti.Network.addEventListener('change', function(e) {
	  networkIsOnline = e.online;
	  networkType = e.networkType;
	  if (networkIsOnline && ConnectState == 0) {
	  	// ws._connect();
	  };
	});

	//top bar
	var top = Ti.UI.createLabel ({
		text: '微信',
		textAlign: 'center',
		top:0,
		width: Titanium.UI.FILL, 
		backgroundImage:"/title_bar.9.png",
		zIndex : 1000,
		height:"50dp",
		color:"white",
		font: {
		    fontSize: '20dp',fontWeight :"bold"
		},
	});


	self.add(top);

	return self;
				
}

//make constructor function the public component interface
module.exports = MainWindow;
