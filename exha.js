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
    //Add event listener deviceready (phonegap)
    document.addEventListener("deviceready",exha.onDeviceReady,false);    
    //initiate new javascript object
    this.createDatabase();   
    exha.displayTodayTask();
    $( "#todayListMainMenu" ).live( "click", function( event, data ){
         //class utk button utama tidak hilang
         $( "#todayListMainMenu" ).addClass('ui-btn-active');
         
      });

    
    
    //Attach event ke after page show
    $('#halamandepan').live('pageshow', function () {
        //Populate Today Task
        exha.displayTodayTask();
    });
    $('#dreamcapture').live('pageshow', function () {
        //Populate Current Item in Dream Capture
         exha.displayDreamCaptureTask();

        //Attach Fungsi Ke Button
        $('#cancelDreamCaptureBtn').bind( "click", function( event, data ){
            $('#inputDreamCapture').val('');
        });
        $('#saveDreamCaptureBtn').bind( "click", function( event, data ){
            var newDreamCapture = $('#inputDreamCapture').val();
            if(newDreamCapture=="")
            {
                $('#inputDreamCapture').val('empty');
                $('#inputDreamCapture').focus();
            }else{
                exha.addNewTask(newDreamCapture, 1);
                $('#inputDreamCapture').val('');
            }
            
        });
        
    });
    $('#wizard').live('pageshow', function () {
        //Populate current item in wizard 
        exha.displayWizard1Task();

        $('#cancelWizard1Btn').bind( "click", function( event, data ){
            $('#inputWizard1').val('');
        });

        $('#saveWizard1Btn').bind( "click", function( event, data ){
            var newWizard1 = $('#inputWizard1').val();
            
            if(newWizard1==""){
                 $('#inputWizard1').val('empty');
                 $('#inputWizard1').focus();
                 
            }else{
                  exha.addNewTask(newWizard1, 2);
                $('#inputWizard1').val('');   
            }
        });
    
    });
    $('#wizard2').live('pageshow', function () {
        //Populate current item in wizard 
        exha.displayWizard2Task();

    
    });
    
    $('#settings').live('pageshow', function () {
        exha.getUserInfo();
        //savePersonalInfoBtn
        $('#savePersonalInfoBtn').bind( "click", function( event, data ){
            var userFName = $('#userFName').val();
            var userLName = $('#userLName').val();
            exha.updatePersonalInfo(userFName,userLName);
        });


    });
    
    exha.displayCurrentDate("section#currentDateTime"); 

    $( document ).bind( "pageload", function( event, data ){
         //ini agar setiap kali page load, tetap dijalankan fungsi exha.init
         exha.displayCurrentDate("section#currentDateTime");
         exha.displayTodayTask();
         
        
        

    

        
      });
    

};

//onDeviceReady Function
this.onDeviceReady = function ()
{
 
   
}

this.createDatabase = function()
{
        if (Modernizr.websqldatabase){
            db = openDatabase('exhaDBOK03', "1.0", 'exhadb',200000);
            
            //alert(" database exhadb telah dibuat ");
            
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
                    //alert('user table created!');
                tx.executeSql("INSERT INTO user (userid, firstname, lastname) values (1,'Yuan','Yudistira')", [], null, null);

                },
                function(){
                    alert('tidak bisa membuat table user!');
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
                tx.executeSql("INSERT INTO taskstatus (taskstatusid, taskstatusname) values (6,'done')", [], null, null);                
                },
            function() {
                 //alert('tidak bisa membuat table task status!');         
            }
            );
        }
    );
   
    //Table task
    db.transaction(
    function(tx) {
    tx.executeSql("CREATE TABLE IF NOT EXISTS task ( taskid INTEGER PRIMARY KEY  AUTOINCREMENT,taskname TEXT,taskduedate TEXT,taskstatusid INTEGER REFERENCES taskstatus (taskstatusid), userid INTEGER REFERENCES user (userid) )", [], function(){
                 
                var currentDate = new Date();
                var nextDate = new Date();
                nextDate.setDate(currentDate.getDate() + 1);
            
                    tx.executeSql("INSERT INTO task (taskid,taskname,taskduedate,taskstatusid,userid) values (1,'Please Go To Menu Settings and update your profile OK?','"+currentDate.toString()+"',3,1)", [], null, null);
                    tx.executeSql("INSERT INTO task (taskid,taskname,taskduedate,taskstatusid,userid) values (2,'Have FUN!','"+nextDate.toString()+"',3,1)", [], null, null);
   
                  },
                function(){
                    alert('tidak bisa membuat table task!');
                }
                );
        }
    );
    
 
}


