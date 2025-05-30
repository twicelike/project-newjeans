import AppConfig from "../config.js";

fetch(`${AppConfig.GET_SURVEY}/3`)
    .then(res => res.json())
    .then(data => {
        console.log(data)
        window.currentSurvey = data;
        window.currentSurveyId = data.id;
        // 1) Set the survey title
        document.getElementById('surveyTitle').innerText = data.title;

        const answersContainer = document.getElementById('answersContainer');
        answersContainer.innerHTML = ''; // clear old

        data.questions.forEach((q, idx) => {
            // Wrapper for each question
            const wrapper = document.createElement('div');
            wrapper.className = 'question-item mb-6';
            wrapper.id = 'question-item-' + q.id;
            // Question text
            const title = document.createElement('div');
            title.className = 'question-title font-semibold mb-2';
            title.innerText = `${idx + 1}. ${q.question || 'Untitled question'}`;
            wrapper.appendChild(title);

            // Build an array of non-empty options
            const opts = [];
            for (let i = 1; i <= 5; i++) {
                const val = q[`option${i}`];
                if (val && val.trim() !== '') opts.push(val);
            }

            if (q.type === 'radio') {
                opts.forEach((opt, i) => {
                    const line = document.createElement('div');
                    line.className = 'flex items-center mb-2';

                    const input = document.createElement('input');
                    input.type = 'radio';
                    input.name = `answer-${q.id}`
                    input.id = `q${q.id}-r${i}`;
                    input.value = opt;
                    input.className = 'mr-2 h-5 w-5 text-purple-600';

                    const label = document.createElement('label');
                    label.htmlFor = input.id;
                    label.innerText = opt;

                    line.appendChild(input);
                    line.appendChild(label);
                    wrapper.appendChild(line);
                });
            } else if (q.type === 'checkbox') {
                opts.forEach((opt, i) => {
                    const line = document.createElement('div');
                    line.className = 'flex items-center mb-2';

                    const input = document.createElement('input');
                    input.type = 'checkbox';
                    input.name = `answer-${q.id}`
                    input.id = `q${q.id}-c${i}`;
                    input.value = opt;
                    input.className = 'mr-2 h-5 w-5 text-purple-600';

                    const label = document.createElement('label');
                    label.htmlFor = input.id;
                    label.innerText = opt;

                    line.appendChild(input);
                    line.appendChild(label);
                    wrapper.appendChild(line);
                });

            } else if (q.type === 'paragraph') {
                const ta = document.createElement('textarea');
                ta.name = `answer-${q.id}`;
                ta.id = `q${q.id}-p`;
                ta.rows = 4;
                ta.placeholder = 'Your answer…';
                ta.className = 'w-full p-2 border rounded paragraph-answer';
                wrapper.appendChild(ta);
            }

            answersContainer.appendChild(wrapper);
        });
    })
    .catch(err => console.error('Error fetching survey:', err));


document.addEventListener('DOMContentLoaded', function () {

    document.getElementById('submitAnswersBtn').addEventListener('click', () => {
        const answers = [];
        answers.push()
        window.currentSurvey.questions.forEach(q => {
            if (q.type === 'radio') {
                let answer
                for (let i = 0; i < 5; i++) {
                    const val = document.getElementById(`q${q.id}-r${i}`);
                    if (val !== null && val.checked) {
                        console.log('cac')
                        answer = i
                        console.log(val)
                    }
                }
                answers.push({
                    questionId: q.id,
                    answer: answer ? answer : ''
                });
            } else if (q.type === 'checkbox') {
                let answer = ""
                for (let i = 0; i < 5; i++) {
                    const val = document.getElementById(`q${q.id}-c${i}`);
                    if (val && val.checked) {
                        answer += i
                    }
                }
                answers.push({
                    questionId: q.id,
                    answer: answer
                });
            } else if (q.type === 'paragraph') {
                const answer = document.getElementById(`q${q.id}-p`)
                answers.push({
                    questionId: q.id,
                    answer: answer.value ? answer.value : ''
                });
            }
        });

        console.log("Collected answers:", answers);
    });
})


//
//
// document.getElementById('submitAnswersBtn').addEventListener('click', () => {
//     // 1) Collect the surveyId (assume you stored it globally when fetching)
//     const surveyId = window.currentSurveyId;
//
//     // 2) Grab all question blocks
//     const answers = [];
//
//     // for each question in your fetched data
//     window.currentSurvey.questions.forEach(q => {
//         const key = `answer-${q.id}`;
//
//         if (q.type === 'radio') {
//             // single selected radio
//             const sel = document.querySelector(`input[name="${key}"]:checked`);
//             answers.push({
//                 questionId: q.id,
//                 answer: sel ? sel.value : '',
//                 type: q.type
//             });
//         } else if (q.type === 'checkbox') {
//             // all checked checkboxes
//             const sels = Array.from(
//                 document.querySelectorAll(`input[name="${key}"]:checked`)
//             ).map(cb => cb.value);
//             answers.push({
//                 questionId: q.id,
//                 answer: sels,  // array of values,
//                 type: q.type
//             });
//
//         } else if (q.type === 'paragraph') {
//             // textarea
//             const ta = document.querySelector(`textarea[name="${key}"]`);
//             answers.push({
//                 questionId: q.id,
//                 answer: ta ? ta.value : '',
//                 type: q.type
//             });
//         }
//     });
//
//     // 3) Build the payload
//     const payload = {
//         surveyId: surveyId,
//         responses: answers
//     };
//
//     console.log(payload)
//     // 4) Send to server
//     // fetch(`/api/survey/${surveyId}/answers`, {
//     //     method: 'POST',
//     //     headers: {'Content-Type': 'application/json'},
//     //     body: JSON.stringify(payload)
//     // })
//     //     .then(res => {
//     //         if (!res.ok) throw new Error('Network error');
//     //         return res.json();
//     //     })
//     //     .then(resp => {
//     //         alert('Submitted successfully!');
//     //         console.log('Server response:', resp);
//     //     })
//     //     .catch(err => console.error('Submit failed:', err));
// });

