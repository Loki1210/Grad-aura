// ================================================
// PROJECT CENTER INSTITUTE - CUSTOM JAVASCRIPT
// ================================================

document.addEventListener('DOMContentLoaded', function() {
    
    // === SMOOTH SCROLLING ===
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // === NAVBAR BACKGROUND ON SCROLL ===
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('shadow-lg');
        } else {
            navbar.classList.remove('shadow-lg');
        }
    });

    // === SCROLL ANIMATIONS ===
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.fade-in-scroll').forEach(element => {
        observer.observe(element);
    });

    // === COUNTER ANIMATION ===
    const counters = document.querySelectorAll('.counter');
    const speed = 200;

    const animateCounter = (counter) => {
        const target = +counter.getAttribute('data-target');
        const increment = target / speed;
        let count = 0;

        const updateCount = () => {
            count += increment;
            if (count < target) {
                counter.textContent = Math.ceil(count);
                setTimeout(updateCount, 10);
            } else {
                counter.textContent = target + '+';
            }
        };

        updateCount();
    };

    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                counterObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => {
        counterObserver.observe(counter);
    });

    // === FORM VALIDATION & SUBMISSION ===
    const contactForm = document.getElementById('contactForm');
    const formMessage = document.getElementById('formMessage');

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            if (!contactForm.checkValidity()) {
                e.stopPropagation();
                contactForm.classList.add('was-validated');
                return;
            }

            // Get form data
            const formData = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                phone: document.getElementById('phone').value,
                subject: document.getElementById('subject').value,
                message: document.getElementById('message').value
            };

            // Show loading state
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<span class="spinner-border spinner-border-sm me-2"></span>Sending...';
            submitBtn.disabled = true;

            // Simulate form submission (replace with actual API call)
            setTimeout(() => {
                // Success
                formMessage.classList.remove('d-none', 'alert-danger');
                formMessage.classList.add('alert-success');
                formMessage.textContent = 'Thank you! Your message has been sent successfully. We will get back to you soon.';
                
                contactForm.reset();
                contactForm.classList.remove('was-validated');
                
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;

                // Hide message after 5 seconds
                setTimeout(() => {
                    formMessage.classList.add('d-none');
                }, 5000);

            }, 2000);
        });
    }

    // === SCROLL TO TOP BUTTON ===
    const scrollTopBtn = document.createElement('div');
    scrollTopBtn.className = 'scroll-top';
    scrollTopBtn.innerHTML = '<i class="bi bi-arrow-up"></i>';
    document.body.appendChild(scrollTopBtn);

    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            scrollTopBtn.classList.add('visible');
        } else {
            scrollTopBtn.classList.remove('visible');
        }
    });

    scrollTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // === MOBILE MENU CLOSE ON LINK CLICK ===
    const navLinks = document.querySelectorAll('.nav-link');
    const navbarCollapse = document.querySelector('.navbar-collapse');

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth < 992) {
                navbarCollapse.classList.remove('show');
            }
        });
    });

    // === SERVICE CARDS HOVER EFFECT ===
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.backgroundColor = '#f8f9fa';
        });
        card.addEventListener('mouseleave', function() {
            this.style.backgroundColor = '';
        });
    });

    // === PROJECT CARDS CLICK EVENT (Optional) ===
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        card.addEventListener('click', function() {
            const projectTitle = this.querySelector('.project-overlay h5').textContent;
            alert(`Project: ${projectTitle}\n\nMore details coming soon!`);
        });
    });

    // === LAZY LOADING IMAGES (Optional Enhancement) ===
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.getAttribute('data-src');
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));

    console.log('Project Center Institute - Website Loaded Successfully! 🚀');
});

//services js
// reveal animation for services (simple intersection observer)
document.addEventListener('DOMContentLoaded', () => {
  const items = document.querySelectorAll('.service-item, .services-intro-image, .services-intro .lead');
  const io = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate__animated', 'animate__fadeInUp');
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  items.forEach(i => io.observe(i));
});

