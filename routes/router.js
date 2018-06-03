var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();
var User = require('../models/user');


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
    themes: []
});

var theme = new mongoose.Schema({
    themeName: String,
    themeText: String,
    themeFile: String
});




var option = mongoose.model('option', option);
var theme = mongoose.model('theme', theme);
var course = mongoose.model('course', course);

//Mine stuff
router.post('/test', function (req, res) {
   // console.log(req.body.data);
   var days = req.body.data;

   for (var i = 0; i <= days.length-1; i++){
       var day = days[i];
       console.log("dateStart", day.dateStart);
       console.log("dateEnd", day.dateEnd);
       console.log("dayName", day.dayName);

       for (var x = 1; x <= day.lessons.length-1; x++){
           var lesson = day.lessons[x];
           console.log("lesson" + lesson.lessonNumber, lesson.lessonName);
           console.log("teacher" + lesson.lessonNumber, lesson.teacherName);
           console.log("place" + lesson.lessonNumber, lesson.place);
           console.log("note" + lesson.lessonNumber, lesson.note);
       }
   }
   // console.log(req.body.data[0].lessons[0].lessonName);
   res.send("test");
});

//Tests titles
router.get('/tanya_test/testTitles', function (req, res) {
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

        res.json(day[0]);
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
    User.find({}, function (err, users) {
        if (err) res.send(err)
        res.send(users)
    });
});
router.get('/tanya/admin/users', function (req, res) {
    User.find({}, function (err, users) {
        if (err) res.send(err)
        res.send(users)
    });
});

router.post('/tanya/admin/deleteUser', function (req, res) {
    var userId = req.body.id;
    console.log(userId);
    User.remove({_id:userId}, function (err, users) {
        if (err) res.send(err);
        res.send(users)
    });
});

router.post('/tanya/course/deleteAllCourses', function (req, res) {
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
//Single courses by ID
router.get('/tanya/course/:id', function (req, res) {
    course.find({_id:req.params.id}, function(err, day) {
        if (err)
            res.send(err);
        // console.log(day[0].line.charAt(10));
        // console.log(day[0].line.charAt(11));
        res.json(day);
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
            themeText: input.themeText
            // themeFile: String
        };

        themeArray.push(theme);
    });

    var courseS = new course({
        courseName: req.body.name,
        themes: themeArray
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
              return res.redirect('/profile');
          }
        }
    });

  } else if (req.body.logemail && req.body.logpassword) {
    User.authenticate(req.body.logemail, req.body.logpassword, function (error, user) {
      if (error || !user) {
        var err = new Error('Wrong email or password.');
        err.status = 401;
        return next(err);
      } else {
        req.session.userId = user._id;
        console.log(user);
        return res.json(user._id);
        // return res.redirect('/profile');
      }
    });
  } else {
    var err = new Error('All fields required.');
    err.status = 400;
    return next(err);
  }
})

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