// Add to index.js or the first page that loads with your app.
// For Intel XDK and please add this to your app.js.

var device_id = null;

document.addEventListener('deviceready', function () {
  // Enable to debug issues.
  // window.plugins.OneSignal.setLogLevel({logLevel: 4, visualLevel: 4});
    
    //alert('deviceready');
    
   	device_id = device.uuid;
        
		document.addEventListener("backbutton", function (e) {
	        e.preventDefault(); 
	    navigator.notification.confirm("Are you sure want to exit from App?", onConfirmExit, "Confirmation", "Yes,No");
	    }, false );
	
    
    window.plugins.OneSignal.getIds(function(ids) {
      //alert(ids.userId);
      //  device_id = ids.userId;
    });
    
  
  var notificationOpenedCallback = function(jsonData) {
      
      var appointmentId = jsonData.notification.payload.additionalData.appointmentId ;
      
      var client_id = jsonData.notification.payload.additionalData.user_id ;

      alert('app_1' + appointmentId );
      
      document.location = 'my-appointment.html?client_id=' + client_id + '&appointment_id=' + appointmentId;          
      
  };

  window.plugins.OneSignal
    .startInit("702d060c-3c4c-4014-8911-22e9426c3944")
    .handleNotificationOpened(notificationOpenedCallback)
    .endInit();
    
    window.plugins.OneSignal.setSubscription(true);
    window.plugins.OneSignal.enableNotificationsWhenActive(false);
  
  // Sync hashed email if you have a login system or collect it.
  //   Will be used to reach the user at the most optimal time of day.
  // window.plugins.OneSignal.syncHashedEmail(userEmail);
    
}, false);