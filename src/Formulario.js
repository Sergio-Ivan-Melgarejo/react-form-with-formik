import { Formik, Form, Field, ErrorMessage } from "formik";
import { useState } from "react";

const rexNombre = /^[a-zA-ZÀ-ÿ\s]{1,40}$/;
const rexCorreo = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;

const Formulario = () => {
    const [formEnviado, setFormEnviado] = useState(false);
	return (
		<div className='contenedor'>
            <Formik
                initialValues={{
                    nombre: "",
                    correo: "",
                    pais:"",
                    sexo: "",
                    mensaje: ""
                }}

                validate={(valores) =>{
                    let errores = {};

                    // validacion nombre
                    if (!valores.nombre) {
                        errores.nombre = "Por favor ingrese un nombre"
                    } else if (!rexNombre.test(valores.nombre)) {
                        errores.nombre = "El nombre solo puede contener letras y espacios"
                    }

                    // validacion correo
                    if (!valores.correo) {
                        errores.correo = "Por favor ingrese un correo"
                    } else if (!rexCorreo.test(valores.correo)) {
                        errores.correo = "El correo solo puede contener letras, numeros, puntos y guiones bajos"
                    }
                    
                    // validacion pais
                    if (!valores.pais) {
                        errores.pais = "Por favor seleccione un pais"
                    }   

                    // validacion sexo
                    if (!valores.sexo) {
                        errores.sexo = "Por favor seleccione un sexo"
                    }    
                    
                    // validacion mensaje
                    if (!valores.mensaje) {
                        errores.mensaje = "Por favor escribe un mensaje"
                    }

                    return errores
                }}

                onSubmit={(valores, {resetForm}) => {
					console.log('Formulario enviado');
                    console.log(valores)
                    setFormEnviado(true)
                    resetForm()
					setTimeout(() => setFormEnviado(false), 3000);
                }}
            > 
                {({errors})=>(
                    <Form className="formulario">
                        <div>
                            <label htmlFor="nombre">Nombre</label>
                            <Field
                                type="text"
                                name="nombre"
                                id="nombre"
                                placeholder="Nombre"
                            />
                            <ErrorMessage name="nombre" component={() => <p className="error">{errors.nombre}</p>} />
                        </div>
                        <div>
                            <label htmlFor="correo">Correo</label>
                            <Field
                                type="email"
                                name="correo"
                                id="correo"
                                placeholder="Correo@correo.com"
                            />
                            <ErrorMessage name="correo" component={() => <p className="error">{errors.nombre}</p>} />
                        </div>
                        <div>
                            <Field as="select" name="pais">
                                <option value="">seleccione un Pais</option>
                                <option value="argentina">Argentina</option>
                                <option value="brazil">Brazil</option>
                                <option value="chile">Chile</option>
                                <option value="uruguay">Uruguay</option>
                                <option value="paraguay">Paraguay</option>
                            </Field>
                            <ErrorMessage name="pais" component={() => <p className="error">{errors.pais}</p>} />
                        </div>
                        <div className="radio">
                            <label>
                                <Field
                                    type="radio"
                                    name="sexo"
                                    value="hombre"
                                />
                                <span>Hombre</span>
                            </label>
                            <label>
                                <Field
                                    type="radio"
                                    name="sexo"
                                    value="mujer"
                                />
                                <span>Mujer</span>
                            </label>
                            <ErrorMessage name="sexo" component={() => <p className="error">{errors.sexo}</p>} />
                        </div>
                        <div>
                            <Field
                                as="textarea"
                                name="mensaje"
                                placeholder="Escribe tu mensaje..."
                            />
                            <ErrorMessage name="mensaje" component={() => <p className="error">{errors.mensaje}</p>} />
                        </div>
                        <button type="submit">Enviar</button>
                        {
                            formEnviado && <p className="exito">Formulario enviado con exito</p>
                        }
                    </Form>
                )}
            </Formik>
		</div>
	);
}
 
export default Formulario;