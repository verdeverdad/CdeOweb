import { useState } from 'react';
import '../css/formularioPost.css'
import CamposMercado from '../components/formsCategorias/CamposMercado';
import CamposCultura from '../components/formsCategorias/CamposCultura';
import CamposPatitas from '../components/formsCategorias/CamposPatitas';
import CamposTrabajoServicios from '../components/formsCategorias/CamposTrabajosServicios';
import CamposViajes from './formsCategorias/CamposViajes';
import {
    CATEGORIAS as categorias,
    Localidad,
    type Categoría,
} from '../types/index';

type SubCategoriaFormulario =
        (typeof categorias)[keyof typeof categorias][number];

type Categoria = keyof typeof categorias;

function ProbarFormulario() {
    const [categoria, setCategoria] = useState<Categoria>('MERCADO');
    
    const [subCategoria, setSubCategoria] =
        useState<SubCategoriaFormulario>(categorias.MERCADO[0]); const [localidadesSeleccionadas, setLocalidadesSeleccionadas] = useState<string[]>([]);
    const [todasLasLocalidades, setTodasLasLocalidades] = useState(false);
    const [costoActividad, setCostoActividad] = useState('GRATIS');
    const [foto, setFoto] = useState<File | null>(null);
    const [vistaPrevia, setVistaPrevia] = useState<string | null>(null);
    const [precio, setPrecio] = useState('');


    const cambiarCategoria = (nuevaCategoria: Categoria) => {
        setCategoria(nuevaCategoria);
        setSubCategoria(categorias[nuevaCategoria][0]);
        setCostoActividad('GRATIS');
    };

    return (
        <main className='formulario-prueba'>
            <h1 >Probar formulario</h1>

            <form>
                <div className="campo">
                    <label htmlFor="categoria">Categoría</label>
                    <select
                        id="categoria"
                        value={categoria}
                        onChange={(e) =>
                            cambiarCategoria(e.target.value as Categoria)
                        }
                    >
                        {Object.keys(categorias).map((nombre) => (
                            <option key={nombre} value={nombre}>
                                {nombre.replaceAll('_', ' ')}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="campo">
                    <label htmlFor="subCategoria">Subcategoría</label>
                    <select
                        id="subCategoria"
                        value={subCategoria}
                        onChange={(e) => setSubCategoria(e.target.value as SubCategoriaFormulario)}
                    >
                        {categorias[categoria].map((subcategoria) => (
                            <option key={subcategoria} value={subcategoria}>
                                {subcategoria.replaceAll('_', ' ')}
                            </option>
                        ))}
                    </select>
                </div>


                <div className="campo">
                    <label htmlFor="titulo">Título</label>
                    <input
                        id="titulo"
                        type="text"
                        placeholder="Título de la publicación"
                        required
                    />
                </div>

                {categoria !== 'MERCADO' && categoria !== 'VIAJES' && (
                    <div className="campo">
                        <label htmlFor="descripcion">Descripción</label>
                        <textarea
                            id="descripcion"
                            placeholder="Contanos de qué se trata"
                            required
                        />
                    </div>
                )}

                {categoria === 'CULTURA' && (
                    <CamposCultura
                        subCategoria={subCategoria}
                        localidadesCosta={[...Localidad]}
                        costoActividad={costoActividad}
                        onCostoActividadChange={setCostoActividad}
                    />
                )}



                {categoria === 'MERCADO' && (
                    <CamposMercado
                        subCategoria={subCategoria}
                        localidadesCosta={[...Localidad]}
                        precio={precio}
                        onPrecioChange={setPrecio}
                    />
                )}

                {categoria === 'PATITAS' && (
                    <CamposPatitas
                        subCategoria={subCategoria}
                        localidadesCosta={[...Localidad]}
                    />
                )}


                {categoria === 'TRABAJO_Y_SERVICIOS' && (
                    <CamposTrabajoServicios
                        subCategoria={subCategoria}
                        localidadesCosta={[...Localidad]}
                        localidadesSeleccionadas={localidadesSeleccionadas}
                        setLocalidadesSeleccionadas={setLocalidadesSeleccionadas}
                        todasLasLocalidades={todasLasLocalidades}
                        setTodasLasLocalidades={setTodasLasLocalidades}
                    />
                )}
                {categoria === 'VIAJES' && (
                    <CamposViajes subCategoria={subCategoria} />
                )}
                <div className="campo">
                    <label htmlFor="foto">Foto (opcional)</label>

                    <input
                        id="foto"
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                            const archivo = e.target.files?.[0] ?? null;

                            setFoto(archivo);

                            if (vistaPrevia) {
                                URL.revokeObjectURL(vistaPrevia);
                            }

                            setVistaPrevia(
                                archivo ? URL.createObjectURL(archivo) : null
                            );
                        }}
                    />

                    {vistaPrevia && (
                        <div className="vista-previa-foto">
                            <img
                                src={vistaPrevia}
                                alt="Vista previa de la foto seleccionada"
                                style={{
                                    maxWidth: '100%',
                                    maxHeight: '250px',
                                    objectFit: 'contain',
                                    borderRadius: '8px',
                                }}
                            />
                            <button
                                type="button"
                                onClick={() => {
                                    if (vistaPrevia) {
                                        URL.revokeObjectURL(vistaPrevia);
                                    }

                                    setFoto(null);
                                    setVistaPrevia(null);

                                    const input = document.getElementById(
                                        'foto'
                                    ) as HTMLInputElement | null;

                                    if (input) input.value = '';
                                }}
                            >
                                Quitar foto
                            </button>
                        </div>
                    )}
                </div>

                <button type="button">Probar formulario</button>
            </form>
        </main>
    );
}

export default ProbarFormulario;
