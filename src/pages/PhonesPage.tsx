import React, {
  ChangeEvent,
  useState,
} from 'react';
import { useHistory, useLocation, Link } from 'react-router-dom';
import {
  useDispatch,
  useSelector,
} from 'react-redux';
import PhoneCard from '../components/PhoneCard/PhoneCard';
// import { getAllProducts } from '../helpers/api';
import Loader from '../helpers/Loader/Loader';
import Pagination from '../components/Pagination/Pagination';
import { setPerPage } from '../store/pagination';
import { getVisibleProducts, getLoading } from '../store';
import { sortBy } from '../store/sort';

export const PhonesPage = () => {
  // const [loading, setLoading] = useState(false);
  // const [sortedPhones, setSortedPhones] = useState<Products[]>([...phones]);
  // const [phonesQuantity, setPhonesQuantity] = useState<Products[]>([...phones]);
  const history = useHistory();
  const location = useLocation();
  const dispatch = useDispatch();
  const isLoaded = useSelector(getLoading);
  const visiblePhones = useSelector(getVisibleProducts);
  const [phones] = useState<Products[]>(visiblePhones.filter((phone: any) => phone.type === 'phone'));
  // const phones = useSelector(getPhones);
  const searchParams = new URLSearchParams(location.search);
  const perPage: number = Number(searchParams.get('perPage')) || phones.length;
  const pageNumbers = Math.ceil(phones.length / perPage) || 1;
  console.log(phones);
  // useEffect(() => {
  //   window.scrollTo({ top: 0 });
  //   getAllProducts().then(data => {
  //     setLoading(true);
  //     setPhones(data);

  // setSortedPhones(data.filter((product: Products) => product.type === 'phone'));
  // setPhonesQuantity(data.filter((product: Products) => product.type === 'phone'));
  //
  //   });
  // }, []);

  // useEffect(() => {
  //   setSortedPhones(phonesQuantity);
  // }, [phonesQuantity]);

  const sorting = (event: ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.target;

    searchParams.set('sort', value);

    history.push({
      search: searchParams.toString(),
    });

    dispatch(sortBy(value));
  };

  const selectQuantity = (event: ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.target;

    searchParams.set('perPage', value);

    history.push({
      search: searchParams.toString(),
    });

    dispatch(setPerPage(+value));
  };

  return (
    <>
      <div className="PhonesPage__article">
        <div className="PhonesPage__phoneslink-container">
          <Link to="/home"><img src="img/Home.png" alt="home_icon" /></Link>
          <img src="img/stroke_right.png" alt="stroke" className="PhonesPage__phoneslink-image" />
          <p className="PhonesPage__phoneslink">Phones</p>
        </div>
        <h1 className="PhonesPage__head">Mobile phones</h1>
        <p className="PhonesPage__length">
          {phones.length}
          {' '}
          models
        </p>
        <div className="container__filter filter">
          <form className="filter__sort-by">
            <p className="filter__text">Sort by</p>
            <select className="filter__sorted sorted" onChange={(event) => sorting(event)}>
              <option value="age" className="filter__option">Newest</option>
              <option value="name" className="filter__option">Alphabetically</option>
              <option value="price" className="filter__option">Cheapest</option>
            </select>
          </form>
          <form className="filter__sort-by">
            <p className="filter__text">Items on page</p>
            <select className="filter__selected sorted" onChange={(event) => selectQuantity(event)}>
              <option value="16" className="filter__option">16</option>
              <option value="8" className="filter__option">8</option>
              <option value="4" className="filter__option">4</option>
            </select>
          </form>
        </div>
      </div>
      {isLoaded ? <Loader />
        : (
          <section className="PhonesPage__list">
            {visiblePhones.map((phone: any) => (
              <PhoneCard key={phone.age} phone={phone} />
            ))}
          </section>
        )}
      <div>
        <Pagination pageNumbers={pageNumbers} />
      </div>
    </>
  );
};
