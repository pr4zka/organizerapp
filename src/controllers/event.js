const pool = require("../config/db");
const moment = require("moment");
moment().format();
const controller = {};

controller.add = (req, res) => {
  res.render("events");
};
controller.addd = async (req, res) => {
  try {
    const { title, description } = req.body;
    const newEvent = {
      title,
      description,
      users_id: req.user.id
    };

    const events = await pool.query("INSERT INTO events set ?", [newEvent]);
    console.log(events );
    req.flash('succes', 'events saved succesfuly')
    res.redirect("events");
  } catch (error) {
    console.error(error);
    console.log({ msg: "Ocurrio un problema" });
  }
};

//listar eventos
controller.list = async (req, res) => {
  try {
    const list = await pool.query("SELECT * FROM events WHERE users_id = ?", [req.user.id]);
    res.render("listEvents", { list, moment });
  } catch (error) {
    res.send({ msg: "Algo ocurrio" });
  }
};

//eliminar evento
controller.delete = async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query("DELETE FROM events WHERE events_id = ?", [id]);
    req.flash('succes', "Evento eliminado con exito")
    res.redirect("/events/list");
  } catch (error) {
    console.log({ error: Array });
  }
};

controller.edit = async (req, res) => {
  try {
    const { id } = req.params;
    const events = await pool.query("SELECT * FROM events WHERE events_id=?", [id]);
    res.render("edit", { events });
  } catch (error) {
    console.log(error);
  }
};

controller.editt = async (req, res) => {
  const { id } = req.params;
  const { title, description } = req.body;
  const newEvent = {
    title,
    description,

  };
  await pool.query('UPDATE events set ? WHERE events_id = ?', [newEvent, id])
  req.flash('succes', 'Evento actualizado')
  res.redirect('/events/list');
};
 
module.exports = controller;
