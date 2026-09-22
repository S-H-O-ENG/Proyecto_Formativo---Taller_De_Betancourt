import { useState, useEffect } from 'react';
//usestate = sirve para que las variables que creemos obliguen a a la pagina a actualizarse apenas noten un cambio
//useeffect permite crear acciones automaticas en determinqados momentos de la pagina
import axios from 'axios';
import Swal from 'sweetalert2';

import NavbarJefe from '../components/NavbarJefe';
import Pedidos from './Pedidos';

import '../css/InicioJefe.css'

function InicioJefe() {
    const API_URL = 'http://localhost:3000/pedidos';
    const [datos, setDatos] = useState([]);

    //funcion simple para consultar
    async function consultar() {
        //pq como arreglo vacio y no con los mismo datos de peidos por ejemplo: se hace para que cuando la pagina se cargue por primera vez react no falle al intentar cargar la lista

        try {
            const rta = await axios.get(API_URL);
            setDatos(rta.data);
        } catch {
            Swal.fire(`Error al obtener registros`);
        }

    }

    useEffect(() => {
        consultar();
    }, []);
    //parentesis azules son los del useeffect, los amarillos son los de la funcion, => es una funcion en conjunto con () amarillos, en este caso es una funcion anonima por eso no hay nombre, no hay parametros nada
    //[] arreglo vacio sirve para indicar que la funcion se debe ejecutar una sola vez

    //funcion para actualizar el estado
    const cambiarestado = async (id, nuevoestado) => {
        try {
            //aqui utilizamos patch pq solo vamos a cambiar un objeto, en este caso el estado
            await axios.patch(`${API_URL}/${id}`, { estado: nuevoestado });
            //aqui se vuelve a llamar a la funcion consultar para que actualice los datos apenas note el cambio
            consultar();
        } catch (error) {
            Swal.fire(`Error al actualizar`);
        }
    }

  
    const obtenerClaseEstado = (estado) => {
        if (estado === 'Recibido') return 'badge-estado badge-recibido';
        if (estado === 'Cancelado') return 'badge-estado badge-cancelado';
        return 'badge-estado badge-pendiente';
    };

    return (
        <>

            <NavbarJefe />

            <div className="contenido container-fluid py-4">
                <br />
                <div className="tabla-pedidos-container">
                    <h2 className="mb-4 text-center fw-bold">Estado Pedidos</h2>

                    <div className="row align-items-center encabezado-tabla fw-bold pb-2 mb-2">
                        <div className="col-1 text-center">ID PEDIDO</div>
                        <div className="col-3">Repuesto</div>
                        <div className="col-2">Proveedor</div>
                        <div className="col-1 text-center">Cantidad</div>
                        <div className="col-2 text-center">Importancia</div>
                        <div className="col-3 text-center">Estado</div>
                    </div>

                    {/* datos.map es un metodo de js que sirve para transformar un arreglo [] en otra cosa
                    pedido es simplemente el nombre que le dimos a este metodo, puede ser cualquera
                    */}
                    {
                        datos.map(
                            (pedido) => (
                                <div className="row align-items-center fila-pedido py-2" key={pedido.id}>
                                    <div className="col-1 text-center fw-bold opacity-75">{pedido.id}</div>
                                    <div className="col-3 text-truncate">{pedido.repuesto}</div>
                                    <div className="col-2 text-truncate">{pedido.proveedor}</div>
                                    <div className="col-1 text-center">{pedido.cantidad}</div>
                                    <div className="col-2 text-center text-capitalize">{pedido.importancia}</div>

                                    <div className="col-3 d-flex align-items-center justify-content-center gap-2">

                                        <span className={obtenerClaseEstado(pedido.estado)}>{pedido.estado}</span>
                                    

                                        <button className='btn btn-outline-success btn-micro' onClick={() => cambiarestado(pedido.id, 'Recibido')} disabled={pedido.estado === 'Cancelado' || pedido.estado === 'Recibido'}>Recibido</button>
                                        <button className='btn btn-outline-danger btn-micro' onClick={() => cambiarestado(pedido.id, 'Cancelado')} disabled={pedido.estado === 'Recibido' || pedido.estado === 'Cancelado'}>Cancelar</button>
                                    </div>
                                </div>
                            )
                        )

                    }

                </div>
            </div>


        </>
    )
}

export default InicioJefe;