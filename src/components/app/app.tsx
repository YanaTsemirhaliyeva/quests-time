import { Route, Routes } from 'react-router-dom';
import { AppRoute } from '../../const';
import PrivateRoute from '../private-route/private-route';
import IndexScreen from '../../pages/index-screen/index-screen';
import LoginScreen from '../../pages/login-screen/login-screen';
import BookingScreen from '../../pages/booking-screen/booking-screen';
import ContactsScreen from '../../pages/contacts-screen/contacts-screen';
import MyQuestsScreen from '../../pages/my-quests-screen/my-quests-screen';
import QuestScreen from '../../pages/quest-screen/quest-screen';
import NotFoundScreen from '../../pages/not-found-screen/not-found-screen';
import { HelmetProvider } from 'react-helmet-async';
import Spinner from '../spinner/spinner';
import { useAppSelector } from '../../hooks';
import { getAuthCheckedStatus, getAuthorizationStatus } from '../../store/user-process/user-process.selectors';
import { getErrorStatus, isQuestsStatusLoading } from '../../store/quests/quests.selectors';
import ErrorScreen from '../../pages/error-screen/error-screen';


function App(): JSX.Element {
  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  const isQuestsDataLoading = useAppSelector(isQuestsStatusLoading);
  const isAuthChecked = useAppSelector(getAuthCheckedStatus);

  const hasError = useAppSelector(getErrorStatus);


  if (!isAuthChecked || isQuestsDataLoading) {
    return (
      <Spinner />
    );
  }

  if (hasError) {
    return (
      <ErrorScreen />
    );
  }

  return (
    <HelmetProvider>
      <Routes>
        <Route
          path={AppRoute.Index}
          element={<IndexScreen />}
        />
        <Route
          path={`${AppRoute.Quest}/:questId`}
          element={<QuestScreen />}
        />
        <Route
          path={AppRoute.MyQuests}
          element={
            <PrivateRoute
              authorizationStatus={authorizationStatus}
            >
              <MyQuestsScreen />
            </PrivateRoute>
          }
        />
        <Route
          path={`${AppRoute.Quest}/:questId/booking`}
          element={
            <PrivateRoute
              authorizationStatus={authorizationStatus}
            >
              <BookingScreen />
            </PrivateRoute>
          }
        />
        <Route
          path={AppRoute.Contacts}
          element={<ContactsScreen />}
        />
        <Route
          path={AppRoute.Login}
          element={<LoginScreen />}
        />
        <Route
          path='*'
          element={<NotFoundScreen />}
        />
      </Routes>
    </HelmetProvider>
  );
}

export default App;
