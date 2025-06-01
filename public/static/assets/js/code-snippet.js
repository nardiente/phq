var innerText = '';

document.addEventListener('mousedown', trackInformations);

function trackInformations(e) {
  // Ensure phq_config exists and is an object
  if (typeof phq_config !== 'object' || !phq_config) {
    return;
  }

  // Only track on mousedown for privacy and performance
  var currentText = e.currentTarget.innerText;
  if (innerText === currentText) {
    return;
  }

  // Use HTTPS in production
  var endpoint = 'http://localhost:8888/trackings';

  switch (phq_config.environment) {
    case 'production':
      endpoint = 'https://app-api.producthq.io/trackings';
      break;
    case 'uat':
      endpoint = 'https://uat-api.producthq.io/trackings';
      break;
    case 'integration':
      endpoint = 'https://intr-api.producthq.io/trackings';
      break;
    default:
      break;
  }

  // Add CSRF token if available
  var headers = {};
  if (window.csrfToken) {
    headers['X-CSRF-Token'] = window.csrfToken;
  }

  axios
    .post(
      endpoint,
      {
        customer_id: phq_config.client_id || 0,
        fullname: getFullName() || '',
        host: window.location.host,
      },
      { headers }
    )
    .catch(function (err) {
      // Optionally log or handle error
      // console.error('Tracking error:', err);
    });

  innerText = currentText;
}

function getFullName() {
  var fullname = null;
  var node = document.getElementById(phq_config.full_name);
  if (node) {
    fullname = node.innerText;
    if (!fullname || fullname.length === 0) {
      fullname = node.getAttribute('value');
    }
  }
  return fullname;
}
