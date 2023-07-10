const API_URL = import.meta.env.VITE_API_COLORES

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

export const obtenerColor = async (id) => {
    try {
      const respuesta = await fetch(`${API_URL}/${id}`);
      const color = await respuesta.json();
      return color;
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
      body: JSON.stringify({ color }),
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

    const colorEliminado = await respuesta.json();
    return colorEliminado;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const editarColor = async (colorAnterior, colorNuevo) => {
    try {
      const respuesta = await fetch(`${API_URL}/${colorAnterior}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ color: colorNuevo }),
      });
  
      if (!respuesta.ok) {
        throw new Error('Error al editar el color');
      }
  
      const colorEditado = await respuesta.json();
      return colorEditado;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };
  