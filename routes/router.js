var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();
var User = require('../models/user');
var NewUser = require('../models/userNew');
var moment = require("moment");
var multer = require('multer');
var storage = multer.diskStorage(
    {
        destination: './uploads/',
        filename: function ( req, file, cb ) {
            //req.body is empty...
            //How could I get the new_file_name property sent from client here?
            console.log(file.path);
            cb( null, file.originalname);
        }
    }
);
var upload = multer( { storage: storage } );
// GET route for reading data
router.get('/', function (req, res, next) {
  return res.sendFile(path.join(__dirname + '/templateLogReg/index.html'));
});



var option = new mongoose.Schema({
    testName: String,
    timer: String,
    questions: []
});

var course = new mongoose.Schema({
    courseName: String,
    themes: [],
    creatorId: String,
});

var courseIsDone = new mongoose.Schema({
    courseId: String,
    userId: String,
    testResult: [],
    courseCreator: String,
});

var theme = new mongoose.Schema({
    themeName: String,
    themeText: String,
    themeFile: String
});

var schedule = new mongoose.Schema({
    title: String,
    dateStart: String,
    dateEnd: String,
    schedule: [],
    defaultSchedule: [],
});




var option = mongoose.model('option', option);
var theme = mongoose.model('theme', theme);
var course = mongoose.model('course', course);
var courseIsDone = mongoose.model('courseIsDone', courseIsDone);
var schedule = mongoose.model('schedule', schedule);

