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
        this.displayCurrentDate("section#currentDateTime")


    };
    
    
    //Utilities Function
    this.displayCurrentDate = function(id) {
        var currentDate = new Date();
        $(id).html('Today: '+currentDate.getDate()+'/'+currentDate.getMonth()+'/'+currentDate.getFullYear());

    }
}

