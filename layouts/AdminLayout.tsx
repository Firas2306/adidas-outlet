import Head from "next/head";
import { PropsWithChildren } from "react";
import NavBar from "./NavBar";
import SideBar from "./SideBar";


const AdminLayout = ({ children }: PropsWithChildren) => {
    return (
        <>
            <Head>
                <link href="img/favicon.ico" rel="icon" />
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
                <link href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;600&family=Roboto:wght@500;700&display=swap" rel="stylesheet" />

                <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.10.0/css/all.min.css" rel="stylesheet" />
                <link href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.4.1/font/bootstrap-icons.css" rel="stylesheet" />

                <link href="/lib/owlcarousel/assets/owl.carousel.min.css" rel="stylesheet" />
                <link href="/lib/tempusdominus/css/tempusdominus-bootstrap-4.min.css" rel="stylesheet" />

                <link href="/css/bootstrap.min.css" rel="stylesheet" />

                <link href="/css/style.css" rel="stylesheet" />
            </Head>
            <div className="container-fluid position-relative d-flex p-0">
                <SideBar />

                <div className="content">
                    <NavBar />
                    <div className="container-fluid pt-4 px-4">
                        {children}
                    </div>
                </div>
            </div>
        </>

    )
}


export default AdminLayout;