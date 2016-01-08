// local variable definitions used for finding the API
var apiOpener = "false";

// local variable used to keep from calling Terminate() more than once
var terminated = "false";

// local variable used by the content developer to debug
// This should be set to true during development to find errors.  However,
// This should be set to false prior to deployment.
var _debug = false;
var isDone = false;

var audio_level = "1";
var audio_captioning = "-1";
var language = "";
var loc = "1.1|20.9|1|20|0|LTR";

/*******************************************************************************/
var learner = {
    "name": "Learner",
    "id": "Learner001",
    "location": {
        "current": "1.1",
        "furthest": "1.1",
        "activityPassed": "0",
        "furthestTopic": "0",
        "raw": "1.1|1.0|1|0|0|LTR"
    },
    "exam": [],
    "language": "",
    "languageCharType": "",
    "caption": "-1",
    "volume": ".5",
    "entryMode": "",
    "exitMode": "",
    "score": "0",
    "completionStatus": "unknown",
    "successStatus": "unknown",
    "interactions": [],
    "comments": []
}

var lmsFieldNames = {
    "learnerName": "cmi.learner_name",
    "learnerId": "cmi.learner_id",
    "language": "cmi.learner_preference.language",
    "location": "cmi.location",
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
    "comments": "cmi.comments_from_learner",
    "commentValue": "comment",
    "commentLocation": "location",
    "notFound": "403",
    "completionStatus": "cmi.completion_status",
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
    "suspendData": "cmi.suspend_data",
    "scoreScaled": "cmi.score.scaled",
    "scoreMinimum": "cmi.score.min",
    "scoreMaximum": "cmi.score.max",
    "score": "cmi.score.raw"
}

var tinCanObj = {
    "content_endpoint":"",
    "externalConfiguration":"",
    "registration":"",
    "activity_id":"",
    "content_token":"",
    "auth":"",
    "actor":{},
}

/*******************************************************************************/
confirmExit = function () {
    var msg;
    var status;
    status = learner.completionStatus;
    if (status != lmsFieldNames.completionStatusComplete && status != lmsFieldNames.successStatusPassed) {
        msg = statusMsgIncomplete;
    } else {
        msg = statusMsgComplete;
    }
    if (needToConfirm) return msg;

}

/*******************************************************************************/
showError = function (msg) {
    window.onbeforeunload = null;
    $("#flashContent").hide();
    $("#error").css("visibility", "visible");
    $("#errorMsg").html(msg);
}

// Keep connection alive after every minute try to see if the connection to api is alive.
CheckInternet = function () {
    $.ajax({
        type: "GET",
        url: "Check_Online.xml" + "?" + Math.random(),
        dataType: "xml",
        success: function () {
            return;
        },
        error: function () {
            showError(errMsg_LMS_No_Internet);
        }
    });
}

// Keep connection alive after every minute try to see if the connection to api is alive.
KeepConnectionAlive = function () {
    CheckInternet();
}

/*******************************************************************************/
initializeCommunication = function () {

    tinCanObj.content_endpoint = getParameterByName(content_endpoint);
    tinCanObj.externalConfiguration = getParameterByName(externalConfiguration);
    tinCanObj.registration = getParameterByName(registration);
    tinCanObj.activity_id = getParameterByName(activity_id);
    tinCanObj.content_token = getParameterByName(content_token);
    tinCanObj.externalConfiguration = getParameterByName(externalConfiguration);
    tinCanObj.auth = getParameterByName(auth);
    tinCanObj.actor = JSON.parse(getParameterByName(actor));
    /*

       var result = api.Initialize("");
    // Keep connection alive after every minute try to see if the connection to api is alive.

    if (result != "true") {
    var errCode = retrieveLastErrorCode();
    displayErrorInfo(errCode);
    showError(errMsg_LMS_Connection);
    }
    // If the current status is "not attempted", it's crucial that the content
    // change it to "incomplete" right away. If the content fails to make this
    // change, the LMS is obligated to consider the content complete on exit,
    // even if it isn't!
    setInterval("KeepConnectionAlive()", 60000);
    */
    setIncomplete();

    return result;
}