// projects js
// js/projects.js
// Filtering, modal population, reveal animations (IntersectionObserver)

document.addEventListener('DOMContentLoaded', () => {

  // Filter logic
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        const cat = card.getAttribute('data-category');
        if (filter === 'all' || filter === cat) {
          card.style.display = '';
          // add reveal (in case it's been hidden)
          setTimeout(()=> card.querySelector('.project-tile')?.classList.add('reveal','show'), 30);
        } else {
          // hide with fade out
          card.querySelector('.project-tile')?.classList.remove('show');
          setTimeout(()=> card.style.display = 'none', 260);
        }
      });
    });
  });

  // IntersectionObserver for initial reveal
  const io = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('show');
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  document.querySelectorAll('.project-tile.reveal').forEach(el => io.observe(el));

  // sample projects data to populate modal
  const projectsData = {
  p1: {
    title: 'AI-Powered Disease Prediction',
    subtitle: 'ML • Healthcare Prediction',
    desc: 'Predictive ML pipeline that analyzes patient datasets to estimate disease probability using feature engineering, model validation, and explainability tools like SHAP/LIME.',
    tech: 'Python, Pandas, Scikit-learn, TensorFlow, Flask',
    img: '/images/project images/ai1.jpeg',
    repo: '#',
    report: '#'
  },

  p2: {
    title: 'Crop Disease Detection',
    subtitle: 'ML • Computer Vision',
    desc: 'Deep learning model trained on leaf images to classify crop diseases using CNN architectures, image preprocessing, and real-time inference.',
    tech: 'Python, OpenCV, TensorFlow/Keras, NumPy',
    img: '/images/project images/ai2.jpeg',
    repo: '#',
    report: '#'
  },

  p3: {
    title: 'Corporation Municipal Admin Dashboard',
    subtitle: 'Full-Stack • Data Analytics Dashboard',
    desc: 'A centralized web dashboard for municipal operations, complaint management, analytics, and service tracking with role-based access.',
    tech: 'React, Django, MySQL, REST API',
    img: '/images/project images/web1.jpg',
    repo: '#',
    report: '#'
  },

  p4: {
    title: 'Mental Well-being App',
    subtitle: 'Mobile App • Health-Tech',
    desc: 'A mobile application offering mood tracking, stress-relief exercises, wellness insights, and counselor connectivity.',
    tech: 'Flutter, Firebase, REST API',
    img: '/images/project images/app1.jpeg',
    repo: '#',
    report: '#'
  },

  p5: {
    title: 'Credit Card Fraud Detection',
    subtitle: 'DS • Fraud Classification',
    desc: 'A fraud detection system using supervised ML algorithms and anomaly detection to identify suspicious transactions in real-time.',
    tech: 'Python, Scikit-learn, Pandas, XGBoost, Flask',
    img: '/images/project images/ai3.jpg',
    repo: '#',
    report: '#'
  },

  p6: {
    title: 'Attendance Management System',
    subtitle: 'Web • Management System',
    desc: 'A role-based attendance tracking system with automated logs, analytics, and exportable reports for institutions.',
    tech: 'Django, HTML, CSS, JavaScript, MySQL',
    img: '/images/project images/web2.jpg',
    repo: '#',
    report: '#'
  },

  p7: {
    title: 'RFID-Based Inventory Management',
    subtitle: 'Embedded • Automation',
    desc: 'A real-time RFID-enabled inventory tracking system for fast, contactless scanning and automated stock updates.',
    tech: 'Arduino/ESP32, RFID, C/C++, MySQL',
    img: '/images/project images/e1.png',
    repo: '#',
    report: '#'
  },

  p8: {
    title: 'Battery Monitoring System',
    subtitle: 'Embedded • IoT Monitoring',
    desc: 'Sensor-based system that monitors battery voltage, temperature, and health with alerts and cloud logging.',
    tech: 'ESP8266/ESP32, Sensors, MQTT, Firebase',
    img: '/images/project images/e2.jpeg',
    repo: '#',
    report: '#'
  },

  p9: {
    title: 'Weather Station',
    subtitle: 'IoT • Environmental Sensing',
    desc: 'An IoT-based weather monitoring station that collects real-time data on temperature, humidity, and environmental parameters.',
    tech: 'ESP32, DHT11/DHT22, ThingSpeak, Firebase',
    img: '/images/project images/iot1.jpeg',
    repo: '#',
    report: '#'
  },

  p10: {
    title: 'IoT-Based Smart Home',
    subtitle: 'IoT • Home Automation',
    desc: 'Smart home automation system with appliance control, scheduling, and wireless monitoring via mobile dashboard.',
    tech: 'ESP8266, MQTT, Node-RED, Firebase',
    img: '/images/project images/iot2.jpeg',
    repo: '#',
    report: '#'
  },

  p11: {
    title: 'Automated Smart Parking System',
    subtitle: 'IoT • Smart Systems',
    desc: 'A sensor-based parking solution that detects vehicle presence and updates slot availability with automated display.',
    tech: 'Ultrasonic Sensors, Arduino/ESP32, IoT Cloud',
    img: '/images/project images/iot3.jpeg',
    repo: '#',
    report: '#'
  }
};


  // attach click listeners to view buttons
  document.querySelectorAll('.view-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.getAttribute('data-id');
      const p = projectsData[id];
      if (!p) return;

      document.getElementById('modalTitle').textContent = p.title;
      document.getElementById('modalSubtitle').textContent = p.subtitle;
      document.getElementById('modalDesc').textContent = p.desc;
      document.getElementById('modalTech').textContent = p.tech;
      document.getElementById('modalImage').src = p.img;
      // document.getElementById('modalRepo').href = p.repo;
      // document.getElementById('modalDownload').href = p.report;

      const projectModal = new bootstrap.Modal(document.getElementById('projectModal'));
      projectModal.show();
    });
  });

  // small staggered reveal on initial load for visible items
  const staggerReveal = () => {
    const visibleTiles = Array.from(document.querySelectorAll('.project-tile'));
    visibleTiles.forEach((el, i) => {
      setTimeout(()=> el.classList.add('show'), i * 80);
    });
  };
  staggerReveal();

});

