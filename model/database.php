<?php
    
    class Database {

        private static $dsn = 'mysql:dbname=modal;host=localhost';
        private static $user = 'user';
        private static $password = 'pass';
        private static $db;

        public static function getDb() {
            if(!isset(self::$db)) {
                try {
                    self::$db = new PDO(self::$dsn, self::$user, self::$password);
                }
                catch(PDOException $e) {
                    $errorMessage = $e->getMessage();
                    die();
                }
            }
            return self::$db;
        }

    }//end class

?>