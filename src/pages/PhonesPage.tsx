import React, {
  ChangeEvent,
  useEffect,
  useState,
} from 'react';
import { useHistory, useLocation, Link } from 'react-router-dom';
import PhoneCard from '../components/PhoneCard/PhoneCard';
import { getAllProducts } from '../helpers/api';
import Loader from '../helpers/Loader/Loader';


export const PhonesPage = () => {
  const [phones, setPhones] = useState<Products[]>([]);
  const [loading, setLoading] = useState(false);
  const [sortedPhones, setSortedPhones] = useState<Products[]>([...phones]);
  const [phonesQuantity, setPhonesQuantity] = useState<Products[]>([...phones]);
  const history = useHistory();
  const location = useLocation();

  const searchParams = new URLSearchParams(location.search);

  useEffect(() => {
    window.scrollTo({ top: 0 });
    getAllProducts().then(data => {
      setLoading(true);
      setPhones(data.filter((product: Products) => product.type === 'phone'));
      setSortedPhones(data.filter((product: Products) => product.type === 'phone'));
      setPhonesQuantity(data.filter((product: Products) => product.type === 'phone'));
    });
  }, []);

  useEffect(() => {
    setSortedPhones(phonesQuantity);
  }, [phonesQuantity]);

  const sortBy = (event: ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.target;

    searchParams.set('sort', value);

    history.push({
      search: searchParams.toString(),
    });

    switch (value) {
      case 'name':
        setSortedPhones([...phonesQuantity].sort((a, b) => a[value].localeCompare(b[value])));
        break;
      case 'age':
      case 'price':
        setSortedPhones([...phonesQuantity].sort((a, b) => a[value] - b[value]));
        break;
      default:
        break;
    }
  };

  const selectQuantity = (event: ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.target;

    switch (value) {
      case '4':
        setPhonesQuantity([...phones].slice(0, 4));
        break;
      case '8':
        setPhonesQuantity([...phones].slice(0, 8));
        break;
      case '16':
        setPhonesQuantity([...phones].slice(0, 16));
        break;
      default:
        break;
    }
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
          {sortedPhones.length}
          {' '}
          models
        </p>
        <div className="container__filter filter">
          <form className="filter__sort-by">
            <p className="filter__text">Sort by</p>
            <select className="filter__sorted sorted" onChange={(event) => sortBy(event)}>
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
      {!loading && <Loader />}
      <section className="PhonesPage__list">
        {sortedPhones.map(phone => (
          <PhoneCard key={phone.age} phone={phone} />
        ))}
      </section>
    </>
  );
};
