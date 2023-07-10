export const API_URL = 'http://localhost:3100/apicolores/colores';

export const obtenerColores = async () => {
  try {
    const respuesta = await fetch(API_URL);
    const coloresGuardados = await respuesta.json();
    return coloresGuardados;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const agregarColor = async (color) => {
  try {
    const respuesta = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ nombre: color }),
    });

    if (!respuesta.ok) {
      throw new Error('Error al agregar el color');
    }

    const nuevoColor = await respuesta.json();
    return nuevoColor;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const eliminarColor = async (colorId) => {
    try {
      const respuesta = await fetch(`${API_URL}/${colorId}`, {
        method: 'DELETE',
      });
  
      if (!respuesta.ok) {
        throw new Error('Error al eliminar el color');
      }
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

export const editarColor = async (colorId, colorNuevo) => {
  try {
    const respuesta = await fetch(`${API_URL}/${colorId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ nombre: colorNuevo }),
    });

    if (!respuesta.ok) {
      throw new Error('Error al editar el color');
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
};