/*******************************************************************************/
terminateCommunication = function () {

}

/*******************************************************************************/
createCookie = function (name, value, days) {
    var expires = '';
    if (days) {
        date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toGMTString();
    }
    document.cookie = name + "=" + value + expires + "; path=/";
}

/*******************************************************************************/
readCookie = function (name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for (i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}

/*******************************************************************************/
getLMS = function(name) {
    /*
    // do not call a set after finish was called
    if (terminated != "true") {
    var api = getAPIHandle();

    if (api == null) {
    return "";
    } else {
    var value = api.GetValue(name);

    var errCode = api.GetLastError();

    if (errCode != "0") {
    var errCode = retrieveLastErrorCode();

    displayErrorInfo(errCode);
    } else {
    return value;
    }
    }
    }
    */
    return;
}

/*******************************************************************************/
saveLMS = function (name, value) {
    return;
}


/*******************************************************************************/
retrieveDataValue = function (name) {
    if (nonLMS == false) {
        return getLMS(name);
    }else{
        return getLocal(name);
    }
}

/*******************************************************************************/
storeDataValue = function (name, value) {
    if (nonLMS == false) {
        saveLMS(name, value);
    } else {
        saveLocal(name, value);
    }
    return;
}

/*******************************************************************************/
saveLocal = function (name, value) {
    if (!window.localStorage) {
        createCookie(name, value);
    } else {
        localStorage.setItem(name, value);
    }
}

getLocal = function (name) {
    if (!window.localStorage) {
        return readCookie(name);
    } else {
        return localStorage.getItem(name);
    }
}

/*******************************************************************************/
retrieveLastErrorCode = function () {
    // It is permitted to call GetLastError() after Terminate()
    var api = getAPIHandle();

    if (api == null) {
        return "";
    } else {
        return api.GetLastError();
    }
}

/*******************************************************************************/
retrieveErrorInfo = function (errCode) {
    // It is permitted to call GetLastError() after Terminate()
    var api = getAPIHandle();
    if (api == null) {
        return "";
    } else {

        return api.GetErrorString(errCode);
    }
}

/*******************************************************************************/
retrieveDiagnosticInfo = function (error) {
    // It is permitted to call GetLastError() after Terminate()
    var api = getAPIHandle();
    if (api == null) {
        return "";
    } else {
        return api.GetDiagnostic(error);
    }
}

/*******************************************************************************/
persistData = function () {
    return "";
}

/*******************************************************************************/
displayErrorInfo = function (errCode) {
    if (_debug) {
        var errString = retrieveErrorInfo(errCode);
        var errDiagnostic = retrieveDiagnosticInfo(errCode);

        alert("ERROR: " + errCode + " - " + errString + "\n" +
                "DIAGNOSTIC: " + errDiagnostic);
    }
}

/*******************************************************************************/
InitInteraction = function (id, type) {
    var tempId = "";
    var exists = false;
    var n = 0;

    // First check to see if this id is already set for this sco
    // Loop through each interaction, looking for this id so it is only created
    // once. Either way, return the interaction n value
    for (var i = 0; i < learner.interactions.length; i++) {
        tempId = learner.interactions[i].id;
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
            "answer": "",
            "question": "",
            "type": "other",
            "result": "neutral",
            "examQuestion": "false",
            "askExpert": "false",
            "questionId": "0",
            "questionType": "Single",
            "timeStamp": ""
        }
        n = learner.interactions.length;
        learner.interactions.push(interaction);;
        storeDataValue(lmsFieldNames.interactions+"." + n + "."+lmsFieldNames.interactionId, id);
        storeDataValue(lmsFieldNames.interactions+"." + n + "."+lmsFieldNames.interactionType, type);
        storeDataValue(lmsFieldNames.interactions+"." + n + "."+lmsFieldNames.interactionResponse, "");
        storeDataValue(lmsFieldNames.interactions+"." + n + "."+lmsFieldNames.interactionDescription, "");
    }

    return n;
}
/*******************************************************************************/
InitComments = function (id) {
    var tempId = "";
    var exists = false;
    var n = 0;

    // First check to see if this id is already set for this sco
    // Loop through each interaction, looking for this id so it is only created
    // once. Either way, return the interaction n value
    for (var i = 0; i < learner.comments.length; i++) {
        tempId = learner.comments[i].id;
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
            "response": "",
            "timeStamp": ""
        }
        n = learner.comments.length;
        learner.comments.push(comments);
        storeDataValue(lmsFieldNames.comments+"." + n + "."+lmsFieldNames.commentLocation, id);
        storeDataValue(lmsFieldNames.comments+"." + n + "."+lmsFieldNames.commentValue, "");
    }
    return n;
}
/*******************************************************************************
 ** This function is used to tell the LMS to initiate the communication session
 *******************************************************************************/
