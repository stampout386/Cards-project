import React from "react";
import {cardsAPI} from "../../api/cardsAPI";


export const Cards = () => {
    const onClickCardsHandler = () => {
      cardsAPI.getCards()
    }
    const onClickPacksHandler = () => {
      cardsAPI.getPacks()
    }
  return <div>
      <button onClick={onClickCardsHandler}>getCards</button>
      <button onClick={onClickPacksHandler}>getPacks</button>
  </div>
}