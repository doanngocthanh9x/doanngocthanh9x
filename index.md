---
layout: default
title: Trang chủ
---

<!-- Main posts listing using ZenBlog markup -->
<section class="trending-category section mt-4">
  <div class="container">
    <div class="row">
      <div class="col-md-9">
        {% if site.posts and site.posts != empty %}
          {% for post in site.posts %}
          <div class="d-lg-flex post-entry mb-4">
            <a href="{{ post.url | relative_url }}" class="me-4 thumbnail mb-4 mb-lg-0 d-inline-block">
              {% if post.image %}
                <img src="{{ post.image | relative_url }}" alt="{{ post.title | escape }}" class="img-fluid">
              {% else %}
                <!-- fallback placeholder -->
                <img src="{{ '/assets/img/post-landscape-1.jpg' | relative_url }}" alt="{{ post.title | escape }}" class="img-fluid">
              {% endif %}
            </a>
            <div>
              <div class="post-meta"><span class="date">{{ post.categories | first }}</span> <span class="mx-1">•</span> <span>{{ post.date | date: "%b %e, %Y" }}</span></div>
              <h3><a href="{{ post.url | relative_url }}">{{ post.title }}</a></h3>
              <p class="mb-4 d-block">{{ post.excerpt | strip_html | strip_newlines }}</p>
              <div class="d-flex align-items-center author">
                <div class="photo"><img src="{{ '/assets/img/person-1.jpg' | relative_url }}" alt="" class="img-fluid"></div>
                <div class="name"><h3 class="m-0 p-0">{{ site.email }}</h3></div>
              </div>
            </div>
          </div>
          {% endfor %}
        {% else %}
          <p data-i18n="home.no_posts">Chưa có bài viết nào.</p>
        {% endif %}
      </div>
      <div class="col-md-3">
        <!-- Sidebar: Trending -->
        <div class="trending">
          <h3 data-i18n="home.trending">Trending</h3>
          <ul class="trending-post">
            {% for post in site.posts limit:5 %}
            <li>
              <a href="{{ post.url | relative_url }}">
                <span class="number">{{ forloop.index }}</span>
                <h3>{{ post.title }}</h3>
                <span class="author">{{ site.email }}</span>
              </a>
            </li>
            {% endfor %}
          </ul>
        </div>
      </div>
    </div>
  </div>
</section>
