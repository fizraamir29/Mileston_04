// script.ts

document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("resumeForm") as HTMLFormElement;
    const generateButton = document.getElementById("generateResume") as HTMLButtonElement;
    const resumeContent = document.getElementById("resumeContent") as HTMLDivElement;
    const profilePictureInput = document.getElementById("profilePicture") as HTMLInputElement;
    const imagePreview = document.getElementById("imagePreview") as HTMLImageElement;

    // Validate form fields
    function validateForm(): boolean {
        let isValid = true;
        const inputs = form.querySelectorAll("input, textarea") as NodeListOf<HTMLInputElement | HTMLTextAreaElement>;

        inputs.forEach(input => {
            if (input.type !== "file" && !input.value.trim()) {
                input.classList.add("is-invalid");
                isValid = false;
            } else {
                input.classList.remove("is-invalid");
            }
        });

        return isValid;
    }

    // Handle Profile Picture Preview
    profilePictureInput.addEventListener("change", function () {
        const file = this.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function (e) {
                if (e.target) {
                    imagePreview.src = e.target.result as string;
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
        const name = (document.getElementById("name") as HTMLInputElement).value;
        const email = (document.getElementById("email") as HTMLInputElement).value;
        const phone = (document.getElementById("phone") as HTMLInputElement).value;
        const education = (document.getElementById("education") as HTMLTextAreaElement).value;
        const workExperience = (document.getElementById("workExperience") as HTMLTextAreaElement).value;
        const skills = (document.getElementById("skills") as HTMLInputElement).value.split(",").map(skill => skill.trim());

        // Fetch image source if available
        const profilePictureSrc = imagePreview.src !== "#" ? imagePreview.src : "";

        // Build resume HTML content with editable areas
        const resumeHTML = `
            <div class="text-center mb-4">
                ${profilePictureSrc ? `<img src="${profilePictureSrc}" class="img-thumbnail mb-3" style="max-width: 150px;"/>` : ""}
                <h3 class="editable animate__animated animate__fadeInUp" contenteditable="true">${name}</h3>
                <p class="editable animate__animated animate__fadeInUp" contenteditable="true">Email: ${email} | Phone: ${phone}</p>
            </div>
            <hr>
            <h4 class="animate__animated animate__fadeInUp">Education</h4>
            <p class="editable animate__animated animate__fadeInUp" contenteditable="true">${education}</p>
            <h4 class="animate__animated animate__fadeInUp">Work Experience</h4>
            <p class="editable animate__animated animate__fadeInUp" contenteditable="true">${workExperience}</p>
            <h4 class="animate__animated animate__fadeInUp">Skills</h4>
            <ul class="editable animate__animated animate__fadeInUp" contenteditable="true">${skills.map(skill => `<li>${skill}</li>`).join('')}</ul>
        `;

        // Update resume content dynamically with animation
        resumeContent.innerHTML = resumeHTML;

        // Enable editing functionality
        enableEditing();
    }

    // Enable editing functionality for contenteditable elements
    function enableEditing() {
        const editableElements = document.querySelectorAll(".editable") as NodeListOf<HTMLElement>;
        
        editableElements.forEach(element => {
            element.addEventListener("input", function () {
                // Optionally, implement saving logic or auto-save to local storage here
                console.log(`Edited content: ${this.innerHTML}`);
            });
        });
    }

    // Add event listener for button
    generateButton.addEventListener("click", generateResume);
});
