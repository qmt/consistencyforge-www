/* ── Google Ads gtag is initialized in <head> (index.html) ── */

var answers = {};
var currentPage = 'hero';
var totalQuestions = 6;
var pageHistory = ['hero'];
var phoneSetupData = null; // {token, userId, ts} from onboard response

/* ── Country data for dropdown ── */
var COUNTRIES = [
    {code:'+91',label:'+91 India'},
    {code:'+92',label:'+92 Pakistan'},
    {code:'+234',label:'+234 Nigeria'},
    {code:'+254',label:'+254 Kenya'},
    {code:'+255',label:'+255 Tanzania'},
    {code:'+256',label:'+256 Uganda'},
    {code:'+233',label:'+233 Ghana'},
    {code:'+27',label:'+27 South Africa'},
    {code:'+251',label:'+251 Ethiopia'},
    {code:'+20',label:'+20 Egypt'},
    {code:'+212',label:'+212 Morocco'},
    {code:'+880',label:'+880 Bangladesh'},
    {code:'+977',label:'+977 Nepal'},
    {code:'+94',label:'+94 Sri Lanka'},
    {code:'+62',label:'+62 Indonesia'},
    {code:'+63',label:'+63 Philippines'},
    {code:'+84',label:'+84 Vietnam'},
    {code:'+66',label:'+66 Thailand'},
    {code:'+60',label:'+60 Malaysia'},
    {code:'+55',label:'+55 Brazil'},
    {code:'+52',label:'+52 Mexico'},
    {code:'+57',label:'+57 Colombia'},
    {code:'+54',label:'+54 Argentina'},
    {code:'+56',label:'+56 Chile'},
    {code:'+51',label:'+51 Peru'},
    {code:'+1',label:'+1 US/CA'},
    {code:'+44',label:'+44 UK'},
    {code:'+49',label:'+49 Germany'},
    {code:'+33',label:'+33 France'},
    {code:'+34',label:'+34 Spain'},
    {code:'+39',label:'+39 Italy'},
    {code:'+31',label:'+31 Netherlands'},
    {code:'+48',label:'+48 Poland'},
    {code:'+46',label:'+46 Sweden'},
    {code:'+47',label:'+47 Norway'},
    {code:'+45',label:'+45 Denmark'},
    {code:'+358',label:'+358 Finland'},
    {code:'+353',label:'+353 Ireland'},
    {code:'+43',label:'+43 Austria'},
    {code:'+41',label:'+41 Switzerland'},
    {code:'+61',label:'+61 Australia'},
    {code:'+64',label:'+64 New Zealand'},
    {code:'+81',label:'+81 Japan'},
    {code:'+82',label:'+82 South Korea'},
    {code:'+86',label:'+86 China'},
    {code:'+65',label:'+65 Singapore'},
    {code:'+852',label:'+852 Hong Kong'},
    {code:'+886',label:'+886 Taiwan'},
    {code:'+90',label:'+90 Turkey'},
    {code:'+966',label:'+966 Saudi Arabia'},
    {code:'+971',label:'+971 UAE'},
    {code:'+972',label:'+972 Israel'},
    {code:'+380',label:'+380 Ukraine'},
    {code:'+7',label:'+7 Russia'},
];

var API_BASE = 'https://app.consistencyforge.com';
var LANDING_SECRET = '34ba25af77603821540bfecad43e81670f97c3c8146e114a1f1cfb30ef647e08';

var CONSENT_TEXT = 'I consent to receive check-in reminders and account notifications via WhatsApp from ConsistencyForge. I can opt out anytime by sending STOP via WhatsApp or removing my phone number. Message frequency depends on my contract schedule.';

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
    if (localStorage.getItem('cf-cookie-consent') !== 'accepted') return;

    var visitorId = getCookie('cf_visitor_id');
    if (!visitorId) {
        visitorId = 'v_' + Math.random().toString(36).substring(2) + Date.now().toString(36);
        setCookie('cf_visitor_id', visitorId, 365);
    }

    var payload = {
        event: eventName,
        visitorId: visitorId,
        page: '/start-google-v2/',
        timestamp: new Date().toISOString()
    };
    if (eventData) payload.eventData = eventData;

    var url = API_BASE + '/api/quiz/track';
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

    var text = 'Based on your answers: ' + barrier + ' keeps getting in the way of ' + activity + '.';
    if (longTime) {
        text += '<br><br>It\'s been a long road. But every moment is a chance to begin anew.';
    }
    text += '<br><br>';
    text += 'But here\'s the good news: <strong>there IS time.</strong> ';
    text += 'Today it can be 30 seconds. Tomorrow, 3 minutes. ';
    text += 'Next week? Maybe 30 minutes that make a real difference.';
    text += '<br><br>';
    text += 'Hours aren\'t necessary. <strong>Consistency beats intensity.</strong> ';
    text += 'A small step every day. That\'s how real consistency is built.';
    text += '<br><br>';
    text += 'Even 30 seconds a day counts. Not hours — just 30 seconds, but <strong>EVERY DAY.</strong> ';
    text += 'That\'s how real consistency is built. The hardest part? Starting. But once it begins, the rest follows.';

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

