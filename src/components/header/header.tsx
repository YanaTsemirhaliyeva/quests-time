import React from 'react';
import { AppRoute, NavigationStatus } from '../../const';
import MemoLogo from '../logo/logo';
import MemoNav from '../nav/nav';
import MemoSideNav from '../side-nav/side-nav';

type HeaderProps = {
  navigationView: NavigationStatus;
  sideNavigation?: AppRoute;
}

function Header({navigationView, sideNavigation}: HeaderProps): JSX.Element {
  return (
    <header className="header">
      <div className="container container--size-l">
        <MemoLogo />
        <MemoNav navView={navigationView} />
        <MemoSideNav page={sideNavigation} />
      </div>
    </header>
  );
}

const MemoHeader = React.memo(Header);

export default MemoHeader;
