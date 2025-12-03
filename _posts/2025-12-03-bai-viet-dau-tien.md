---
title: "Blogs này được tạo hoàn toàn miễn phí và tốn công"
date: 2025-12-02 12:00:00 +0700
layout: post
categories: blog
image: /assets/img/blog/image.png
tags: [ github,jekyll]
---


Bài viết đầu tiên — Chào mừng đến với blog!
<!--more-->

# Giới thiệu

## jekyllrb
Mình dùng thư viện này để render giao diện nè
 https://jekyllrb.com/ dễ triển khai.
- Tích hợp với git, tiện cho việc quản lý lịch sử và CI/CD đơn giản.
- Hỗ trợ custom domain, HTTPS.

# Cách mình dùng
1. Tạo repository (có thể đặt tên là username.github.io hoặc dùng branch gh-pages).
2. Viết bài ở thư mục _posts/ theo định dạng Jekyll.
3. Đặt ảnh, CSS, JS vào thư mục assets/ và tham chiếu bằng đường dẫn tương đối (/assets/...).
4. Push lên GitHub — GitHub Pages sẽ build và phục vụ site tự động.

# Jekyll — render site tĩnh
Mình dùng Jekyll để render giao diện: https://jekyllrb.com/  
Cài nhanh trên Ubuntu:
```bash
sudo apt update
sudo apt
gem install jekyll bundler
```
Khởi tạo site mới:
```bash
jekyll new myblog
cd myblog
bundle exec jekyll serve
```

# Mẹo nhỏ
- Dùng `_config.yml` để cấu hình baseurl, title, author.
- Đặt đoạn ngắn (excerpt) trước `<!--more-->` để hiển thị tóm tắt.
- Tối ưu ảnh (nén) để tải nhanh.
- Kiểm tra local bằng `bundle exec jekyll serve` trước khi push.

# Các lệnh 
- `jekyll -v` kiểm tra version
- `jekyll build --destination _site_test` build ra file html test
- `jekyll serve --livereload` chạy live test
Chúc bạn vui khi dựng blog! Nếu cần, mình có thể giúp tối ưu giao diện hoặc viết mẫu bài đăng đẹp hơn.
