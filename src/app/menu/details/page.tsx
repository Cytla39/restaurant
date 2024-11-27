'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link';
import Image from 'next/image';
// import AgregarPedido from '@/app/menu/details/agregarPedido'
import { useRouter } from 'next/navigation'
import useSWR from 'swr'
import queryString from 'query-string';

interface IMenu {
    id: number,
    nombre: string,
    precio: number,
    imagen: string,
    descripcion: string
}


export default function Details({
    searchParams,
}: {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}
) {
    const fetcher = (url: string) => fetch(url).then(res => res.json())

    // const { id } = await searchParams;
    const parsed = queryString.parse(window.location.search);
    const id=parsed.id;
    const router = useRouter();
    const [menuItem, setMenuItem] = useState<IMenu>();
    const { data, error, isLoading } = useSWR<any>(`http://localhost:3000/api/menu?id=${id}`, fetcher);

    useEffect(() => {
        if (data) {
            console.log(data);
            setMenuItem(data);
        }
    }, [data, isLoading]);
    if (error) return <div>Failed to load</div>;
    if (isLoading) return <div>Loading...</div>;


    const agregarPedido = (e: any) => {
        e.preventDefault();

        const data = {
            id_menu: menuItem?.id,
            id_mesa: 1,
            id_empleado: 1,
            id_cliente: 1
        };


        const result = fetch('http://localhost:3000/api/pedidos', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
              'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        .then(json => router.push('/menu'))
        .catch(error => console.error(error));

        console.log(result);
    };


    return (
        <div className='grid grid-rows-[20px_1fr_20px] justify-items-center min-h-screen p-8 gap-10 sm:p-10'>
            <div className='flex flex-col gap-8 row-start-2 sm:items-start'>
                <div className="grid grid-cols-2 gap-4 px-10">
                    <div className="w-full max-h-full col-span-2 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                        <a href="#">
                            { menuItem?.imagen ? 
                            <Image src={menuItem ? menuItem.imagen : ''}
                                alt={menuItem ? menuItem.nombre : ''}
                                width={700}
                                height={600}
                            /> : <div></div> }
                        </a>
                        <div className="px-3 pb-3">
                            <a href="#">
                                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{menuItem?.nombre}</h5>
                            </a>
                            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{menuItem?.descripcion}</p>
                            <div className="flex items-center justify-between">
                                <span className="text-3xl font-bold text-gray-900 dark:text-white">${menuItem?.precio}</span>
                                <form onSubmit={agregarPedido}>
                                    <button className="text-white bg-green-500 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-orange-600 dark:hover:bg-orange-400 dark:focus:ring-orange-400">
                                        Añadir al pedido
                                    </button>
                                </form>
                                {/* <AgregarPedido idPedido={item.id} /> */}
                                {/* <AgregarPedido addItemAction={agregarPedido} /> */}
                            </div>
                        </div>
                        <div className="text-sm font-medium text-gray-500 dark:text-gray-300 text-right pr-3 pb-3">
                            <Link href="/menu" className="text-blue-500 hover:underline dark:text-blue-500 inline-flex">

                                <svg className="w-4 h-4 rtl:rotate-18 dark:text-white" stroke="currentColor" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                                    <path stroke="currentColor" d="M13 5H1m0 0 4 4M1 5l4-4"></path>
                                </svg>
                                Regresar al Menú
                            </Link>

                        </div>
                    </div>


                </div>
            </div>
        </div>
    )
}