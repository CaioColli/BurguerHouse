import './CardsMenuComponent.css'
import { currencyFormat } from '../../../../Scripts/CurrencyFormat'
import { Button } from '../../../Buttons/Button'
import { CiShoppingCart } from "react-icons/ci"
import radiationIcon from '../../../../assets/RadiationIcon.svg'
import vaultBoy from '../../../../assets/MiniVaultBoy.svg'
import { MenuModal } from '../MenuModal/MenuModal'
import { useContext, useState } from 'react'
import { Context } from '../../../../Context/Context'
import Swal from 'sweetalert2'

export const CardMenu = ({ data }) => {
    const [selectedItem, setSelectedItem] = useState(null)
    const [showModal, setShowModal] = useState(false)
    const { clickBuyItem } = useContext(Context)

    const handleClickBuy = (item, quantity = 1) => {
        clickBuyItem(item, quantity)

        Swal.fire({
            position: "center",
            icon: "success",
            title: "Item adicionado ao carrinho!",
            showConfirmButton: false,
            timer: 1500
        })
    }

    const handleClickMoreInformation = (item) => {
        setSelectedItem(item)
        setShowModal(true)
    }

    const clickCloseModal = () => {
        setShowModal(false)
    }

    return (
        <>
            <ul className="menu-list">
                {data && data.map((item) => {
                    return (
                        <li className="item" key={item.id}>
                            <div className='leftSide'>
                                <div className='topSide'>
                                    <img className="image" src={item.image} alt={`Imagem ${item.title}`} />
                                    <h2 className="title"> {item.title} </h2>
                                </div>
                                <div className='bottomSide'>
                                    <p className="description"> {item.description} </p>

                                    <div className='value'>
                                        <Button size='s' onClick={() => handleClickBuy(item)}>
                                            <CiShoppingCart className='icon-button' />
                                        </Button>
                                        <p className="price"> {currencyFormat(item.price)} </p>
                                        <button className='more-information'>
                                            <p className='text-more-information' onClick={() => handleClickMoreInformation(item)}> Mais informações</p>
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div className="rightSide">
                                <img src={radiationIcon} alt='imagem ilustrativa de aviso nuclear' className='radiationImage'></img>
                                <img src={vaultBoy} alt='ilustração de um garoto de fallout (vault boy)' className='vaultBoyImage'></img>
                            </div>
                        </li>
                    )
                })}
            </ul>

            {showModal && <MenuModal item={selectedItem} onClose={clickCloseModal} />}
        </>
    )
}