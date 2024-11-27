'use client'
// import { addMenu } from '@/app/menu/actions'

import { useRouter } from 'next/navigation'

export default function EliminarPedido({
    idPedido,
}: {
    idPedido: number
}) {
    
    const router = useRouter();

    function deletePedido(event: any): void {
        console.log('Pedido a eliminar: ' + idPedido);
        const result = fetch('http://localhost:3000/api/pedidos?id=' + idPedido, {
            method: 'DELETE'
        })
        .then(response => response.json())
        .then(json => router.push('/pedidos'))
        .catch(error => console.error(error));
    }
    // { idPedido }: { idPedido: number }) {
    // const updateUserWithId = addMenu.bind(null, idPedido)

    return (
        <div>
            <button onClick={deletePedido} className="text-yellow-400 hover:text-white border border-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:outline-none focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-yellow-300 dark:text-yellow-300 dark:hover:text-white dark:hover:bg-yellow-400 dark:focus:ring-yellow-900">
                Eliminar
            </button>
        </div>
    )
}
