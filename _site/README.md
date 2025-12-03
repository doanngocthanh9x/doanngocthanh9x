# doanngocthanh9x

Repo mẫu: Jekyll blog + JSON API

Nội dung:

- Trang blog (HTML) được sinh từ `_posts` và layout trong `_layouts`
- API JSON được sinh tại `api/posts.json` dựa trên layout `_layouts/api.json`

Chạy site cục bộ (yêu cầu Ruby + Jekyll):

```bash
# cài Ruby, bundler, jekyll nếu cần
gem install bundler jekyll

# hoặc dùng bundler nếu có Gemfile
# bundle install

# phục vụ site (mặc định trên cổng 4000)
jekyll serve --livereload
```

Sau khi chạy, truy cập:

- UI: http://localhost:4000/
- API JSON: http://localhost:4000/api/posts.json

Ghi chú: Nếu bạn Deploy lên GitHub Pages, chỉnh `url` và `baseurl` trong `_config.yml` theo repository của bạn.
## Hi there 👋

<!--
**doanngocthanh9x/doanngocthanh9x** is a ✨ _special_ ✨ repository because its `README.md` (this file) appears on your GitHub profile.

Here are some ideas to get you started:

- 🔭 I’m currently working on ...
- 🌱 I’m currently learning ...
- 👯 I’m looking to collaborate on ...
- 🤔 I’m looking for help with ...
- 💬 Ask me about ...
- 📫 How to reach me: ...
- 😄 Pronouns: ...
- ⚡ Fun fact: ...
-->
