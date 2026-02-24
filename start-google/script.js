/* ── Google Ads gtag is initialized in <head> (index.html) ── */

var answers = {};
var currentPage = 'hero';
var totalQuestions = 6;
var pageHistory = ['hero'];
var phoneSetupData = null; // {token, userId, ts} from onboard response

/* ── Country calling codes (searchable by name or code) ── */
var COUNTRIES = [
    {code:'+93',name:'Afghanistan'},{code:'+355',name:'Albania'},{code:'+213',name:'Algeria'},
    {code:'+376',name:'Andorra'},{code:'+244',name:'Angola'},{code:'+54',name:'Argentina'},
    {code:'+374',name:'Armenia'},{code:'+61',name:'Australia'},{code:'+43',name:'Austria'},
    {code:'+994',name:'Azerbaijan'},{code:'+973',name:'Bahrain'},{code:'+880',name:'Bangladesh'},
    {code:'+375',name:'Belarus'},{code:'+32',name:'Belgium'},{code:'+229',name:'Benin'},
    {code:'+975',name:'Bhutan'},{code:'+591',name:'Bolivia'},{code:'+387',name:'Bosnia'},
    {code:'+267',name:'Botswana'},{code:'+55',name:'Brazil'},{code:'+673',name:'Brunei'},
    {code:'+359',name:'Bulgaria'},{code:'+226',name:'Burkina Faso'},{code:'+257',name:'Burundi'},
    {code:'+855',name:'Cambodia'},{code:'+237',name:'Cameroon'},{code:'+1',name:'Canada'},
    {code:'+236',name:'Central African Rep.'},{code:'+235',name:'Chad'},{code:'+56',name:'Chile'},
    {code:'+86',name:'China'},{code:'+57',name:'Colombia'},{code:'+269',name:'Comoros'},
    {code:'+243',name:'Congo (DRC)'},{code:'+242',name:'Congo (Republic)'},
    {code:'+506',name:'Costa Rica'},{code:'+225',name:'Cote d\'Ivoire'},{code:'+385',name:'Croatia'},
    {code:'+53',name:'Cuba'},{code:'+357',name:'Cyprus'},{code:'+420',name:'Czechia'},
    {code:'+45',name:'Denmark'},{code:'+253',name:'Djibouti'},{code:'+1',name:'Dominican Republic'},
    {code:'+593',name:'Ecuador'},{code:'+20',name:'Egypt'},{code:'+503',name:'El Salvador'},
    {code:'+240',name:'Equatorial Guinea'},{code:'+291',name:'Eritrea'},{code:'+372',name:'Estonia'},
    {code:'+268',name:'Eswatini'},{code:'+251',name:'Ethiopia'},{code:'+358',name:'Finland'},
    {code:'+33',name:'France'},{code:'+241',name:'Gabon'},{code:'+220',name:'Gambia'},
    {code:'+995',name:'Georgia'},{code:'+49',name:'Germany'},{code:'+233',name:'Ghana'},
    {code:'+30',name:'Greece'},{code:'+502',name:'Guatemala'},{code:'+224',name:'Guinea'},
    {code:'+245',name:'Guinea-Bissau'},{code:'+592',name:'Guyana'},{code:'+509',name:'Haiti'},
    {code:'+504',name:'Honduras'},{code:'+852',name:'Hong Kong'},{code:'+36',name:'Hungary'},
    {code:'+354',name:'Iceland'},{code:'+91',name:'India'},{code:'+62',name:'Indonesia'},
    {code:'+98',name:'Iran'},{code:'+964',name:'Iraq'},{code:'+353',name:'Ireland'},
    {code:'+972',name:'Israel'},{code:'+39',name:'Italy'},{code:'+1',name:'Jamaica'},
    {code:'+81',name:'Japan'},{code:'+962',name:'Jordan'},{code:'+7',name:'Kazakhstan'},
    {code:'+254',name:'Kenya'},{code:'+965',name:'Kuwait'},{code:'+996',name:'Kyrgyzstan'},
    {code:'+856',name:'Laos'},{code:'+371',name:'Latvia'},{code:'+961',name:'Lebanon'},
    {code:'+266',name:'Lesotho'},{code:'+231',name:'Liberia'},{code:'+218',name:'Libya'},
    {code:'+423',name:'Liechtenstein'},{code:'+370',name:'Lithuania'},{code:'+352',name:'Luxembourg'},
    {code:'+853',name:'Macao'},{code:'+261',name:'Madagascar'},{code:'+265',name:'Malawi'},
    {code:'+60',name:'Malaysia'},{code:'+960',name:'Maldives'},{code:'+223',name:'Mali'},
    {code:'+356',name:'Malta'},{code:'+222',name:'Mauritania'},{code:'+230',name:'Mauritius'},
    {code:'+52',name:'Mexico'},{code:'+373',name:'Moldova'},{code:'+377',name:'Monaco'},
    {code:'+976',name:'Mongolia'},{code:'+382',name:'Montenegro'},{code:'+212',name:'Morocco'},
    {code:'+258',name:'Mozambique'},{code:'+95',name:'Myanmar'},{code:'+264',name:'Namibia'},
    {code:'+977',name:'Nepal'},{code:'+31',name:'Netherlands'},{code:'+64',name:'New Zealand'},
    {code:'+505',name:'Nicaragua'},{code:'+227',name:'Niger'},{code:'+234',name:'Nigeria'},
    {code:'+389',name:'North Macedonia'},{code:'+47',name:'Norway'},{code:'+968',name:'Oman'},
    {code:'+92',name:'Pakistan'},{code:'+507',name:'Panama'},{code:'+675',name:'Papua New Guinea'},
    {code:'+595',name:'Paraguay'},{code:'+51',name:'Peru'},{code:'+63',name:'Philippines'},
    {code:'+48',name:'Poland'},{code:'+351',name:'Portugal'},{code:'+974',name:'Qatar'},
    {code:'+40',name:'Romania'},{code:'+7',name:'Russia'},{code:'+250',name:'Rwanda'},
    {code:'+966',name:'Saudi Arabia'},{code:'+221',name:'Senegal'},{code:'+381',name:'Serbia'},
    {code:'+232',name:'Sierra Leone'},{code:'+65',name:'Singapore'},{code:'+421',name:'Slovakia'},
    {code:'+386',name:'Slovenia'},{code:'+252',name:'Somalia'},{code:'+27',name:'South Africa'},
    {code:'+82',name:'South Korea'},{code:'+211',name:'South Sudan'},{code:'+34',name:'Spain'},
    {code:'+94',name:'Sri Lanka'},{code:'+249',name:'Sudan'},{code:'+597',name:'Suriname'},
    {code:'+46',name:'Sweden'},{code:'+41',name:'Switzerland'},{code:'+963',name:'Syria'},
    {code:'+886',name:'Taiwan'},{code:'+992',name:'Tajikistan'},{code:'+255',name:'Tanzania'},
    {code:'+66',name:'Thailand'},{code:'+670',name:'Timor-Leste'},{code:'+228',name:'Togo'},
    {code:'+216',name:'Tunisia'},{code:'+90',name:'Turkey'},{code:'+993',name:'Turkmenistan'},
    {code:'+256',name:'Uganda'},{code:'+380',name:'Ukraine'},{code:'+971',name:'UAE'},
    {code:'+44',name:'United Kingdom'},{code:'+1',name:'United States'},
    {code:'+598',name:'Uruguay'},{code:'+998',name:'Uzbekistan'},{code:'+58',name:'Venezuela'},
    {code:'+84',name:'Vietnam'},{code:'+967',name:'Yemen'},{code:'+260',name:'Zambia'},
    {code:'+263',name:'Zimbabwe'},
];
var detectedCallingCode = '+91';
var detectedCountryName = 'India';

