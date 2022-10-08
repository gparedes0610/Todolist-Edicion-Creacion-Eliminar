import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import Header from "./Components/Header";

function App() {
  ////HOOKS
  const dataPaises = [
    { id: 1, nombre: "Filipinas", minutos: 241 },
    { id: 2, nombre: "Brasil", minutos: 225 },
    { id: 3, nombre: "Colombia", minutos: 216 },
    { id: 4, nombre: "Nigeria", minutos: 216 },
    { id: 5, nombre: "Argentina", minutos: 207 },
    { id: 6, nombre: "Indonesia", minutos: 195 },
    { id: 7, nombre: "Emiratos Árabes Unidos", minutos: 191 },
    { id: 8, nombre: "México", minutos: 190 },
    { id: 9, nombre: "Sudáfrica", minutos: 190 },
    { id: 10, nombre: "Egipto", minutos: 186 },
  ];
  const [data, setData] = useState(dataPaises);

  const [paisSeleccionado, setPaisSeleccionado] = useState({
    id: "",
    nombre: "",
    minutos: "",
  });

  const handlechange = (e) => {
    setPaisSeleccionado({
      ...paisSeleccionado,
      [e.target.name]: e.target.value,
    });
  };

  ///HOOKS DE REACT BOOSTRAPS
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [showEditar, setShowEditar] = useState(false);

  const handleCloseEditar = () => setShowEditar(false);
  const handleShowEditar = (item) => {
    console.log("ver item =>", item);
    setPaisSeleccionado(item);
    setShowEditar(true);
  };

  ///////////////////////////////////

  const agregarTarea = () => {
    setPaisSeleccionado(null);
    handleShow();
  };

  const tareaNuevaAgregada = () => {
    var valorInsertar = paisSeleccionado;
    valorInsertar.id = data[data.length - 1].id + 1;

    var dataNueva = data;

    dataNueva.push(valorInsertar);
    setData(dataNueva);
    handleClose();
  };
  const eliminarTarea = (tarea) => {
    console.log("ver tarea =>", tarea);
    if(data.length == 1){
      alert('debe haber al menos un pais 😒')
      return;
    }else{
      setData(
        data.filter((item) => {
          return item.id !== tarea.id;
        })
      );
    }
   
  };

  const editarTarea = () => {
    var dataNueva = data;
    dataNueva.map((pais) => {
      if (pais.id === paisSeleccionado.id) {
        pais.minutos = paisSeleccionado.minutos;
        pais.nombre = paisSeleccionado.nombre;
      }
    });

    setData(dataNueva);
    handleCloseEditar()
  };
  return (
    <>
      <Header />

      <div className="container">
        <Button
          className="btn btn-success text-uppercase mb-4"
          onClick={() => agregarTarea()}
        >
          {" "}
          Agregar Pais
        </Button>

        <table className="table table-bordered responsive">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Minutos</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {
            
            data.length>0 ? 
            (
              data.map((item, i) => (
                <tr key={i}>
                  <td>{item.id}</td>
                  <td>{item.nombre}</td>
                  <td>{item.minutos}</td>
                  <td>
                    <Button
                      className="btn btn-primary text-uppercase"
                      onClick={() => handleShowEditar(item)}
                    >
                      Editar
                    </Button>
                    <Button
                      className="btn btn-danger ms-2 text-uppercase"
                      onClick={() => eliminarTarea(item)}
                    >
                      Eliminar
                    </Button>
                  </td>
                </tr>
              ))
            ) : <p>No hay nada 😢</p>
            
            }
          </tbody>
        </table>
      </div>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Agregar Pais</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="form-group">
            <label>ID</label>
            <input
              type="text"
              className="form-control"
              name="id"
              disabled
              value={data[data.length - 1].id + 1}
              onChange={(e) => handlechange(e)}
            />
            <br />
            <label>Pais :</label>
            <input
              type="text"
              className="form-control"
              name="nombre"
              value={paisSeleccionado ? paisSeleccionado.nombre : ""} ///peru
              onChange={(e) => handlechange(e)} //peru
            />
            <br />
            <label>Minutos :</label>
            <input
              type="text"
              className="form-control"
              name="minutos"
              value={paisSeleccionado ? paisSeleccionado.minutos : ""} //500
              onChange={(e) => handlechange(e)} //500
            />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cerrar
          </Button>
          <Button variant="primary" onClick={() => tareaNuevaAgregada()}>
            Agregar
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showEditar} onHide={handleCloseEditar}>
        <Modal.Header closeButton>
          <Modal.Title>Editar Pais</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="form-group">
            <label>ID</label>
            <input
              type="text"
              className="form-control"
              name="id"
              disabled
              value={paisSeleccionado && paisSeleccionado.id}
            />
            <br />
            <label>Pais :</label>
            <input
              type="text"
              className="form-control"
              name="nombre"
              value={paisSeleccionado && paisSeleccionado.nombre}
              onChange={(e) => handlechange(e)}
            />
            <br />
            <label>Minutos :</label>
            <input
              type="text"
              className="form-control"
              name="minutos"
              value={paisSeleccionado && paisSeleccionado.minutos}
              onChange={(e) => handlechange(e)}
            />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseEditar}>
            Cerrar
          </Button>
          <Button variant="primary" onClick={() => editarTarea()}>
            Actualizar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default App;
