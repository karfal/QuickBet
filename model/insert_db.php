<?php
	
	class InsertDB {

		public static function addInsert($fraction, $decimal, $moneyline) {
	        $db = Database::getDb();

	        $query = 'INSERT INTO inserts
	                    (fractionals, decimals, moneylines)
	                  VALUES
	                    (:fract, :deci, :moneyl)';
	                 
	        $statement = $db->prepare($query);
	        $statement->bindvalue(':fract', $fraction);
	        $statement->bindvalue(':deci', $decimal);
	        $statement->bindvalue(':moneyl', $moneyline);
	        $statement->execute();
	        $statement->closeCursor();

	    }//end function

	}//end class

?>