// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize everything
    initNavigation();
    initScrollAnimations();
    initServiceSlider();
    initSkillsSlider();
    initContactSlider();
    initProjectSlider();
    initContactForm();
    initTypewriter();
    initContactHelpers();
});

// Navigation
function initNavigation() {
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Toggle mobile menu
    navToggle.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        navToggle.classList.toggle('active');
    });
    
    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        });
    });
    
    // Navbar background on scroll
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
}

// Scroll Animations
function initScrollAnimations() {
    const sections = document.querySelectorAll('section');
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // Add staggered animations to items within the section and reveal each
                const staggerItems = entry.target.querySelectorAll('.stagger-item');
                staggerItems.forEach((item, index) => {
                    // set a small inline delay and add visible class so CSS animations trigger
                    item.style.animationDelay = `${index * 0.08}s`;
                    item.classList.add('visible');
                });
            }
        });
    }, observerOptions);
    
    sections.forEach(section => {
        observer.observe(section);
    });
}

// Services Slider
function initServiceSlider() {
    const track = document.getElementById('services-track');
    const prevBtn = document.querySelector('.services-prev');
    const nextBtn = document.querySelector('.services-next');

    const services = [
        { title: "Computer Vision", icon: "fa-eye", description: "Image processing, object detection, semantic segmentation using CNN and advanced models." },
        { title: "Natural Language Processing", icon: "fa-language", description: "Text analysis, sentiment analysis, translation using BERT, GPT and Transformers." },
        { title: "Data Analysis", icon: "fa-chart-bar", description: "Data exploration, visualization, statistical analysis and predictive modeling." },
        { title: "Agentic AI", icon: "fa-robot", description: "Autonomous agents, multi-step workflows, decision-making systems with LLMs." },
        { title: "Workflow Automation", icon: "fa-cogs", description: "Business process automation, pipeline orchestration, intelligent automation with AI." },
        { title: "Chatbot Development", icon: "fa-comments", description: "Conversational AI, context-aware chatbots, multi-turn dialogues with fine-tuning." },
        { title: "LLM Integration", icon: "fa-brain", description: "GPT, Claude, Gemini integration, RAG pipelines, prompt optimization and fine-tuning." },
        { title: "Autonomous Agents", icon: "fa-space-shuttle", description: "Self-executing agents, ReAct patterns, tool use and multi-agent systems." }
    ];

    services.forEach(s => {
        const card = document.createElement('div');
        card.className = 'service-card';
        card.innerHTML = `
            <div class="service-icon"><i class="fas ${s.icon}"></i></div>
            <h3 class="service-title">${s.title}</h3>
            <p class="service-description">${s.description}</p>`;
        track.appendChild(card);
    });

    setTimeout(() => {
        const singleGroupWidth = track.scrollWidth;
        track.innerHTML = track.innerHTML + track.innerHTML;

        let speed = 0.45;
        let pos = 0;
        let paused = false;

        const computeCardMetrics = () => {
            const children = track.querySelectorAll('.service-card');
            if (children.length < 1) return { cardWidth: 320, groupWidth: singleGroupWidth };
            const first = children[0].getBoundingClientRect();
            let gap = 0;
            if (children.length > 1) {
                const second = children[1].getBoundingClientRect();
                gap = Math.max(0, second.left - (first.left + first.width));
            }
            return { cardWidth: Math.round(first.width + gap), groupWidth: singleGroupWidth };
        };

        let { cardWidth, groupWidth } = computeCardMetrics();

        function loop() {
            if (!paused) {
                pos -= speed;
                if (Math.abs(pos) >= groupWidth) {
                    pos = 0;
                }
                track.style.transform = `translateX(${Math.round(pos)}px)`;
            }
            requestAnimationFrame(loop);
        }

        requestAnimationFrame(loop);

        track.addEventListener('mouseenter', () => { paused = true; });
        track.addEventListener('mouseleave', () => { paused = false; });

        if (prevBtn) prevBtn.addEventListener('click', () => { pos += cardWidth; if (pos > 0) pos = -groupWidth + (pos % groupWidth); track.style.transform = `translateX(${Math.round(pos)}px)`; });
        if (nextBtn) nextBtn.addEventListener('click', () => { pos -= cardWidth; if (Math.abs(pos) >= groupWidth) pos = 0; track.style.transform = `translateX(${Math.round(pos)}px)`; });

        window.addEventListener('resize', () => {
            const newGroup = singleGroupWidth;
            groupWidth = newGroup || singleGroupWidth;
            const metrics = computeCardMetrics();
            cardWidth = metrics.cardWidth;
        });
    }, 100);
}

