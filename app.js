function buscarVehiculos() { 
  fetch('../data/vehicles.json')
    .then(res => res.json())
    .then(data => {
      let marca = document.getElementById('marca').value.toLowerCase();
      let modelo = document.getElementById('modelo').value.toLowerCase();
      let tipo = document.getElementById('tipo').value.toLowerCase();
      let vin = document.getElementById('vin').value.toLowerCase();
      let resultados = data.filter(v => 
        (marca === '' || v.marca.toLowerCase().includes(marca)) &&
        (modelo === '' || v.modelo.toLowerCase().includes(modelo)) &&
        (tipo === '' || v.tipo.toLowerCase() === tipo) &&
        (vin === '' || v.vin.toLowerCase() === vin)
      );
      let cont = document.getElementById('resultados');
      cont.innerHTML = '';
      resultados.forEach(v => {
        let div = document.createElement('div');
        div.classList.add('ficha-vehiculo');
        div.innerHTML = `<h3>${v.marca} ${v.modelo} (${v.anio})</h3>
          <p>Motor: ${v.motor}</p>
          <p>Neumáticos: ${v.neumaticos}</p>
          <p>Fluidos: Aceite ${v.fluidos.aceite}, Refrigerante ${v.fluidos.refrigerante}, Frenos ${v.fluidos.frenos}</p>
          <p>Pares: Bujías ${v.pares.bujias}, Tornillo rueda ${v.pares.tornilloRueda}</p>
          <p>Manual: <a href="../assets/manuals/${v.manual}" target="_blank">${v.manual}</a></p>
          <div class="presupuesto">
            <h4>Presupuesto</h4>
            <label>Piezas (€): <input type="number" class="piezas" value="0"></label><br>
            <label>Mano de obra (€): <input type="number" class="mano-obra" value="0"></label><br>
            <label>IVA (%): <input type="number" class="iva" value="21"></label><br>
            <button onclick="calcularPresupuesto(this)">Calcular</button>
            <p class="resultado"></p>
          </div>`;
        cont.appendChild(div);
      });
    });
}

function calcularPresupuesto(button) {
  let ficha = button.closest('.ficha-vehiculo');
  let piezas = parseFloat(ficha.querySelector('.piezas').value) || 0;
  let manoObra = parseFloat(ficha.querySelector('.mano-obra').value) || 0;
  let iva = parseFloat(ficha.querySelector('.iva').value) || 0;
  let subtotal = piezas + manoObra;
  let totalIVA = subtotal * (iva/100);
  let total = subtotal + totalIVA;
  ficha.querySelector('.resultado').innerHTML = `Subtotal: €${subtotal.toFixed(2)} <br>IVA (${iva}%): €${totalIVA.toFixed(2)} <br>Total: €${total.toFixed(2)}`;
}
