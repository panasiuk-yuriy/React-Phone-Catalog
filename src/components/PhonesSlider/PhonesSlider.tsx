import React, { useState, useEffect } from 'react';
import cn from 'classnames';
import PhoneCard from '../PhoneCard/PhoneCard';
import { getPhones } from '../../helpers/api';
import './PhoneSlider.scss';

type Props = {
  title: string;
};

export const PhonesSlider: React.FC<Props> = ({ title }) => {
  const [phones, setPhones] = useState<Products[]>([]);
  const [cardPosition, setCardPosition] = useState(0);

  useEffect(() => {
    getPhones().then(data => {
      setPhones(data.filter(phone => phone.discount > 0));
    });
  }, []);


  const handleNextClick = () => {
    if (cardPosition !== -1728) {
      setCardPosition(cardPosition - 288);
    }
  };

  const handlePrevClick = () => {
    if (cardPosition !== 0) {
      setCardPosition(cardPosition + 288);
    }
  };

  const carouselStyle = {
    transform: `translateX(${cardPosition}px)`,
  };

  return (
    <section className="section">
      <div className="container">
        <div className="container__top">
          <h2 className="container__title">{title}</h2>

          <div className="buttons">
            <button
              type="button"
              onClick={handlePrevClick}
              className={cn('PhoneSlider__btn',
                'carousel__btn',
                'carousel__btn_prev',
                {
                  btn__noactive_prev: cardPosition === 0,
                })}
            >
              { }
            </button>
            <button
              type="button"
              onClick={handleNextClick}
              className={cn('PhoneSlider__btn',
                'carousel__btn',
                'carousel__btn_next',
                {
                  btn__noactive_next: cardPosition === -1728,
                })}
            >
              { }
            </button>
          </div>
        </div>

        <div className="PhoneSlider__container">
          <ul className="carousel" style={carouselStyle}>
            {phones.map((phone) => (
              <li
                className="PhoneSlider__item carousel__item"
                key={phone.id}
              >
                <PhoneCard phone={phone} />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};