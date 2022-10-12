import Link from "next/link"
import { useContext } from "react"
import { toast } from "react-toastify"
import { AuthContext } from "../context/authContext"
import axios from "../lib/axios"



export const ProductCard = ({ product }: any) => {
    const [user, setUser] = useContext(AuthContext);



    const addToWishList = (e: Event) => {
        e.stopPropagation();
        toast.promise(axios.patch(`/wishlist/${product.id}/add`, {}).then(({ data }) => {
            setUser(data.user)
        }), {
            pending: 'Loading ...',
            success: 'Wishlist updated successfully',
            error: 'Registerating failed'
        });
        return false;
    }

    const addToCart = (e: Event) => {
        e.stopPropagation();
        toast.promise(axios.post(`/cart/add`, {
            product_id: product.id,
            quantity: 1,
        }).then(({ data }) => {
            setUser(data.user)
        }), {
            pending: 'Loading ...',
            success: 'Product added to cart',
            error: 'Request failed'
        });
        return false;
    }

    return (

        <div className="col-sm-6 col-lg-4 all pizza">
            <Link href={ user ? `/product/${product.id}` : '/login'}>
                <div className="box">
                    <div className="img-box">
                        <img src={product.imagePath} alt="" />
                    </div>
                    <div className="detail-box">
                        <h5>{product.name}</h5>
                        <p>{ product.description }</p>
                        <div className="options">
                            <h6>${ product.price }</h6>

                            {
                                user && (
                                    <div className="flex">

                                        <a onClick={addToWishList}>
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M47.6 300.4L228.3 469.1c7.5 7 17.4 10.9 27.7 10.9s20.2-3.9 27.7-10.9L464.4 300.4c30.4-28.3 47.6-68 47.6-109.5v-5.8c0-69.9-50.5-129.5-119.4-141C347 36.5 300.6 51.4 268 84L256 96 244 84c-32.6-32.6-79-47.5-124.6-39.9C50.5 55.6 0 115.2 0 185.1v5.8c0 41.5 17.2 81.2 47.6 109.5z" /></svg>
                                        </a>
                                        <a className="ml-2" onClick={addToCart}>
                                            <svg
                                                version="1.1"
                                                id="Capa_1"
                                                xmlns="http://www.w3.org/2000/svg"
                                                xmlnsXlink="http://www.w3.org/1999/xlink"
                                                x="0px"
                                                y="0px"
                                                viewBox="0 0 456.029 456.029"
                                                xmlSpace="preserve"
                                            >
                                                <g>
                                                    <g>
                                                        <path
                                                            d="M345.6,338.862c-29.184,0-53.248,23.552-53.248,53.248c0,29.184,23.552,53.248,53.248,53.248
                    c29.184,0,53.248-23.552,53.248-53.248C398.336,362.926,374.784,338.862,345.6,338.862z"
                                                        />
                                                    </g>
                                                </g>
                                                <g>
                                                    <g>
                                                        <path
                                                            d="M439.296,84.91c-1.024,0-2.56-0.512-4.096-0.512H112.64l-5.12-34.304C104.448,27.566,84.992,10.67,61.952,10.67H20.48
                    C9.216,10.67,0,19.886,0,31.15c0,11.264,9.216,20.48,20.48,20.48h41.472c2.56,0,4.608,2.048,5.12,4.608l31.744,216.064
                    c4.096,27.136,27.648,47.616,55.296,47.616h212.992c26.624,0,49.664-18.944,55.296-45.056l33.28-166.4
                    C457.728,97.71,450.56,86.958,439.296,84.91z"
                                                        />
                                                    </g>
                                                </g>
                                                <g>
                                                    <g>
                                                        <path
                                                            d="M215.04,389.55c-1.024-28.16-24.576-50.688-52.736-50.688c-29.696,1.536-52.224,26.112-51.2,55.296
                    c1.024,28.16,24.064,50.688,52.224,50.688h1.024C193.536,443.31,216.576,418.734,215.04,389.55z"
                                                        />
                                                    </g>
                                                </g>
                                            </svg>
                                        </a>
                                    </div>

                                )
                            }
                        </div>
                    </div>
                </div>
            </Link>
        </div>
    )
}

