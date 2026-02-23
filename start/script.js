let answers = {};
let currentPage = 'hero';
const totalQuestions = 6;
let pageHistory = ['hero'];

/* ── UTM Capture ── */
function captureUTM() {
    var params = new URLSearchParams(window.location.search);
    var utmKeys = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term', 'fbclid', 'gclid'];
    var utm = {};
    utmKeys.forEach(function (key) {
        var val = params.get(key);
        if (val) utm[key] = val;
    });
    if (Object.keys(utm).length > 0) {
        sessionStorage.setItem('cf_utm', JSON.stringify(utm));
    }
}

/* ── Funnel Event Tracking ── */
function getCookie(name) {
    var match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
    return match ? match[2] : null;
}

function setCookie(name, value, days) {
    var d = new Date();
    d.setTime(d.getTime() + (days * 24 * 60 * 60 * 1000));
    document.cookie = name + '=' + value + ';expires=' + d.toUTCString() + ';path=/;SameSite=Lax';
}

function trackEvent(eventName, eventData) {
    // Do not set cookies or track until cookie consent is given
    if (localStorage.getItem('cf-cookie-consent') !== 'accepted') return;

    var visitorId = getCookie('cf_visitor_id');
    if (!visitorId) {
        visitorId = 'v_' + Math.random().toString(36).substring(2) + Date.now().toString(36);
        setCookie('cf_visitor_id', visitorId, 365);
    }

    var payload = {
        event: eventName,
        visitorId: visitorId,
        page: '/start/',
        timestamp: new Date().toISOString()
    };
    if (eventData) payload.eventData = eventData;

    var url = 'https://app.consistencyforge.com/api/quiz/track';
    if (navigator.sendBeacon) {
        navigator.sendBeacon(url, JSON.stringify(payload));
    } else {
        fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
            keepalive: true
        }).catch(function () {});
    }
}

/* ── Page Navigation ── */
function showPage(pageId) {
    document.querySelectorAll('.page').forEach(function (p) { p.classList.remove('active'); });
    var page = document.getElementById('page-' + pageId);
    page.classList.add('active');
    currentPage = pageId;

    // Lazy load mascot videos when page becomes visible
    var videos = page.querySelectorAll('video[data-src]');
    videos.forEach(function (v) {
        v.src = v.getAttribute('data-src');
        v.removeAttribute('data-src');
        v.play();
    });

    var showProgress = pageId.startsWith('q') || pageId === 'results';
    document.getElementById('progressWrap').classList.toggle('active', showProgress);

    if (pageId.startsWith('q')) {
        var qNum = parseInt(pageId.substring(1));
        updateProgress(qNum, totalQuestions);
    } else if (pageId === 'results') {
        updateProgress(totalQuestions, totalQuestions);
    }

    window.scrollTo(0, 0);
}

function updateProgress(current, total) {
    var pct = Math.round((current / total) * 100);
    document.getElementById('progressBar').style.width = pct + '%';
    document.getElementById('progressText').textContent = pct + '%';
}

/* ── Personalized Results ── */
function personalizeResults() {
    var activity = {
        'fitness': 'regular exercise',
        'hobby': 'your creative passion',
        'learning': 'learning and growth',
        'health': 'self-care',
        'project': 'your own project',
        'other': 'what matters to you'
    }[answers.q1] || 'what matters';

    var barrier = {
        'time': 'a busy schedule',
        'tired': 'feeling drained after work',
        'kids': 'family responsibilities',
        'someday': 'waiting for the right moment',
        'perfect': 'waiting for perfect conditions',
        'motivation': 'finding the motivation'
    }[answers.q2] || 'everyday challenges';

    var longTime = answers.q3 === 'decade' || answers.q3 === 'years';

    var text = 'You\'ve been thinking about ' + activity + ' — and ' + barrier + ' keeps getting in the way.';
    if (longTime) {
        text += '<br><br>It\'s been a long road. But every moment is a chance to begin anew.';
    }
    text += '<br><br>';
    text += 'But here\'s the truth: <strong>You DO have time.</strong> ';
    text += 'Today it can be 30 seconds. Tomorrow, 3 minutes. ';
    text += 'Next week? Maybe 30 minutes that change everything.';
    text += '<br><br>';
    text += 'You don\'t need hours. <strong>Consistency beats intensity.</strong> ';
    text += 'A small step every day. That\'s all it takes.';
    text += '<br><br>';
    text += 'Even 30 seconds a day counts. Not hours — just 30 seconds, but <strong>EVERY DAY.</strong> ';
    text += 'That\'s how real consistency is built. The hardest part? Starting. But once you do, the rest follows.';

    document.getElementById('resultText').innerHTML = text;
}

function showError(message) {
    var errorEl = document.getElementById('formError');
    if (errorEl) {
        errorEl.textContent = message;
        errorEl.classList.add('visible');
        setTimeout(function () { errorEl.classList.remove('visible'); }, 5000);
    }
}

