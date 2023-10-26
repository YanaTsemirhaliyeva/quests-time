import React from 'react';
import { Link } from 'react-router-dom';

function Footer(): JSX.Element {
  return (
    <footer className="footer">
      <div className="container container--size-l">
        <div className="socials">
          <ul className="socials__list">
            <li className="socials__item">
              <Link className="socials__link" to="#" aria-label="Skype" target="_blank" rel="nofollow noopener noreferrer">
                <svg className="socials__icon socials__icon--default" width="28" height="28" aria-hidden="true">
                  <use xlinkHref="#icon-skype-default"></use>
                </svg>
                <svg className="socials__icon socials__icon--interactive" width="28" height="28" aria-hidden="true">
                  <use xlinkHref="#icon-skype-interactive"></use>
                </svg>
              </Link>
            </li>
            <li className="socials__item">
              <Link className="socials__link" to="#" aria-label="ВКонтакте" target="_blank" rel="nofollow noopener noreferrer">
                <svg className="socials__icon socials__icon--default" width="28" height="28" aria-hidden="true">
                  <use xlinkHref="#icon-vk-default"></use>
                </svg>
                <svg className="socials__icon socials__icon--interactive" width="28" height="28" aria-hidden="true">
                  <use xlinkHref="#icon-vk-interactive"></use>
                </svg>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}

const MemoFooter = React.memo(Footer);

export default MemoFooter;