//Mine stuff
router.post('/upload', upload.any(), function(req, res, next){
    // console.log(req.files[0].path);
    console.log(req.body);
    res.end(req.files);
});
//Schedule stuff
router.post('/schedule/createSchedule', function (req, res) {
   // console.log(req.body.data);
    // var mongoose = require('mongoose'),
    //     file = mongoose.model('scheduleScheme');


    var days = req.body.data;

    console.log("dateStart", days[0].dateStart);
    console.log("dateEnd",  days[0].dateEnd);

    var startDate = days[0].dateStart;
    var endDate = days[0].dateEnd;
    var start = {
        fullDate: startDate,
        year:startDate.slice(0, 4),
        month:startDate.slice(5, 7),
        day:startDate.slice(8, 10)
    };
    var end = {
        fullDate: endDate,
        year:endDate.slice(0, 4),
        month:endDate.slice(5, 7),
        day:endDate.slice(8, 10)
    };
    var momentoStartDate = moment(start.year + "-" + start.month + "-" + start.day);
    var momentoEndDate = moment(end.year + "-" +  end.month + "-" +  end.day).add(1, 'd');

    var duration = moment.duration(momentoEndDate.diff(momentoStartDate));
    var tmpDate = momentoStartDate;



    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }



    var array = [];
   for (var i = 0; i <= days.length-1; i++){
       var day = days[i];
       array[i] = {dayName: day.dayName, lessons: []};
       // console.log("dayName", day.dayName);


       for (var x = 1; x <= day.lessons.length-1; x++){
           var lesson = day.lessons[x];
           array[i].lessons.push(lesson);
           // console.log("lesson" + lesson.lessonNumber, lesson.lessonName);
           // console.log("teacher" + lesson.lessonNumber, lesson.teacherName);
           // console.log("place" + lesson.lessonNumber, lesson.place);
           // console.log("note" + lesson.lessonNumber, lesson.note);
       }
   }

   console.log(array);

    var businessDays = [];
    while (tmpDate.toISOString() !== momentoEndDate.toISOString()){
        switch (tmpDate.format("dddd").toString()){
            case "Monday":
                // if(days[0])
                var isExist = false;
                var lessons = [];
                for (var z = 0; z<=array.length-1; z++){
                    if(capitalizeFirstLetter(array[z].dayName) === "Monday"){
                        console.log(array[z].dayName);
                        isExist = true;
                        lessons = array[z].lessons;
                    }
                    // console.log(z);
                }
                if(isExist)businessDays.push(
                    {dayName: "Monday",
                    fullDate:tmpDate.format("dddd M/D/gggg"),
                    dayDate:tmpDate.format("dddd"),
                    dayNumDate:tmpDate.format("D"),
                    MonthNumDate:tmpDate.format("M"),
                    MonthDate:tmpDate.format("MMMM"),
                    lessons: [
                        lessons
                    ]
                });
                // console.log(lessons.toString());
                break;
            case "Tuesday":
                var isExist = false;
                var lessons = [];
                for (var z = 0; z<=array.length-1; z++){
                    if(capitalizeFirstLetter(array[z].dayName) === "Tuesday"){
                        console.log(array[z].dayName);
                        isExist = true;
                        lessons = array[z].lessons;
                    }
                    // console.log(z);
                }
                if(isExist)businessDays.push({dayName: "Tuesday",
                    fullDate:tmpDate.format("dddd M/D/gggg"),
                    dayDate:tmpDate.format("dddd"),
                    dayNumDate:tmpDate.format("D"),
                    MonthNumDate:tmpDate.format("M"),
                    MonthDate:tmpDate.format("MMMM"),
                    lessons: [
                        lessons
                    ]
                });
                break;
            case "Wednesday":
                var isExist = false;
                var lessons = [];
                for (var z = 0; z<=array.length-1; z++){
                    if(capitalizeFirstLetter(array[z].dayName) === "Wednesday"){
                        console.log(array[z].dayName);
                        isExist = true;
                        lessons = array[z].lessons;
                    }
                    // console.log(z);
                }
                if(isExist)businessDays.push({dayName: "Wednesday",
                    fullDate:tmpDate.format("dddd M/D/gggg"),
                    dayDate:tmpDate.format("dddd"),
                    dayNumDate:tmpDate.format("D"),
                    monthNumDate:tmpDate.format("M"),
                    monthDate:tmpDate.format("MMMM"),
                    lessons: [
                        lessons
                    ]
                });
                break;
            case "Thursday":
                var isExist = false;
                var lessons = [];
                for (var z = 0; z<=array.length-1; z++){
                    if(capitalizeFirstLetter(array[z].dayName) === "Thursday"){
                        console.log(array[z].dayName);
                        isExist = true;
                        lessons = array[z].lessons;
                    }
                    // console.log(z);
                }
                if(isExist)businessDays.push({dayName: "Thursday",
                    fullDate:tmpDate.format("dddd M/D/gggg"),
                    dayDate:tmpDate.format("dddd"),
                    dayNumDate:tmpDate.format("D"),
                    MonthNumDate:tmpDate.format("M"),
                    MonthDate:tmpDate.format("MMMM"),
                    lessons: [
                        lessons
                    ]
                });
                break;
            case "Friday":
                var isExist = false;
                var lessons = [];
                for (var z = 0; z<=array.length-1; z++){
                    if(capitalizeFirstLetter(array[z].dayName) === "Friday"){
                        console.log(array[z].dayName);
                        isExist = true;
                        lessons = array[z].lessons;
                    }
                    // console.log(z);
                }
                if(isExist)businessDays.push({dayName: "Friday",
                    fullDate:tmpDate.format("dddd M/D/gggg"),
                    dayDate:tmpDate.format("dddd"),
                    dayNumDate:tmpDate.format("D"),
                    MonthNumDate:tmpDate.format("M"),
                    MonthDate:tmpDate.format("MMMM"),
                    lessons: [
                        lessons
                    ]
                });
                break;
            case "Saturday":
                var isExist = false;
                var lessons = [];
                for (var z = 0; z<=array.length-1; z++){
                    if(capitalizeFirstLetter(array[z].dayName) === "Saturday"){
                        console.log(array[z].dayName);
                        isExist = true;
                        lessons = array[z].lessons;
                    }
                    // console.log(z);
                }
                if(isExist)businessDays.push({dayName: "Friday",
                    fullDate:tmpDate.format("dddd M/D/gggg"),
                    dayDate:tmpDate.format("dddd"),
                    dayNumDate:tmpDate.format("D"),
                    MonthNumDate:tmpDate.format("M"),
                    MonthDate:tmpDate.format("MMMM"),
                    lessons: [
                        lessons
                    ]
                });
                break;
                case "Sunday":
                    var isExist = false;
                var lessons = [];
                for (var z = 0; z<=array.length-1; z++){
                    if(capitalizeFirstLetter(array[z].dayName) === "Sunday"){
                        console.log(array[z].dayName);
                        lessons = array[z].lessons;
                        isExist = true;
                    }
                    // console.log(z);
                }
                    if(isExist)businessDays.push({dayName: "Friday",
                    fullDate:tmpDate.format("dddd M/D/gggg"),
                    dayDate:tmpDate.format("dddd"),
                    dayNumDate:tmpDate.format("D"),
                    MonthNumDate:tmpDate.format("M"),
                    MonthDate:tmpDate.format("MMMM"),
                    lessons: [
                        lessons
                    ]
                });
                break;
        }

        if (tmpDate.format("dddd").toString() === "Monday"){
            // console.log(tmpDate.format("dddd D/M/gggg"));
            // console.log();
        }

        tmpDate = tmpDate.add(1, 'd');
    }
   console.log(businessDays);
    var scheduleS = new schedule({
        dateStart: startDate,
        dateEnd: endDate,
        schedule: businessDays,
        defaultSchedule: days,
    });

    scheduleS.save(function(err, test) {
        if (err) res.send(err);
        console.log(test._id);
        // res.json({response: "nice"});
        res.json(test);
    });
   // res.send("test");
});

router.get('/schedule/delete/all', function (req, res) {
    schedule.remove({}, function(err, day) {
        if (err)
            res.send(err);
        // console.log(day[0].line.charAt(10));
        // console.log(day[0].line.charAt(11));
        res.json(day);
    });
});

router.get('/schedule/all', function (req, res) {
    schedule.find({}, function (err, users) {
        if (err) res.send(err);
        res.send(users)
    });
});

router.get('/schedule/scheduleTitles', function (req, res) {
    var titlesName = [];
    schedule.find({}, function(err, day) {
        if (err)
            res.send(err);
        for (var i = 0; i<=day.length-1;i++){
            titlesName.push({title: day[i].testName, id: day[i]._id})
        }
        res.json(titlesName);
    });
});

