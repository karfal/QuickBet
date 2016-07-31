<?php

    require('model/database.php');
    require('model/insert_db.php');

    //var_dump($_POST);exit;
    $fraction = $_POST['fraction'];
    $decimal = $_POST['decimal'];
    $moneyline = $_POST['moneyline'];

    InsertDB::addInsert($fraction, $decimal, $moneyline);
	
	//var_dump(__line__);exit;
	/****************************
	 * EMAIL MESSAGE *
	 ****************************/
	$pageTitle = "User Calculation";
	$companyName = "QucikbetOnline";
	$companyEmail = "info@quickbetonline.com";
	$testEmail = "kfalzon88@gmail.com";

	$url = "http://localhost:8080/apps/modal/";
	$logo = "assets/images/dice.png";
	
	$emailmsg = "";
	
	foreach($_POST as $key => $value) {
		//$text = explode("_", $key);
		//regex used to find camel case character and insert space in between 
		//$title = preg_split('/(?=[A-Z])/',$text[1]);
		//$header = implode(' ', $title);
		
		if($value != "") {
			$emailmsg .= "\n<tr><td><a style='float:left; color:#4d4d4d; padding-bottom: 5px; padding-right: 10px;'>".strtoupper($key).":</a> <span>". $value ."</span></td></tr>\n";
		}
	}

	/****************************
	 * EMAIL BODY *
	 ****************************/
	$message = "
		<table>
			<tr>
				<td><a href='".$url."' style='border:none;'><h1><img src='".$url.'/'.$logo."' border='0'; style='color:#000;' /></h1></a></td>
			</tr>
		</table>
		
		<table style='width: 370px;'>
			<tr>
				<td style='font-size:14px; color:#4d4d4d; width:175px; font-weight:bold;'>$companyName $pageTitle</td>
			</tr>
			
			<tr><td><hr style='border: 0; border-top:1px solid #d6d6d6;'/></td></tr>";
	
	$message .= $emailmsg; 

	$message .= 
			"<tr><td><hr style='border: 0; border-top:1px solid #d6d6d6;'/></td></tr>
			<tr>
				<td colspan='2' style='background-color: #fff; height:60px;'><p style='font-family:Arial; margin:5px 0; font-size:13px; color:#4d4d4d;'><a style='width:60px; float:left; color:#4d4d4d;'>Email:</a> <a style='color:#000;'>".$companyEmail."</a></p></td>			
	       </tr> 
		</table>
		";
	
	//var_dump($message);exit;
	
	
	$headers =  'MIME-Version: 1.0' . "\r\n";
	$headers .= 'Content-type: text/html; charset=iso-8859-1' . "\r\n";
	$headers .= "Return-Path: <$companyEmail>" . "\r\n";
	$headers .= "From: $companyName <$companyEmail>" . "\r\n" .
				'X-Mailer: PHP/' . phpversion();
					
	//var_dump($testEmail, $pageTitle, $message, $headers);exit;

	mail($testEmail, $pageTitle, $message, $headers, "-f$companyEmail");

?>