Initialize = function () {
    window.onbeforeunload = confirmExit;
    if (nonLMS == false) {
        initializeCommunication();

        learner.name = tinCanObj.actor.name;
        learner.id = tinCanObj.actor.mbox;
        var htmlText = GetFlashObject();
        $("#flashContent").html(htmlText);
    } else {
        setInterval("KeepConnectionAlive()", 30000);
        var topic = 1;
        var topicScreen = 1;
        var lang = "en";

        getSuspendData(retrieveDataValue(lmsFieldNames.suspendData));

        if (getParameterByName("topic") != null) {
            if (blnLocation == true) {
                topic = 20;
            } else {
                topic = getParameterByName("topic");
            }
            setLocation(topic + "." + topicScreen + "|" + topic + "." + topicScreen + "|1|" + topic + "|0|LTR");
        }

        if (getParameterByName("screen") != null) {
            topicScreen = getParameterByName("screen");
            setLocation(topic + "." + topicScreen + "|" + topic + "." + topicScreen + "|1|" + topic + "|0|LTR");
        }
        if (getParameterByName("lng") != null) {
            lang = getParameterByName("lng");
            storeDataValue(lmsFieldNames.language, lang);
        };

        var htmlText = GetFlashObject();
        $("#flashContent").html(htmlText);
    }
}

/*******************************************************************************
 ** Makes the appropriate calls for a normal exit calling Terminate
 *******************************************************************************/
Terminate = function () {
    if (nonLMS == false) {
        terminateCommunication();
    }else{
        storeDataValue("Terminated", "true")
    }
}

/*******************************************************************************
 ** Sets the SCO completion status to incomplete.
 *******************************************************************************/
setIncomplete = function () {
    if (learner.completionStatus != lmsFieldNames.completionStatusInComplete) {
        learner.completionStatus = lmsFieldNames.completionStatusInComplete;
        var statement = {
            "actor": tinCanOb.actor,
            "verb": {
                "id": "http://adlnet.gov/expapi/verbs/attempted",
                "display": {
                    "en-US": "attempted"
                }
            },
            "object": {
                "id": tinCanOb.activity_id,
                "objectType": "Activity",
                "definition": {
                    "name": {
                        "en-US": tinCanOb.activity_id
                    },
                    "description": {
                        "en-US": tinCanOb.activity_id
                    }
                }
            }
        }

        $.ajax({
            type: "POST",
            url: tinCanObj.content_endpoint,
            // The key needs to match your method's input parameter (case-sensitive).
            data: JSON.stringify(statement),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function(data){alert(data);},
            failure: function(errMsg) {
                alert(errMsg);
            }
        });

    }
}

/*******************************************************************************
 ** Sets the SCO completion status to complete.
 *******************************************************************************/
setComplete = function () {
    if (learner.completionStatus != lmsFieldNames.completionStatusComplete) {
        learner.completionStatus = lmsFieldNames.completionStatusComplete;
        storeDataValue(lmsFieldNames.completionStatus, lmsFieldNames.completionStatusComplete)
    }
}

/*******************************************************************************
 ** Set language
 *******************************************************************************/
