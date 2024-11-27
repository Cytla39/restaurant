'use client'

import Link from 'next/link';
import Image from 'next/image';

import React, { useState, useEffect } from 'react'
import useSWR from 'swr';

interface IMenu {
  id: number;
  nombre: string;
  precio: number;
  imagen: string;
}

// const data = await fetch('http://localhost:3000/api/menu', { cache: 'no-store' });
// const items: IMenu[] = await data.json();

export default function MenuPage() {
  const fetcher = (url: string) => fetch(url).then(res => res.json())
  const { data, error, isLoading } = useSWR<any>(`http://localhost:3000/api/menu`, fetcher);

  const [items, setMenus] = useState<IMenu[]>();

  
  useEffect(() => {
    if (data) {
        console.log(data);
        setMenus(data);
    }
}, [data, isLoading]);
if (error) return <div>Failed to load</div>;
if (isLoading) return <div>Loading...</div>;

  return (
    <>
      <header className="bg-white ">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-6xl font-semibold tracking-tight text-gray-900 mb-4">Menú</h1>
          <Link
            href="menu/agregar"
            className="focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 inline-block"
          >
            Agregar
          </Link>
        </div>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-10 py-3">
        {items?.map((item) => (
          <a
            key={item.id}
            href={'/menu/details?id=' + item.id}
            className="bg-white shadow-lg hover:shadow-xl rounded-lg overflow-hidden transform hover:scale-105 transition-all duration-300"
          >
            <div className="p-4">
              <Image
                src={item.imagen}
                alt={item.nombre}
                width={350}
                height={350}
                className="w-full h-56 object-cover rounded-lg mb-4"
              />
              <p className="text-lg font-semibold text-gray-800 mb-2">{item.nombre}</p>
              <p className="text-sm text-gray-500">{`$${item.precio.toFixed(2)}`}</p>
            </div>
          </a>
        ))}
      </div>
    </>
  );
}
