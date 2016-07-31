"use strict";

$(document).ready(function() {

	disableInputs();

	//prevent form from submitting, get user value and validate
	$('#bettingOddForm').on('submit', function(e) {
		e.preventDefault();

		$('.odds_input').each(function() {
			if($(this).val() != '' && $(this).attr('readonly') === undefined) {

				checkOdds($(this).attr('id'), $(this).val());
				
				return false;
			}
		}); //end loop
		
	}); //end on submit

	$('#clear_btn').click(function() {
		$('.odds_input').val('').removeAttr('readonly');
	});

	$('.odds_input').attr("autocomplete", "off");

}); //end document


//disable other inputs on user interaction
function disableInputs() {

	$('.odds_input').on('keyup', function(e) {
		$this = $(this);

		if($this.val().length > 0) 
			$this.siblings('.odds_input').attr("readonly", "readonly");

		else 
			$this.siblings('.odds_input').removeAttr("readonly");
	});

}//end function


//check which inputbox user interectated with, and verify entry 
function checkOdds(odds, value) {

	var validationFrac = /^(\d+)\/(\d+)$/; //fractions only
	var validationDec = /^[0-9.,]+$/; //numbers and periods
	var validationMon = /^-?\d*\.{0,1}\d+$/; //positive and negative numbers only
    
	switch(odds) {
		case 'odds_frac' :
			if(!validationFrac.test(value)) {
				alert('Please enter a fraction');
			}
			else 
				fractional(value);

			break;

		case 'odds_dec' :
			if(!validationDec.test(value)) {
				alert('Please enter a decimal number');
			}
			else
				decimal(value);

			break;

		case 'odds_money' :
			if(!validationMon.test(value)) {
				alert('Please enter a whole or negative number');
			}
			else
				moneyline(value);

			break;

	}//end switrch

}//end function


function fractional(input) {
    
	var userInput = input.split("/");
	var numer = parseInt(userInput[0]);
	var denom = parseInt(userInput[1]);
	var prob = 0;

	prob = denom / (denom + numer) * 100;
	probabilityToOdds(prob);
}//end function


function decimal(input) {
    
	var userInput = parseFloat(input);
	var prob = ( (1 / userInput) * 100 );

	probabilityToOdds(prob);
}//end function


function moneyline(input) {
    
	var userInput = parseFloat(input);
	var prob = 0;
    
    //if user input is not negative num 'plus odds'
	if(userInput > 0) {
        prob =  (100 / (userInput + 100) * 100);
	}
	//if user input is negative num 'minus odds'
	else {
		userInput = Math.abs(userInput);
		prob = userInput / (userInput + 100 ) * 100;
	}

	probabilityToOdds(prob);
}//end function


function probabilityToOdds(prob) {

	var fract = 0;
	var deci = (100 / prob).toFixed(2);
	var money = parseFloat( (prob >= 50 ? "-" + (prob / (100 - prob) * 100) : "+" + (100 - prob) / prob * 100) ).toFixed(2);

	/*---*/
	var gcd = function(a, b) {
	  if (b < 0.0000001) return a;

	  return gcd(b, Math.floor(a % b));
	};

	var fraction = deci;
	var len = fraction.toString().length - 2;

	var denominator = Math.pow(10, len);
	var numerator = fraction * denominator;

	var divisor = gcd(numerator, denominator);

	numerator /= divisor;
	denominator /= divisor;
	/*---*/

	numer = Math.floor(numerator);
	denom = Math.floor(denominator);

	fract = numer + '/' + denom;

	if($('#odds_frac').is('[readonly]')) {
		$('#odds_frac').val(fract);
	}

	if($('#odds_dec').is('[readonly]')) {
		$('#odds_dec').val(deci);
	}

	if($('#odds_money').is('[readonly]')) {
		$('#odds_money').val(money);
	}
	
	saveToLog(fract, deci, money);

}//end function


//send to php file to save to database
function saveToLog(fraction, decimal, moneyline) {

	var userData = {
		fraction, decimal, moneyline
	}

	$.ajax({
		 type: "POST",
		 url: "createLog.php",
		 data: userData,
		 success: function() {
		 	console.log('success');
		 }
	});

}//end function