router.post('/schedule/changeSchedule/', function (req, res) {
    var test1 = req.body.data;
    var oldId = req.body.oldId;
    console.log(oldId);
    console.log(test1);
    schedule.remove({_id:oldId}, function(err, day) {
        if (err)
            console.log(err);
            // res.send(err);

        // res.json(day[0]);
    });
    var days = req.body.data;


    console.log("dateStart", days[0].dateStart);
    console.log("dateEnd",  days[0].dateEnd);

    var startDate = days[0].dateStart;
    var endDate = days[0].dateEnd;


    var start = {
        fullDate: startDate,
        year:startDate.slice(0, 4),
        month:startDate.slice(5, 7),
        day:startDate.slice(8, 10)
    };
    var end = {
        fullDate: endDate,
        year:endDate.slice(0, 4),
        month:endDate.slice(5, 7),
        day:endDate.slice(8, 10)
    };
    var momentoStartDate = moment(start.year + "-" + start.month + "-" + start.day);
    var momentoEndDate = moment(end.year + "-" +  end.month + "-" +  end.day).add(1, 'd');

    var duration = moment.duration(momentoEndDate.diff(momentoStartDate));
    var tmpDate = momentoStartDate;



    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }



    var array = [];
    for (var i = 0; i <= days.length-1; i++){
        var day = days[i];
        array[i] = {dayName: day.dayName, lessons: []};
        // console.log("dayName", day.dayName);


        for (var x = 1; x <= day.lessons.length-1; x++){
            var lesson = day.lessons[x];
            array[i].lessons.push(lesson);
            // console.log("lesson" + lesson.lessonNumber, lesson.lessonName);
            // console.log("teacher" + lesson.lessonNumber, lesson.teacherName);
            // console.log("place" + lesson.lessonNumber, lesson.place);
            // console.log("note" + lesson.lessonNumber, lesson.note);
        }
    }

    console.log("array", array);

    var businessDays = [];
    while (tmpDate.toISOString() !== momentoEndDate.toISOString()){
        switch (tmpDate.format("dddd").toString()){
            case "Monday":
                // if(days[0])
                var isExist = false;
                var lessons = [];
                for (var z = 0; z<=array.length-1; z++){
                    if(capitalizeFirstLetter(array[z].dayName) === "Monday"){
                        console.log(array[z].dayName);
                        isExist = true;
                        lessons = array[z].lessons;
                    }
                    // console.log(z);
                }
                if(isExist)businessDays.push(
                    {dayName: "Monday",
                        fullDate:tmpDate.format("dddd D/M/gggg"),
                        dayDate:tmpDate.format("dddd"),
                        dayNumDate:tmpDate.format("D"),
                        MonthNumDate:tmpDate.format("M"),
                        MonthDate:tmpDate.format("MMMM"),
                        lessons: [
                            lessons
                        ]
                    });
                // console.log(lessons.toString());
                break;
            case "Tuesday":
                var isExist = false;
                var lessons = [];
                for (var z = 0; z<=array.length-1; z++){
                    if(capitalizeFirstLetter(array[z].dayName) === "Tuesday"){
                        console.log(array[z].dayName);
                        isExist = true;
                        lessons = array[z].lessons;
                    }
                    // console.log(z);
                }
                if(isExist)businessDays.push({dayName: "Tuesday",
                    fullDate:tmpDate.format("dddd D/M/gggg"),
                    dayDate:tmpDate.format("dddd"),
                    dayNumDate:tmpDate.format("D"),
                    MonthNumDate:tmpDate.format("M"),
                    MonthDate:tmpDate.format("MMMM"),
                    lessons: [
                        lessons
                    ]
                });
                break;
            case "Wednesday":
                var isExist = false;
                var lessons = [];
                for (var z = 0; z<=array.length-1; z++){
                    if(capitalizeFirstLetter(array[z].dayName) === "Wednesday"){
                        console.log(array[z].dayName);
                        isExist = true;
                        lessons = array[z].lessons;
                    }
                    // console.log(z);
                }
                if(isExist)businessDays.push({dayName: "Wednesday",
                    fullDate:tmpDate.format("dddd D/M/gggg"),
                    dayDate:tmpDate.format("dddd"),
                    dayNumDate:tmpDate.format("D"),
                    monthNumDate:tmpDate.format("M"),
                    monthDate:tmpDate.format("MMMM"),
                    lessons: [
                        lessons
                    ]
                });
                break;
            case "Thursday":
                var isExist = false;
                var lessons = [];
                for (var z = 0; z<=array.length-1; z++){
                    if(capitalizeFirstLetter(array[z].dayName) === "Thursday"){
                        console.log(array[z].dayName);
                        isExist = true;
                        lessons = array[z].lessons;
                    }
                    // console.log(z);
                }
                if(isExist)businessDays.push({dayName: "Thursday",
                    fullDate:tmpDate.format("dddd D/M/gggg"),
                    dayDate:tmpDate.format("dddd"),
                    dayNumDate:tmpDate.format("D"),
                    MonthNumDate:tmpDate.format("M"),
                    MonthDate:tmpDate.format("MMMM"),
                    lessons: [
                        lessons
                    ]
                });
                break;
            case "Friday":
                var isExist = false;
                var lessons = [];
                for (var z = 0; z<=array.length-1; z++){
                    if(capitalizeFirstLetter(array[z].dayName) === "Friday"){
                        console.log(array[z].dayName);
                        isExist = true;
                        lessons = array[z].lessons;
                    }
                    // console.log(z);
                }
                if(isExist)businessDays.push({dayName: "Friday",
                    fullDate:tmpDate.format("dddd D/M/gggg"),
                    dayDate:tmpDate.format("dddd"),
                    dayNumDate:tmpDate.format("D"),
                    MonthNumDate:tmpDate.format("M"),
                    MonthDate:tmpDate.format("MMMM"),
                    lessons: [
                        lessons
                    ]
                });
                break;
            case "Saturday":
                var isExist = false;
                var lessons = [];
                for (var z = 0; z<=array.length-1; z++){
                    if(capitalizeFirstLetter(array[z].dayName) === "Saturday"){
                        console.log(array[z].dayName);
                        isExist = true;
                        lessons = array[z].lessons;
                    }
                    // console.log(z);
                }
                if(isExist)businessDays.push({dayName: "Friday",
                    fullDate:tmpDate.format("dddd D/M/gggg"),
                    dayDate:tmpDate.format("dddd"),
                    dayNumDate:tmpDate.format("D"),
                    MonthNumDate:tmpDate.format("M"),
                    MonthDate:tmpDate.format("MMMM"),
                    lessons: [
                        lessons
                    ]
                });
                break;

            case "Sunday":
                var isExist = false;
                var lessons = [];
                for (var z = 0; z<=array.length-1; z++){
                    if(capitalizeFirstLetter(array[z].dayName) === "Sunday"){
                        console.log(array[z].dayName);
                        lessons = array[z].lessons;
                        isExist = true;
                    }
                    // console.log(z);
                }
                if(isExist)businessDays.push({dayName: "Friday",
                    fullDate:tmpDate.format("dddd D/M/gggg"),
                    dayDate:tmpDate.format("dddd"),
                    dayNumDate:tmpDate.format("D"),
                    MonthNumDate:tmpDate.format("M"),
                    MonthDate:tmpDate.format("MMMM"),
                    lessons: [
                        lessons
                    ]
                });
                break;
        }

        if (tmpDate.format("dddd").toString() === "Monday"){
            // console.log(tmpDate.format("dddd D/M/gggg"));
            // console.log();
        }

        tmpDate = tmpDate.add(1, 'd');
    }
    console.log(businessDays);

    var scheduleS = new schedule({
        _id:oldId,
        dateStart: startDate,
        dateEnd: endDate,
        schedule: businessDays,
        defaultSchedule: days
    });


    scheduleS.save(function(err, test) {
        if (err) {
            res.send(err);
            console.log(err);
        }
        else res.json(test);
        // res.json(err);
    });
});

