# ScoXapi.js
E-Learning course communication to LMS.

There are three major method of tracking learner's lesson data to a Learning management systems.

##AICC

Arguably the first eLearning standard. Developed by the “Aviation Industry CBT Committee” (AICC), this standard is still currently in use. Quite a few companies with some history behind them still primarily support the AICC standard within their products (i.e. Plateau SuccessFactors, Skillsoft, Captivate, Presenter, etc.)

There are two flavours of AICC are AICC-HACP and AICC-API of which AICC-HACP is widely used by using direct POST capabilities and the other later is very similiar to Scorm which hadly used today after Scorm became the standard.

##SCORM

While the AICC specification may have stagnated, it provided the groundwork for the next significant spec: SCORM (Sharable Content Object Reference Model). 

“SCORM is a collection of standards and specifications for web-based e-learning. It defines communications between client side content and a host system (called “the run-time environment”), which is commonly supported by a learning management system. SCORM also defines how content may be packaged into a transferable ZIP file…”

There currently exist two primary versions of SCORM, 1.2 and 2004. Being an older, more simple standard, there is fairly wide support for version 1.2 across most authoring and LMS products. A large subset of that group, however, does support at least some ‘edition’ of the 2004 specification.

SCORM is fairly well entrenched due to its longevity…and thus being the primary specification which most tools and LMS products have incorporated. While there are certainly areas for improvement, the specification is rarely used to its full potential and is largely used as a simple means of tracking a user’s progress and score within an eLearning course. However, with the growth of mobile devices, one significant restriction has become more critical – the requirement that the content be launched from a SCORM-compliant, web-based application.

##xAPI
Otherwise known by its working name, TinCan, the Experience API (xAPI) specification is also managed by the ADL and is slowly gathering steam, hitting version 1.0 in April, 2013. The specification is young but promising. While it frees the content from the tie-in to a direct web application launch and a restrictive set of tracking parameters…it is very much a different specification from SCORM and carries with it new concerns.

The Experience API “is an e-learning software specification that allows learning content and learning systems to speak to each other in a manner that records and tracks all types of learning experiences. Learning experiences are recorded in a Learning Record Store (LRS). LRSs can exist within traditional Learning Management Systems (LMSs) or on their own.”

#ScoXapi

This javascript api will allow to call set of function and the api will communicate with respective LMS.

Example

* Initialize.
* SetLanguage
* SetCaption
* SetAudio
* SetIncomplete
* SetComplete
* SetScore.
* SetInteraction
* SetComment
* Terminate.