function showWaError(message) {
    var el = document.getElementById('waError');
    if (el) {
        el.textContent = message;
        el.classList.add('visible');
        setTimeout(function () { el.classList.remove('visible'); }, 5000);
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

    setTimeout(function () {
        observer.disconnect();
        if (!tracked) {
            trackEvent('hero_cta_not_visible', { viewport_height: window.innerHeight });
        }
    }, 3000);
}

/* ── Country Selector ── */
function populateCountrySelector(detectedCode) {
    var select = document.getElementById('waCountrySelect');
    if (!select) return;
    select.innerHTML = '';
    COUNTRIES.forEach(function (c) {
        var opt = document.createElement('option');
        opt.value = c.code;
        opt.textContent = c.label;
        if (c.code === detectedCode) opt.selected = true;
        select.appendChild(opt);
    });
}

function detectCountry() {
    fetch(API_BASE + '/api/landing/detect-country', {
        headers: { 'X-Landing-Secret': LANDING_SECRET }
    })
    .then(function (res) { return res.json(); })
    .then(function (data) {
        if (data.callingCode) {
            populateCountrySelector(data.callingCode);
        }
    })
    .catch(function () {
        // Default to +91 (India) for this Google Ads variant
        populateCountrySelector('+91');
    });
}

/* ── QR Code Generator (minimal inline implementation) ── */
function generateQRCode(text, container) {
    // Use a simple approach: create an img from a public QR API
    // This avoids bundling a QR library for a landing page
    var img = document.createElement('img');
    img.src = 'https://api.qrserver.com/v1/create-qr-code/?size=120x120&data=' + encodeURIComponent(text);
    img.alt = 'QR Code - Scan to open WhatsApp';
    img.width = 120;
    img.height = 120;
    img.style.borderRadius = '8px';
    container.innerHTML = '';
    container.appendChild(img);

    var label = document.createElement('span');
    label.className = 'wa-qr-label';
    label.textContent = 'Or scan with your phone camera';
    container.appendChild(label);
}

/* ── WhatsApp Phone Flow ── */
function initWhatsAppFlow() {
    var phoneInput = document.getElementById('waPhoneInput');
    var consentCheck = document.getElementById('waConsentCheck');
    var btnAddPhone = document.getElementById('btnAddPhone');

    function updateButtonState() {
        var hasPhone = phoneInput && phoneInput.value.trim().length >= 4;
        var hasConsent = consentCheck && consentCheck.checked;
        btnAddPhone.disabled = !(hasPhone && hasConsent);
    }

    if (phoneInput) phoneInput.addEventListener('input', updateButtonState);
    if (consentCheck) consentCheck.addEventListener('change', updateButtonState);

    if (btnAddPhone) {
        btnAddPhone.addEventListener('click', async function () {
            if (!phoneSetupData) return;

            var select = document.getElementById('waCountrySelect');
            var callingCode = select ? select.value : '+91';
            var rawPhone = phoneInput.value.trim();

            // Normalize: prepend calling code if no +
            var phone = rawPhone;
            if (phone && !phone.startsWith('+')) {
                phone = callingCode + phone;
            }

            // Basic E.164 validation
            if (!/^\+[1-9]\d{6,14}$/.test(phone)) {
                showWaError('Please enter a valid phone number with country code.');
                return;
            }

            var marketingCheck = document.getElementById('waMarketingCheck');
            var marketingConsent = marketingCheck ? marketingCheck.checked : false;

            btnAddPhone.disabled = true;
            btnAddPhone.textContent = 'Adding...';
            trackEvent('wa_phone_submit');

            try {
                var res = await fetch(API_BASE + '/api/landing/add-phone', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'X-Landing-Secret': LANDING_SECRET
                    },
                    body: JSON.stringify({
                        userId: phoneSetupData.userId,
                        token: phoneSetupData.token,
                        ts: phoneSetupData.ts,
                        phoneNumber: phone,
                        consentGranted: true,
                        consentText: CONSENT_TEXT,
                        marketingConsentGranted: marketingConsent,
                    }),
                });

                var data = await res.json();
                if (!res.ok) throw new Error(data.error || 'Failed to add phone');

                trackEvent('wa_phone_success');

                // Show verification step
                document.getElementById('waStep1').style.display = 'none';
                document.getElementById('waStep2').style.display = 'block';

                var verifyLink = document.getElementById('waVerifyLink');
                if (verifyLink && data.waLink) {
                    verifyLink.href = data.waLink;
                }

                // Generate QR code
                var qrContainer = document.getElementById('waQrContainer');
                if (qrContainer && data.waLink) {
                    generateQRCode(data.waLink, qrContainer);
                }

            } catch (err) {
                trackEvent('wa_phone_error', { error: (err && err.message) || 'unknown' });
                showWaError((err && err.message) || 'Something went wrong. Try again.');
                btnAddPhone.disabled = false;
                btnAddPhone.textContent = 'Add WhatsApp Number';
            }
        });
    }
}

