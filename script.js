// script.ts
document.addEventListener("DOMContentLoaded", function () {
    var form = document.getElementById("resumeForm");
    var generateButton = document.getElementById("generateResume");
    var resumeContent = document.getElementById("resumeContent");
    var profilePictureInput = document.getElementById("profilePicture");
    var imagePreview = document.getElementById("imagePreview");
    // Validate form fields
    function validateForm() {
        var isValid = true;
        var inputs = form.querySelectorAll("input, textarea");
        inputs.forEach(function (input) {
            if (input.type !== "file" && !input.value.trim()) {
                input.classList.add("is-invalid");
                isValid = false;
            }
            else {
                input.classList.remove("is-invalid");
            }
        });
        return isValid;
    }
    // Handle Profile Picture Preview
    profilePictureInput.addEventListener("change", function () {
        var _a;
        var file = (_a = this.files) === null || _a === void 0 ? void 0 : _a[0];
        if (file) {
            var reader = new FileReader();
            reader.onload = function (e) {
                if (e.target) {
                    imagePreview.src = e.target.result;
                    imagePreview.style.display = "block";
                }
            };
            reader.readAsDataURL(file);
        }
    });
    // Generate Resume Content
    function generateResume() {
        if (!validateForm()) {
            alert("Please fill out all required fields.");
            return;
        }
        // Fetch user input
        var name = document.getElementById("name").value;
        var email = document.getElementById("email").value;
        var phone = document.getElementById("phone").value;
        var education = document.getElementById("education").value;
        var workExperience = document.getElementById("workExperience").value;
        var skills = document.getElementById("skills").value.split(",").map(function (skill) { return skill.trim(); });
        // Fetch image source if available
        var profilePictureSrc = imagePreview.src !== "#" ? imagePreview.src : "";
        // Build resume HTML content with editable areas
        var resumeHTML = "\n            <div class=\"text-center mb-4\">\n                ".concat(profilePictureSrc ? "<img src=\"".concat(profilePictureSrc, "\" class=\"img-thumbnail mb-3\" style=\"max-width: 150px;\"/>") : "", "\n                <h3 class=\"editable animate__animated animate__fadeInUp\" contenteditable=\"true\">").concat(name, "</h3>\n                <p class=\"editable animate__animated animate__fadeInUp\" contenteditable=\"true\">Email: ").concat(email, " | Phone: ").concat(phone, "</p>\n            </div>\n            <hr>\n            <h4 class=\"animate__animated animate__fadeInUp\">Education</h4>\n            <p class=\"editable animate__animated animate__fadeInUp\" contenteditable=\"true\">").concat(education, "</p>\n            <h4 class=\"animate__animated animate__fadeInUp\">Work Experience</h4>\n            <p class=\"editable animate__animated animate__fadeInUp\" contenteditable=\"true\">").concat(workExperience, "</p>\n            <h4 class=\"animate__animated animate__fadeInUp\">Skills</h4>\n            <ul class=\"editable animate__animated animate__fadeInUp\" contenteditable=\"true\">").concat(skills.map(function (skill) { return "<li>".concat(skill, "</li>"); }).join(''), "</ul>\n        ");
        // Update resume content dynamically with animation
        resumeContent.innerHTML = resumeHTML;
        // Enable editing functionality
        enableEditing();
    }
    // Enable editing functionality for contenteditable elements
    function enableEditing() {
        var editableElements = document.querySelectorAll(".editable");
        editableElements.forEach(function (element) {
            element.addEventListener("input", function () {
                // Optionally, implement saving logic or auto-save to local storage here
                console.log("Edited content: ".concat(this.innerHTML));
            });
        });
    }
    // Add event listener for button
    generateButton.addEventListener("click", generateResume);
});
