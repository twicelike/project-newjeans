import AppConfig from "../config.js";

document.addEventListener('DOMContentLoaded', function () {

    // ========== Global variables ==========
    const MAX_QUESTIONS = 5; // Maximum number of questions
    let formData = null; // Store form data when published

    // ========== Profile dropdown handling ==========
    function setupProfileDropdown(btnId, dropdownId) {
        const profileBtn = document.getElementById(btnId);
        const profileDropdown = document.getElementById(dropdownId);

        profileBtn.addEventListener('click', function (e) {
            e.stopPropagation();
            profileDropdown.classList.toggle('show');
        });

        document.addEventListener('click', function () {
            profileDropdown.classList.remove('show');
        });

        profileDropdown.addEventListener('click', function (e) {
            e.stopPropagation();
        });
    }

    setupProfileDropdown('profileBtn', 'profileDropdown');

    // ========== Form title handling ==========
    const formTitle = document.getElementById('formTitle');
    const formMainTitle = document.getElementById('formMainTitle');

    function setupEditableTitle(element) {
        const placeholder = element.getAttribute('data-placeholder') || 'Untitled';
        const defaultText = element.textContent;

        element.addEventListener('click', function () {
            this.classList.add('edit-mode');
            const currentText = this.textContent === placeholder ? '' : this.textContent;
            this.innerHTML = `<input type="text" class="w-full border-none focus:outline-none bg-transparent font-semibold" value="${currentText}" placeholder="${placeholder}">`;

            const input = this.querySelector('input');
            input.focus();

            // Handle Enter key or blur
            input.addEventListener('blur', function () {
                saveTitle(this, element, placeholder, defaultText);
            });
            input.addEventListener('keyup', function (e) {
                if (e.key === 'Enter') {
                    saveTitle(this, element, placeholder, defaultText);
                }
            });
        });
    }

    function saveTitle(input, element, placeholder, defaultText) {
        const newTitle = input.value.trim() || defaultText || placeholder;
        element.textContent = newTitle;
        element.classList.remove('edit-mode');

        // Sync main title and toolbar title
        if (element.id === 'formTitle') {
            formMainTitle.textContent = newTitle;
            document.title = newTitle + " - Survey Builder";
        } else if (element.id === 'formMainTitle') {
            formTitle.textContent = newTitle;
            document.title = newTitle + " - Survey Builder";
        }
    }

    setupEditableTitle(formTitle);
    setupEditableTitle(formMainTitle);

    // ========== Helper functions ==========
    function generateQuestionId() {
        return 'q-' + Date.now() + '-' + Math.floor(Math.random() * 1000);
    }

    // ========== Add/remove options handling ==========
    function setupOptionEvents(optionElement) {
        const optionInput = optionElement.querySelector('.option-text');
        const removeBtn = optionElement.querySelector('.remove-option');

        // Handle option removal
        removeBtn.addEventListener('click', function () {
            optionElement.remove();
        });
    }

    // Add new option
    function addNewOption(container, value = '', type = 'radio', questionId) {
        const currentOptions = container.querySelectorAll('.option-item');
        if (currentOptions.length >= 10) {
            alert('Maximum 10 options per question');
            return null;
        }

        const newOption = document.createElement('div');
        newOption.className = 'flex items-center space-x-2 mb-2 option-item';

        let inputElement = '';
        if (type === 'radio') {
            inputElement = `<input type="radio" name="options-${questionId}" class="form-radio h-5 w-5 text-purple-600 option-input">`;
        } else if (type === 'checkbox') {
            inputElement = `<input type="checkbox" class="form-checkbox h-5 w-5 text-purple-600 option-input">`;
        }

        newOption.innerHTML = `
                    ${inputElement}
                    <input type="text" class="w-full border-none focus:outline-none option-text" value="${value}" placeholder="Option">
                    <i class="fas fa-times text-gray-400 hover:text-red-500 cursor-pointer remove-option" style="display: none;"></i>
                `;
        container.appendChild(newOption);
        setupOptionEvents(newOption);
        return newOption;
    }

    // Add "Other" option
    function addOtherOption(container, type = 'radio', questionId) {
        const newOption = addNewOption(container, 'Other...', type, questionId);
        if (!newOption) return null;

        const optionInput = newOption.querySelector('.option-text');
        optionInput.classList.add('text-gray-400');
        optionInput.readOnly = true;

        // Handle click to allow custom answer
        optionInput.addEventListener('click', function () {
            this.classList.remove('text-gray-400');
            this.readOnly = false;
            this.value = '';
            this.focus();
        });

        return newOption;
    }

    // ========== Question type change handling ==========
    function changeQuestionType(questionElement, type) {
        const optionsContainer = questionElement.querySelector('.options-container');
        const addOptionsContainer = questionElement.querySelector('.add-options-container');
        questionElement.dataset.questionType = type;

        // Clear existing options
        optionsContainer.innerHTML = '';

        // Add appropriate options based on question type
        if (type === 'radio' || type === 'checkbox') {
            // Show add options button
            addOptionsContainer.style.display = 'flex';

            // Add at least 1 option
            addNewOption(optionsContainer, '', type, questionElement.dataset.questionId);
        } else if (type === 'paragraph') {
            // Hide add options button
            addOptionsContainer.style.display = 'none';

            // Add placeholder for paragraph answer with disabled styling
            const paragraphPlaceholder = document.createElement('div');
            paragraphPlaceholder.className = 'mt-2 bg-gray-100 rounded-md';
            paragraphPlaceholder.innerHTML = `
                        <textarea
                            class="paragraph-answer bg-gray-50 border border-gray-200 focus:outline-none text-gray-500"
                            disabled></textarea>
                    `;
            optionsContainer.appendChild(paragraphPlaceholder);
        }
    }

    // ========== Event handling for options ==========
    document.addEventListener('click', function (e) {
        // Add new option
        if (e.target.classList.contains('add-option') || e.target.classList.contains('add-option-text')) {
            const questionElement = e.target.closest('.question-item');
            const optionsContainer = questionElement.querySelector('.options-container');
            const questionType = questionElement.dataset.questionType;
            const questionId = questionElement.dataset.questionId;
            addNewOption(optionsContainer, '', questionType, questionId);
        }

        // Add "Other" option
        if (e.target.classList.contains('add-other')) {
            const questionElement = e.target.closest('.question-item');
            const optionsContainer = questionElement.querySelector('.options-container');
            const questionType = questionElement.dataset.questionType;
            const questionId = questionElement.dataset.questionId;
            addOtherOption(optionsContainer, questionType, questionId);
        }

        // Delete question
        if (e.target.classList.contains('delete-question')) {
            const questionElement = e.target.closest('.question-item');
            if (confirm('Are you sure you want to delete this question?')) {
                questionElement.remove();
                updateAddButtonState();
            }
        }
    });

    // Handle question type change
    document.addEventListener('change', function (e) {
        if (e.target.classList.contains('question-type')) {
            const questionElement = e.target.closest('.question-item');
            const newType = e.target.value;
            changeQuestionType(questionElement, newType);
        }
    });

    // ========== Add new question handling ==========
    const addQuestionBtn = document.getElementById('addQuestionBtn');
    const questionsContainer = document.getElementById('questionsContainer');

    function updateAddButtonState() {
        const questionCount = questionsContainer.querySelectorAll('.question-item').length;
        if (questionCount >= MAX_QUESTIONS) {
            addQuestionBtn.classList.add('btn-disabled');
            addQuestionBtn.disabled = true;
        } else {
            addQuestionBtn.classList.remove('btn-disabled');
            addQuestionBtn.disabled = false;
        }
    }

    function createNewQuestion() {
        const newQuestion = document.createElement('div');
        const questionId = generateQuestionId();
        newQuestion.className = 'question-item border border-gray-300 rounded p-4 mb-4 mt-6';
        newQuestion.dataset.questionType = 'radio';
        newQuestion.dataset.questionId = questionId;

        newQuestion.innerHTML = `
                    <div class="flex justify-between items-center mb-2">
                        <input type="text" class="w-full border-none focus:outline-none text-lg question-title" placeholder="Question" value="New Question">
                        <select class="question-type border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-purple-200">
                            <option value="radio">Multiple Choice</option>
                            <option value="checkbox">Checkboxes</option>
                            <option value="paragraph">Paragraph</option>
                        </select>
                    </div>

                    <div class="options-container">
                        <div class="flex items-center space-x-2 mb-2 option-item">
                            <input type="radio" name="options-${questionId}" class="form-radio h-5 w-5 text-purple-600 option-input">
                            <input type="text" class="w-full border-none focus:outline-none option-text" placeholder="Option" value="Option 1">
                            <i class="fas fa-times text-gray-400 hover:text-red-500 cursor-pointer remove-option" style="display: none;"></i>
                        </div>
                    </div>

                    <div class="add-options-container flex items-center space-x-2 text-purple-600 mt-4">
                        <i class="fas fa-plus cursor-pointer add-option"></i>
                        <span class="cursor-pointer add-option-text">Add option or</span>
                        <span class="underline cursor-pointer add-other">add "Other"</span>
                    </div>

                    <div class="flex justify-between items-center mt-4">
                        <div class="flex items-center space-x-4">
                            <i class="fas fa-trash text-gray-600 hover:text-purple-600 cursor-pointer delete-question" title="Delete question"></i>
                        </div>
                    </div>
                `;

        questionsContainer.appendChild(newQuestion);
        setupQuestionEvents(newQuestion);
        return newQuestion;
    }

    // Set up question events
    function setupQuestionEvents(questionElement) {
        // Hover events for option items
        const optionItems = questionElement.querySelectorAll('.option-item');
        optionItems.forEach(item => {
            item.addEventListener('mouseenter', function () {
                this.querySelector('.remove-option').style.display = 'block';
            });

            item.addEventListener('mouseleave', function () {
                this.querySelector('.remove-option').style.display = 'none';
            });
        });
    }

    addQuestionBtn.addEventListener('click', function () {
        const questionCount = questionsContainer.querySelectorAll('.question-item').length;
        if (questionCount >= MAX_QUESTIONS) {
            alert(`Maximum of ${MAX_QUESTIONS} questions allowed`);
            return;
        }

        createNewQuestion();
        updateAddButtonState();
    });

    // ========== Publish form handling ==========
    const publishBtn = document.getElementById('publishBtn');

    function publishForm() {
        // Collect form data

        formData = {
            title: formTitle.textContent === 'Survey Title' ? 'Untitled Survey' : formTitle.textContent,
            questions: []
        };

        const questionElements = document.querySelectorAll('.question-item');
        questionElements.forEach((questionElement) => {
            const question = {
                question: questionElement.querySelector('.question-title').value || 'Untitled Question',
                type: questionElement.dataset.questionType,
                option1: '',
                option2: '',
                option3: '',
                option4: '',
                option5: '',
                answer: ''
            };

            if (question.type === 'radio' || question.type === 'checkbox') {
                const optionElements = questionElement.querySelectorAll('.option-item');
                optionElements.forEach((optionElement, index) => {
                    const optionText = optionElement.querySelector('.option-text');
                    if (index < 5) {
                        question[`option${index + 1}`] = optionText?.value || `Option ${index + 1}`;
                    }
                    // const optionText = optionElement.querySelector('.option-text');
                    // question.options.push({
                    //     text: optionText.value || 'Untitled Option',
                    //     isOther: optionText.classList.contains('text-gray-400')
                    // });
                });
            }

            formData.questions.push(question);
        });

        fetch(`${AppConfig.UPLOAD_SURVEY}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formData)
        })
            .then(response => {
                console.log(response)
            })
            .catch(error => {
                console.error(error.message)
            });
        // Save form data to localStorage
        // localStorage.setItem('surveyFormData', JSON.stringify(formData));
        console.log(JSON.stringify(formData))

        alert('Survey published successfully! You can now create an answer page.');
    }

    publishBtn.addEventListener('click', publishForm);

    // Set up events for initial question
    const initialQuestion = document.querySelector('.question-item');
    initialQuestion.dataset.questionId = generateQuestionId();
    setupQuestionEvents(initialQuestion);
    updateAddButtonState();
});