// Reveal animation on scroll
document.addEventListener("DOMContentLoaded", () => {

  const io = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if(entry.isIntersecting){
        entry.target.classList.add("show");
        obs.unobserve(entry.target);
      }
    });
  }, { threshold:0.15 });

  document.querySelectorAll(".reveal").forEach(el => io.observe(el));

});

// services-section.js
// Animations: staggered reveal + simple keyboard focus. Make sure this file is loaded after the section.

document.addEventListener('DOMContentLoaded', () => {
  const cards = document.querySelectorAll('.svc-card');

  // IntersectionObserver to add .in-view when visible (with stagger)
  const io = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // add staggered delay based on index
        const el = entry.target;
        const idx = Array.from(cards).indexOf(el);
        setTimeout(() => el.classList.add('in-view'), idx * 90);
        obs.unobserve(el);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });

  cards.forEach(c => io.observe(c));

  // keyboard accessibility: allow Enter to focus (optional hook)
  cards.forEach(c => {
    c.tabIndex = 0;
    c.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        // small animation to indicate activation
        c.classList.add('pressed');
        setTimeout(() => c.classList.remove('pressed'), 260);
      }
    });
  });
});

// FAQ Toggle Logic
document.querySelectorAll('.faq-question').forEach((btn) => {
  btn.addEventListener('click', () => {
    const item = btn.parentElement;

    // Toggle clicked one
    item.classList.toggle('active');

    // Close others (accordion behavior)
    document.querySelectorAll('.faq-item').forEach((other) => {
      if (other !== item) other.classList.remove('active');
    });
  });
});
