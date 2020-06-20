var loading = document.getElementById('loading');
var mensaje = document.getElementById('mensaje');

var boton = document.getElementById('carga_ajax');
boton.addEventListener('click', function() {
  loading.style.display = 'block';
  axios.get('http://localhost:5000/api/customers')
    .then(function(res) {
      if(res.status==200) {
        mensaje.innerHTML = res.data;
      }
      console.log(res.data);
    })
    .catch(function(err) {
      mensaje.innerText = 'Error de conexión ' + err;
    })
    .then(function() {
      loading.style.display = 'none';
    });
});