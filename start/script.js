let answers = {};
let currentPage = 'hero';
const totalQuestions = 6;
let pageHistory = ['hero'];

function showPage(pageId) {
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    document.getElementById('page-' + pageId).classList.add('active');
    currentPage = pageId;

    const showProgress = pageId.startsWith('q') || pageId === 'results';
    document.getElementById('progressWrap').classList.toggle('active', showProgress);

    if (pageId.startsWith('q')) {
        const qNum = parseInt(pageId.substring(1));
        updateProgress(qNum, totalQuestions);
    } else if (pageId === 'results') {
        updateProgress(totalQuestions, totalQuestions);
    }

    window.scrollTo(0, 0);
}

function updateProgress(current, total) {
    const pct = Math.round((current / total) * 100);
    document.getElementById('progressBar').style.width = pct + '%';
    document.getElementById('progressText').textContent = pct + '%';
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

function showError(message) {
    const errorEl = document.getElementById('formError');
    if (errorEl) {
        errorEl.textContent = message;
        errorEl.classList.add('visible');
        setTimeout(() => errorEl.classList.remove('visible'), 5000);
    }
}

// Wire up all event listeners once DOM is ready
document.addEventListener('DOMContentLoaded', function () {
    // Start quiz button
    document.getElementById('btnStart').addEventListener('click', function () {
        pageHistory.push('q1');
        showPage('q1');
    });

    // Back button
    document.getElementById('btnBack').addEventListener('click', function () {
        if (pageHistory.length > 1) {
            pageHistory.pop();
            showPage(pageHistory[pageHistory.length - 1]);
        }
    });

    // All quiz answer buttons (delegated via data attributes)
    document.querySelectorAll('.answer-btn[data-q]').forEach(function (btn) {
        btn.addEventListener('click', function () {
            var qNum = parseInt(this.dataset.q);
            var value = this.dataset.value;

            answers['q' + qNum] = value;

            // Visual feedback
            var siblings = document.querySelectorAll('#page-q' + qNum + ' .answer-btn');
            siblings.forEach(function (b) { b.classList.remove('selected'); });
            btn.classList.add('selected');

            // Next page after brief delay
            setTimeout(function () {
                var nextPage = qNum < totalQuestions ? 'q' + (qNum + 1) : 'results';
                pageHistory.push(nextPage);
                showPage(nextPage);

                if (nextPage === 'results') {
                    personalizeResults();
                }
            }, 250);
        });
    });

    // Email submit — calls onboard API and redirects to app
    document.getElementById('btnEmail').addEventListener('click', async function () {
        var email = document.getElementById('email').value;
        if (!email || !email.includes('@')) {
            showError('Please enter a valid email address');
            return;
        }

        var btn = this;
        btn.disabled = true;
        var originalText = btn.textContent;
        btn.textContent = 'Creating your account...';

        try {
            var res = await fetch('https://app.consistencyforge.com/api/landing/onboard', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-Landing-Secret': '34ba25af77603821540bfecad43e81670f97c3c8146e114a1f1cfb30ef647e08',
                },
                body: JSON.stringify({
                    email: email,
                    quizAnswers: {
                        q1: answers.q1,
                        q2: answers.q2,
                        q3: answers.q3,
                        q4: answers.q4,
                        q5: answers.q5,
                        q6: answers.q6,
                    },
                    source: 'quiz-v3',
                }),
            });

            var data = await res.json();
            if (!res.ok) throw new Error(data.error || 'Something went wrong');

            // Redirect to app — user will be auto-logged in via magic link
            window.location.href = data.loginUrl;
        } catch (err) {
            btn.disabled = false;
            btn.textContent = originalText;
            showError(err.message || 'Network error. Please try again.');
        }
    });
});