/* ── DOM Ready ── */
document.addEventListener('DOMContentLoaded', function () {
    captureUTM();
    initCookieConsent();
    detectWebView();
    initScrollTracking();
    detectCountry();
    initWhatsAppFlow();

    // Populate country selector with defaults
    populateCountrySelector('+91');

    // Cookie consent accept
    var cookieAccept = document.getElementById('cookieAccept');
    if (cookieAccept) {
        cookieAccept.addEventListener('click', function () {
            localStorage.setItem('cf-cookie-consent', 'accepted');
            document.getElementById('cookieBanner').classList.remove('visible');
            gtag('consent', 'update', {
                'ad_storage': 'granted',
                'ad_user_data': 'granted',
                'ad_personalization': 'granted',
                'analytics_storage': 'granted'
            });
        });
    }

    // Cookie consent decline
    var cookieDecline = document.getElementById('cookieDecline');
    if (cookieDecline) {
        cookieDecline.addEventListener('click', function () {
            localStorage.setItem('cf-cookie-consent', 'declined');
            document.getElementById('cookieBanner').classList.remove('visible');
        });
    }

    // WebView banner
    var webviewOpen = document.getElementById('webviewOpen');
    if (webviewOpen) {
        webviewOpen.addEventListener('click', function () {
            window.open(window.location.href, '_system');
        });
    }

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

    var webviewClose = document.getElementById('webviewClose');
    if (webviewClose) {
        webviewClose.addEventListener('click', function () {
            document.getElementById('webviewBanner').classList.remove('visible');
        });
    }

    // Consent checkbox
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

    // Start quiz
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

    // Quiz answers
    document.querySelectorAll('.answer-btn[data-q]').forEach(function (btn) {
        btn.addEventListener('click', function () {
            var qNum = parseInt(this.dataset.q);
            var value = this.dataset.value;

            answers['q' + qNum] = value;
            trackEvent('quiz_q' + qNum, { answer: value });

            var siblings = document.querySelectorAll('#page-q' + qNum + ' .answer-btn');
            siblings.forEach(function (b) { b.classList.remove('selected'); });
            btn.classList.add('selected');

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

    // Email submit
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

        var utm = {};
        try {
            utm = JSON.parse(sessionStorage.getItem('cf_utm') || '{}');
        } catch (e) {}

        var apiOk = false;
        try {
            var res = await fetch(API_BASE + '/api/landing/onboard', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-Landing-Secret': LANDING_SECRET,
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
                    source: 'quiz-v3-google-v2',
                    utm: utm,
                }),
            });

            var data = await res.json();
            if (!res.ok) throw new Error(data.error || 'Something went wrong');
            apiOk = true;

            // Store phoneSetup data for WhatsApp flow
            if (data.phoneSetup) {
                phoneSetupData = data.phoneSetup;
            }
        } catch (err) {
            trackEvent('quiz_api_error', { error: (err && err.message) || 'unknown' });
            showError((err && err.message) || 'Network error. Please try again.');
            btn.disabled = false;
            btn.innerHTML = originalHTML;
            var consent = document.getElementById('consentCheck');
            if (consent && !consent.checked) btn.disabled = true;
            return;
        }

        if (apiOk) {
            trackEvent('quiz_api_success');

            var txId = 'cf_' + Date.now() + '_' + Math.random().toString(36).substring(2, 8);
            try { gtag_report_conversion(txId); } catch (e) {}

            // Hide WA card if no phoneSetup token (shouldn't happen, but safe)
            if (!phoneSetupData) {
                var card = document.getElementById('waPhoneCard');
                if (card) card.style.display = 'none';
            }

            pageHistory.push('thanks');
            showPage('thanks');
        }
    });
});