// Skills Slider
function initSkillsSlider() {
    const track = document.getElementById('skills-track');
    const prevBtn = document.querySelector('.skills-prev');
    const nextBtn = document.querySelector('.skills-next');

    const skillsData = [
        { category: "Programming", skills: ["Python", "Java", "C#", "JavaScript", "TypeScript"] },
        { category: "AI/ML Frameworks", skills: ["TensorFlow", "PyTorch", "Scikit-learn", "Keras", "Hugging Face"] },
        { category: "NLP & CV", skills: ["BERT", "GPT", "Transformers", "CNN", "YOLO", "Transfer Learning"] },
        { category: "Agentic AI Tools", skills: ["LangChain", "Claude API", "GPT API", "Gemini API", "Autogen"] },
        { category: "Cloud & DevOps", skills: ["AWS", "Docker", "Kubernetes", "Git", "CI/CD"] },
        { category: "Databases", skills: ["PostgreSQL", "MongoDB", "DynamoDB", "Redis", "Vector DBs"] },
        { category: "Backend Frameworks", skills: ["FastAPI", "Flask", "ASP.NET Core", "Node.js", "Django"] },
        { category: "Data & Analytics", skills: ["Pandas", "NumPy", "Matplotlib", "Plotly", "SQL"] }
    ];

    skillsData.forEach(item => {
        const card = document.createElement('div');
        card.className = 'skill-card';
        card.innerHTML = `
            <h3>${item.category}</h3>
            <div class="skill-list">
                ${item.skills.map(skill => `<span class="skill-tag">${skill}</span>`).join('')}
            </div>`;
        track.appendChild(card);
    });

    setTimeout(() => {
        const singleGroupWidth = track.scrollWidth;
        track.innerHTML = track.innerHTML + track.innerHTML;

        let speed = 0.45;
        let pos = 0;
        let paused = false;

        const computeCardMetrics = () => {
            const children = track.querySelectorAll('.skill-card');
            if (children.length < 1) return { cardWidth: 280, groupWidth: singleGroupWidth };
            const first = children[0].getBoundingClientRect();
            let gap = 0;
            if (children.length > 1) {
                const second = children[1].getBoundingClientRect();
                gap = Math.max(0, second.left - (first.left + first.width));
            }
            return { cardWidth: Math.round(first.width + gap), groupWidth: singleGroupWidth };
        };

        let { cardWidth, groupWidth } = computeCardMetrics();

        function loop() {
            if (!paused) {
                pos -= speed;
                if (Math.abs(pos) >= groupWidth) {
                    pos = 0;
                }
                track.style.transform = `translateX(${Math.round(pos)}px)`;
            }
            requestAnimationFrame(loop);
        }

        requestAnimationFrame(loop);

        track.addEventListener('mouseenter', () => { paused = true; });
        track.addEventListener('mouseleave', () => { paused = false; });

        if (prevBtn) prevBtn.addEventListener('click', () => { pos += cardWidth; if (pos > 0) pos = -groupWidth + (pos % groupWidth); track.style.transform = `translateX(${Math.round(pos)}px)`; });
        if (nextBtn) nextBtn.addEventListener('click', () => { pos -= cardWidth; if (Math.abs(pos) >= groupWidth) pos = 0; track.style.transform = `translateX(${Math.round(pos)}px)`; });

        window.addEventListener('resize', () => {
            const newGroup = singleGroupWidth;
            groupWidth = newGroup || singleGroupWidth;
            const metrics = computeCardMetrics();
            cardWidth = metrics.cardWidth;
        });
    }, 100);
}

