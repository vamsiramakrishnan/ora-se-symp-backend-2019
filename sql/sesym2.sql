/* To be run after login as SESYM user */
/* UserTable */
CREATE TABLE userTable 
    (ID           VARCHAR2 (255) , 
     userName     VARCHAR2 (255)  NOT NULL , 
     hash         VARCHAR2 (255)  NOT NULL , 
     firstName    VARCHAR2 (255)  NOT NULL , 
     lastName     VARCHAR2 (255)  NOT NULL , 
     userMetadata VARCHAR2 (4000) , 
     createdAt    TIMESTAMP  NOT NULL , 
     modifiedAt   TIMESTAMP  NOT NULL , 
     numlogins         NUMBER (*,0)  NOT NULL);


CREATE UNIQUE INDEX userTable_IDX ON userTable 
    (userName ASC 
    );

CREATE UNIQUE INDEX USERTABLE_PK ON userTable 
    (ID ASC 
    );

ALTER TABLE userTable 
    ADD CONSTRAINT USERTABLE_PK PRIMARY KEY ( ID ) 
    USING INDEX USERTABLE_PK ;

ALTER TABLE userTable 
    ADD UNIQUE ( userName ) 
    USING INDEX userTable_IDX;

ALTER TABLE userTable 
    ADD CONSTRAINT isUserMetadataJSON 
    CHECK ( userMetadata IS JSON);

/*CheckInTable*/

CREATE TABLE checkInTable 
    (ID        VARCHAR2 (255) , 
     userID    VARCHAR2 (255)  NOT NULL , 
     latLon    VARCHAR2 (4000)  NOT NULL , 
     createdAt TIMESTAMP  NOT NULL);

CREATE UNIQUE INDEX CHECKINTABLE_PK ON checkInTable (ID ASC);

ALTER TABLE checkInTable 
    ADD CONSTRAINT CHECKINTABLE_PK PRIMARY KEY ( ID ) 
    USING INDEX CHECKINTABLE_PK ;

ALTER TABLE checkInTable DROP CONSTRAINT checkInTable_fk0;

ALTER TABLE checkInTable 
    ADD CONSTRAINT checkInTable_fk0 FOREIGN KEY 
    ( 
    userid
    ) 
    REFERENCES userTable 
    ( 
    ID 
    ) 
    NOT DEFERRABLE 
;

/* PostTable */
CREATE TABLE postTable 
    ( 
     ID             VARCHAR2 (255) , 
     authorID     VARCHAR2 (255)  NOT NULL , 
     postMetadata VARCHAR2 (4000)  NOT NULL , 
     isDeleted    CHAR (1)  NOT NULL , 
     createdAt    TIMESTAMP  NOT NULL , 
     modifiedAt   TIMESTAMP  NOT NULL 
    );

ALTER TABLE postTable 
    ADD CONSTRAINT isPosttMetadataJSON 
    CHECK ( postMetadata IS JSON);

ALTER TABLE postTable 
    ADD 
    CHECK ( isDeleted IN ('N','Y'));

CREATE UNIQUE INDEX POSTTABLE_PK ON postTable 
    ( 
     ID ASC 
    );

ALTER TABLE postTable 
    ADD CONSTRAINT POSTTABLE_PK PRIMARY KEY ( ID ) 
    USING INDEX POSTTABLE_PK ;

ALTER TABLE postTable DROP CONSTRAINT postTable_fk0;

ALTER TABLE postTable 
    ADD CONSTRAINT postTable_fk0 FOREIGN KEY 
    ( 
    authorID
    ) 
    REFERENCES userTable 
    ( 
    ID 
    ) 
    NOT DEFERRABLE 
;

/* CommentsTable */
CREATE TABLE commentsTable 
    ( 
     ID              VARCHAR2 (255) , 
     authorID        VARCHAR2 (255)  NOT NULL , 
     postID          VARCHAR2 (255)  NOT NULL , 
     commentMetadata VARCHAR2 (4000)  NOT NULL , 
     isDeleted       CHAR (1)  NOT NULL , 
     createdAt       TIMESTAMP  NOT NULL , 
     modifiedAt      TIMESTAMP  NOT NULL 
    );

ALTER TABLE commentsTable 
    ADD CONSTRAINT isCommentMetadataJSON
    CHECK ( commentMetadata IS JSON);

ALTER TABLE commentsTable 
    ADD 
    CHECK ( isDeleted IN ('N','Y'));


CREATE UNIQUE INDEX COMMENTSTABLE_PK ON commentsTable 
    ( 
     ID ASC 
    );

ALTER TABLE commentsTable 
    ADD CONSTRAINT COMMENTSTABLE_PK PRIMARY KEY ( ID ) 
    USING INDEX COMMENTSTABLE_PK ;

