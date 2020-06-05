import React from 'react';
import { useDispatch } from 'react-redux';
import { setFavorites } from '../../store/products';

type Props = {
  id: string;
  favorites?: boolean;
};


export const FavoriteButton: React.FC<Props> = ({ id, favorites }) => {
  const dispatch = useDispatch();
  const handleClick = (productId: string) => {
    dispatch(setFavorites(productId));
  };

  return (
    <button
      onClick={() => handleClick(id)}
      type="button"
      className="PhoneCard__favorits-button button"
    >
      <img src={favorites ? './img/active_heart.svg' : './img/heart.svg'} alt="heart_icon" className="PhoneCard__favorits-image" />
    </button>
  );
};
