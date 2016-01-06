# ScoXAPI.js
E-Learning course connection to LMS.

Currently, there are three primary methods of tracking lesson data back to a centralized storage site and database. There are ultimately more than that, which I’ll mention at the end, but first is an overview of the top three methods for tracking eLearning progress and interaction.


AICC

Arguably the first eLearning standard. Developed by the “Aviation Industry CBT Committee” (AICC), this standard is fairly well entrenched. Quite a few companies with some history behind them still primarily support the AICC standard within their products (i.e. Plateau > SuccessFactors, Skillsoft, Captivate, Presenter, etc.). Per the AICC Wikipedia article,

“AICC specifications are usually designed to be general purpose (not necessarily Aviation Specific) so that learning technology vendors can spread their costs across multiple markets and thus provide products (needed by the Aviation Industry) at a lower cost. This strategy has resulted in AICC specifications having broad acceptance and relevance to non-aviation and aviation users alike.”

The AICC standard has gone through several revisions to keep pace early on but has not been updated in over a decade. AICC has several sub-specifications (AGRs) to address various types of media, so there can actually be at least 7 different levels of AICC compliance. However, the only one of significant relevance today is AGR CMI001, also known as AICC-HACP, being the most recently updated and, by using direct POST capabilities, avoiding Javascript cross-domain issues inherent with the SCORM API (detailed discussion on the AICC forum).

SCORM

While the AICC specification may have stagnated, it provided the groundwork for the next significant spec: SCORM (Sharable Content Object Reference Model). Championed by the Advanced Distributed Learning (ADL) group, AICC formed a close relationship to work through this next evolution. Per the SCORM Wikipedia entry,

“SCORM is a collection of standards and specifications for web-based e-learning. It defines communications between client side content and a host system (called “the run-time environment”), which is commonly supported by a learning management system. SCORM also defines how content may be packaged into a transferable ZIP file…”

The AICC basis for SCORM can be seen deeper in the specification with the preface of ‘cmi.’ for most all the spec’s functions and variables.

There currently exist two primary versions of SCORM, 1.2 and 2004. Being an older, more simple standard, there is fairly wide support for version 1.2 across most authoring and LMS products. A large subset of that group, however, does support at least some ‘edition’ of the 2004 specification.

SCORM is fairly well entrenched due to its longevity…and thus being the primary specification which most tools and LMS products have incorporated. While there are certainly areas for improvement, the specification is rarely used to its full potential and is largely used as a simple means of tracking a user’s progress and score within an eLearning course. However, with the growth of mobile devices, one significant restriction has become more critical – the requirement that the content be launched from a SCORM-compliant, web-based application.

xAPI

Otherwise known by its working name, TinCan, the Experience API (xAPI) specification is also managed by the ADL and is slowly gathering steam, hitting version 1.0 in April, 2013. The specification is young but promising. While it frees the content from the tie-in to a direct web application launch and a restrictive set of tracking parameters…it is very much a different specification from SCORM and carries with it new concerns. Per the xAPI Wikipedia page,

The Experience API “is an e-learning software specification that allows learning content and learning systems to speak to each other in a manner that records and tracks all types of learning experiences. Learning experiences are recorded in a Learning Record Store (LRS). LRSs can exist within traditional Learning Management Systems (LMSs) or on their own.”

It is interesting to watch xAPI mature and be integrated with LMS products, or new standalone LRS products, as well as how useful it is in increasing the assessment of user’s learning paths, preferences, and growth – especially in considerations of how easy it will be to track almost any online activity. Have privacy concerns about xAPI’s ability to be implemented everywhere? Unsure how to report on the ‘actor, verb, object’ data when it’s not strictly defined? Stay tuned…