ALTER TABLE commentsTable DROP CONSTRAINT commentsTable_fk0;

ALTER TABLE commentsTable 
    ADD CONSTRAINT commentsTable_fk0 FOREIGN KEY 
    ( 
   authorid
    ) 
    REFERENCES userTable 
    ( 
    ID 
    ) 
    NOT DEFERRABLE;

ALTER TABLE commentsTable DROP CONSTRAINT commentsTable_fk1;

ALTER TABLE commentsTable 
    ADD CONSTRAINT commentsTable_fk1 FOREIGN KEY 
    ( 
    postID
    ) 
    REFERENCES postTable 
    ( 
    ID 
    ) 
    NOT DEFERRABLE;

/* EventsTable */
CREATE TABLE eventsTable 
    ( 
     ID              VARCHAR2 (255) , 
     eventName     VARCHAR2 (255)  NOT NULL , 
     eventMetadata VARCHAR2 (4000)  NOT NULL 
    );

ALTER TABLE eventsTable 
    ADD CONSTRAINT isJSON 
    CHECK ( eventMetadata IS JSON);

CREATE UNIQUE INDEX EVENTSTABLE_PK ON eventsTable 
    ( 
     ID ASC 
    );

CREATE UNIQUE INDEX eventsTable_IDX ON eventsTable 
    ( 
     eventName ASC 
    );

ALTER TABLE eventsTable 
    ADD CONSTRAINT EVENTSTABLE_PK PRIMARY KEY ( ID ) 
    USING INDEX EVENTSTABLE_PK ;

ALTER TABLE eventsTable 
    ADD UNIQUE ( eventName ) 
    USING INDEX eventstable_IDX;

/* eventattendancetable */

CREATE TABLE eventAttendanceTable 
    ( 
     ID           VARCHAR2 (255) , 
     eventID    VARCHAR2 (255)  NOT NULL , 
     attendeeID VARCHAR2 (255)  NOT NULL , 
     createdAt  TIMESTAMP  NOT NULL 
    );


CREATE UNIQUE INDEX EVENTATTENDANCETABLE_PK ON eventAttendanceTable 
    ( 
     ID ASC 
    );

ALTER TABLE eventAttendanceTable 
    ADD CONSTRAINT EVENTATTENDANCETABLE_PK PRIMARY KEY ( ID ) 
    USING INDEX EVENTATTENDANCETABLE_PK;

ALTER TABLE eventAttendanceTable DROP CONSTRAINT eventAttendanceTable_fk0;

ALTER TABLE eventAttendanceTable 
    ADD CONSTRAINT eventAttendanceTable_fk0 FOREIGN KEY 
    ( 
    eventID
    ) 
    REFERENCES eventsTable 
    ( 
    ID 
    ) 
    NOT DEFERRABLE;

ALTER TABLE eventAttendanceTable DROP CONSTRAINT eventAttendanceTable_fk1;

ALTER TABLE eventAttendanceTable 
    ADD CONSTRAINT eventAttendanceTable_fk1 FOREIGN KEY 
    ( 
    attendeeID
    ) 
    REFERENCES userTable 
    ( 
    ID 
    ) 
    NOT DEFERRABLE;

/* eventfeedbacktable */

CREATE TABLE eventFeedBackTable 
    ( 
     ID               VARCHAR2 (255) , 
     eventID          VARCHAR2 (255)  NOT NULL , 
     feedBackUserID   VARCHAR2 (255)  NOT NULL , 
     feedBackMetadata VARCHAR2 (4000)  NOT NULL , 
     createdAt        TIMESTAMP  NOT NULL 
    );

ALTER TABLE eventFeedBackTable 
    ADD CONSTRAINT isJSON 
    CHECK ( eventFeedBackTable IS JSON);

CREATE UNIQUE INDEX EVENTFEEDBACKTABLE_PK ON eventFeedBackTable 
    ( 
     ID ASC 
    );

ALTER TABLE eventFeedBackTable 
    ADD CONSTRAINT EVENTFEEDBACKTABLE_PK PRIMARY KEY ( ID ) 
    USING INDEX EVENTFEEDBACKTABLE_PK ;

ALTER TABLE eventFeedBackTable DROP CONSTRAINT eventFeedBackTable_fk0;

ALTER TABLE eventFeedBackTable 
    ADD CONSTRAINT eventFeedBackTable_fk0 FOREIGN KEY 
    ( 
    eventID
    ) 
    REFERENCES eventsTable 
    ( 
    ID 
    ) 
    NOT DEFERRABLE 
;

ALTER TABLE eventFeedBackTable DROP CONSTRAINT eventFeedBackTable_fk1;

