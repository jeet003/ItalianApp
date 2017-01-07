/*jshint browser:true */
/*global $ */(function()
{
 "use strict";
 /*
   hook up event handlers 
 */
 	function register_event_handlers(){
     
    $(document).on("click", ".facebook_login", function(evt)
    {
    	facebookConnectPlugin.getLoginStatus(
   
	function (response) {
      if (response.status !== 'connected') {
         facebookConnectPlugin.login( ["public_profile", "email"],
            function (response) {
               if (response.status === 'connected') {
                  facebookConnectPlugin.api('/me/?fields=id,name,email', null,
                     function(response) {

                	  socialLogin( response.id , response.name, response.email , 'F' , 'https://graph.facebook.com/'+response.id+'/picture?type=large');

                     }
                  );
               }
            },
            function (response) { 
            }
         );
      } else {
          
          
         facebookConnectPlugin.api('/me/?fields=id,name,email', null,
            function(response) {

       	  
       	
        	 	socialLogin( response.id , response.name, response.email , 'F' , 'https://graph.facebook.com/'+response.id+'/picture?type=large');

            }
         );
      }
   },
   function (response) {

 	  
	  
	   socialLogin( response.id , response.name, response.email , 'F' , 'https://graph.facebook.com/'+response.id+'/picture?type=large');

	 }
);
         return false;
    });
    
    $(document).on("click", ".uib_w_2", function(evt)
    {
        facebookConnectPlugin.logout(function(response){
        
          
        }, function(response){
            
        })
         return false;
    });
    
    }
 document.addEventListener("app.Ready", register_event_handlers, false);
})();
