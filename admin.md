---
layout: default
title: Admin - Write a post
permalink: /admin.html
---

<h1>Admin — Create a new post</h1>
<p>This page lets you create a post and optionally upload an image directly to the repository using GitHub's repository_dispatch API.
Only use this as the repository owner or a trusted maintainer. You will need a Personal Access Token (PAT) with <code>repo</code> scope.</p>

<form id="admin-form">
  <div class="mb-3">
    <label class="form-label">Title</label>
    <input id="title" class="form-control" required />
  </div>
  <div class="mb-3">
    <label class="form-label">Tags (comma separated)</label>
    <input id="tags" class="form-control" placeholder="tag1,tag2" />
  </div>
  <div class="mb-3">
    <label class="form-label">Categories (comma separated)</label>
    <input id="categories" class="form-control" placeholder="blog" />
  </div>
  <div class="mb-3">
    <label class="form-label">Image (optional)</label>
    <input id="image" type="file" accept="image/*" class="form-control" />
  </div>
  <div class="mb-3">
    <label class="form-label">Content (Markdown)</label>
    <textarea id="content" class="form-control" rows="12"></textarea>
  </div>
  <div class="mb-3">
    <label class="form-label">Your GitHub Personal Access Token (PAT)</label>
    <input id="pat" type="password" class="form-control" placeholder="Paste PAT (repo scope) here for one-time use" />
  </div>
  <button id="submit" class="btn btn-primary">Create Post</button>
</form>

<div id="result" class="mt-3"></div>

<script src="{{ '/assets/js/admin.js' | relative_url }}"></script>