setLanguage = function (value) {
    learner.language = value;
    return storeDataValue(lmsFieldNames.language, value)
}
/*******************************************************************************
 ** Get language
 *******************************************************************************/
getLanguage = function () {
    return learner.language;
}
/*******************************************************************************
 ** Set language
 *******************************************************************************/
setLanguageCharType = function (value) {
    learner.languageCharType = value;
    var loc = learner.location.raw.split("|");
    loc[5] = value;
    storeDataValue(lmsFieldNames.location, loc.join("|"));
    setSuspendData();
    return;
}
/*******************************************************************************
 ** Get language
 *******************************************************************************/
getLanguageCharType = function () {
    return learner.languageCharType;
}
/*******************************************************************************
 ** Set audio level
 *******************************************************************************/
setAudioLevel = function (value) {
    if (isNaN(value) != true) {
        learner.volume = value.toFixed(2);
        storeDataValue(lmsFieldNames.audio, value.toFixed(2))
    }
    return;
}
/*******************************************************************************
 ** Get audio level
 *******************************************************************************/
getAudioLevel = function () {
    return learner.volume;

}
/*******************************************************************************
 ** Set captions setting
 *******************************************************************************/
setCaption = function (value) {
    learner.caption = value;
    return storeDataValue(lmsFieldNames.caption, value)
}
/*******************************************************************************
 ** Get captions setting
 *******************************************************************************/
getCaption = function () {
    return learner.caption;
}
/*******************************************************************************
 ** Set entry mode
 *******************************************************************************/
setEntryMode = function (value) {
    learner.entryMode = value;
    return storeDataValue(lmsFieldNames.entryMode, value)
}
/*******************************************************************************
 ** Get entry mode
 *******************************************************************************/
getEntryMode = function () {
    return learner.entryMode;
}
/*******************************************************************************
 ** Set exit mode
 *******************************************************************************/
setExitContext = function (value) {
    learner.exitMode = value;
    return storeDataValue(lmsFieldNames.exitMode, value)
}
/*******************************************************************************
 ** Get exit mode
 *******************************************************************************/
getExitContext = function () {
    learner.exitMode;
}

/*******************************************************************************
 ** Set score
 *******************************************************************************/
setScore = function (value) {
    if (learner.score != value) {
        learner.score = value;
        return storeDataValue(lmsFieldNames.score, value)
    }
}
/*******************************************************************************
 ** Get score
 *******************************************************************************/
getScore = function () {
    return learner.score;
}

/*******************************************************************************
 ** Set completion Status
 *******************************************************************************/
setCompletionStatus = function (value) {
    if (learner.completionStatus != value) {
        learner.completionStatus = lmsFieldNames.completionStatusComplete;
        storeDataValue(lmsFieldNames.completionStatus, value)
    }
}
/*******************************************************************************
 ** Get completion Status
 *******************************************************************************/
getCompletionStatus = function () {
    return learner.completionStatus;
}

/*******************************************************************************
 ** Set success Status
 *******************************************************************************/
setSuccessStatus = function (value) {
    if (learner.successStatus != value) {
        learner.successStatus = value;
        storeDataValue(lmsFieldNames.successStatus, value)
    }
}
/*******************************************************************************
 ** Get success Status
 *******************************************************************************/
getSuccessStatus = function () {
    return learner.successStatus;
}
/*******************************************************************************
 ** Get Interaction id
 *******************************************************************************/
getInteractionId = function (id) {
    var interactionId = InitInteraction(id, lmsFieldNames.interactionTypeValue);
    return interactionId;
}
/*******************************************************************************
 ** Get Interaction Response
 *******************************************************************************/
getInteractionResponse = function (id) {
    var responseValue = learner.interactions[id].response;
    return responseValue;
}

/*******************************************************************************
 ** Get Interaction Result
 *******************************************************************************/
getInteractionResult = function (id) {
    var resultValue = learner.interactions[id].result;
    return resultValue;
}
/*******************************************************************************
 ** set Interaction response
 *******************************************************************************/