/* ── Cookie Consent ── */
function initCookieConsent() {
    if (localStorage.getItem('cf-cookie-consent') === 'accepted') return;
    var banner = document.getElementById('cookieBanner');
    if (banner) banner.classList.add('visible');
}

/* ── WebView Detection ── */
function detectWebView() {
    var ua = navigator.userAgent || '';
    var isWebView = /FBAN|FBAV|Instagram|Twitter|TikTok|Line\/|Snapchat|YahooApp/i.test(ua);
    if (isWebView) {
        var banner = document.getElementById('webviewBanner');
        if (banner) banner.classList.add('visible');
    }
}

/* ── Hero Scroll Tracking ── */
function initScrollTracking() {
    var btn = document.getElementById('btnStart');
    if (!btn || !('IntersectionObserver' in window)) return;

    var tracked = false;

    var observer = new IntersectionObserver(function (entries) {
        if (entries[0].isIntersecting) {
            tracked = true;
            observer.disconnect();
        }
    });
    observer.observe(btn);

    // After 3 seconds, check if the button was ever visible
    setTimeout(function () {
        observer.disconnect();
        if (!tracked) {
            trackEvent('hero_cta_not_visible', { viewport_height: window.innerHeight });
        }
    }, 3000);
}

/* ── DOM Ready ── */
document.addEventListener('DOMContentLoaded', function () {
    captureUTM();
    initCookieConsent();
    detectWebView();
    initScrollTracking();

    // Cookie consent accept
    var cookieAccept = document.getElementById('cookieAccept');
    if (cookieAccept) {
        cookieAccept.addEventListener('click', function () {
            localStorage.setItem('cf-cookie-consent', 'accepted');
            document.getElementById('cookieBanner').classList.remove('visible');
        });
    }

    // WebView banner — Open in system browser
    var webviewOpen = document.getElementById('webviewOpen');
    if (webviewOpen) {
        webviewOpen.addEventListener('click', function () {
            window.open(window.location.href, '_system');
        });
    }

    // WebView banner — Copy link fallback
    var webviewCopy = document.getElementById('webviewCopy');
    if (webviewCopy) {
        webviewCopy.addEventListener('click', function () {
            var btn = this;
            if (navigator.clipboard) {
                navigator.clipboard.writeText(window.location.href).then(function () {
                    btn.textContent = 'Copied!';
                    setTimeout(function () { btn.textContent = 'Copy link'; }, 2000);
                });
            } else {
                // Fallback for older browsers
                var ta = document.createElement('textarea');
                ta.value = window.location.href;
                ta.style.position = 'fixed';
                ta.style.opacity = '0';
                document.body.appendChild(ta);
                ta.select();
                document.execCommand('copy');
                document.body.removeChild(ta);
                btn.textContent = 'Copied!';
                setTimeout(function () { btn.textContent = 'Copy link'; }, 2000);
            }
        });
    }

    // WebView banner — Dismiss
    var webviewClose = document.getElementById('webviewClose');
    if (webviewClose) {
        webviewClose.addEventListener('click', function () {
            document.getElementById('webviewBanner').classList.remove('visible');
        });
    }

    // Consent checkbox — enable/disable submit button
    var consentCheck = document.getElementById('consentCheck');
    var btnEmail = document.getElementById('btnEmail');
    if (consentCheck && btnEmail) {
        consentCheck.addEventListener('change', function () {
            btnEmail.disabled = !this.checked;
            if (this.checked) {
                btnEmail.classList.add('consent-active');
            } else {
                btnEmail.classList.remove('consent-active');
            }
        });
    }

    // Start quiz button
    document.getElementById('btnStart').addEventListener('click', function () {
        trackEvent('quiz_start');
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

            // Track quiz answer
            trackEvent('quiz_q' + qNum, { answer: value });

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
                    trackEvent('quiz_complete');
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
        var originalHTML = btn.innerHTML;
        btn.innerHTML = 'Creating your account...';

        trackEvent('quiz_email_submit', { email_domain: email.split('@')[1] });

        // Get stored UTM data
        var utm = {};
        try {
            utm = JSON.parse(sessionStorage.getItem('cf_utm') || '{}');
        } catch (e) {}

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
                    utm: utm,
                }),
            });

            var data = await res.json();
            if (!res.ok) throw new Error(data.error || 'Something went wrong');

            trackEvent('quiz_api_success');

            // Show thank-you page — user must click magic link in email to log in
            pageHistory.push('thanks');
            showPage('thanks');
        } catch (err) {
            trackEvent('quiz_api_error', { error: err.message });
            btn.disabled = false;
            btn.innerHTML = originalHTML;
            // Re-check consent state — keep button disabled if unchecked
            var consent = document.getElementById('consentCheck');
            if (consent && !consent.checked) btn.disabled = true;
            showError(err.message || 'Network error. Please try again.');
        }
    });
});
