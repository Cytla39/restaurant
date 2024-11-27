'use client'

import React, { useState, useEffect } from 'react'
import useSWR from 'swr';

interface IMenu {
    id: number;
    nombre: string;
    precio: number;
    imagen: string;
}

interface IPedido {
    id: number;
    id_mesa: number;
    id_menu: number;
    menu: IMenu
}

// const data = await fetch('http://localhost:3000/api/pedidos', { cache: 'no-store', next: { revalidate: 1 } });
// const items: IPedido[] = await data.json();


export default function PedidosPage() {

    const fetcher = (url: string) => fetch(url).then(res => res.json())
    const { data, error, isLoading } = useSWR<any>(`http://localhost:3000/api/pedidos`, fetcher);

    const [items, setPedidos] = useState<IPedido[]>();

    useEffect(() => {
        if (data) {
            console.log(data);
            setPedidos(data);
        }
    }, [data, isLoading]);
    if (error) return <div>Failed to load</div>;
    if (isLoading) return <div>Loading...</div>;

    function deletePedido(item: IPedido): void {
        console.log("Pedido a eliminar: " + item.id);
        const result = fetch('http://localhost:3000/api/pedidos?id=' + item.id, {
            method: 'DELETE'
        })
        .then(response => response.json())
        .then(json => {
            console.log(json);
            if(items){
            let copy = [...items];
            let index = copy.indexOf(item);
            if(index !== -1){
                copy.splice(index, 1);
                setPedidos(copy);
            }
            }
        })
        .catch(error => console.error(error));
    }

    return (<>
        
        <header className="bg-white">
            <div className="mx-auto max-w-7xl sm:px-6 lg:px-8 text-center">
                <h1 className="text-6xl font-semibold tracking-tight text-gray-900  mt-16">Pedidos</h1>
            </div>
        </header>

        <div className="relative overflow-x-auto shadow-md sm:rounded-lg p-36">
            <table className="w-full text-sm text-left rtl:text-right text-black dark:text-black">
                <thead className="text-xs text-white uppercase bg-[#817e7c] dark:bg-[#ffffff]">
                    <tr>
                        <th scope="col" className="px-6 py-3">
                            Menu
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Precio
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Mesa
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Acción
                        </th>
                    </tr>
                </thead>
                <tbody>
                     {items?.map((item) => (
                    <tr key={item.id} className="odd:bg-white even:bg-[#ffffff] ">
                        <th scope="row" className=" font-medium text-black-900 whitespace-nowrap dark:text-black">
                            {item.menu.nombre}
                        </th>
                        <td className="px-6 py-4">
                            ${item.menu.precio}
                        </td>
                        <td className="px-6 py-4">
                            {item.id_mesa}
                        </td>
                        <td className="px-6 py-4 border-b ">
                            {/* <EliminarPedido idPedido={item.id} /> */}
                            <button onClick={() => deletePedido(item)} className="text-red-400 hover:text-red border border-red-400 hover:bg-red-500 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-yellow-300 dark:text-yellow-300 dark:hover:text-white dark:hover:bg-yellow-400 dark:focus:ring-yellow-900">Eliminar</button>
                        </td>
                    </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </>)
}