setInteractionResponse = function (id, value, result, questionId, questionType, isAskExpert, question) {
    learner.interactions[id].response = value;
    learner.interactions[id].result = result;
    learner.interactions[id].question = question;
    learner.interactions[id].askExpert = isAskExpert;
    learner.interactions[id].questionId = questionId;
    learner.interactions[id].answer = getSelectedAnswer(value);
    learner.interactions[id].questionType = questionType;
    learner.interactions[id].timeStamp = ConvertDateToTimeStamp();
    storeDataValue(lmsFieldNames.interactions+"." + id + "."+lmsFieldNames.interactionResponse, value);
    storeDataValue(lmsFieldNames.interactions+"." + id + "."+lmsFieldNames.interactionResult, result);
    storeDataValue(lmsFieldNames.interactions+"." + id +"."+ lmsFieldNames.interactionDescription, questionId+"|"+questionType+"|"+isAskExpert+"|"+question);
    setSuspendData();
}

/*******************************************************************************
 ** Get Comment id
 *******************************************************************************/
getCommentId = function (id) {
    var commentId = InitComments(id);
    return commentId;
}
/*******************************************************************************
 ** Get Comment id
 *******************************************************************************/
getComment = function (id) {
    var responseValue = learner.comments[id].response;
    return responseValue;
}
/*******************************************************************************
 ** set Interaction
 *******************************************************************************/
setComment = function (id, value) {
    learner.comments[id].response = value;
    learner.comments[id].timeStamp = ConvertDateToTimeStamp();
    storeDataValue(lmsFieldNames.comments+"." + id + ".comment", value);
    setSuspendData();
}
/*******************************************************************************
 ** Get user name
 *******************************************************************************/
getUserName = function () {
    return learner.name;
}
/*******************************************************************************
 ** Get user id
 *******************************************************************************/
getUserId = function () {
    var userId = learner.id;
    return userId;
}
/*******************************************************************************
 ** set Location
 *******************************************************************************/
setLocation = function (value) {
    if (learner.location.raw != value) {
        var loc = value.split("|");
        learner.location.current = loc[0];
        learner.location.furthest = loc[1];
        learner.location.activityPassed = loc[2];
        learner.location.furthestTopic = loc[3];
        var examArray = loc[4].split(",");
        var learnerExamArray = new Array();

        for (i = 0; i < examArray.length; i++) {
            if (examArray[i] !== "" && examArray[i] != undefined) {
                learnerExamArray[i] = {
                    "questionSelection": learner.exam[i].questionSelection,
                    "percentage": examArray[i]
                }
            }
        }
        learner.exam = learnerExamArray;
        learner.location.languageCharType = loc[5];
        learner.location.raw = value;
        storeDataValue(lmsFieldNames.location, value)
            setSuspendData();
    }
    return;
}
/*******************************************************************************
 ** get Location
 *******************************************************************************/
getLocation = function () {
    return learner.location.raw;
}
/*******************************************************************************
 ** set SuspendData
 *******************************************************************************/
setSuspendData = function () {
    //storeDataValue(lmsFieldNames.suspendData, convertJsonToSuspendData());
    storeDataValue(lmsFieldNames.suspendData, JSON.stringify(learner));
}
/*******************************************************************************
 ** get Location
 *******************************************************************************/
getSuspendData = function (value) {
    var learnerData = value;
    if (learnerData != "" && learnerData != undefined) {
        //convertSuspendDataToJson(learnerData);
        learner = JSON.parse(learnerData);
    } else {
        learner.exam.push({
            "questionSelection": "",
            "percentage": "0"
        });
    }
}

/*******************************************************************************
 ** set Exam Question Selection
 *******************************************************************************/
setExamQuestion = function (examNum,examQuestionList) {
    learner.exam[examNum].questionSelection = examQuestionList;
    storeDataValue(lmsFieldNames.suspendData, convertJsonToSuspendData());
}

/*******************************************************************************
 ** set Exam Question Selection
 *******************************************************************************/
