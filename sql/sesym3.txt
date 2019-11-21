/* To be run after login as SESYM user */
/* Drop Table Script */

drop TABLE userTable cascade constraints;
drop TABLE checkInTable cascade constraints;
drop TABLE postTable cascade constraints;
drop TABLE commentsTable cascade constraints;
drop TABLE eventsTable cascade constraints;
drop TABLE eventAttendanceTable cascade constraints;
drop TABLE eventFeedBackTable cascade constraints;
drop TABLE eventRegistrationTable cascade constraints;
drop TABLE likesTable cascade constraints;
drop TABLE networkingTable cascade constraints;
commit;
