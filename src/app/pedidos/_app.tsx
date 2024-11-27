import type { AppProps } from "next/app";

export const dynamic='force-dynamic';

export default function MyApp({Component, pageProps}: AppProps) {
    return <Component {...pageProps} />
}