---
title: "Thử thách 100 ngày viết dự án"
date: 2025-12-04 17:00:00 +0700
layout: post
categories: blog
image: 
tags: [ 100days,part-1]
---


Bài viết đầu tiên — Chào mừng đến với blog!
<!--more-->

# Thử thách 100 ngày viết dự án

- dạo gần đây mình thấy AI phát triển khá nhanh, hỗ trợ mình làm việc gencode nên mình thấy 1 lúc làm 3-4 ngôn ngữ cũng không vấn đề gì, nhưng dễ bị lan man và làm nhiều quá không đâu vào đâu
- chính vì thế nhờ seriers này mình muốn thử thách bản thân sau 100 ngày xem có hoàn thành dự án nho nhỏ gì cho ra trò không
- mình dự định viết dự án theo microservice, đầu xử lý api là nodejs, xử lý tác vụ nghiệp vụ tính toán thì giao cho java và python

```
📁 /workspaces/deepapp_micro_services

├── .gitignore
├── README.md
├── directory_tree.md
├── docker
│   ├── kafka
│   │   ├── docker-compose.yml
│   │   ├── kafka1
│   │   ├── kafka2
│   │   └── kafka3
│   ├── nginxproxymanager
│   │   └── docker-compose.yml
│   ├── php_admin_mysql
│   │   ├── .gitignore
│   │   └── docker-compose.yml
│   ├── pocketbase
│   └── redis
│       └── docker-compose.yml
├── docs
│   └── DAY1.MD
├── scripts
│   └── nodetree.py
├── services
│   └── node-api-gateway
│       ├── .gitignore
│       ├── COMPLETED.md
│       ├── Dockerfile
│       ├── README.md
│       ├── check-port.sh
│       ├── cleanup.sh
│       ├── config
│       │   ├── database.js
│       │   └── swagger.js
│       ├── kill-all.sh
│       ├── kill-port.sh
│       ├── models
│       │   ├── Application.js
│       │   ├── ApplicationNote.js
│       │   ├── Candidate.js
│       │   ├── CandidateEducation.js
│       │   ├── CandidateExperience.js
│       │   ├── CandidateSkill.js
│       │   ├── Employer.js
│       │   ├── EmployerReview.js
│       │   ├── HrProfile.js
│       │   ├── InterviewSchedule.js
│       │   ├── Job.js
│       │   ├── JobAlert.js
│       │   ├── JobTag.js
│       │   ├── Message.js
│       │   ├── Notification.js
│       │   ├── Product.js
│       │   ├── SavedJob.js
│       │   ├── User.js
│       │   └── index.js
│       ├── package-lock.json
│       ├── package.json
│       ├── routes
│       │   ├── jobs.js
│       │   ├── nodejs
│       │   │   └── AA
│       │   ├── products.js
│       │   └── users.js
│       ├── scripts
│       │   └── generate-models.js
│       ├── server.js
│       ├── start.sh
│       └── utils
│           └── generateSwaggerFromExpress.js
└── shared
    ├── database_ddl
    │   ├── mysql
    │   │   ├── init.sql
    │   │   └── script01.sql
    │   └── postgre
    │       └── script01.sql
    └── images
        └── logo
            └── deepapp.png
```

-đây là cấu trúc thư mục ngày đầu mình tạo, ban đầu sql mình tạo mong muốn làm csdl cho 1 trang web tìm việc, vì mình nghĩ mình đang sắp thất nghiệp tới nơi rồi :D :D