router.get('/schedule/dateSearch', function (req, res) {
    var scheduleS = [];
    var date = req.query.date;
    schedule.find({_id: "5b159f6008a4e1080c45c2e3"}, function (err, users) {
        if (err) res.send(err);
        // scheduleS = users;
        console.log(users.schedule);
        for(var i = 0; i<=users[0].schedule.length-1;i++){
            if(users[0].schedule[i].fullDate === date){
                res.send(users[0].schedule[i]);
            }
            console.log(users[0].schedule[i].fullDate);
        }
        // res.send(users[0].schedule)
    });

    // res.send("test");
});
router.post('/schedule/dateSearch', function (req, res) {
    var scheduleS = [];
    var date = req.body.date;
    var succ = false;
    schedule.find({_id: "5b159f6008a4e1080c45c2e3"}, function (err, users) {
        if (err) res.send(err);
        // scheduleS = users;
        console.log(users.schedule);
        for(var i = 0; i<=users[0].schedule.length-1;i++){
            if(users[0].schedule[i].fullDate === date){
                res.send(users[0].schedule[i]);
                succ = true;
            }
            console.log(users[0].schedule[i].fullDate);
        }

        if (!succ) res.json("notFound");
        // res.send(users[0].schedule)
    });

    // res.send("test");
});

router.get('/schedule/dateSearch/dates', function (req, res) {
    var scheduleS = [];
    var date = req.body.date;
    var succ = false;
    schedule.find({_id: "5b159f6008a4e1080c45c2e3"}, function (err, users) {
        if (err) res.send(err);
        // scheduleS = users;
        var daysArray = [];
        console.log(users.schedule);
        for(var i = 0; i<=users[0].schedule.length-1;i++){
                // res.send(users[0].schedule[i].fullDate);
                daysArray.push(users[0].schedule[i].fullDate);
            console.log(users[0].schedule[i].fullDate);
        }

        // if (!succ) res.json("notFound");
        res.send(daysArray)
    });

    // res.send("test");
});
router.post('/schedule/dateSearch/dates', function (req, res) {
    var scheduleS = [];
    var date = req.body.date;
    var succ = false;
    schedule.find({_id: "5b159f6008a4e1080c45c2e3"}, function (err, users) {
        if (err) res.send(err);
        // scheduleS = users;
        var daysArray = [];
        console.log(users.schedule);
        for(var i = 0; i<=users[0].schedule.length-1;i++){
                // res.send(users[0].schedule[i].fullDate);
                daysArray.push(users[0].schedule[i].fullDate);
            console.log(users[0].schedule[i].fullDate);
        }

        // if (!succ) res.json("notFound");
        res.send(daysArray)
    });

    // res.send("test");
});

router.get('/schedule/:id', function (req, res) {
    schedule.find({_id: req.params.id}, function (err, users) {
        if (err) res.send(err);
        res.send(users)
    });
});




