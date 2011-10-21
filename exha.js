/*
 Javascript Khusus Untuk Program Excellent Habit
*/


function onBodyLoad(){
    //Add event listener deviceready (phonegap)
    document.addEventListener("deviceready",exha.onDeviceReady,false);    
    //initiate new javascript object
    exha.init();

} 


//Main Object
var exha = new function() {

//Info
this.programmer = "Yuan Yudistira";
this.getInfo = function () {
    return this.programmer 
};

//Set initial settings
this.init = function () {
    
    this.displayCurrentDate("section#currentDateTime");
     
     $( document ).bind( "deviceready", function( event, data ){
         //Lakukan sesuatu setelah device ready
         alert("Device Ready");           
      });
    
    $( document ).bind( "pageload", function( event, data ){
         //ini agar setiap kali page load, tetap dijalankan fungsi exha.init
         exha.init();
      });
    
    this.createDatabase();     
};

//onDeviceReady Function
this.onDeviceReady = function ()
{
 
   
}

this.createDatabase = function()
{
        if (Modernizr.websqldatabase){
            db = openDatabase('exhadb', "1.0", 'exhadb',200000);
            
            alert(" database exhadb telah dibuat ");
            
            this.createTable();
        
        } else {
        
            alert("sayang sekali tidak ada dukungan database");
        }
        
}

this.createTable = function()
{
   
    //Table user
    db.transaction(
    function(tx) {
    tx.executeSql("CREATE TABLE IF NOT EXISTS user ( userid INTEGER PRIMARY KEY  AUTOINCREMENT, firstname TEXT, lastname TEXT )", [], function(){
                    alert('user table created!');
                },
                function(){
                    alert('tidak bisa membuat table user!');
                }
                );
        }
    );
    
    //Table task
    db.transaction(
    function(tx) {
    tx.executeSql("CREATE TABLE IF NOT EXISTS task ( taskid INTEGER PRIMARY KEY  AUTOINCREMENT,taskname TEXT,taskduedate TEXT,taskstatusid INTEGER REFERENCES taskstatus (taskstatusid), userid INTEGER REFERENCES user (userid) )", [], function(){
                    alert('task table created!');
                },
                function(){
                    alert('tidak bisa membuat table task!');
                }
                );
        }
    );
    
    //Table task status
    db.transaction(
        function(tx) {
            tx.executeSql("CREATE TABLE IF NOT EXISTS taskstatus  (taskstatusid INTEGER PRIMARY KEY  AUTOINCREMENT,taskstatusname TEXT)", [], function(){
                tx.executeSql("INSERT INTO taskstatus (taskstatusid, taskstatusname) values (1,'from dreamcapture')", [], null, null);
                tx.executeSql("INSERT INTO taskstatus (taskstatusid, taskstatusname) values (2,'from wizard')", [], null, null);
                tx.executeSql("INSERT INTO taskstatus (taskstatusid, taskstatusname) values (3,'do it')", [], null, null);
                tx.executeSql("INSERT INTO taskstatus (taskstatusid, taskstatusname) values (4,'scheduled')", [], null, null);
                tx.executeSql("INSERT INTO taskstatus (taskstatusid, taskstatusname) values (5,'delegated')", [], null, null);                
                },
            function() {
                 alert('tidak bisa membuat table task status!');         
            }
            );
        }
    );

}

this.getTodayTask = function()
{
    
}
this.displayTodayTask = function()
{
    
}
this.cancelDreamCapture = function()
{
    
}
this.addDreanCapture = function()
{
    
}
this.setTaskType = function()
{
    
}
this.getTaskType = function()
{
    
}
this.deleteTask = function()
{
    
}
this.savePersonalInfo = function()
{
    
} 

//Utilities Function
this.displayCurrentDate = function() {
    var currentDate = new Date();
    $("section#currentDateTime").text('Today: '+currentDate.getDate()+'/'+currentDate.getMonth()+'/'+currentDate.getFullYear());
}  

}

