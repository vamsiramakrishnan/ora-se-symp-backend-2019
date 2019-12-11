# ora-se-symposium-back-end

GraphQL + Join Monster + ATP backend based on Nodejs for the Social network built for SE-Symposium, 2019. 

## Overall Structure of Deployment

                                                            +-----------------+
                                                            |                 |
                                                            | OCI-Object Storage
                                                            |                 |
                                                            +-----------------+

                      +-------------------------------------------------------------------------+
                      |                                                                         |
                      |                                                                         |
                      |                                                                         |
                      |                                                                         |
                      |   Public - Subnet    Private- Subnet                                    |
    +---------------+ |                                                                         |
    | OCI-DNS       | | +---------------+    +---------------+  +------------+ +---------------+|
    |---------------| | | OCI - Load Bal.    |OCI- Kubernetes|  |OCI- SG     | |OCI- ATP       ||
    |               | | |---------------|    |---------------|  |------------| |---------------||
    |               | | |               |    | Managed       |  |Service     | |Autonomous     ||
    |  Managed      +---> Managed       +----> Multi-Master  +-->Gateway     +->Scalable       ||
    |  Scalable     | | | HA            |    | Integrated    |  |            | |Auto Patching  ||
    |  Distributed  | | | Scalable      |    | Secure        |  |Private Access|Auto Perf. Opt ||
    |               | | |               |    | Distributed   |  |            | |               ||
    +---------------+ | +---------------+    +---------------+  +------------+ +---------------+|
                      |                                                                         |
                      |                                                                         |
                      |                                         OCI- Virtual Cloud Network      |
                      +-------------------------------------------------------------------------+


## About the Data Model 

1. Users
2. Posts
3. Likes
4. Comments
5. Events 
6. Quizzes

### An Example of viewing a subset of this model 
                                   +-----------------+
                                   | Likes Table     |
                                   |-----------------|
                           +-------> likeID          |
                           |       | postID          |
                           |       +-----------------+
           +---------------+       +------------------+
           |   Users table |       | Posts Table      |         + JSON Columns are Documents
           |---------------|       |------------------|
           | UserID        |       |  PostID          |           Documents are Standalone
           | UserName      |       |  UserID          |
           | UserMetadata(JSON)    |  PostMetadata(JSON)          Document Content Queryable
           | Hash          +------>|  isDeleted       |
           | CreatedAt     |       |  CreatedAt       |           SQL Dot Notation
           | ModifiedAt    |       |  ModifiedAt      |
           | numLogins     |       |                  |           Tables have Relationships
           |               |       |                  |
           +---------------+       +------------------+           Typical Social Media Graph
                           |
                           |       +------------------+           Not Suitable for REST
                           |       | Comments Table   |
                           |       |------------------|           View Generation has to be flexible
                           |       |  CommentID       |
                           +------->  PostID          |
                                   |  UserID          |
                                   |  CommentMetadata(JSON)
                                   |  isDeleted       |
                                   |  createdAt       |
                                   +------------------+

## About Components 

### Role of GraphQL
* Single Endpoint to flexibly consume all the elements of the data model, without iterating through individual URLs , with pagination Support.



                                       +----------------------------------------------+
                                       |                           Kubernetes Pod     |
                                       |                                              |
                                       |                                              |
                                       |                           +-----------+      |
                                       |                     +-----+           |      |
                         +--+---+      |                     |     | User      |      |
                         |      |      |                     |     +-----------+      |
                         |  L   |      |  +------------------+                        |
                         |  O   |      |  | GraphQL-EndPoint |     +-----------+      |
                         |  A   |      |  |------------------|     |           |      |
                         |  D   |      |  | Single URL       +-----+ Post      |      |
             End         |      |      |  | Resolves to      |     +-----------+      |
             Users------>|  B   +------>  | -> user          +                        |
                         |  A   |      |  | -> Comment       |     +-----------+      |
                         |  L   |      |  | -> Post          +-----+ Comment   |      |
                         |  A   |      |  | -> Event Etc.    |     |           |      |
                         |  N   |      |  |                  +     +-----------+      |
                         |  C   |      |  +------------------|                        |
                         |  E   |      |                     |     +-----------+      |
                         +--R---+      |                     +-----+           |      |
                                       |                           |  Like     |      |
                                       |                           +-----------+      |
                                       |                                              |
                                       +----------------------------------------------+

### Role of Join Monster
* Convert the GraphQL Query Dynamically to a SQL Query as and when the front end changes. 

### Role of ATP 
* Act as a highly scalable Social Network Persistence layer with autoscaling enabled, supporting both structured and unstructured data. 

## For Feature Requests
* Use the Feature Request Template 

## First Release for K8S