this.displayTodayTask = function()
{
    var htmlTodayTask = db.transaction(function(tx) {
        tx.executeSql('SELECT *  FROM task where taskstatusid=3 ',[], function (tx, result) {
    
        jmlItem = result.rows.length;
        htmlTodayTask="";
        if(jmlItem==0) {
            newhtml = "<p>TIDAK ADA TASK HARI INI</p>";
        }else{
            //<input type="checkbox" name="checkbox-1" id="checkbox-1" class="custom" />
              var len = result.rows.length, i;
                var newhtml = "<fieldset data-role=\"controlgroup\">";
                var currentDate = new Date();
                for (i = 0; i < len; i++) {
                   var ItemDueDate  = new Date(result.rows.item(i).taskduedate);
                    
                    //alert(ItemDueDate+" >> "+currentDate);
                    
                    if(ItemDueDate > currentDate) {
                        //dont show today
                    }else{
                        newhtml += "<input type=\"checkbox\" name=\"checkboxToday-"+result.rows.item(i).taskid+"\" id=\"checkboxToday-"+result.rows.item(i).taskid+"\" value=\""+result.rows.item(i).taskid+"\" class=\"custom\" />" ;
                        newhtml += "<label for=\"checkboxToday-"+result.rows.item(i).taskid+"\">"+result.rows.item(i).taskname+"</label>";                        
                    }
                }
             newhtml +="</fieldset>";
        }
        
        //alert(newhtml);
        $('#todayLisTaskContent').html(newhtml).page();

 
        
        $("input[type='checkbox']").change(function() {
            $('input:checkbox:checked').each(function(index) {
             alert("Another Task DONE : id="+$(this).val()+" >>"+$(this).next("label").text());
             
             //change taskstatusid of taskid=$this.val() to = 6
             var deletedID= $(this).val();
             var updateSQL = "UPDATE task SET taskstatusid=6 where taskid="+deletedID;
                //alert(updateSQL);
            db.transaction(
            function(tx) {
            tx.executeSql("UPDATE task SET taskstatusid=6 WHERE taskid="+deletedID, [], function(){
                        //alert("Berhasil di update");
                          },
                        function(){
                          //  alert('tidak bisa melakukan update!');
                        }
                        );
                }
            );
            
             
             //disabled checkbox or delete
             $(this).next("label").addClass("tulisanCoret");
             $("#checkboxToday-"+$(this).val()).attr('disabled', '');

            }
        );
      
    });

    }, this.errorHandler);
    
    });
    
}


this.displayDreamCaptureTask = function()
{
    var htmlTodayTask = db.transaction(function(tx) {
        tx.executeSql('SELECT *  FROM task where taskstatusid=1 order by taskid DESC',[], function (tx, result) {
    
        jmlItem = result.rows.length;
        //alert(jmlItem);
        newhtml="";
        if(jmlItem==0) {
            newhtml = "<p>Masih kosong</p>";
        }else{
            //<input type="checkbox" name="checkbox-1" id="checkbox-1" class="custom" />
              var len = result.rows.length, i;
                //var newhtml = "<fieldset data-role=\"controlgroup\">";
                for (i = 0; i < len; i++) {
                    $('#dreamCaptureTaskList').append('<li><p>InsertDate: '+result.rows.item(i).taskduedate+'</p><div id=itemDreamCapture-'+result.rows.item(i).taskid+'>'+result.rows.item(i).taskname+'</div></li>').listview('refresh');
                }
             
        }
  }, this.errorHandler);
    
    });
    
}

