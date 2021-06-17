const axios = require("axios");
const fs = require("fs");
class Busquedas {
  historial = [];
  dbPath = "./db/data.json";
  constructor() {
    this.leerDB();
    console.log(this.historialCap);
  }
  get historialCap() {
    return this.historial.map((lugar) => {
      let palabras = lugar.split(" ");
      palabras = palabras.map((p) => p[0].toUpperCase() + p.substring(1));
      return palabras.join(" ");
    });
  }
  get paramsMap() {
    return {
      access_token: process.env.API_TOKEN,
      limit: 5,
      language: "es",
    };
  }
  get paramsClima() {
    return {
      appid: process.env.OPENWETHER,
      units: "metric",
      lang: "es",
    };
  }

  async ciudad(lugar = "") {
    //Petición HTTP
    //console.log("El lugar es", lugar);
    try {
      const instance = axios.create({
        baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${lugar}.json`,
        params: this.paramsMap,
      });

      const response = await instance.get();
      return response.data.features.map((lugar) => ({
        id: lugar.id,
        nombre: lugar.place_name,
        lng: lugar.center[0],
        lat: lugar.center[1],
      }));
      //Todas las ciudades coincidientes
    } catch (error) {
      throw error;
    }
  }
  async obtenerClima(lat = "", lon = "") {
    console.clear();
    try {
      const instance = axios.create({
        baseURL: `https://api.openweathermap.org/data/2.5/weather?`,
        params: { ...this.paramsClima, lat, lon },
      });
      const resultado = await instance.get();
      const { weather, main } = resultado.data;
      return {
        desc: weather[0].description,
        min: main.temp_min,
        max: main.temp_max,
        temp: main.temp,
      };
    } catch (error) {
      throw error;
    }
  }
  crearHistorial(nombre = "") {
    if (this.historial.includes(nombre.toLowerCase())) {
      return;
    }
    this.historial = this.historial.splice(0, 6);
    this.historial.unshift(nombre.toLowerCase());

    this.guardarDB();
    //grabar en db
  }
  guardarDB() {
    fs.writeFileSync(this.dbPath, JSON.stringify(this.historial));
  }
  leerDB() {
    if (fs.existsSync(this.dbPath)) {
      const info = fs.readFileSync(this.dbPath, { encoding: "utf-8" });
      const data = JSON.parse(info);
      this.historial = data;
    }
  }
}
module.exports = Busquedas;