// Contact Slider
function initContactSlider() {
    const track = document.getElementById('contact-track');
    const prevBtn = document.querySelector('.contact-prev');
    const nextBtn = document.querySelector('.contact-next');

    const contacts = [
        { icon: "fa-envelope", title: "Email", subtitle: "Drop me a message", link: "mailto:arham@example.com", linkText: "Send", copy: "arham@example.com", isCopy: true },
        { icon: "fa-phone", title: "Phone", subtitle: "Call anytime", link: "tel:+923003020167", linkText: "Call", copy: "+923003020167", isCopy: true },
        { icon: "fab fa-linkedin-in", title: "LinkedIn", subtitle: "Connect professionally", link: "https://www.linkedin.com/in/arham-khan", linkText: "Visit", copy: null, isCopy: false },
        { icon: "fab fa-github", title: "GitHub", subtitle: "Check my code", link: "https://github.com/arham-khan", linkText: "View", copy: null, isCopy: false },
        { icon: "fa-briefcase", title: "Upwork", subtitle: "Hire me for freelance", link: "https://www.upwork.com/freelancers/~YOUR_PROFILE", linkText: "Hire", copy: null, isCopy: false }
    ];

    contacts.forEach(c => {
        const card = document.createElement('div');
        // make contact cards participate in staggered reveal and ensure visibility
        card.className = 'contact-card stagger-item';
        
        let actionBtns = '';
        if (c.isCopy) {
            actionBtns = `<button class="btn btn-copy" data-copy="${c.copy}" type="button" style="cursor:pointer;"><i class="fas fa-copy"></i><span class="btn-text">Copy</span></button><a href="${c.link}" class="btn btn-primary" style="cursor:pointer;"><i class="fas fa-arrow-right"></i><span>${c.linkText}</span></a>`;
        } else {
            actionBtns = `<a href="${c.link}" target="_blank" class="btn btn-primary" style="cursor:pointer;"><i class="fas fa-external-link-alt"></i><span>${c.linkText}</span></a>`;
        }
        
        card.innerHTML = `
            <div class="card-gradient"></div>
            <div class="card-content">
                <div class="contact-icon">
                    <div class="icon-wrapper">
                        <i class="${c.icon}"></i>
                    </div>
                </div>
                <div class="contact-info">
                    <h3>${c.title}</h3>
                    <p>${c.subtitle}</p>
                </div>
                <div class="contact-actions">
                    ${actionBtns}
                </div>
            </div>`;
        track.appendChild(card);
    });

    setTimeout(() => {
        const singleGroupWidth = track.scrollWidth;
        const originalHTML = track.innerHTML;
        track.innerHTML = originalHTML + originalHTML;

        let speed = 0.45;
        let pos = 0;
        let paused = false;

        const computeCardMetrics = () => {
            const children = track.querySelectorAll('.contact-card');
            if (children.length < 1) return { cardWidth: 360, groupWidth: singleGroupWidth };
            const first = children[0].getBoundingClientRect();
            let gap = 0;
            if (children.length > 1) {
                const second = children[1].getBoundingClientRect();
                gap = Math.max(0, second.left - (first.left + first.width));
            }
            return { cardWidth: Math.round(first.width + gap), groupWidth: singleGroupWidth };
        };

        let { cardWidth, groupWidth } = computeCardMetrics();

        function loop() {
            if (!paused) {
                pos -= speed;
                if (Math.abs(pos) >= groupWidth) {
                    pos = 0;
                }
                track.style.transform = `translateX(${Math.round(pos)}px)`;
            }
            requestAnimationFrame(loop);
        }

        requestAnimationFrame(loop);

        track.addEventListener('mouseenter', () => { paused = true; });
        track.addEventListener('mouseleave', () => { paused = false; });

        if (prevBtn) prevBtn.addEventListener('click', () => { pos += cardWidth; if (pos > 0) pos = -groupWidth + (pos % groupWidth); track.style.transform = `translateX(${Math.round(pos)}px)`; });
        if (nextBtn) nextBtn.addEventListener('click', () => { pos -= cardWidth; if (Math.abs(pos) >= groupWidth) pos = 0; track.style.transform = `translateX(${Math.round(pos)}px)`; });

        window.addEventListener('resize', () => {
            const newGroup = singleGroupWidth;
            groupWidth = newGroup || singleGroupWidth;
            const metrics = computeCardMetrics();
            cardWidth = metrics.cardWidth;
        });

        // Re-initialize copy buttons after DOM is updated
        initCopyButtons();

        // Make sure duplicated cards are visible (some CSS rules set default opacity:0)
        // Add visible class to all contact cards so they render even if IntersectionObserver
        // hasn't toggled them yet.
        const allCards = track.querySelectorAll('.contact-card');
        allCards.forEach(c => c.classList.add('visible'));
    }, 100);
}