//Schedule stuff ends


//Tests titles

router.get('/tanya/test/testTitles', function (req, res) {
    var titlesName = [];
    option.find({}, function(err, day) {
        if (err)
            res.send(err);
        for (var i = 0; i<=day.length-1;i++){
            titlesName.push({title: day[i].testName, id: day[i]._id})
        }
        res.json(titlesName);
    });
});
//Useless
router.get('/tanya/singleTest', function (req, res) {
    var titlesName = [];
    option.find({_id:"5b0f06271272173910753bcf"}, function(err, day) {
        if (err)
            res.send(err);

        res.json(day[0]);
    });
});
//Change test TODO change id selection
router.post('/tanya/changeTest', function (req, res) {
    var test1 = req.body.data;
    var oldId = req.body.oldId;
    console.log(oldId);
    console.log(test1);
    option.remove({_id:oldId}, function(err, day) {
        if (err)
            res.send(err);

        // res.json(day[0]);
    });
    var optionS = new option({
        _id:oldId,
        testName: test1.testName,
        timer: test1.timer,
        questions: test1.questions
    });


    optionS.save(function(err, test) {
        if (err) res.send(err);
        else res.json(test);
        console.log(err);
        // res.json(err);
    });
});

router.post('/tanya/admin/users', function (req, res) {
    NewUser.find({}, function (err, users) {
        if (err) res.send(err)
        res.send(users)
    });
});
router.get('/tanya/admin/users', function (req, res) {
    NewUser.find({}, function (err, users) {
        if (err) res.send(err)
        res.send(users)
    });
});

router.post('/tanya/user/:id/addCourse', function (req, res) {
    var test1 = req.body.data;
    var oldId = req.body.oldId;
    console.log(oldId);
    console.log(test1);
    var course = mongoose.model('course', course);

    NewUser.findById({_id: oldId}, function (err, user) {
        if (err)
            res.send(err);
        // console.log(user);
        if(user){
            if (user.courses.length !== 0) {
                var counter = 0;
                for (var x = 0; x <= user.courses.length - 1; x++) {
                    if (req.body.data.courses.id == user.courses[x]._id) {
                        counter++;
                        console.log("Bingo");
                    }
                }
                if (counter == 0) {
                    course.findOne({_id: req.body.data.courses.id}, function (err, day) {
                        if (err)
                            res.send(err);

                        user.courses.push(day);


                        user.save(function (err, updatedTank) {
                            // if (err) return handleError(err);
                            res.send(updatedTank);
                        });
                    });
                } else {
                    res.sendStatus(500);
                }


                // console.log(req.body.data.courses.id + "_" + user.courses[x]._id);
                //
                // console.log(user.courses[x]._id);

            } else {
                course.findOne({_id: req.body.data.courses.id}, function (err, day) {
                    if (err)
                        res.send(err);

                    user.courses.push(day);


                    user.save(function (err, updatedTank) {
                        // if (err) return handleError(err);
                        res.send(updatedTank);
                    });
                });
            }
        }else{
            res.sendStatus(500);
        }



        // res.json(user);

    });
});
router.get('/tanya/user/:id/pop', function (req, res) {
    var test1 = req.body.data;
    var oldId = req.params.id;
    console.log(oldId);
    console.log(test1);
    var course = mongoose.model('course', course);

    NewUser.findById({_id:oldId}, function(err, user) {
        if (err)
            res.send(err);
        console.log();
        user.courses.pop();
        user.save(function (err, updatedTank) {
            // if (err) return handleError(err);
            res.send(updatedTank);
        });



        // res.json(user);
    });

});



router.post('/tanya/user/:id/coursesTitles', function (req, res) {
    NewUser.findOne({_id: req.params.id}, function (err, users) {
        if (err) res.send(err);
            var titlesName = [];
            for (var i = 0; i<=users.courses.length-1;i++){
                titlesName.push({title: users.courses[i].courseName, id: users.courses[i]._id})
            }
            res.json(titlesName);
        });
        // res.json(users.courses);
});
router.get('/tanya/user/:id/coursesTitles', function (req, res) {
    NewUser.findOne({_id: req.params.id}, function (err, users) {
        if (err) res.send(err);
            var titlesName = [];
            for (var i = 0; i<=users.courses.length-1;i++){
                titlesName.push({title: users.courses[i].courseName, id: users.courses[i]._id})
            }
            res.json(titlesName);
        });
        // res.json(users.courses);
});

router.post('/tanya/user/:id', function (req, res) {
    NewUser.findOne({_id: req.params.id}, function (err, users) {
        if (err) res.send(err);
        res.json(users);
    });
});
router.get('/tanya/user/:id', function (req, res) {
    NewUser.findOne({_id: req.params.id}, function (err, users) {
        if (err) res.send(err);
        res.json(users);
    });
});
router.post('/tanya/admin/deleteUser', function (req, res) {
    var userId = req.body.id;
    console.log(userId);
    NewUser.remove({_id:userId}, function (err, users) {
        if (err) res.send(err);
        res.send(users)
    });
});

router.get('/tanya/admin/deleteUser', function (req, res) {
    var userId = req.body.id;
    console.log(userId);
    NewUser.remove({_id:userId}, function (err, users) {
        if (err) res.send(err);
        res.send(users)
    });
});

