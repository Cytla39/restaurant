import React from "react";
import Form from 'next/form'
import { createMenu } from '@/app/menu/actions'

export default function Agregar() {
    return (
        <div className="flex flex-col items-center p-8 mt-11 bg-cover bg-center min-h-screen" style={{ backgroundImage: 'url(/path-to-your-image.jpg)' }}>            
            <div className="bg-white p-8 rounded-lg shadow-lg max-w-lg w-full  shadow-orange-600/40">
                <h1 className="text-3xl font-semibold text-center text-[#000000] mb-6">Agregar Menú</h1>

                <Form className="space-y-6" action={createMenu}>
                    <div>
                        <label htmlFor="nombre" className="block text-lg font-medium text-[#000000] mb-2">Nombre del Platillo</label>
                        <input 
                            type="text" 
                            id="nombre" 
                            name="nombre" 
                            className="w-full p-3 border border-[#FFFF]   focus:ring-2 shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px]  focus:ring-[#EC8439] focus:outline-none" 
                            required 
                        />
                    </div>

                    <div>
                        <label htmlFor="precio" className="block text-lg font-medium text-[#000000] mb-2">Precio</label>
                        <input 
                            type="number" 
                            id="precio" 
                            name="precio" 
                            className="w-full p-3 border border-[#FFFF]  shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px] focus:ring-2 focus:ring-[#EC8439] focus:outline-none" 
                            required 
                        />
                    </div>

                    <div>
                        <label htmlFor="description" className="block text-lg font-medium text-[#000000] mb-2">Descripción</label>
                        <textarea 
                            id="descripcion" 
                            name="descripcion" 
                            rows="4"
                            maxLength={191}
                            className="w-full p-3 border border-[#FFFF]  shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px] focus:ring-2 focus:ring-[#EC8439] focus:outline-none"
                            placeholder="Agregar una descripción del platillo" 
                        />
                    </div>

                    <div>
                        <label htmlFor="imagen" className="block text-lg font-medium text-[#000000] mb-2">Subir Imagen</label>
                        <input 
                            className="block w-full text-sm text-[#000000] border border-[#FFFF]  cursor-pointer bg-[#FAB677] focus:outline-none"
                            aria-describedby="imagen_help" 
                            id="imagen" 
                            name="imagen" 
                            type="file" 
                        />
                        <p className="mt-1 text-sm text-[#000000]" id="imagen_help">Seleccione una imagen representativa del platillo</p>
                    </div>

                    <input type="hidden" name="idCategoria" value={1} />

                    <button 
                        type="submit" 
                        className="w-full py-3 bg-[#EC8439] text-white text-lg rounded-lg hover:bg-[#EE9D5E] focus:outline-none focus:ring-4 focus:ring-[#FAB677]"
                    >
                        Guardar
                    </button>
                </Form>
            </div>
        </div>
    );
}

