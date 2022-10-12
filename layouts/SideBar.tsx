

const SideBar = () => {

    return (
        <>
            <div className="sidebar pe-4 pb-3">
                <nav className="navbar bg-secondary navbar-dark">
                    <a href="index.html" className="navbar-brand mx-4 mb-3">
                        <h3 className="text-primary"><i className="fa fa-user-edit me-2"></i>Adidas outlet</h3>
                    </a>
                    <div className="d-flex align-items-center ms-4 mb-4">
                        <div className="ms-3">
                            <h6 className="mb-0">Firas Serhan</h6>
                            <span>Admin</span>
                        </div>
                    </div>
                    <div className="navbar-nav w-100">
                        <a href="/admin" className="nav-item nav-link active"><i className="fa fa-tachometer-alt me-2"></i>Dashboard</a>
                        <a href="/admin/user" className="nav-item nav-link"><i className="fa fa-th me-2"></i>Users</a>
                        <a href="/admin/product"  className="nav-item nav-link"><i className="fa fa-keyboard me-2"></i>Products</a>
                        <a href="/admin/query"  className="nav-item nav-link"><i className="fa fa-keyboard me-2"></i>Queries</a>
                        <a href="/admin/order" className="nav-item nav-link"><i className="fa fa-table me-2"></i>Orders</a>
                        <a href="/admin/review" className="nav-item nav-link"><i className="fa fa-chart-bar me-2"></i>Reviews</a>
                        <a href="/admin/logout" className="nav-item nav-link"><i className="fa fa-chart-bar me-2"></i>Logout</a>
                    </div>
                </nav>
            </div>
        </>
    )
}

export default SideBar;