import React, {
  useState, useRef, useEffect, useCallback,
} from 'react';
import { NavLink } from 'react-router-dom';
import './NavMobile.scss';
import HamburgerMenu from 'react-hamburger-menu';

type NavLinks = {
  path: string;
  text: string;
};


const NAV_LINKS = [
  { path: '/', text: 'HOME' },
  { path: '/phones', text: 'PHONES' },
  { path: '/tablets', text: 'TABLETS' },
  { path: '/accessories', text: 'ACCESSORIES' },
];

export const NavMobile = () => {
  const [open, setOpen] = useState(false);
  const [whidth, setWhidth] = useState<number>(-1200);
  const node = useRef<HTMLDivElement>(null);

  const navStyle = {
    transform: `translateX(${whidth}px)`,
    transition: 'transform 0.5s',
  };

  const handleClick = useCallback(
    (e) => {
      if (!open && node.current?.contains(e.target)) {
        setOpen(true);
        setWhidth(0);
      } else {
        setOpen(false);
        setWhidth(-1200);
      }
    },
    [open],
  );

  useEffect(() => {
    document.addEventListener('click', handleClick);

    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, [handleClick]);


  return (
    <>
      <div ref={node}>
        <HamburgerMenu
          isOpen={open}
          menuClicked={(e) => handleClick(e)}
          width={30}
          height={15}
          strokeWidth={2}
          rotate={0}
          color="#313237"
          borderRadius={0}
          animationDuration={0.5}
          className="Hamburger__menu cursor"
        />
      </div>
      <ul
        className="nav__mobile_list"
        style={navStyle}
      >
        {NAV_LINKS.map((link: NavLinks) => (
          <li
            key={link.path}
            className="nav__item-menu"
          >
            <NavLink
              to={link.path}
              exact
              activeClassName="nav__link-menu--active"
              className="nav__link-menu"
            >
              {link.text}
            </NavLink>
          </li>
        ))}
      </ul>

    </>
  );
};