ALTER TABLE eventFeedBackTable 
    ADD CONSTRAINT eventFeedBackTable_fk1 FOREIGN KEY 
    ( 
    feedbackUserID
    ) 
    REFERENCES userTable 
    ( 
    ID 
    ) 
    NOT DEFERRABLE;

/* eventregistrationtable */

CREATE TABLE eventRegistrationTable 
    ( 
     ID             VARCHAR2 (255) , 
     registereeID VARCHAR2 (255)  NOT NULL , 
     eventID      VARCHAR2 (255)  NOT NULL , 
     isDeleted    CHAR (1)  NOT NULL , 
     createdAt    TIMESTAMP  NOT NULL 
    );


CREATE UNIQUE INDEX EVENTREGISTRATIONTABLE_PK ON eventRegistrationTable 
    ( 
     ID ASC 
    );

ALTER TABLE eventRegistrationTable 
    ADD CONSTRAINT EVENTREGISTRATIONTABLE_PK PRIMARY KEY ( ID ) 
    USING INDEX EVENTREGISTRATIONTABLE_PK ;

ALTER TABLE eventRegistrationTable DROP CONSTRAINT eventRegistrationTable_fk0;

ALTER TABLE eventRegistrationTable 
    ADD CONSTRAINT eventRegistrationTable_fk0 FOREIGN KEY 
    ( 
    registereeID
    ) 
    REFERENCES userTable 
    ( 
    ID 
    ) 
    NOT DEFERRABLE 
;

ALTER TABLE eventRegistrationTable 
    ADD 
    CHECK ( isDeleted IN ('N','Y'));

ALTER TABLE eventRegistrationTable DROP CONSTRAINT eventRegistrationTable_fk1;

ALTER TABLE eventRegistrationTable 
    ADD CONSTRAINT eventRegistrationTable_fk1 FOREIGN KEY 
    ( 
    eventID
    ) 
    REFERENCES eventsTable 
    ( 
    ID 
    ) 
    NOT DEFERRABLE 
;



/* LikesTable */ 


CREATE TABLE likesTable 
    ( 
     ID          VARCHAR2 (255) , 
     authorID  VARCHAR2 (255)  NOT NULL , 
     postID    VARCHAR2 (255)  NOT NULL , 
     isDeleted    CHAR (1)  NOT NULL , 
     createdAt TIMESTAMP  NOT NULL 
    );


CREATE UNIQUE INDEX LIKESTABLE_PK ON likesTable 
    ( 
     ID ASC 
    );

ALTER TABLE likesTable 
    ADD CONSTRAINT LIKESTABLE_PK PRIMARY KEY ( ID ) 
    USING INDEX LIKESTABLE_PK ;

ALTER TABLE eventRegistrationTable 
    ADD 
    CHECK ( isDeleted IN ('N','Y'));

ALTER TABLE likesTable DROP CONSTRAINT likesTable_fk0;

ALTER TABLE likesTable 
    ADD CONSTRAINT likesTable_fk0 FOREIGN KEY 
    ( 
    authorID
    ) 
    REFERENCES userTable 
    ( 
    ID 
    ) 
    NOT DEFERRABLE;

ALTER TABLE likesTable DROP CONSTRAINT likesTable_fk1;

ALTER TABLE likesTable 
    ADD CONSTRAINT likesTable_fk1 FOREIGN KEY 
    ( 
    postID
    ) 
    REFERENCES postTable 
    ( 
    ID 
    ) 
    NOT DEFERRABLE;

/* networkingtable */

CREATE TABLE networkingTable 
    ( 
     ID            VARCHAR2 (255) , 
     requestorID VARCHAR2 (255)  NOT NULL , 
     acceptorID  VARCHAR2 (255)  NOT NULL , 
     createdAt   TIMESTAMP  NOT NULL 
    );


CREATE UNIQUE INDEX NETWORKINGTABLE_PK ON networkingTable 
    ( 
     ID ASC 
    );

ALTER TABLE networkingTable 
    ADD CONSTRAINT NETWORKINGTABLE_PK PRIMARY KEY ( ID ) 
    USING INDEX NETWORKINGTABLE_PK ;
ALTER TABLE networkingTable DROP CONSTRAINT networkingTable_fk0;

ALTER TABLE networkingTable 
    ADD CONSTRAINT networkingTable_fk0 FOREIGN KEY 
    ( 
    requestorID
    ) 
    REFERENCES userTable 
    ( 
    ID 
    ) 
    NOT DEFERRABLE;

ALTER TABLE networkingTable DROP CONSTRAINT networkingTable_fk1;

ALTER TABLE networkingTable 
    ADD CONSTRAINT networkingTable_fk1 FOREIGN KEY 
    ( 
    acceptorID
    ) 
    REFERENCES userTable 
    ( 
    ID 
    ) 
    NOT DEFERRABLE 
;

commit;