/*
 Javascript Khusus Untuk Program Excellent Habit
*/

//Main Object
var exha = new function() {
    
    //Info
    this.programmer = "Yuan Yudistira";
    this.getInfo = function () {
        return this.programmer 
    };
    
    //Set initial settings
    this.init = function () {
        
        $(document).ready(function() {
            //alert('Welcome to StarTrackr! Now no longer under police ...');
        });
        this.displayCurrentDate("section#currentDateTime");
        
        //attach event to menu
       
        $('ul#mainMenu li a').bind('click', function() {
            //exha.displayCurrentDate();
        });

    };
    
    
    //Utilities Function
    this.displayCurrentDate = function() {
        var currentDate = new Date();
        $("section#currentDateTime").html('Today: '+currentDate.getDate()+'/'+currentDate.getMonth()+'/'+currentDate.getFullYear());

    }
}

