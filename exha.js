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
 
        this.onDeviceReady = function ()
       {
         //Code To access PhoneGap API CALL
           alert("DEVICE READY");  
       }
    
        //document.addEventListener("deviceready", yourCallbackFunction, false);
        //Kita Matikan Ajax nya        
        $(document).ready(function() {
          // disable ajax nav
          $.mobile.ajaxLinksEnabled = false;
         });
              
        //attach event to menu
        $('ul#mainMenu li a').bind('click', function() {
            //exha.displayCurrentDate();
        });

    };
    
    
    //Utilities Function
    this.displayCurrentDate = function() {
        var currentDate = new Date();
        $("section#currentDateTime").text('Today: '+currentDate.getDate()+'/'+currentDate.getMonth()+'/'+currentDate.getFullYear());

    }
}

