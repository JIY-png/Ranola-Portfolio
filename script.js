$(document).ready(function () {
    $(window).scroll(function () {
        // Sticky dynamic navbar tracking logic
        if (this.scrollY > 20) {
            $('.custom-navbar').addClass("sticky");
        } else {
            $('.custom-navbar').removeClass("sticky");
        }

        // Return to top visibility triggering engine
        if (this.scrollY > 500) {
            $('.scroll-up-btn').addClass("show");
        } else {
            $('.scroll-up-btn').removeClass("show");
        }
    });

    // Back to top animation behavior trigger click
    $('.scroll-up-btn').click(function () {
        $('html').animate({ scrollTop: 0 });
        $('html').css("scrollBehavior", "auto");
    });

    $('.custom-navbar .menu li a').click(function () {
        $('html').css("scrollBehavior", "smooth");
    });

    // Mobile viewport drop-down navigational drawer toggler
    $('.menu-btn').click(function () {
        $('.custom-navbar .menu').toggleClass("active");
        $('.menu-btn i').toggleClass("active");
    });

    // Typed text animation engine parameters initialization
    var typed = new Typed(".typing", {
        strings: ["Student", "Developer", "Learner", "Designer"],
        typeSpeed: 100,
        backSpeed: 60,
        loop: true
    });

    var typed2 = new Typed(".typing-2", {
        strings: ["Student", "Developer", "Learner", "Designer"],
        typeSpeed: 100,
        backSpeed: 60,
        loop: true
    });

    // Gallery Modal dynamic loader
    var projectModal = document.getElementById('projectModal');
    if (projectModal) {
        projectModal.addEventListener('show.bs.modal', function (event) {
            var card = event.relatedTarget;
            if (card) {
                var title = card.getAttribute('data-title');
                var img = card.getAttribute('data-image');
                var desc = card.getAttribute('data-desc');

                var modalTitle = projectModal.querySelector('.modal-title');
                var modalImage = projectModal.querySelector('#modalImage');
                var modalDesc = projectModal.querySelector('#modalDesc');

                if (modalTitle) modalTitle.textContent = title || 'Project Details';
                if (modalImage) {
                    modalImage.src = img || '';
                    modalImage.alt = title || 'Project Image';
                }
                if (modalDesc) modalDesc.textContent = desc || '';
            }
        });
    }

    // Contact Form Submission Handler
    var contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();

            // CONFIGURATION: Set your Web3Forms Access Key here to receive real emails.
            // Get a free key from: https://web3forms.com
            var accessKey = "ee447968-23d7-4bd7-825f-3a5e5ce16b43";

            var nameInput = document.getElementById('contactName');
            var emailInput = document.getElementById('contactEmail');
            var subjectInput = document.getElementById('contactSubject');
            var messageInput = document.getElementById('contactMessage');
            var submitBtn = document.getElementById('contactSubmitBtn');

            var name = nameInput ? nameInput.value : 'Guest';

            // Set loading state on button
            if (submitBtn) {
                submitBtn.disabled = true;
                submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i> Sending...';
            }

            // Function to handle the visual success action
            function showSuccessAlert() {
                // Clear the form
                contactForm.reset();

                // Reset button state
                if (submitBtn) {
                    submitBtn.disabled = false;
                    submitBtn.innerHTML = 'Send message';
                }

                // Configure and show Success Toast
                var toastEl = document.getElementById('contactToast');
                if (toastEl) {
                    var toastMessage = document.getElementById('toastMessage');
                    var toastBodyIcon = toastEl.querySelector('.toast-body i');

                    // Reset toast styling to success (using gradient)
                    toastEl.style.background = 'var(--gradient)';
                    if (toastBodyIcon) {
                        toastBodyIcon.className = 'fas fa-check-circle me-2 fs-5';
                    }
                    if (toastMessage) {
                        toastMessage.textContent = 'Thank you, ' + name + '! Your message has been sent successfully.';
                    }
                    var toast = new bootstrap.Toast(toastEl);
                    toast.show();
                }
            }

            // Function to handle failure state
            function showFailureAlert(errorMsg) {
                if (submitBtn) {
                    submitBtn.disabled = false;
                    submitBtn.innerHTML = 'Send message';
                }
                var toastEl = document.getElementById('contactToast');
                if (toastEl) {
                    var toastMessage = document.getElementById('toastMessage');
                    var toastBodyIcon = toastEl.querySelector('.toast-body i');

                    // Change toast styling to danger red
                    toastEl.style.background = '#dc3545';
                    if (toastBodyIcon) {
                        toastBodyIcon.className = 'fas fa-exclamation-circle me-2 fs-5';
                    }
                    if (toastMessage) {
                        toastMessage.textContent = errorMsg || 'Oops! Something went wrong. Please try again.';
                    }
                    var toast = new bootstrap.Toast(toastEl);
                    toast.show();
                }
            }

            if (accessKey && accessKey !== "YOUR_ACCESS_KEY_HERE") {
                // Real submission to Web3Forms
                var formData = new FormData();
                formData.append("access_key", accessKey);
                formData.append("name", nameInput ? nameInput.value : '');
                formData.append("email", emailInput ? emailInput.value : '');
                formData.append("subject", subjectInput ? subjectInput.value : 'Portfolio Contact');
                formData.append("message", messageInput ? messageInput.value : '');

                fetch("https://api.web3forms.com/submit", {
                    method: "POST",
                    body: formData
                })
                    .then(function (response) {
                        return response.json();
                    })
                    .then(function (data) {
                        if (data.success) {
                            showSuccessAlert();
                        } else {
                            showFailureAlert(data.message || 'Error submitting the form.');
                        }
                    })
                    .catch(function (error) {
                        showFailureAlert('Network error. Please check your internet connection.');
                    });
            } else {
                // Offline/Simulated submission (Fallback)
                setTimeout(function () {
                    showSuccessAlert();
                }, 1500);
            }
        });
    }
}); 