var API_BASE = 'https://app.consistencyforge.com';
var LANDING_SECRET = '34ba25af77603821540bfecad43e81670f97c3c8146e114a1f1cfb30ef647e08';

var CONSENT_TEXT = 'I consent to receive check-in reminders and account notifications via WhatsApp from ConsistencyForge. I can opt out anytime by sending STOP via WhatsApp or removing my phone number. Message frequency depends on my contract schedule.';

/* ── UTM Capture ── */
function captureUTM() {
    var params = new URLSearchParams(window.location.search);
    var utmKeys = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term', 'fbclid', 'gclid', 'gbraid', 'wbraid'];
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
        page: '/start-google/',
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

/* ── Ad Click Tracking ── */
function trackAdClick() {
    try {
        if (sessionStorage.getItem('cf_click_tracked')) return;

        var clickParams = new URLSearchParams(window.location.search);
        if (clickParams.get('gclid') || clickParams.get('gbraid') || clickParams.get('wbraid') || clickParams.get('utm_source')) {
            var payload = JSON.stringify({
                landing_page: window.location.pathname,
                gclid: clickParams.get('gclid'),
                gbraid: clickParams.get('gbraid'),
                wbraid: clickParams.get('wbraid'),
                utm_source: clickParams.get('utm_source'),
                utm_medium: clickParams.get('utm_medium'),
                utm_campaign: clickParams.get('utm_campaign'),
                utm_content: clickParams.get('utm_content'),
                utm_term: clickParams.get('utm_term'),
                cookies_enabled: navigator.cookieEnabled,
                referrer: document.referrer
            });

            var url = API_BASE + '/api/track/click';
            var sent = false;
            if (navigator.sendBeacon) {
                sent = navigator.sendBeacon(url, new Blob([payload], { type: 'application/json' }));
            }
            if (!sent) {
                fetch(url, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: payload,
                    keepalive: true
                }).catch(function() {});
            }
            sessionStorage.setItem('cf_click_tracked', 'true');
        }
    } catch (e) {}
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

/* ── Country Auto-detect + Autocomplete ── */
function detectCountry() {
    var phoneInput = document.getElementById('waPhoneInput');
    var hint = document.getElementById('waCountryHint');

    fetch(API_BASE + '/api/landing/detect-country', {
        headers: { 'X-Landing-Secret': LANDING_SECRET }
    })
    .then(function (res) { return res.json(); })
    .then(function (data) {
        if (data.callingCode) {
            detectedCallingCode = data.callingCode;
            detectedCountryName = data.countryName || '';
        }
        prefillPhone();
    })
    .catch(function () {
        prefillPhone();
    });

    function prefillPhone() {
        if (phoneInput && !phoneInput.value) {
            phoneInput.value = detectedCallingCode + ' ';
            phoneInput.placeholder = detectedCallingCode + ' 9876543210';
        }
        if (hint) {
            hint.textContent = 'Detected: ' + detectedCountryName + ' (' + detectedCallingCode + '). Edit the code if your number is from another country.';
            hint.classList.add('visible');
        }
    }
}

function initPhoneAutocomplete() {
    var phoneInput = document.getElementById('waPhoneInput');
    var suggestionsEl = document.getElementById('waSuggestions');
    var hint = document.getElementById('waCountryHint');
    if (!phoneInput || !suggestionsEl) return;

    var activeSuggestion = -1;

    function showSuggestions(matches) {
        suggestionsEl.innerHTML = '';
        activeSuggestion = -1;
        if (matches.length === 0) {
            suggestionsEl.style.display = 'none';
            phoneInput.setAttribute('aria-expanded', 'false');
            return;
        }
        matches.forEach(function (c, i) {
            var div = document.createElement('div');
            div.className = 'wa-suggestion-item';
            div.setAttribute('role', 'option');
            div.setAttribute('id', 'wa-sug-' + i);
            div.textContent = c.code + ' ' + c.name;
            div.setAttribute('data-code', c.code);
            div.setAttribute('data-name', c.name);
            div.addEventListener('mousedown', function (e) {
                e.preventDefault(); // prevent blur
                selectSuggestion(c);
            });
            suggestionsEl.appendChild(div);
        });
        suggestionsEl.style.display = 'block';
        phoneInput.setAttribute('aria-expanded', 'true');
    }

    function hideSuggestions() {
        suggestionsEl.style.display = 'none';
        phoneInput.setAttribute('aria-expanded', 'false');
    }

    function selectSuggestion(c) {
        var val = phoneInput.value;
        // Preserve any digits the user already typed after the code
        var numberPart = val.replace(/^\+\d*\s*/, '').replace(/^[a-zA-Z\s]*/, '');
        phoneInput.value = c.code + ' ' + numberPart;
        hideSuggestions();
        phoneInput.focus();
        // Place cursor at end
        var len = phoneInput.value.length;
        phoneInput.setSelectionRange(len, len);
        // Update hint
        if (hint) {
            hint.textContent = 'Selected: ' + c.name + ' (' + c.code + ')';
            hint.classList.add('visible');
        }
        // Trigger button state update
        phoneInput.dispatchEvent(new Event('input'));
    }

    phoneInput.addEventListener('input', function () {
        var val = this.value;

        // If input is empty or just "+", show no suggestions
        if (!val || val === '+') {
            hideSuggestions();
            return;
        }

        // Determine what the user is doing: typing a code, searching by name, or entering digits
        var spaceIdx = val.indexOf(' ');
        var prefix = spaceIdx > 0 ? val.substring(0, spaceIdx) : val;
        var afterSpace = spaceIdx > 0 ? val.substring(spaceIdx + 1) : '';

        // If user has typed a code AND started typing digits after space, they're entering their number — no suggestions
        if (spaceIdx > 0 && /\d/.test(afterSpace)) {
            hideSuggestions();
            // Update hint to show matched country for the typed code
            if (hint && prefix.startsWith('+')) {
                var codeDigits = prefix.replace('+', '');
                var matched = COUNTRIES.find(function (c) { return c.code === prefix; });
                if (matched) {
                    hint.textContent = matched.name + ' (' + matched.code + ')';
                    hint.classList.add('visible');
                } else if (!val.startsWith(detectedCallingCode)) {
                    hint.classList.remove('visible');
                }
            }
            return;
        }

        // User is typing a country name after space (e.g., "+91 Ind" or "+ Pak")
        if (spaceIdx > 0 && afterSpace.length >= 2 && /^[a-zA-Z]/.test(afterSpace)) {
            var nameLower = afterSpace.toLowerCase();
            var nameMatches = COUNTRIES.filter(function (c) {
                return c.name.toLowerCase().indexOf(nameLower) >= 0;
            }).slice(0, 6);
            showSuggestions(nameMatches);
            return;
        }

        // User is typing digits in the code area (e.g., "+9", "+91", "+234")
        if (prefix.startsWith('+')) {
            var queryDigits = prefix.replace(/[^\d]/g, '');
            if (queryDigits && queryDigits.length <= 4) {
                var codeMatches = COUNTRIES.filter(function (c) {
                    return c.code.replace('+', '').startsWith(queryDigits);
                });
                // Deduplicate by code+name
                var seen = {};
                codeMatches = codeMatches.filter(function (c) {
                    var key = c.code + c.name;
                    if (seen[key]) return false;
                    seen[key] = true;
                    return true;
                }).slice(0, 6);
                showSuggestions(codeMatches);
                return;
            }
        }

        hideSuggestions();
    });

    // Keyboard navigation in suggestions
    phoneInput.addEventListener('keydown', function (e) {
        var items = suggestionsEl.querySelectorAll('.wa-suggestion-item');
        if (!items.length || suggestionsEl.style.display === 'none') return;

        if (e.key === 'ArrowDown') {
            e.preventDefault();
            activeSuggestion = Math.min(activeSuggestion + 1, items.length - 1);
            updateActive(items);
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            activeSuggestion = Math.max(activeSuggestion - 1, 0);
            updateActive(items);
        } else if (e.key === 'Enter' && activeSuggestion >= 0) {
            e.preventDefault();
            var code = items[activeSuggestion].getAttribute('data-code');
            var name = items[activeSuggestion].getAttribute('data-name');
            selectSuggestion({ code: code, name: name });
        } else if (e.key === 'Escape') {
            hideSuggestions();
        }
    });

    function updateActive(items) {
        items.forEach(function (el, i) {
            el.classList.toggle('active', i === activeSuggestion);
            if (i === activeSuggestion) {
                phoneInput.setAttribute('aria-activedescendant', el.id);
            }
        });
    }

    // Hide suggestions on blur (with delay for click/tap)
    phoneInput.addEventListener('blur', function () {
        setTimeout(function () { hideSuggestions(); }, 150);
    });

    // Hide suggestions on outside click
    document.addEventListener('click', function (e) {
        if (!phoneInput.contains(e.target) && !suggestionsEl.contains(e.target)) {
            hideSuggestions();
        }
    });
}

/* ── QR Code Generator (client-side, qrcode-generator library) ── */
function generateQRCode(text, container) {
    container.innerHTML = '';

    try {
        var qr = qrcode(0, 'M');
        qr.addData(text);
        qr.make();

        var svg = qr.createSvgTag({ cellSize: 3, margin: 2, scalable: true });
        var wrapper = document.createElement('div');
        wrapper.innerHTML = svg;
        var svgEl = wrapper.firstChild;
        svgEl.setAttribute('width', '120');
        svgEl.setAttribute('height', '120');
        svgEl.style.borderRadius = '8px';
        svgEl.style.background = '#fff';
        container.appendChild(svgEl);
    } catch (e) {
        container.style.display = 'none';
        return;
    }

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
        // Require: has digits beyond the calling code prefix, and consent checked
        var val = phoneInput ? phoneInput.value.replace(/\s/g, '') : '';
        var hasPhone = val.length >= 8 && val.startsWith('+');
        var hasConsent = consentCheck && consentCheck.checked;
        btnAddPhone.disabled = !(hasPhone && hasConsent);
    }

    if (phoneInput) phoneInput.addEventListener('input', updateButtonState);
    if (consentCheck) consentCheck.addEventListener('change', updateButtonState);

    // "Use different number" escape — go back to Step 1
    var btnChangeNumber = document.getElementById('waChangeNumber');
    if (btnChangeNumber) {
        btnChangeNumber.addEventListener('click', function () {
            document.getElementById('waStep2').style.display = 'none';
            document.getElementById('waStep1').style.display = 'block';
            // Re-enable the submit button
            if (btnAddPhone) {
                btnAddPhone.disabled = false;
                btnAddPhone.textContent = 'Add WhatsApp Number';
            }
            // Focus the phone input for editing
            if (phoneInput) phoneInput.focus();
        });
    }

    if (btnAddPhone) {
        btnAddPhone.addEventListener('click', async function () {
            if (!phoneSetupData) return;

            var rawPhone = phoneInput.value.trim();

            // Normalize: strip spaces/dashes, auto-prepend detected code if no +
            var phone = rawPhone.replace(/[\s\-()]/g, '');
            if (phone && !phone.startsWith('+')) {
                phone = detectedCallingCode + phone;
            }

            // Basic E.164 validation
            if (!/^\+[1-9]\d{6,14}$/.test(phone)) {
                showWaError('Please enter a valid phone number starting with + and country code (e.g., ' + detectedCallingCode + '9876543210).');
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
    initPhoneAutocomplete();
    initWhatsAppFlow();

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
            trackAdClick();
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

    // If consent was already granted in a previous visit, track immediately
    if (localStorage.getItem('cf-cookie-consent') === 'accepted') {
        trackAdClick();
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
                    source: 'quiz-v3-google',
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
