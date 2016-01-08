var ScoXapi = {
    apiHandle: null,
    findAPITries: 0,
    noAPIFound: "false",
    terminated: "false",
    debug: false,
    isDone: false,
    audio_level: "1",
    audio_captioning: "-1",
    language: "",
    startTime: new Date(),
    previousTimeSpent: "00:00:00",
    LMS: "Local",
    learner: {
        "name": "Learner",
        "id": "Learner001",
        "location": {
            "current": "",
            "furthest": "",
            "activityPassed": "",
            "raw": ""
        },
        "exam": [],
        "language": "",
        "languageCharType": "",
        "caption": "-1",
        "volume": ".5",
        "score": "0",
        "completionStatus": "unknown",
        "successStatus": "unknown",
        "interactions": [],
        "comments": []
    },
    lmsFieldNames: {
        "learnerName": "cmi.core.student_name",
        "learnerId": "cmi.core.student_id",
        "language": "cmi.student_preference.language",
        "location": "cmi.core.lesson_location",
        "audio": "cmi.learner_preference.audio_level",
        "caption": "cmi.learner_preference.audio_captioning",
        "timeStamp": "timestamp",
        "interactions": "cmi.interactions",
        "interactionResponse": "learner_response",
        "interactionResult": "result",
        "interactionDescription": "description",
        "interactionId": "id",
        "interactionType": "type",
        "interactionTypeValue": "other",
        "interactionCorrect": "correct",
        "interactionIncorrect": "incorrect",
        "interactionNeutral": "neutral",
        "comments": "cmi.comments",
        "commentValue": "comment",
        "commentLocation": "location",
        "notFound": "403",
        "completionStatus": "cmi.core.lesson_status",
        "completionStatusInComplete": "incomplete",
        "completionStatusComplete": "completed",
        "successStatus": "cmi.success_status",
        "successStatusPassed": "passed",
        "successStatusFailed": "failed",
        "successStatusUnknown": "unknown",
        "entryMode": "cmi.core.entry",
        "exitMode": "cmi.core.exit",
        "suspend": "suspend",
        "launchData": "cmi.launch_data",
        "suspendData": "cmi.suspend_data",
        "scoreScaled": "cmi.score.scaled",
        "scoreMinimum": "cmi.core.score.min",
        "scoreMaximum": "cmi.core.score.max",
        "score": "cmi.core.score.raw"
    },
    SetLMS: function(LMSType) {
        this.LMS = LMSType;
        switch (LMSType) {
            case "Local":
                break;
            case "Scorm1dot2":
                this.lmsFieldNames = this.Scorm1dot2.lmsFieldNames;
                this.storeDataValue = this.Scorm1dot2.storeDataValue;
                this.Initialize = this.Scorm1dot2.Initialize;
                this.findAPI = this.Scorm1dot2.findAPI;
                this.getAPI = this.Scorm1dot2.getAPI;
                this.getAPIHandle = this.Scorm1dot2.getAPIHandle;
                this.initializeCommunication = this.Scorm1dot2.initializeCommunication;
                this.terminateCommunication = this.Scorm1dot2.terminateCommunication;
                this.retrieveDataValue = this.Scorm1dot2.retrieveDataValue;
                this.retrieveLastErrorCode = this.Scorm1dot2.retrieveLastErrorCode;
                this.retrieveErrorInfo = this.Scorm1dot2.retrieveErrorInfo;
                this.retrieveDiagnosticInfo = this.Scorm1dot2.retrieveDiagnosticInfo
                this.persistData = this.Scorm1dot2.persistData;
                break;
            case "Scorm2004":
                break;
            case "AICC":
                this.lmsFieldNames = this.AICC.lmsFieldNames;
                this.storeDataValue = this.AICC.storeDataValue;
                this.Initialize = this.AICC.Initialize;
                break;
            case "Xapi":
                break;
            default:
                break;
        }
    },
    storeDataValue: function(name, value) {
        localStorage.setItem(name, value);
    },
    showError: function(msg) {
        Console.log(msg);
    },
    findAPI: function(win) {
        return null;
    },
    getAPI: function() {
        return null;
    },
    getAPIHandle: function() {
        return null;
    },
    initializeCommunication: function() {
        this.storeDataValue("Initialized", "true")
    },
    terminateCommunication: function() {
        this.storeDataValue("Terminated", "true")
    },
    retrieveDataValue: function(name) {
        return localStorage.getItem(name);
    },
    retrieveLastErrorCode: function() {
        return "0";
    },
    retrieveErrorInfo: function(errCode) {
        return "";
    },
    persistData: function() {
        this.storeDataValue("Persist", "true")
    },
    displayErrorInfo: function(errCode) {
        Console.log("Error Encountered" + errCode);
    },
    InitInteraction: function(id, type) {
        var tempId = "";
        var exists = false;
        var n = 0;
        // First check to see if this id is already set for this sco
        // Loop through each interaction, looking for this id so it is only created
        // once. Either way, return the interaction n value
        for (var i = 0; i < this.learner.interactions.length; i++) {
            tempId = this.learner.interactions[i].id;
            if (id == tempId) {
                exists = true;
                n = i;
                break;
            }
        }
        // If this id was not found in the interactions collection, create a new one
        if (!exists) {
            var interaction = {
                "id": id,
                "response": "0",
                "result": "neutral"
            }
            n = this.learner.interactions.length;
            this.learner.interactions.push(interaction);;
        }
        return n;
    },
    InitComments: function(id) {
        var tempId = "";
        var exists = false;
        var n = 0;
        // First check to see if this id is already set for this sco
        // Loop through each interaction, looking for this id so it is only created
        // once. Either way, return the interaction n value
        for (var i = 0; i < this.learner.comments.length; i++) {
            tempId = this.learner.comments[i].id;
            if (id == tempId) {
                exists = true;
                n = i;
                break;
            }
        }
        // If this id was not found in the interactions collection, create a new one
        if (!exists) {
            var comments = {
                "id": id,
                "response": ""
            }
            n = this.learner.comments.length;
            this.learner.comments.push(comments);
        }
        return n;
    },
    Initialize: function() {
        this.storeDataValue("Initialized", "true")
    },
    Terminate: function() {
        this.storeDataValue("Terminated", "true")
    },
    setIncomplete: function() {
        if (this.learner.completionStatus != this.lmsFieldNames.completionStatusComplete) {
            this.learner.completionStatus = this.lmsFieldNames.completionStatusInComplete;
            this.storeDataValue(this.lmsFieldNames.completionStatus, this.lmsFieldNames.completionStatusInComplete)
            this.setSuspendData();
        }
    },
    setComplete: function() {
        this.learner.completionStatus = this.lmsFieldNames.completionStatusComplete;
        this.storeDataValue(this.lmsFieldNames.completionStatus, this.lmsFieldNames.completionStatusComplete)
    },
    setScore: function(value) {
        this.learner.score = value;
        return this.storeDataValue(this.lmsFieldNames.score, value)
    },
    getScore: function() {
        return this.learner.score;
    },
    setCompletionStatus: function(value) {
        this.learner.completionStatus = this.lmsFieldNames.completionStatusComplete;
        this.storeDataValue(this.lmsFieldNames.completionStatus, value)
    },
    getCompletionStatus: function() {
        return this.learner.completionStatus;
    },
    getInteractionId: function(id) {
        var interactionId = this.InitInteraction(id, this.lmsFieldNames.interactionTypeValue);
        return interactionId;
    },
    getInteractionResponse: function(id) {
        var responseValue = this.learner.interactions[id].response;
        return responseValue;
    },
    getInteractionResult: function(id) {
        var resultValue = this.learner.interactions[id].result;
        return resultValue;
    },
    setInteractionResponse: function(id, value, result) {
        this.learner.interactions[id].response = value;
        this.learner.interactions[id].result = result;
        this.setSuspendData();
    },
    getCommentId: function(id) {
        var commentId = this.InitComments(id);
        return commentId;
    },
    getComment: function(id) {
        var responseValue = this.learner.comments[id].response;
        return responseValue;
    },
    setComment: function(id, value) {
        this.learner.comments[id].response = value;
        this.storeDataValue("comment", JSON.parse(this.learner.comments));
    },
    getLearnerName: function() {
        return this.learner.name;
    },
    getLearnerId: function() {
        return this.learner.id;
    },
    setLocation: function(value) {
        if (this.learner.location.raw != value) {
            this.learner.location.raw = value;
            this.storeDataValue(this.lmsFieldNames.location, value)
        }
    },
    getLocation: function() {
        return this.learner.location.raw;
    },
    setSuspendData: function() {
        this.storeDataValue(this.lmsFieldNames.suspendData, JSON.stringify(this.learner));
    },
    getSuspendData: function(value) {
        var learnerData = value;
        if (learnerData != "" && learnerData != undefined && learnerData != null) {
            learner = JSON.parse(learnerData);
        }
    },
    setExamQuestion: function(examNum, examQuestionList) {
        this.learner.exam[examNum].questionSelection = examQuestionList;
        this.storeDataValue(this.lmsFieldNames.suspendData, convertJsonToSuspendData());
    },
    getExamQuestion: function(examNum) {
        return this.learner.exam[examNum].questionSelection;
    },
    clearExamInteractions: function(examStartScreen, examQuestions, topicNum) {
        for (var i = examStartScreen; i < Number(examStartScreen) + Number(examQuestions); i++) {
            var iNum = InitInteraction(topicNum + "." + i, this.lmsFieldNames.interactionTypeValue);
            this.learner.interactions[iNum].response = "";
            this.learner.interactions[iNum].result = "";
        }
        this.setSuspendData();
    },
    getNumberQuestionsCorrect: function(examStartScreen, examQuestions, topicNum) {
        var correct = 0;
        var result = "";
        for (var i = examStartScreen; i < Number(examStartScreen) + Number(examQuestions); i++) {
            var iNum = InitInteraction(topicNum + "." + i, this.lmsFieldNames.interactionTypeValue);
            result = this.learner.interactions[iNum].result;
            if (result == this.lmsFieldNames.interactionCorrect) {
                correct++;
            }
        }
        return correct;
    },
    ConvertDateToTimeStamp: function() {
        var strTimeStamp;
        dtm = new Date();
        var Year = dtm.getFullYear();
        var Month = dtm.getMonth() + 1;
        var Day = dtm.getDate();
        var Hour = dtm.getHours();
        var Minute = dtm.getMinutes();
        var Second = dtm.getSeconds();
        Month = ZeroPad(Month, 2);
        Day = ZeroPad(Day, 2);
        Hour = ZeroPad(Hour, 2);
        Minute = ZeroPad(Minute, 2);
        Second = ZeroPad(Second, 2);
        strTimeStamp = Year + "-" + Month + "-" + Day + "T" + Hour + ":" + Minute + ":" + Second;
        return strTimeStamp;
    },
    ZeroPad: function(intNum, intNumDigits) {
        var strTemp;
        var intLen;
        var i;
        strTemp = new String(intNum);
        intLen = strTemp.length;
        if (intLen > intNumDigits) {
            strTemp = strTemp.substr(0, intNumDigits);
        } else {
            for (i = intLen; i < intNumDigits; i++) {
                strTemp = "0" + strTemp;
            }
        }
        return strTemp;
    },
    get_time_difference: function(earlierDate, laterDate) {
        var oDiff = new Object();
        //  Calculate Differences
        //  -------------------------------------------------------------------  //
        var nTotalDiff = laterDate.getTime() - earlierDate.getTime();
        oDiff.days = Math.floor(nTotalDiff / 1000 / 60 / 60 / 24);
        nTotalDiff -= oDiff.days * 1000 * 60 * 60 * 24;
        oDiff.hours = Math.floor(nTotalDiff / 1000 / 60 / 60);
        nTotalDiff -= oDiff.hours * 1000 * 60 * 60;
        oDiff.minutes = Math.floor(nTotalDiff / 1000 / 60);
        nTotalDiff -= oDiff.minutes * 1000 * 60;
        oDiff.seconds = Math.floor(nTotalDiff / 1000);
        //  -------------------------------------------------------------------  //
        //  Format Duration
        //  -------------------------------------------------------------------  //
        //  Format Hours
        var hourtext = '00';
        if (oDiff.days > 0) {
            hourtext = String(oDiff.days);
        }
        if (hourtext.length == 1) {
            hourtext = '0' + hourtext
        };
        //  Format Minutes
        var mintext = '00';
        if (oDiff.minutes > 0) {
            mintext = String(oDiff.minutes);
        }
        if (mintext.length == 1) {
            mintext = '0' + mintext
        };
        //  Format Seconds
        var sectext = '00';
        if (oDiff.seconds > 0) {
            sectext = String(oDiff.seconds);
        }
        if (sectext.length == 1) {
            sectext = '0' + sectext
        };
        //  Set Duration
        var sDuration = hourtext + ':' + mintext;
        oDiff.duration = this.timeSummation(this.previousTimeSpent, sDuration) + ":" + sectext;
        //  -------------------------------------------------------------------  //
        return oDiff;
    },
    timeSummation: function(id1, id2) {
        var t1 = String(id1).split(':');
        var t2 = String(id2).split(':');
        var mins = Number(t1[1]) + Number(t2[1]);
        var hrs = Math.floor(parseInt(mins / 60));
        hrs = Number(t1[0]) + Number(t2[0]) + hrs;
        mins = mins % 60;
        return hrs.padDigit() + ':' + mins.padDigit();
    },
    getParameterByName: function(name) {
        var match = RegExp('[?&]' + name + '=([^&]*)').exec(window.location.search);
        return match && decodeURIComponent(match[1].replace(/\+/g, ' '));
    },
    AICC: {
        lmsFieldNames: {
            "learnerName": "cmi.learner_name",
            "learnerId": "cmi.learner_id",
            "language": "cmi.learner_preference.language",
            "location": "lesson_location",
            "audio": "cmi.learner_preference.audio_level",
            "caption": "cmi.learner_preference.audio_captioning",
            "timeStamp": "time",
            "interactions": "cmi.interactions",
            "interactionResponse": "learner_response",
            "interactionResult": "result",
            "interactionDescription": "description",
            "interactionId": "id",
            "interactionType": "type",
            "interactionTypeValue": "other",
            "interactionCorrect": "correct",
            "interactionIncorrect": "incorrect",
            "interactionNeutral": "neutral",
            "comments": "cmi.comments_from_learner",
            "commentValue": "comment",
            "commentLocation": "location",
            "notFound": "403",
            "completionStatus": "lesson_status",
            "completionStatusInComplete": "incomplete",
            "completionStatusComplete": "completed",
            "successStatus": "cmi.success_status",
            "successStatusPassed": "passed",
            "successStatusFailed": "failed",
            "successStatusUnknown": "unknown",
            "entryMode": "cmi.entry",
            "exitMode": "cmi.exit",
            "suspend": "suspend",
            "launchData": "cmi.launch_data",
            "suspendData": "core_lesson",
            "scoreScaled": "cmi.score.scaled",
            "scoreMinimum": "cmi.core.score.min",
            "scoreMaximum": "cmi.core.score.max",
            "score": "score"
        },
        storeDataValue: function(name, value, callBack) {
            var learnerData = {
                lesson_status: ScoXapi.learner.completionStatus,
                lesson_location: ScoXapi.learner.location.raw,
                time: ScoXapi.get_time_difference(ScoXapi.startTime, new Date()).duration,
                score: ScoXapi.learner.score,
                core_lesson: JSON.stringify(ScoXapi.learner)
            };
            $.aicc('put', learnerData, function(r) {
                if (callBack != undefined) {
                    callBack(r.error);
                }
            });
        },
        Initialize: function(callBack) {
            $.aicc('get', function(r) {
                if (Number(r.error) != 0) {
                    callBack(r.error);
                } else {
                    ScoXapi.learner.name = r.name;
                    ScoXapi.learner.id = r.id;
                    ScoXapi.learner.location.raw = r.location;
                    ScoXapi.learner.completionStatus = r.status;
                    if (r.time != "" && r.time != undefined) {
                        ScoXapi.previousTimeSpent = r.time;
                    }
                    ScoXapi.getSuspendData(r.suspendData);
                    callBack();
                }
            });
        }
    },
    Scorm1dot2: {
        lmsFieldNames: {
            "learnerName": "cmi.core.student_name",
            "learnerId": "cmi.core.student_id",
            "language": "cmi.student_preference.language",
            "location": "cmi.core.lesson_location",
            "audio": "cmi.learner_preference.audio_level",
            "caption": "cmi.learner_preference.audio_captioning",
            "timeStamp": "timestamp",
            "interactions": "cmi.interactions",
            "interactionResponse": "learner_response",
            "interactionResult": "result",
            "interactionDescription": "description",
            "interactionId": "id",
            "interactionType": "type",
            "interactionTypeValue": "other",
            "interactionCorrect": "correct",
            "interactionIncorrect": "incorrect",
            "interactionNeutral": "neutral",
            "comments": "cmi.comments",
            "commentValue": "comment",
            "commentLocation": "location",
            "notFound": "403",
            "completionStatus": "cmi.core.lesson_status",
            "completionStatusInComplete": "incomplete",
            "completionStatusComplete": "completed",
            "successStatus": "cmi.success_status",
            "successStatusPassed": "passed",
            "successStatusFailed": "failed",
            "successStatusUnknown": "unknown",
            "entryMode": "cmi.core.entry",
            "exitMode": "cmi.core.exit",
            "suspend": "suspend",
            "launchData": "cmi.launch_data",
            "suspendData": "cmi.suspend_data",
            "scoreScaled": "cmi.score.scaled",
            "scoreMinimum": "cmi.core.score.min",
            "scoreMaximum": "cmi.core.score.max",
            "score": "cmi.core.score.raw"
        },
        findAPI: function(win) {
            while ((win.API == null) && (win.parent != null) && (win.parent != win)) {
                this.findAPITries++;
                if (this.findAPITries > 500) {
                    return null;
                }
                win = win.parent;
            }
            return win.API;
        },
        getAPI: function() {
            var theAPI = this.findAPI(window);
            if ((theAPI == null) && (window.opener != null) && (typeof(window.opener) != "undefined")) {
                this.apiOpener = "true";
                theAPI = this.findAPI(window.opener);
            }
            if (theAPI == null) {
                noAPIFound = "true";
                //showError(errMsg_LMS_Connection + " \n Api not found");
            }
            return theAPI
        },
        getAPIHandle: function() {
            if (this.apiHandle == null) {
                this.apiHandle = this.getAPI();
            }
            return this.apiHandle;
        },
        initializeCommunication: function() {
            var api = this.getAPIHandle();
            var result = api.LMSInitialize("");
            return result;
        },
        terminateCommunication: function() {
            var api = this.getAPIHandle();
            var result = api.LMSFinish("");
            return result;
        },
        retrieveDataValue: function(name) {
            if (this.terminated != "true") {
                var api = this.getAPIHandle();
                var value = api.LMSGetValue(name);
                return value;
            }
        },
        Initialize: function(callBack) {
            this.initializeCommunication();
            this.getSuspendData(this.retrieveDataValue(this.lmsFieldNames.suspendData));
            this.learner.name = this.retrieveDataValue(this.lmsFieldNames.learnerName);
            this.learner.id = this.retrieveDataValue(this.lmsFieldNames.learnerId);
            this.learner.completionStatus = this.retrieveDataValue(this.lmsFieldNames.completionStatus);
            this.isDone = true;
            this.setIncomplete();
            callBack();
        },
        storeDataValue: function(name, value) {
            if (this.terminated != "true") {
                var api = this.getAPIHandle();
                api.LMSSetValue(name, value);
            }
            return;
        },
        retrieveLastErrorCode: function() {
            var api = this.getAPIHandle();
            if (api == null) {
                return "";
            } else {
                return api.LMSGetLastError();
            }
        },
        retrieveErrorInfo: function(errCode) {
            var api = this.getAPIHandle();
            if (api == null) {
                return "";
            } else {
                return api.LMSGetErrorString(errCode);
            }
        },
        retrieveDiagnosticInfo: function(error) {
            var api = this.getAPIHandle();
            if (api == null) {
                return "";
            } else {
                return api.LMSGetDiagnostic(error);
            }
        },
        persistData: function() {
            if (this.terminated != "true") {
                var api = this.getAPIHandle();
                var result = api.LMSCommit("");
            }
            return "";
        }
    }
}
Number.prototype.padDigit = function() {
    return (this < 10) ? '0' + this : this;
}