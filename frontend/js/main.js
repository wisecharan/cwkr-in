document.addEventListener('DOMContentLoaded', () => {
    // Signup Form
    const signupForm = document.getElementById('signup-form');
    if (signupForm) {
        signupForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const username = document.getElementById('username').value;
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;

            try {
                const response = await fetch('http://localhost:8080/api/auth/signup', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ username, email, password })
                });
                const data = await response.json();
                document.getElementById('signup-message').textContent = data.message || 'Signup successful!';
                if (response.ok) {
                    setTimeout(() => window.location.href = 'login.html', 1000);
                }
            } catch (error) {
                document.getElementById('signup-message').textContent = 'Error during signup.';
            }
        });
    }

    // Login Form
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;

            try {
                const response = await fetch('http://localhost:8080/api/auth/login', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ email, password })
                });
                const data = await response.json();
                document.getElementById('login-message').textContent = data.message || 'Login successful!';
                if (response.ok) {
                    localStorage.setItem('token', data.token);
                    setTimeout(() => window.location.href = 'blog.html', 1000);
                }
            } catch (error) {
                document.getElementById('login-message').textContent = 'Error during login.';
            }
        });
    }

    // Blog Posts
    const blogPosts = document.getElementById('blog-posts');
    if (blogPosts) {
        fetch('http://localhost:8080/api/blogs', {
            headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
        })
            .then(response => response.json())
            .then(data => {
                blogPosts.innerHTML = data.map(post => `
                    <article>
                        <h3>${post.title}</h3>
                        <p>${post.content}</p>
                        <small>Posted on ${new Date(post.createdAt).toLocaleDateString()}</small>
                    </article>
                `).join('');
            })
            .catch(error => {
                blogPosts.innerHTML = '<p>Error loading blog posts.</p>';
            });
    }

    // Contact Form
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;

            try {
                const response = await fetch('http://localhost:8080/api/contact', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ name, email, message })
                });
                const data = await response.json();
                document.getElementById('contact-message').textContent = data.message || 'Message sent successfully!';
                if (response.ok) {
                    contactForm.reset();
                }
            } catch (error) {
                document.getElementById('contact-message').textContent = 'Error sending message.';
            }
        });
    }
});