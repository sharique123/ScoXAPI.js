/* VERSION 1.2
 * Free to use
 */
(function ($) {
    var _sid = getUrlVar('AICC_SID');
    var _url = getUrlVar('AICC_URL');
    var methods = {
        init: function (p) {
            alert('Error : no AICC values');
        },
        get: function (p) {
            $.get(_url, {
                command: "GetParam",
                version: "2.2",
                session_id: _sid
            }, function (r) {
                (typeof p == 'function') ? p.call(this, ParseGetParamData(r)) : null;
            });
        },
        put: function (p, callback) {
            var _aicc = '';
            for (var i in p) {
                switch (i) {
                case 'score':
                    (p[i] != '') ? _aicc += i + '=' + p[i] + '\n' : null;
                    break;
                case 'lesson_location':
                    (p[i] != '') ? _aicc += i + '=' + p[i] + '\n' : null;
                    break;
                case 'time':
                    (p[i] != '') ? _aicc += i + '=' + p[i] + '\n' : null;
                    break;
                case 'lesson_status':
                    (p[i] != '') ? _aicc += i + '=' + p[i] + '\n' : null;
                    break;
                case 'credit':
                    (p[i] != '') ? _aicc += i + '=' + p[i] + '\n' : null;
                    break;
                case 'core_lesson':
                    (p[i] != '') ? _aicc += i + '=' + p[i] + '\n' : null;
                    break;
                }
            }
            $.post(_url, {
                command: "PutParam",
                version: "2.2",
                session_id: _sid,
                aicc_data: "[CORE]\n" + _aicc
            }, function (r) {
                (typeof callback == 'function') ? callback.call(this, ParseGetParamData(r)) : null;
            });
        }
    };

    function getUrlVar(urlVar) {
        var match = RegExp('[?&]' + urlVar + '=([^&]*)').exec(window.location.search);
        return unescape(match && decodeURIComponent(match[1].replace(/\+/g, ' ')));
    }


    function ParseGetParamData(strLMSResult) {
        var learner = {};

        var aryAICCResponseLines;
        var strLine;
        var strLineName;
        var strLineValue;
        var i, j;

        //parse LMS Result into local variables

        strLMSResult = new String(strLMSResult);
        aryAICCResponseLines = strLMSResult.split("\n"); //only use \n instead of \r\n b/c some LMS's will only use one character


        for (i = 0; i < aryAICCResponseLines.length; i++) {

            strLine = aryAICCResponseLines[i];

            strLineName = "";
            strLineValue = "";

            if (strLine.length > 0) {


                //remove \r from the beginning or end of the string in case we missed it in the original array split
                if (strLine.charAt(0) == "\r") {
                    strLine = strLine.substr(1);
                }
                if (strLine.charAt(strLine.length - 1) == "\r") {
                    strLine = strLine.substr(0, strLine.length - 1);
                }

                if (strLine.charAt(0) != ";") { //semi-colon indicates a comment line, ignore these
                    strLineName = GetNameFromAICCLine(strLine);
                    strLineValue = GetValueFromAICCLine(strLine);
                }
            }

            strLineName = strLineName.toLowerCase();

            switch (strLineName) {
			
			case "error":
                learner.error = strLineValue;
                break;
				
			case "version":
                var tempVersion = parseFloat(strLineValue);

                if (isNaN(tempVersion)) {
                    tempVersion = 0;
                }

                learner.version = tempVersion;
                break;

            case "student_id":

                learner.id = strLineValue;
                break;

            case "student_name":
                learner.name = strLineValue;
                break;

            case "lesson_location":
                learner.location = strLineValue;
                break;

            case "score":
                learner.score = strLineValue;

                break;

            case "credit":
                learner.credit = strLineValue;
                break;

            case "lesson_status":
                learner.status = strLineValue;
                break;

            case "time":
                learner.time = strLineValue;
                break;

            case "mastery_score":
                learner.masteryScore = strLineValue;
                break;

            case "lesson_mode": //lesson mode (browse, normal, review)
                learner.mode = strLineValue;
                break;

            case "max_time_allowed":
                learner.timeAllowed= strLineValue;
                break;

            case "time_limit_action":
                learner.timeLimitAction = strLineValue;
                break;

            case "audio":
                learner.audio = strLineValue;
                break;

            case "speed":
                learner.speed = strLineValue;
                break;

            case "language":
                learner.language = strLineValue;
                break;

            case "text":
                learner.text = strLineValue;
                break;

            case "course_id":
                learner.courseId = strLineValue;
                break;

            case "core_vendor":
                AICC_Launch_Data = "";

                strLine = "";
                j = 1;

                if ((i + j) < aryAICCResponseLines.length) {
                    strLine = aryAICCResponseLines[i + j];
                }

                //loop to the end of the file or current group
                while (((i + j) < aryAICCResponseLines.length) && (!IsGroupIdentifier(strLine))) {

                    if (strLine.charAt(0) != ";") {
                        AICC_Launch_Data += strLine + "\n"; //add \n to make up for the one we dropped when splitting the string into the array
                    }

                    j = j + 1;

                    if ((i + j) < aryAICCResponseLines.length) {
                        strLine = aryAICCResponseLines[i + j];
                    }
                }

                i = i + j - 1

                learner.launchData = AICC_Launch_Data.replace(/\s*$/, ""); //replace trailing whitespace (we've added an extra \n to the end of the string)

                break;

            case "core_lesson":
                AICC_Data_Chunk = "";

                strLine = "";
                j = 1;

                if ((i + j) < aryAICCResponseLines.length) {
                    strLine = aryAICCResponseLines[i + j];
                }

                //loop to the end of the file or current group
                while (((i + j) < aryAICCResponseLines.length) && (!IsGroupIdentifier(strLine))) {

                    if (strLine.charAt(0) != ";") {
                        AICC_Data_Chunk += strLine + "\n"; //add \n to make up for the one we dropped when splitting the string into the array
                    }

                    j = j + 1;

                    if ((i + j) < aryAICCResponseLines.length) {
                        strLine = aryAICCResponseLines[i + j];
                    }
                }

                i = i + j - 1

                learner.suspendData = AICC_Data_Chunk.replace(/\s*$/, ""); //replace trailing whitespace (we've added an extra \n to the end of the string)		
                break;

            case "comments":
                AICC_Comments = "";

                strLine = "";
                j = 1;

                if ((i + j) < aryAICCResponseLines.length) {
                    strLine = aryAICCResponseLines[i + j];
                }

                //loop to the end of the file or current group
                while (((i + j) < aryAICCResponseLines.length) && (!IsGroupIdentifier(strLine))) {

                    if (strLine.charAt(0) != ";") {
                        AICC_Comments += strLine + "\n"; //add \n to make up for the one we dropped when splitting the string into the array
                    }

                    j = j + 1;

                    if ((i + j) < aryAICCResponseLines.length) {
                        strLine = aryAICCResponseLines[i + j];
                    }
                }

                i = i + j - 1

                learner.comments = AICC_Comments.replace(/\s*$/, ""); //replace trailing whitespace (we've added an extra \n to the end of the string)

                break;

            case "objectives_status":

                AICC_Objectives = "";

                strLine = "";
                j = 1;

                if ((i + j) < aryAICCResponseLines.length) {
                    strLine = aryAICCResponseLines[i + j];
                }


                //loop to the end of the file or current group
                while (((i + j) < aryAICCResponseLines.length) && (!IsGroupIdentifier(strLine))) {

                    if (strLine.charAt(0) != ";") {
                        AICC_Objectives += strLine + "\n"; //add \n to make up for the one we dropped when splitting the string into the array		
                    }

                    j = j + 1;

                    if ((i + j) < aryAICCResponseLines.length) {
                        strLine = aryAICCResponseLines[i + j];
                    }
                }

                i = i + j - 1
                learner.objective = AICC_Objectives.replace(/\s*$/, ""); //replace trailing whitespace (we've added an extra \r\n to the end of the string)		

                break;

            default:
                break;
            }
        }
        return learner;
    }


    function GetValueFromAICCLine(strLine) {
        var intPos;
        var strValue = "";
        var strTemp;

        strLine = new String(strLine);

        intPos = strLine.indexOf("=");

        if (intPos > -1 && ((intPos + 1) < strLine.length)) {

            strTemp = strLine.substring(intPos + 1);

            strTemp = strTemp.replace(/^\s*/, ""); //replace leading whitespace
            strTemp = strTemp.replace(/\s*$/, ""); //replace trailing whitespace

            strValue = strTemp;
        }

        return strValue;

    }

    function GetNameFromAICCLine(strLine) {

        var intPos;
        var strTemp;

        var strName = "";

        strLine = new String(strLine);

        intPos = strLine.indexOf("=");

        if (intPos > -1 && intPos < strLine.length) {

            strTemp = strLine.substring(0, intPos);

            strTemp = strTemp.replace(/^\s*/, "");
            strTemp = strTemp.replace(/\s*$/, "");

            strName = strTemp;
        } else {

            intPos = strLine.indexOf("[");

            if (intPos > -1) {

                strTemp = strLine.replace(/[\[|\]]/g, ""); //replace the square brackets

                strTemp = strTemp.replace(/^\s*/, ""); //replace leading whitespace
                strTemp = strTemp.replace(/\s*$/, ""); //replace trailing whitespace

                strName = strTemp;
            }

        }

        return strName;
    }


    function IsGroupIdentifier(strLine) {

        var intPos;

        //remove leading white space
        strLine = strLine.replace(/^\s*/, "");

        intPos = strLine.search(/\[[\w]+\]/);

        if (intPos == 0) {
            return true;
        } else {
            return false;
        }
    }

	function LTrim(str) {
		str = new String(str);
		return (str.replace(/^\s+/, ''));
	}

	function RTrim(str) {
		str = new String(str);
		return (str.replace(/\s+$/, ''));
	}

	function Trim(strToTrim) {
		var str = LTrim(RTrim(strToTrim));
		return (str.replace(/\s{2,}/g, " "));
	}

    $.aicc = function (method) {
        if (methods[method]) {
            return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
        } else if (typeof method === 'object' || !method) {
            return methods.init.apply(this, arguments);
        } else {
            alert('Error : no authorized AICC values, check to see if you have a \'get\' or \'post\'');
        }
    };
})(jQuery);