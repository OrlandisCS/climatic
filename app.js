require("colors");
require("dotenv").config();
const {
  inquirerMenu,
  leerInput,
  pause,
  listarLugares,
} = require("./helpers/inquirer");
const Busquedas = require("./models/busquedas");
const main = async () => {
  const busquedas = new Busquedas();
  let opt;
  do {
    opt = await inquirerMenu();
    switch (opt) {
      case 1:
        //Mostrar mensaje
        //Seleeccionar lugar
        const query = await leerInput("Ciudad: ");
        const lugares = await busquedas.ciudad(query);
        const id = await listarLugares(lugares);

        if (id === "0") continue;

        const lugarSel = lugares.find((lugar) => lugar.id === id);
        busquedas.crearHistorial(lugarSel.nombre);
        //Clima

        const clima = await busquedas.obtenerClima(lugarSel.lat, lugarSel.lng);
        //mostrar resultados
        console.log({ id });
        console.log(`\nInformación de la Ciudad\n`.blue);
        console.log(`Ciudad: ${lugarSel.nombre.green}`);
        console.log("Lat: ", lugarSel.lat);
        console.log("Lng: ", lugarSel.lng);
        console.log("Temperatura:, ", clima.temp);
        console.log("Mínima: ", clima.min);
        console.log("Máxima: ", clima.max);
        console.log(`EL clima está: ${clima.desc.green}`);

        break;
      case 2:
        console.log(`\nHistorial del usuario\n`.blue);
        busquedas.historialCap.forEach((lugar, i) => {
          const idx = `${i + 1}.`.green;
          console.log(`${idx} ${lugar}`);
        });
        break;
    }
    if (opt !== 0) await pause();
  } while (opt !== 0);
  {
  }
};
main();
