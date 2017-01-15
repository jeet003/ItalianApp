    var getQueryParam = function getQueryParam(sParam) {
        var sPageURL = decodeURIComponent(window.location.search.substring(1)),
            sURLVariables = sPageURL.split('&'),
            sParameterName,
            i;
        //alert("sPageurl :" + sPageURL);
        for (i = 0; i < sURLVariables.length; i++) {
            sParameterName = sURLVariables[i].split('=');

            if (sParameterName[0] === sParam) {
                return sParameterName[1] === undefined ? true : sParameterName[1];
            }
        }
    };


    function myappointment(){
    	
    	var client_id = getQueryParam('client_id');


    	var my_profile_image = getQueryParam('my-profile-image');
    	//alert(my_profile_image);
    	if( my_profile_image != null && my_profile_image != 'undefined'){
    		$('.my-profile-image').attr('src' , 'https://graph.facebook.com/'+my_profile_image+'/picture?type=large' );
    	}

    	var formData = new FormData();
    	formData.append("user_id",client_id);
    	
    	$('#my-appointment').attr('url' , 'my-appointment.html?client_id=' + client_id);
    	$('#shop-connected').attr('url' , 'shop-connected.html?client_id=' + client_id);
    	$('#barCode').attr('url' , 'barCode.html?client_id=' + client_id);
    	$('#my-account').attr('url' , 'my-account.html?client_id=' + client_id);
    	$('#back_button').attr('url' , 'my-appointment.html?client_id=' + client_id);
    	$('.barcode-menu').attr('url' , 'barCode.html?client_id=' + client_id);

        $.ajax({
      		url: 'http://www.dappoint.com/shopapp/php/my-appointment-app.php',
      		type: 'POST',
      		data: formData,
      		async: false,
      		success: function(data) {

      			var finaldata = JSON.parse(data);
      			
      			if( finaldata.OPERATION == 0){
      				
      				var searchData = finaldata.SEARCH_RESULT;
      				
      				var appointment_count = 0;
      				
      				$.each( searchData , function( index, value ){
      					appointment_count ++;
      	  			});
      				
      				$('.appointment_count').html( appointment_count );
      			}
      },
      cache: false,
      contentType: false,
      processData: false
    });
        
    }

    function getUserDetails(){
    	
    	 var formData = new FormData();
    	 var user_id = getQueryParam('client_id');
         formData.append( 'user_id' , user_id );
         
          $.ajax({
        url: 'http://www.dappoint.com/shopapp/php/getClientDetails.php',
        type: 'POST',
        data: formData,
        async: false,
        success: function(data){

        	  var finaldata = JSON.parse(data);
        		
              if( finaldata.OPERATION == 0 ){
            	  
                    var searchresult = finaldata.SEARCH_RESULT;
                    var name = searchresult['first_name'];
                    var lastname = searchresult['last_name'];
                    var qrcode = searchresult['qrcode'];
                    var phone = searchresult['mobile_no'];
                    var email = searchresult['email_id'];
                    var profile_image = searchresult['profile_image'];
                    
                    $('.client_name').html( name + ' ' + lastname );
                    $('.client_email').html( email );
                    $('.client_phone').html( phone );
                    $('.qrcode').val( qrcode);
                    
                    $('.my-profile-image').attr('src' , profile_image );
                    
                    
              }
          },
        cache: false,
        contentType: false,
        processData: false
    });
    }

   $(document).ready(function(){
	   getUserDetails();
	   myappointment();
	   
	   $( document ).bind( "mobileinit", function() {
		    $.mobile.allowCrossDomainPages = true;
		});
	   
		$('#mymenu').click(function(){
			
			$('#menu-details').addClass('animated fadeInLeft');
			$('#menu-details').show();
		});
		
		$(".theme-config").on("swipeleft",function(){
			$( "#menu-details" ).hide();
		  });
		
		$(this).on( 'click' , '.nav_menu' , function(){
			
			var url = $(this).attr('url');
			document.location = url;
		});
   });