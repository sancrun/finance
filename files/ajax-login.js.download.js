jQuery( function($) {
	
	$( function() {
		
		
		
		/* ------------------------------------------ */
		/* Show Forms */
		
			$('.show-form').on('click', function(e) {
				
				var $this = $(this);
				
				if ( $this.hasClass('show-forgot') ) {
					
					$('.visitor-login').hide();
					$('.visitor-forgot').show();
					
				} else if ( $this.hasClass('show-login') ) {
					
					$('.visitor-forgot').hide();
					$('.visitor-login').show();
					
				}
				
				e.preventDefault();
				
			});
		
		
		
		/* ------------------------------------------ */
		/* Ajax: Login Form */

			$('form#loginform').on('submit', function(e) {
				
			    $('form#loginform p.status').show().text(ajax_auth_object.loadingmessage);
			    
			    $.ajax({
			        type: 'POST',
			        dataType: 'json',
			        url: ajax_auth_object.ajaxurl,
			        data: { 
			            'action': 'ajaxlogin', //calls wp_ajax_nopriv_ajaxlogin
			            'username': $('form#loginform #username').val(), 
			            'password': $('form#loginform #password').val(), 
			            'security': $('form#loginform #security').val() },
			        success: function(data){
			            $('form#loginform p.status').text(data.message);
			            if (data.loggedin == true){
			                document.location.href = ajax_auth_object.redirecturl;
			            }
			        }
			    });
			    
			    e.preventDefault();
			    
			});
		
		
		
		
		/* ------------------------------------------ */
		/* Ajax: Login Form */
		
			$('form#forgot_password').on('submit', function(e){
				
				if (!$(this).valid()) return false;
				
				$('p.status', this).show().text(ajax_auth_object.loadingmessage);
				
				ctrl = $(this);
				
				$.ajax({
					type: 'POST',
		            dataType: 'json',
		            url: ajax_auth_object.ajaxurl,
					data: { 
						'action': 'ajaxforgotpassword', 
						'user_login': $('#user_login').val(), 
						'security': $('#forgotsecurity').val(), 
					},
					success: function(data){					
						$('p.status',ctrl).text(data.message);				
					}
				});
				
				e.preventDefault();
				
				return false;
				
			});
		 
		    if ( jQuery('#forgot_password').length ) {
				//jQuery('#forgot_password').validate();
			}
			
			
	
	});

});