router.get('/tanya/admin/deleteAllUsers', function (req, res) {

    NewUser.remove({}, function (err, users) {
        if (err) res.send(err);
        res.send(users)
    });
});

router.post('/tanya/admin/deleteAllUsers', function (req, res) {

    NewUser.remove({}, function (err, users) {
        if (err) res.send(err);
        res.send(users)
    });
});

router.get('/tanya/course/deleteAllCourses', function (req, res) {
    // var userId = req.body.id;
    // console.log(userId);
    course.remove({}, function (err, users) {
        if (err) res.send(err);
        res.send(users)
    });
});




//All tests
router.get('/tanya/test/all', function (req, res) {
    option.find({}, function(err, day) {
        if (err)
            res.send(err);
        res.json(day);
    });
});
//Delet all tests
router.get('/tanya/test/deleteall', function (req, res) {
    option.remove({}, function(err, day) {
        if (err)
            res.send(err);
        // console.log(day[0].line.charAt(10));
        // console.log(day[0].line.charAt(11));
        res.json(day);
    });
});
//Single test by ID
router.get('/tanya/test/:id', function (req, res) {
    option.find({_id:req.params.id}, function(err, day) {
        if (err)
            res.send(err);
        // console.log(day[0].line.charAt(10));
        // console.log(day[0].line.charAt(11));
        res.json(day);
    });
});




//All courses
router.get('/tanya/course/all', function (req, res) {
    course.find({}, function(err, day) {
        res.json(day);
        if (err)
            res.send(err);
    });
});

router.get('/tanya/course/titles', function (req, res) {
    // course.find({}, function(err, day) {
    //
    //     res.json(day);
    //     if (err)
    //         res.send(err);
    // });

    var titlesName = [];
    course.find({}, function(err, day) {
        if (err)
            res.send(err);
        for (var i = 0; i<=day.length-1;i++){
            titlesName.push({title: day[i].courseName, id: day[i]._id, creatorId: day[i].creatorId})
        }
        res.json(titlesName);
    });
});
//Single courses by ID


router.post('/tanya/course/changeCourse', upload.any(), function (req, res) {

    var test1 = req.body.data;
    var oldId = req.body.oldId;
    console.log("oldID", oldId);
    console.log("data", test1);

    var test1 = req.body.data;
    console.log("name", req.body.name);






    course.remove({_id:oldId}, function(err, day) {
        if (err)
            res.send(err);

        // res.json(day[0]);
    });
    var themeArray = [];
    test1.map(function (input, index) {
        console.log(input.themeTitle);
        console.log(input.themeText);
        console.log(input.tests);
        var theme = {
            themeName: input.themeTitle,
            themeText: input.themeText,
            tests: input.tests,
            files: input.file
            // themeFile: String
        };

        themeArray.push(theme);
    });

    var courseS = new course({
        _id:oldId,
        courseName: req.body.name,
        themes: themeArray,
        creatorId: req.body.creatorId,
    });
    courseS.save(function(err, test) {
        if (err) res.send(err);
        // console.log(test._id);
        res.json(test);
        // res.json(err);
    });
});

router.post('/tanya/course/courseisdone', function (req, res) {
    var courseId = req.body.courseId;
    var userId = req.body.userId;
    var testResults = req.body.testResults;
    // var courseCreator = req.body.testResults;
    var themeArray = [];
    console.log("courseId", courseId);
    console.log("userId", userId);
    console.log("testResults", testResults);
    testResults.map(function (input, index) {
        // console.log(input.themeTitle);
        // console.log(input.themeText);
        // console.log(input.tests);
        // [ { testNumber: 0,
        //     correctAnswers: [ [Object] ],
        //     correctAnswersNum: 1,
        //     allQuestionsNum: 1,
        //     themeNum: 0 },
        //     { testNumber: 1,
        //         correctAnswers: [ [Object] ],
        //         correctAnswersNum: 1,
        //         allQuestionsNum: 1,
        //         themeNum: 0 } ]
        console.log("testSmall", input);
        var testResult = {
            testNumber: input.testNumber,
            correctAnswers: input.correctAnswers,
            correctAnswersNum: input.correctAnswersNum,
            allQuestionsNum: input.allQuestionsNum,
            themeNum: input.themeNum,
            // themeFile: String
        };
        console.log("testSmall2", testResult);

        themeArray.push(testResult);
        console.log("testBig", themeArray);

    });
    course.find({_id:courseId}, function(err, day) {
        if (err)
            res.send(err);
        // console.log(day[0].line.charAt(10));
        console.log("vid dzherel", themeArray);
        var courseS = new courseIsDone({
            courseId:courseId,
            userId: userId,
            testResult: themeArray,
            courseCreator: day[0].creatorId,
        });

        courseS.save(function(err, test) {
            if (err) res.send(err);
            // console.log(test._id);
            res.json(test);
            // res.json(err);
        });
    });


});

router.get('/tanya/course/courseisdone/all', function (req, res) {

    courseIsDone.find({}, function(err, day) {
        if (err)
            res.send(err);
            res.send(day);

    });


});

