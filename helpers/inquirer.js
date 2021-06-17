const inquirer = require("inquirer");

require("colors");

const questions = [
  {
    type: "list",
    name: "opt",
    message: "¿Que desea hacer?",
    choices: [
      {
        value: 1,
        name: `${"1.".green} Buscar Ciudad`,
      },

      {
        value: 2,
        name: `${"2.".green} Historial`,
      },
      {
        value: 0,
        name: `${"0.".green} Salir`,
      },
    ],
  },
];
const inquirerMenu = async () => {
  console.clear();

  console.log("===========================".blue);
  console.log("|  Seleccione una opción  |".white.bgCyan);
  console.log("===========================\n".blue);

  const { opt } = await inquirer.prompt(questions);
  return opt;
};
const pause = async () => {
  const q = [
    {
      type: "input",
      name: "Pause",
      message: `Presione la tecla ${
        "enter".toUpperCase().green
      } para continuar`,
    },
  ];
  console.log("\n");
  await inquirer.prompt(q);
};
const leerInput = async (message) => {
  const question = [
    {
      type: "input",
      name: "desc",
      message,
      validate(value) {
        if (value.length === 0) return "Por favor ingrese un valor";
        return true;
      },
    },
  ];
  const { desc } = await inquirer.prompt(question);
  return desc;
};
const listarLugares = async (lugares = []) => {
  const choices = lugares.map((lugar, i) => {
    const idx = `${i + 1}.`.green;
    const { desc } = lugar;
    return {
      value: lugar.id,
      name: `${idx} ${lugar.nombre}`,
    };
  });
  choices.unshift({
    value: "0",
    name: "0.".green + "  Cancelar ",
  });
  const questions = [
    {
      type: "list",
      name: "id",
      message: "Seleccione un lugar",
      choices,
    },
  ];
  const { id } = await inquirer.prompt(questions);
  return id;
};
const confirmar = async (message) => {
  const question = [{ type: "confirm", name: "OK", message }];
  const ok = await inquirer.prompt(question);
  return ok;
};
const mostrarCheckList = async (task) => {
  const choices = task.map((tarea, i) => {
    const idx = `${i + 1}.`.green;
    const { desc } = tarea;
    return {
      value: tarea.id,
      name: `${idx} ${desc}`,
      checked: tarea.completadoEn ? true : false,
    };
  });
  const questions = [
    {
      type: "checkbox",
      name: "ids",
      message: "Selecciones",
      choices,
    },
  ];
  const { ids } = await inquirer.prompt(questions);
  return ids;
};
module.exports = {
  inquirerMenu,
  leerInput,
  pause,
  listarLugares,
  confirmar,
  mostrarCheckList,
};