// Helper to initialize copy buttons
function initCopyButtons() {
    const copyButtons = document.querySelectorAll('.btn-copy');
    copyButtons.forEach(button => {
        button.removeEventListener('click', button._clickHandler);
        button._clickHandler = function(e) {
            e.preventDefault();
            const textToCopy = this.getAttribute('data-copy');
            const btnText = this.querySelector('.btn-text');
            const originalText = btnText.textContent;
            
            navigator.clipboard.writeText(textToCopy).then(() => {
                btnText.textContent = 'Copied!';
                this.style.background = 'rgba(34, 197, 94, 0.15)';
                this.style.borderColor = 'rgba(34, 197, 94, 0.4)';
                
                setTimeout(() => {
                    btnText.textContent = originalText;
                    this.style.background = '';
                    this.style.borderColor = '';
                }, 1500);
            }).catch(() => {
                alert('Failed to copy. Please try again.');
            });
        };
        button.addEventListener('click', button._clickHandler);
    });
}

// Project Slider
function initProjectSlider() {
    const track = document.getElementById('projects-track');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');

    // Project data - edit or add projects here. Each project should have title, description, video (optional) and github link.
    const projects = [
        { title: "Skin Tone Detection System", description: "Real-time CNN-based classification of skin tone.", video: "assets/project-videos/skin-tone.mp4", github: "https://github.com/your-username/skin-tone-detection" },
        { title: "Skin Cell Carcinoma Classification", description: "Deep learning pipeline for skin cancer segmentation.", video: "assets/project-videos/skin-cancer.mp4", github: "https://github.com/your-username/skin-cancer-detection" },
        { title: "Hierarchical Lung Disease Diagnosis", description: "Multi-level CNN-BLSTM model for chest image classification.", video: "assets/project-videos/lung-disease.mp4", github: "https://github.com/your-username/lung-disease-diagnosis" },
        { title: "Real-Time Sentiment Analysis", description: "BERT-based pipeline for live sentiment classification.", video: "assets/project-videos/sentiment-analysis.mp4", github: "https://github.com/your-username/sentiment-analysis" },
        { title: "Sports Person Classification", description: "CNN + BLSTM model for athlete categorization.", video: "assets/project-videos/sports-classification.mp4", github: "https://github.com/your-username/sports-classification" }
    ];

    // Build cards and append to track
    projects.forEach(p => {
        const card = document.createElement('div');
        card.className = 'project-card';
        card.innerHTML = `
            ${p.video ? `<video class="project-video" autoplay muted loop playsinline><source src="${p.video}" type="video/mp4">Your browser does not support the video tag.</video>` : ''}
            <div class="project-content">
                <h3 class="project-title">${p.title}</h3>
                <p class="project-description">${p.description}</p>
                <a href="${p.github}" target="_blank" rel="noopener" class="project-link">View Project</a>
            </div>`;
        track.appendChild(card);
    });

    // Duplicate content for seamless infinite scroll
    // Measure width of the group, then duplicate innerHTML
    const measureWidth = () => {
        const children = Array.from(track.children);
        if (children.length === 0) return 0;
        // sum widths
        return children.reduce((sum, el) => sum + el.getBoundingClientRect().width, 0) + (children.length - 1) * parseFloat(getComputedStyle(track).gap || 0);
    };

    // Ensure layout ready
    setTimeout(() => {
        const singleGroupWidth = track.scrollWidth;
        // Duplicate only once to create A A pattern
        track.innerHTML = track.innerHTML + track.innerHTML;

        let speed = 0.45; // px per frame (adjust for faster/slower)
        let pos = 0;
        let paused = false;

        // Calculate card width for manual nav
        const computeCardMetrics = () => {
            const children = track.querySelectorAll('.project-card');
            if (children.length < 1) return { cardWidth: 380, groupWidth: singleGroupWidth };
            const first = children[0].getBoundingClientRect();
            let gap = 0;
            if (children.length > 1) {
                const second = children[1].getBoundingClientRect();
                gap = Math.max(0, second.left - (first.left + first.width));
            }
            return { cardWidth: Math.round(first.width + gap), groupWidth: singleGroupWidth };
        };

        let { cardWidth, groupWidth } = computeCardMetrics();

        // Animation loop
        function loop() {
            if (!paused) {
                pos -= speed;
                if (Math.abs(pos) >= groupWidth) {
                    pos = 0;
                }
                track.style.transform = `translateX(${Math.round(pos)}px)`;
            }
            requestAnimationFrame(loop);
        }

        // Start loop
        requestAnimationFrame(loop);

        // Pause on hover
        track.addEventListener('mouseenter', () => { paused = true; });
        track.addEventListener('mouseleave', () => { paused = false; });

        // Manual controls
        if (prevBtn) prevBtn.addEventListener('click', () => { pos += cardWidth; if (pos > 0) pos = -groupWidth + (pos % groupWidth); track.style.transform = `translateX(${Math.round(pos)}px)`; });
        if (nextBtn) nextBtn.addEventListener('click', () => { pos -= cardWidth; if (Math.abs(pos) >= groupWidth) pos = 0; track.style.transform = `translateX(${Math.round(pos)}px)`; });

        // Handle window resize
        window.addEventListener('resize', () => {
            // recalc sizes
            const newGroup = measureWidth();
            groupWidth = newGroup || singleGroupWidth;
            const metrics = computeCardMetrics();
            cardWidth = metrics.cardWidth;
        });

    }, 100);
}

// Contact Form
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;
        
        // Simple validation
        if (!name || !email || !message) {
            alert('Please fill in all fields');
            return;
        }
        
        // Here you would typically send the form data to a server
        // For now, we'll just show a success message
        alert('Thank you for your message! I will get back to you soon.');
        contactForm.reset();
    });
}

// Contact helpers: copy buttons and small interactions
function initContactHelpers() {
    // Initialize copy buttons on page load
    initCopyButtons();

    // Auto-annotate common card elements so they animate with stagger rules
    const autoNodes = document.querySelectorAll('.service-card, .project-card, .skill-card, .education-box, .home-title, .home-subtitle, .image-container');
    autoNodes.forEach(node => node.classList.add('stagger-item'));
}

// Typewriter Effect
function initTypewriter() {
    const typewriterElements = document.querySelectorAll('.typewriter');
    
    typewriterElements.forEach(element => {
        const text = element.textContent;
        element.textContent = '';
        
        let i = 0;
        const typeWriter = () => {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            }
        };
        
        // Start typing when element is in view
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    typeWriter();
                    observer.unobserve(entry.target);
                }
            });
        });
        
        observer.observe(element);
    });
}

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});