this.getUserInfo = function()
{
    db.transaction(function(tx) {
        tx.executeSql('SELECT *  FROM user',[], function (tx, result) {
                 var len = result.rows.length, i;
                //var newhtml = "<fieldset data-role=\"controlgroup\">";
                for (i = 0; i < len; i++) {
                    //alert(result.rows.item(i).firstname);
                    $('#userFName').val(result.rows.item(i).firstname);
                    $('#userLName').val(result.rows.item(i).lastname);    
                }    

  }, this.errorHandler);
    
    });
    
}

this.updatePersonalInfo = function(fname,lname)
{
  db.transaction(
    function(tx) {
        var sQL = "update  user set firstname='"+fname+"' , lastname='"+lname+"' where userid="+1;
        //alert(sQL);
            tx.executeSql(sQL, [], function(){
                //.remove
                   $('#userFName').val(fname);
                   $('#userLName').val(lname);
                   $('#saveMSG').html('saved...thanks');
           }, function(){
                //someting is wrong
            });

        }
    );
    
}

this.displayWizard1Task = function()
{
    var htmlTodayTask = db.transaction(function(tx) {
        tx.executeSql('SELECT *  FROM task where taskstatusid=2 order by taskid DESC',[], function (tx, result) {
    
        jmlItem = result.rows.length;
        //alert(jmlItem);
        newhtml="";
        if(jmlItem==0) {
            newhtml = "<p>Masih kosong</p>";
        }else{
            //<input type="checkbox" name="checkbox-1" id="checkbox-1" class="custom" />
              var len = result.rows.length, i;
                //var newhtml = "<fieldset data-role=\"controlgroup\">";
                for (i = 0; i < len; i++) {
                    $('#wizard1TaskList').append('<li><p>InsertDate: '+result.rows.item(i).taskduedate+'</p><div id=itemWizard1-'+result.rows.item(i).taskid+'>'+result.rows.item(i).taskname+'</div></li>').listview('refresh');
                }
             
        }
  }, this.errorHandler);
    
    });
    
}

this.displayWizard2Task = function()
{
    var htmlTodayTask = db.transaction(function(tx) {
        tx.executeSql('SELECT *  FROM task where taskstatusid=1 or taskstatusid=2 order by taskid DESC',[], function (tx, result) {
    
        jmlItem = result.rows.length;
        //alert(jmlItem);
        newhtml="";
        if(jmlItem==0) {
            newhtml = "<p>Masih kosong</p>";
        }else{
            //<input type="checkbox" name="checkbox-1" id="checkbox-1" class="custom" />
              var len = result.rows.length, i;
                //var newhtml = "<fieldset data-role=\"controlgroup\">";
                for (i = 0; i < len; i++) {
                    $('#wizard2TaskList').append('<li id=\"itemWizard2'+result.rows.item(i).taskid+'\"><p>InsertDate: '+result.rows.item(i).taskduedate+'</p><div id='+result.rows.item(i).taskid+'>'+result.rows.item(i).taskname+'</div>'+
                      '<div><a href=\"#\"  onClick=\"exha.setAsTodayTask('+result.rows.item(i).taskid+')\">DO IT</a>&nbsp;&nbsp;<a href=\"#\"  onClick=\"exha.scheduleTask('+result.rows.item(i).taskid+')\">FOR TOMORROW</a>&nbsp;&nbsp;<a href=\"mailto:abc@abc.com?subject='+encodeURIComponent(result.rows.item(i).taskname)+'\"  >DELEGATE IT</a>&nbsp;&nbsp;<a href=\"#\" onClick=\"exha.deleteTask('+result.rows.item(i).taskid+')\">DELETE</a></div>'+'</li>').listview('refresh');
                }
             
        }
  }, this.errorHandler);
    
    });
    
}


