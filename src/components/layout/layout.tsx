import { Helmet } from 'react-helmet-async';
import MemoFooter from '../footer/footer';
import MemoHeader from '../header/header';
import { AppRoute, NavigationStatus } from '../../const';

type LayoutProps = {
  pageTitle?: string;
  navigation: NavigationStatus;
  sideNavigation?: AppRoute;
  children: React.ReactNode;
}

function Layout({pageTitle, navigation, sideNavigation, children}: LayoutProps): JSX.Element {
  return (
    <div className="wrapper">
      <Helmet>
        <title>{pageTitle} &#8211; Escape Room</title>
      </Helmet>
      <MemoHeader navigationView={navigation} sideNavigation={sideNavigation} />
      {children}
      <MemoFooter />
    </div>
  );
}

export default Layout;
