$(document).ready(function () {
    // Add click handler for community action
    $('#community-action').click(function () {
      $('.transactions').html(getCommunityHtml());
      loadForumPosts();
    });
  
    function getCommunityHtml() {
      return `
        <div id="community-section">
          <h1>Community Support Forum</h1>
  
          <!-- Create a post -->
          <div>
            <h3>Create a New Post</h3>
            <input class="post-input" type="text" id="postTitle" placeholder="Enter your question here...">
            <textarea class="post-input" id="postContent" placeholder="Describe your question in detail..."></textarea>
            <button id="create-post">Post</button>
          </div>
  
          <h2>Forum Posts</h2>
          <div id="forum"></div>
        </div>
      `;
    }
  
    // Initialize event handler for creating a new post
    $(document).on('click', '#create-post', function () {
      const title = $('#postTitle').val().trim();
      const content = $('#postContent').val().trim();
  
      if (!title || !content) {
        alert('Please fill out both the title and content fields.');
        return;
      }
  
      const forumPosts = JSON.parse(localStorage.getItem('forumPosts')) || [];
      const newPost = {
        id: Date.now(),
        title: title,
        content: content,
        comments: [],
      };
  
      forumPosts.push(newPost);
      localStorage.setItem('forumPosts', JSON.stringify(forumPosts));
  
      $('#postTitle').val('');
      $('#postContent').val('');
  
      loadForumPosts();
    });
  
    // Load forum data and update UI
    function loadForumPosts() {
      const forumPosts = JSON.parse(localStorage.getItem('forumPosts')) || [];
      const forumContainer = $('#forum');
      forumContainer.empty(); // Clear existing posts
  
      forumPosts.forEach((post) => {
        const postElement = $(`
          <div class="forum-post">
            <h3>${post.title}</h3>
            <p>${post.content}</p>
            <button class="edit-post" data-id="${post.id}">Edit</button>
            <button class="delete-post" data-id="${post.id}">Delete</button>
            <div class="forum-thread">
              <h4>Comments:</h4>
              <div class="comments"></div>
              <input class="comment-input" placeholder="Add a comment...">
              <button class="add-comment" data-id="${post.id}">Post Comment</button>
            </div>
          </div>
        `);
  
        post.comments.forEach((comment) => {
          postElement.find('.comments').append(`<div class="comment">${comment}</div>`);
        });
  
        forumContainer.append(postElement);
      });
    }
  
    // Handle post deletion
    $(document).on('click', '.delete-post', function () {
      const postId = $(this).data('id');
      if (confirm('Are you sure you want to delete this post?')) {
        const forumPosts = JSON.parse(localStorage.getItem('forumPosts')) || [];
        const updatedPosts = forumPosts.filter((post) => post.id !== postId);
        localStorage.setItem('forumPosts', JSON.stringify(updatedPosts));
        loadForumPosts();
      }
    });
  
    // Handle post editing
    $(document).on('click', '.edit-post', function () {
      const postId = $(this).data('id');
      const forumPosts = JSON.parse(localStorage.getItem('forumPosts')) || [];
      const post = forumPosts.find((p) => p.id === postId);
      if (post) {
        const newTitle = prompt('Edit Post Title:', post.title);
        const newContent = prompt('Edit Post Content:', post.content);
        if (newTitle && newContent) {
          post.title = newTitle;
          post.content = newContent;
          localStorage.setItem('forumPosts', JSON.stringify(forumPosts));
          loadForumPosts();
        }
      }
    });
  
    // Handle adding comments
    $(document).on('click', '.add-comment', function () {
      const postId = $(this).data('id');
      const commentText = $(this).siblings('.comment-input').val().trim();
  
      if (!commentText) {
        alert('Please enter a comment.');
        return;
      }
  
      const forumPosts = JSON.parse(localStorage.getItem('forumPosts')) || [];
      const post = forumPosts.find((p) => p.id === postId);
  
      if (post) {
        post.comments.push(commentText);
        localStorage.setItem('forumPosts', JSON.stringify(forumPosts));
        loadForumPosts();
      }
    });
  });
  