var innerText = '';

document.addEventListener('mousemove', trackInformations);
document.addEventListener('mousedown', trackInformations);

function trackInformations(e) {
  var currentText = e.currentTarget.innerText;
  if (innerText === currentText && e.type !== 'mousedown') {
    return;
  }

  axios
    .post('https://uat-api.producthq.io/trackings', {
      customer_id: phq_config.client_id || 0,
      fullname: getFullName() || '',
      host: window.location.host,
    })
    .then((response) => {
      console.log('response:', response);
    })
    .catch((error) => {
      console.log('error:', error);
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
