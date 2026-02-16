let answers = {};
let currentPage = 'hero';
const totalQuestions = 6;
let history = ['hero'];

function showPage(pageId) {
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    document.getElementById('page-' + pageId).classList.add('active');
    currentPage = pageId;

    // Show/hide progress bar
    const showProgress = pageId.startsWith('q') || pageId === 'results' || pageId === 'commitment';
    document.getElementById('progressWrap').classList.toggle('active', showProgress);

    // Update progress
    if (pageId.startsWith('q')) {
        const qNum = parseInt(pageId.substring(1));
        updateProgress(qNum, totalQuestions);
    } else if (pageId === 'results' || pageId === 'commitment') {
        updateProgress(totalQuestions, totalQuestions);
    }

    window.scrollTo(0, 0);
}

function updateProgress(current, total) {
    const pct = Math.round((current / total) * 100);
    document.getElementById('progressBar').style.width = pct + '%';
    document.getElementById('progressText').textContent = pct + '%';
}

function startQuiz() {
    history.push('q1');
    showPage('q1');
}

function answer(qNum, value) {
    answers['q' + qNum] = value;

    // Visual feedback
    const btns = document.querySelectorAll('#page-q' + qNum + ' .answer-btn');
    btns.forEach(b => b.classList.remove('selected'));
    event.currentTarget.classList.add('selected');

    // Next page
    setTimeout(() => {
        const nextPage = qNum < totalQuestions ? 'q' + (qNum + 1) : 'results';
        history.push(nextPage);
        showPage(nextPage);

        if (nextPage === 'results') {
            personalizeResults();
        }
    }, 250);
}

function goBack() {
    if (history.length > 1) {
        history.pop();
        showPage(history[history.length - 1]);
    }
}

function personalizeResults() {
    const activity = {
        'fitness': 'regular exercise',
        'hobby': 'your creative passion',
        'learning': 'learning and growth',
        'health': 'self-care',
        'project': 'your own project',
        'other': 'what matters to you'
    }[answers.q1] || 'what matters';

    const excuse = {
        'time': 'lack of time',
        'tired': 'exhaustion',
        'kids': 'family responsibilities',
        'someday': 'endless postponing',
        'perfect': 'waiting for perfect conditions',
        'motivation': 'lack of motivation'
    }[answers.q2] || 'daily excuses';

    const longTime = answers.q3 === 'decade' || answers.q3 === 'years';

    let text = `
        I see you've been dreaming of ${activity}, but ${excuse} always gets in the way.
        ${longTime ? "<br><br>It's been years. How much longer will you wait?" : ""}
        <br><br>
        But here's the truth: <strong>You DO have time.</strong>
        Today it can be 30 seconds. Tomorrow, 3 minutes.
        Next week? Maybe 30 minutes — and you'll feel like a new person.
        <br><br>
        You don't have to do it like you used to, for 3-4 hours. <strong>Consistency beats intensity.</strong>
        A small step every day. That's all it takes.
    `;

    document.getElementById('resultText').innerHTML = text;
}

function submitEmail() {
    const email = document.getElementById('email').value;
    if (!email || !email.includes('@')) {
        showError('Please enter a valid email address');
        return;
    }
    answers.email = email;
    history.push('commitment');
    showPage('commitment');
}

function showError(message) {
    const errorEl = document.getElementById('formError');
    if (errorEl) {
        errorEl.textContent = message;
        errorEl.classList.add('visible');
        setTimeout(() => errorEl.classList.remove('visible'), 5000);
    }
}

async function submitCommitment() {
    const name = document.getElementById('commitmentName').value;
    const schedule = document.getElementById('schedule').value;
    const why = document.getElementById('why').value;

    if (!name) {
        showError('Name your commitment');
        return;
    }

    const btn = event.currentTarget;
    btn.disabled = true;
    btn.textContent = 'Creating your commitment...';

    try {
        const res = await fetch('https://app.consistencyforge.com/api/landing/onboard', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-Landing-Secret': '<LANDING_ONBOARD_SECRET>',
            },
            body: JSON.stringify({
                email: answers.email,
                quizAnswers: {
                    q1: answers.q1,
                    q2: answers.q2,
                    q3: answers.q3,
                    q4: answers.q4,
                    q5: answers.q5,
                    q6: answers.q6,
                },
                commitmentName: name,
                schedule: schedule,
                why: why || null,
                source: 'quiz-v3',
            }),
        });

        const data = await res.json();
        if (!res.ok) throw new Error(data.error || 'Something went wrong');
        showPage('thanks');
    } catch (err) {
        btn.disabled = false;
        btn.textContent = 'Forge My Commitment \uD83D\uDD25';
        showError(err.message || 'Network error. Please try again.');
    }
}
