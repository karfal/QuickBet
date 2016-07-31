"use strict";


var $$ = function(id) { return document.getElementById(id); }


var processFormInputs = function() {
	var isValid = true;

	var inputFields = document.getElementsByClassName('forminput');

	var i;
	var len = inputFields.length;

	for(i = 0; i < len; i++) {
		if(inputFields[i].value === '') 
			isValid = false;
	}
	
	if(isValid) {
		$('#contactForm').fadeOut("slow");

		setTimeout(function() { 

			$('#contact_response').animate({ 
				opacity: 1 
			}, 1000); 

			$('#contact_wrapper').animate({ 
				height: "500px"
			}, 1000); 

		}, 1000);//end timeout
	}

}//end function


function menuInteraction() {

	//on window load check if any style is applied to menu
	//remove if condition is met to ensure main nav is
	//always displayed
	if (window.innerWidth > 768) { 
    	$('#main_menu').removeAttr('style');
    }

    $('#main_menu ul li').click(function() {
	    location.reload();
	});

    //show/hide mobile nav on click
	$('#mobile_trigger').click(function() {

		if(!$('#main_menu').is(':visible')) {
			$('#main_menu').show().animate( {"left": '0'}, 500 );
		}
		else {
			$('#main_menu').animate( {"left": '-256px'}, 500 );
			setTimeout(function(){ $('#main_menu').hide() }, 500);
		}
	});

	window.onresize = function() {
		console.log(window.innerWidth);
	    if (window.innerWidth > 768) { 
	    	$('#main_menu').removeAttr('style');
	    }
    }

}//end function


window.onload = function() {

	menuInteraction();
	
	$$('submitform').onclick = processFormInputs;

}