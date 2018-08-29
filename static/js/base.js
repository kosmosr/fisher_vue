(function () {
  url = window.location.pathname
  if (url === '/') {
    $('#recent').addClass('linking')
  }
  if (url === '/gifts') {
    $('#gifts').addClass('linking')
  }
  if (url === '/wishes') {
    $('#wishes').addClass('linking')
  }
  if (url === '/pending') {
    $('#pending').addClass('linking')
  }
})()