getExamQuestion = function (examNum) {
    return learner.exam[examNum].questionSelection;
}

/******************************************************************************************
 * Function: ClearExamInteractions
 ******************************************************************************************/
clearExamInteractions = function (examStartScreen, examQuestions, topicNum) {
    for (var i = examStartScreen; i < (Number(examStartScreen) + Number(examQuestions)); i++) {
        var iNum = InitInteraction(topicNum + "." + i, lmsFieldNames.interactionTypeValue);
        learner.interactions[iNum].examQuestion = "true";
        learner.interactions[iNum].response = "";
        learner.interactions[iNum].result = "";
        learner.interactions[iNum].question = "";
        learner.interactions[iNum].questionId = "";
        learner.interactions[iNum].timeStamp = "";
        learner.interactions[iNum].answer = "";
        storeDataValue(lmsFieldNames.interactions+"." + iNum +"."+ lmsFieldNames.interactionResponse, "");
        storeDataValue(lmsFieldNames.interactions+"." + iNum +"."+  lmsFieldNames.interactionResult, "0");
        storeDataValue(lmsFieldNames.interactions+"." + iNum +"."+  lmsFieldNames.interactionDescription, "");
    }
    setSuspendData();
}

/******************************************************************************************
 * Function: GetNumberQuestionsCorrect
 ******************************************************************************************/
getNumberQuestionsCorrect = function (examStartScreen, examQuestions, topicNum) {
    var correct = 0;
    var result = "";

    for (var i = examStartScreen; i < Number(examStartScreen) + Number(examQuestions); i++) {
        var iNum = InitInteraction(topicNum + "." + i, lmsFieldNames.interactionTypeValue);
        result = learner.interactions[iNum].result;
        if (result == lmsFieldNames.interactionCorrect) {
            correct++;
        }
    }
    return correct;
}

/******************************************************************************************
 * Function: ConvertDateToTimeStamp
 ******************************************************************************************/
ConvertDateToTimeStamp = function () {

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

}

/******************************************************************************************
 * Function: utilty for time format
 ******************************************************************************************/
ZeroPad = function (intNum, intNumDigits) {
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
}

/******************************************************************************************
 * Function: convertJsonToSuspendData
 ******************************************************************************************/
convertJsonToSuspendData = function () {
    var suspendData = new Array();
    suspendData[0] = String(learner.name).replace(/\s+/g, "");
    suspendData[1] = learner.id;
    suspendData[2] = learner.location.raw;
    var exam = new Array()
        for (i = 0; i < learner.exam.length; i++) {
            exam[i] = learner.exam[i].percentage+"-"+learner.exam[i].questionSelection;
        }
    suspendData[3] = exam.join("|");
    suspendData[4] = learner.language;
    suspendData[5] = learner.languageCharType;
    suspendData[6] = learner.caption;
    suspendData[7] = learner.volume;
    suspendData[8] = learner.entryMode;
    suspendData[9] = learner.exitMode;
    suspendData[10] = learner.score;
    suspendData[11] = learner.completionStatus;
    suspendData[12] = learner.successStatus;

    var interaction = new Array();
    for (i = 0; i < learner.interactions.length; i++) {
        interaction[i] = learner.interactions[i].id + "-" + learner.interactions[i].response + "-" + learner.interactions[i].result;
    }
    suspendData[13] = interaction.join("|");
    suspendData[14] = convertJsonToComment();

    return suspendData.join("##");
}

/******************************************************************************************
 * Function: convertSuspendDataToJson
 ******************************************************************************************/