router.get('/tanya/course/courseisdone/delete/all', function (req, res) {

    courseIsDone.remove({}, function(err, day) {
        if (err)
            res.send(err);
            res.send(day);

    });


});
// router.post('/test_test', function (req, res) {
//     // console.log(req.body.data);
//     var days = req.body.data.questions;
//     console.log("+" + req.body.data.questions[0].toString());
//     sendNudes = days;
//     for(var i = 0; i<=req.body.data.questions.length()-1; i++){
//         var question = req.body.data.questions[i];
//         for(var x = 0; x<=question[i].length()-1;x++){
//             var option = question[i].options[x];
//             console.log(i + " " + option.textO);
//         }
//     }
//     var test = new test({
//         testName:req.body.data.testName,
//         timer:req.body.data.timer,
//         questions: days
// });
//
//
//     test.save(function(err, test) {
//         // if (err)
//             // res.send(err);
//         // res.json({ response: [{answer: true}, {time: Date.now} , {data: test}, {error: ""}] });
//         console.log(err);
//         res.json(err);
//     });
//     for (var i = 0; i <= days.length-1; i++){
//         var question = days[i];
//
//         // console.log("question", question.question);
//         // console.log("time", question.time);
//
//
//         for (var x = 0; x <= question.options.length-1; x++){
//             var option = question.options[x];
//             // console.log(option);
//             // console.log("option", option.textO);
//             // console.log("option true/false", option.t);
//             // console.log("place" + lesson.lessonNumber, lesson.place);
//             // console.log("note" + lesson.lessonNumber, lesson.note);
//         }
//
//
//     }
//     // console.log(req.body.data[0].lessons[0].lessonName);
//     // res.send("test");
// });
// router.post('/test_test_test', function (req, res) {
//     // console.log(req.body.data);
//     var days = req.body.data.questions;
//     console.log("+" + req.body.data.questions[0].options[0].textO);
// //     sendNudes = days;
// //     for(var i = 0; i<=req.body.data.questions.length()-1; i++){
// //         var question = req.body.data.questions[i];
// //         for(var x = 0; x<=question[i].length()-1;x++){
// //             var option = question[i].options[x];
// //             console.log(i + " " + option.textO);
// //         }
// //     }
// //     var test = new damnMan({
// //         testName:req.body.data.testName,
// //         timer:req.body.data.timer,
// //         questions: days
// // });
//
//
//     // test.save(function(err, test) {
//     //     // if (err)
//     //         // res.send(err);
//     //     // res.json({ response: [{answer: true}, {time: Date.now} , {data: test}, {error: ""}] });
//     //     console.log(err);
//     //     res.json(err);
//     // });
//     console.log("timer", req.body.data.timer);
//     console.log("title", req.body.data.testName);
//     var qestions = {question: "", options: []};
//     var data = {time:req.body.data.timer, title:req.body.data.testName, questions: []};
//     for (var i = 0; i <= days.length-1; i++){
//         var question = days[i];
//         data.questions[i] = {question:question.question, options: []};
//         console.log("question", question.question);
//         // qestions.question = question.question
//         // var testQu = new question({
//         //     question:question.question,
//         //     options: []
//         // });
//
//         for (var x = 0; x <= question.options.length-1; x++){
//             var option = question.options[x];
//             // console.log(option);
//             data.questions[i].options[x] = {option: option.textO, right:option.t};
//             // var testOp = new option({
//             //     option:option.textO,
//             //     right:option.t
// // });
//             // testQu.options.push(testOp);
//             console.log("option", option.textO);
//             console.log("option true/false", option.t);
//             // console.log("place" + lesson.lessonNumber, lesson.place);
//             // console.log("note" + lesson.lessonNumber, lesson.note);
//         }
//         // testTi.questions.push(testQu);
//         console.log("data " + data.questions[0].options[0].toString());
//         console.log("testTi " + testQu);
//
//         var q = new question({
//             qustion:data.questions[0],
//             options: [data.questions[0].options[0]]
//         });
//
//         // test.save(function(err, test) {
//         //     // if (err)
//         //         // res.send(err);
//         //     // res.json({ response: [{answer: true}, {time: Date.now} , {data: test}, {error: ""}] });
//         //     console.log(err);
//         //     res.json(err);
//         // });
//
//     }
//
//     var testTi = new test({
//         testName: req.body.data.testName,
//         timer: req.body.data.timer,
//         question: []
//     });
//     // console.log(req.body.data[0].lessons[0].lessonName);
//     res.send("test");
// });
//CreateTest
router.get('/tanya/course/courseisdone/creator/:id', function (req, res) {

    courseIsDone.find({courseCreator:req.params.id}, function(err, day) {
        if (err)
            res.send(err);
        res.send(day);

    });


});
router.get('/tanya/course/courseisdone/user/:id', function (req, res) {

    courseIsDone.find({userId:req.params.id}, function(err, day) {
        if (err)
            res.send(err);
        res.send(day);

    });


});

router.get('/tanya/course/courseisdone/:id', function (req, res) {

    courseIsDone.find({_id:req.params.id}, function(err, day) {
        if (err)
            res.send(err);
        res.send(day);

    });


});

router.get('/tanya/course/:id', function (req, res) {
    course.find({_id:req.params.id}, function(err, day) {
        if (err)
            res.send(err);
        // console.log(day[0].line.charAt(10));
        // console.log(day[0].line.charAt(11));
        res.json(day);
    });
});