this.scheduleTask = function(idTask)
{
    
    //We will schedule for tomorrow
    //alert("schedule task di panggil");
    db.transaction(
    function(tx) {
        
        var date = new Date();
        date.setDate(date.getDate() + 1);     
    
        
        var sQL = "update  task set taskstatusid=3 , taskduedate='"+date.toString()+"' where taskid="+idTask;
        //alert(sQL);
            tx.executeSql(sQL, [], function(){
                //.remove
                $('#itemWizard2'+idTask).remove();
           }, function(){
                //someting is wrong
            });

        }
    );   
}

this.delegateTask = function(idTask)
{
    
    //We will schedule for tomorrow
    //alert("schedule task di panggil");
    db.transaction(
    function(tx) {
        
        var date = new Date();
        date.setDate(date.getDate() + 1);     
    
        
        var sQL = "update  task set taskstatusid=3 , taskduedate='"+date.toString()+"' where taskid="+idTask;
        //alert(sQL);
            tx.executeSql(sQL, [], function(){
                //.remove
                $('#itemWizard2'+idTask).remove();
           }, function(){
                //someting is wrong
            });

        }
    );   
}

this.cancelDreamCapture = function()
{
    
}
this.addNewTask = function(txtNewTask,idTaskStatus)
{
    var currentDate = new Date();
    //alert(currentDate.toString());
    currentMonth = currentDate.getMonth()+1;
    todayDate = currentDate.getDate();
    var textCurrentDate = currentMonth+'/'+todayDate+'/'+currentDate.getFullYear();

        var date = new Date();
        var newScheduleDate = date.getDate() + '/' + (date.getMonth()+1) + '/' + date.getFullYear();


    //alert(txtNewTask+" >> "+idTaskStatus);
    db.transaction(
    function(tx) {
        var sQL = "INSERT INTO task (taskname,taskduedate,taskstatusid,userid) values ('"+txtNewTask+"','"+currentDate.toString()+"',"+idTaskStatus+",1)";
        //alert(sQL);
            tx.executeSql(sQL, [], function(){
                if (idTaskStatus==1) {
                    $('#dreamCaptureTaskList').prepend('<li><p>InsertDate: '+currentDate.toString()+'</p><div>'+txtNewTask+'</div></li>').listview('refresh');
                }
                if(idTaskStatus==2){
                    $('#wizard1TaskList').prepend('<li><p>InsertDate: '+currentDate.toString()+'</p><div>'+txtNewTask+'</div></li>').listview('refresh');
                }
                
           }, function(){
                //someting is wrong
            });

        }
    );


}

this.setAsTodayTask = function(idTask)
{
    exha.setTaskType(idTask,3);
}
this.setTaskType = function(idTask,taskTypeID)
{
  db.transaction(
    function(tx) {
        var sQL = "update  task set taskstatusid="+taskTypeID+" where taskid="+idTask;
        //alert(sQL);
            tx.executeSql(sQL, [], function(){
                //.remove
                $('#itemWizard2'+idTask).remove();
           }, function(){
                //someting is wrong
            });

        }
    );    
}


this.deleteTask = function(idTask)
{
    
    db.transaction(
    function(tx) {
        var sQL = "delete from task where taskid="+idTask;
        //alert(sQL);
            tx.executeSql(sQL, [], function(){
                //.remove
                $('#itemWizard2'+idTask).remove();
                //$('#wizard2TaskList').listview('refresh');
           }, function(){
                //someting is wrong
            });

        }
    );

}
this.savePersonalInfo = function()
{
    
} 

//Utilities Function
this.displayCurrentDate = function() {
    var currentDate = new Date();
    $("section#currentDateTime").text('Today: '+currentDate.getDate()+'/'+currentDate.getMonth()+'/'+currentDate.getFullYear());
}  

this.errorHandler = function(){
    alert("ada masalah");
}
}

