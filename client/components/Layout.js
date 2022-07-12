import Head from 'next/head';
import Navbar from "./Navbar";

const Layout = ({children}) => {
    return (
        <>
            
            <Head>
                <title>Project Manager</title>
                <link rel="icon" type="image/x-icon" href="/favicon.ico"></link>
            </Head>
            <Navbar />
            <div>{children}</div>
        </>
    )
}

export default Layout;