convertSuspendDataToJson = function (str) {
    var suspendData = new Array();
    suspendData = str.split("##");
    learner.name = suspendData[0];
    learner.id = suspendData[1];

    var strLocation = suspendData[2];
    if (strLocation != "" && strLocation != undefined) {
        var loc = strLocation.split("|");
        learner.location.current = loc[0];
        learner.location.furthest = loc[1];
        learner.location.activityPassed = loc[2];
        learner.location.furthestTopic = loc[3];
        learner.location.languageCharType = loc[5];
        learner.location.raw = suspendData[2];
    }
    if (suspendData[3] != "" && suspendData[3] != undefined) {
        var examArray = suspendData[3].split("|");
        for (i = 0; i < examArray.length; i++) {
            if (examArray[i] !== "" && examArray[i] != undefined) {
                var examListArray = examArray[i].split("-");
                learner.exam.push({
                    "questionSelection": examListArray[1],
                    "percentage": examListArray[0]
                });
            }
        }
    }
    learner.language = suspendData[4];
    learner.languageCharType = suspendData[5];
    learner.caption = suspendData[6];
    learner.volume = suspendData[7];
    learner.entryMode = suspendData[8];
    learner.exitMode = suspendData[9];
    learner.score = suspendData[10];
    learner.completionStatus = suspendData[11];
    learner.successStatus = suspendData[12];
    if (suspendData[13] != "" && suspendData[13] != undefined) {
        var interactionsArray = suspendData[13].split("|");
        for (i = 0; i < interactionsArray.length; i++) {
            var interaction = interactionsArray[i].split("-");
            learner.interactions.push({
                "id": interaction[0],
                "response": interaction[1],
                "result": interaction[2],
                "answer" : getSelectedAnswer[1],
                "question": "",
                "type": "other",
                "examQuestion": "false",
                "askExpert": "false",
                "questionId": "0",
                "questionType": "Single",
                "timeStamp": ""
            });
        }
    }

    if (suspendData[14] != "" && suspendData[14] != undefined) {
        convertCommentToJson(suspendData[14])
    }
}

/******************************************************************************************
 * Function: convertJsonToComment
 ******************************************************************************************/
convertJsonToComment = function () {
    var comments = new Array();
    for (i = 0; i < learner.comments.length; i++) {
        if (learner.comments[i].response != "" && learner.comments[i].response !== undefined) {
            comments[i] = learner.comments[i].id + "---" + encodeComment(learner.comments[i].response);
        } else {
            comments[i] = learner.comments[i].id + "---" + "";
        }
    }
    return comments.join("|");
}

/******************************************************************************************
 * Function: convertCommentToJson
 ******************************************************************************************/
convertCommentToJson = function (str) {
    var commentArray = new Array();
    commentArray = str.split("|");
    for (i = 0; i < commentArray.length; i++) {
        var comments = commentArray[i].split("---");
        learner.comments.push({
            "id": comments[0],
            "response": decodeComment(comments[1])
        });
    }
}

/******************************************************************************************
 * Function: encodeComment
 ******************************************************************************************/
encodeComment = function (str) {
    str = str.replace(/(\r\n|\n|\r)/gm, "-br-");
    str = str.replace(/\s+/g, "-space-");
    str = str.replace(/##/g, "");
    str = str.replace(/---/g, "");
    str = str.replace(/|/g, "");
    return str;
}

/******************************************************************************************
 * Function: decodeComment
 ******************************************************************************************/
decodeComment = function (str) {
    str = str.replace(/-br-/g, "\n");
    str = str.replace(/-space-/g, " ");
    return str;
}

/******************************************************************************************
 * Function: getParameterByName from url
 ******************************************************************************************/
getParameterByName = function (name) {
    var match = RegExp('[?&]' + name + '=([^&]*)').exec(window.location.search);
    return match && decodeURIComponent(match[1].replace(/\+/g, ' '));
}

/******************************************************************************************
 * Function: getSeletected Answer
 ******************************************************************************************/
getSelectedAnswer = function (value) {
    var selectedAnswer = value.split(",");
    var answersLetter = ["A","B","C","D","E","F","G","H","I","j","K","L","M","N","O","p"];
    var selectedAnswerValue = [];
    for (i = 0; i < selectedAnswer.length; i++) {
        if (selectedAnswer[i] == 1) {
            selectedAnswerValue.push(answersLetter[i]);
        }
    }
    return 	selectedAnswerValue.join(",");
}