router.post('/tanya/course/:id', function (req, res) {
    course.find({_id:req.params.id}, function(err, day) {
        if (err)
            res.send(err);
        // console.log(day[0].line.charAt(10));
        // console.log(day[0].line.charAt(11));
        res.json(day);
    });
});

router.post('/tanya/admin/createTest', function (req, res) {
    console.log(req.body.data);
    var test = JSON.stringify(req.body.data);
    var test1 = req.body.data;


    // console.log(test);
    // console.log(test.testName);
    // console.log(test.timer);
    // console.log("массив вопросов");
    // console.log(test.questions);
    // for(var i = 0; i<= test.questions.length-1; i++){
    //     console.log("вопрос " + i);
    //     console.log(test.questions[i].question);
    //     for (var x = 0; x<=test.questions[i].options.length-1; x++){
    //         console.log("ответ " + x);
    //         console.log(test.questions[i].options[x]);
    //         console.log(test.questions[i].options[x].textO);
    //         console.log(test.questions[i].options[x].t);
    //
    //
    //     }
    //
    // }

    var optionS = new option({
        testName: test1.testName,
        timer: test1.timer,
        questions: test1.questions
    });


    optionS.save(function(err, test) {
        if (err) res.send(err);
        console.log(test._id);
        res.json(test._id);
        // res.json(err);
    });

    // res.send("test");
});
//CreateCourse w/ createTheme
router.post('/tanya/admin/createCourse', function (req, res) {
    console.log(req.body.data);
    // var test = JSON.stringify(req.body.data);
    // var test1 = req.body.data;
    var test1 = req.body.data;
    console.log(req.body.name);
    var themeArray = [];
    test1.map(function (input, index) {
        console.log(input.themeTitle);
        console.log(input.themeText);
        var theme = {
            themeName: input.themeTitle,
            themeText: input.themeText,
            themeText: input.themeText,
            tests: input.tests,
            // themeFile: String
        };

        themeArray.push(theme);
    });

    var courseS = new course({
        courseName: req.body.name,
        themes: themeArray,
        creatorId: req.body.creatorId,
    });
    courseS.save(function(err, test) {
        if (err) res.send(err);
        // console.log(test._id);
        res.json(test);
        // res.json(err);
    });
});







router.post('/', function (req, res, next) {
  // confirm that user typed same password twice
  if (req.body.password !== req.body.passwordConf) {
    var err = new Error('Passwords do not match.');
    err.status = 400;
    res.send("passwords dont match");
    console.log(err.toString());
    return next(err);
  }

  if (req.body.email &&
    req.body.username &&
    req.body.password &&
    req.body.role &&
    req.body.passwordConf) {

    var userData = {
      email: req.body.email,
      username: req.body.username,
      password: req.body.password,
      passwordConf: req.body.passwordConf,
      role: req.body.role,
    };

    User.create(userData, function (error, user) {
      if (error) {
        return next(error);
      } else {
          if(req.body.type === "createdByAdmin"){
              return res.send("yay");
          }else{
              req.session.userId = user._id;
              // return res.redirect('/profile');
              return res.json(user._id);
          }
        }
    });

  } else if (req.body.logemail && req.body.logpassword) {
    User.authenticate(req.body.logemail, req.body.logpassword, function (error, user) {
      if (error || !user) {
        var err = new Error('Wrong email or password.');
        err.status = 401;
        // return next(err);
        return res.json("0");
      } else {
        req.session.userId = user._id;
        console.log(user);
        // return res.json(user._id);
        return res.redirect('/profile');
      }
    });
  } else {
    var err = new Error('All fields required.');
    err.status = 400;
    return next(err);
  }
});

// GET route after registering
router.get('/profile', function (req, res, next) {
  User.findById(req.session.userId)
    .exec(function (error, user) {
      if (error) {
        return next(error);
      } else {
        if (user === null) {
          var err = new Error('Not authorized! Go back!');
          err.status = 400;
          return next(err);
        } else {
            if(user.role === "admin"){
                return res.send('<h1>Admin: </h1>' + user.username + '<h2>Mail: </h2>' + user.email + '<br><a' +
                    ' type="button" href="/logout">Logout</a>')
            }else if(user.role === "user"){
                return res.send('<h1>User Name: </h1>' + user.username + '<h2>Mail: </h2>' + user.email + '<br><a' +
                    ' type="button" href="/logout">Logout</a>')
            }else{
                return res.send('<h1>Default Name: </h1>' + user.username + '<h2>Mail: </h2>' + user.email + '<br><a' +
                    ' type="button" href="/logout">Logout</a>')
            }
        }
      }
    });
});

router.get('/dostuff', function (req, res, next) {
    User.findById(req.session.userId)
        .exec(function (error, user) {
            if (error) {
                return next(error);
            } else {
                if (user === null) {
                    var err = new Error('Not authorized! Go back!');
                    err.status = 400;
                    return next(err);
                } else {
                    return res.send('<h1>Doing stuff</h1> <a href="/logout">Logout</a>')
                }
            }
        });
});

// GET for logout logout
router.get('/logout', function (req, res, next) {
  if (req.session) {
    // delete session object
    req.session.destroy(function (err) {
      if (err) {
        return next(err);
      } else {
        return res.redirect('/');
      }
    });
  }
});

module.exports = router;