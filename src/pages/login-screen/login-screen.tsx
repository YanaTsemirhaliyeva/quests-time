import { Link, Navigate, useNavigate } from 'react-router-dom';
import { AppRoute, AuthorizationStatus, NavigationStatus, REGEX_EMAIL, REGEX_PASSWORD, Status } from '../../const';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getAuthorizationStatus, getUserStatus } from '../../store/user-process/user-process.selectors';
import { loginAction } from '../../store/api-actions';
import { AuthData } from '../../types/auth-data';
import { useForm } from 'react-hook-form';
import styles from './login-screen.module.css';
import { getFullQuest } from '../../store/quests/quests.selectors';
import Layout from '../../components/layout/layout';
import { getBookings } from '../../store/bookings/bookings.selectors';


function LoginScreen(): JSX.Element {

  const dispatch = useAppDispatch();
  const quest = useAppSelector(getFullQuest);
  const bookingsInfo = useAppSelector(getBookings);
  const navigate = useNavigate();

  const getRouteToBack = () => {
    let routeToBack = `${AppRoute.Index}`;
    if (quest && bookingsInfo) {
      routeToBack = `${AppRoute.Quest}/${quest.id}/booking`;
      return routeToBack;
    }
    if (quest) {
      routeToBack = `${AppRoute.Quest}/${quest.id}`;
      return routeToBack;
    }
    return routeToBack;
  };

  const route = getRouteToBack();

  const isLoginStatusLoading = useAppSelector(getUserStatus) === Status.Loading;

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset
  } = useForm<AuthData>({
    mode: 'onChange'
  });

  const handleFormSubmit = (data: AuthData) => {
    dispatch(loginAction({...data, onSuccess: reset}));
  };

  const hasAuthorization = useAppSelector(getAuthorizationStatus) === AuthorizationStatus.Auth;

  if (hasAuthorization) {
    return <Navigate to={route}/>;
  }


  return (
    <Layout
      navigation={NavigationStatus.WithoutBookings}
      sideNavigation={AppRoute.Login}
      pageTitle='Вход'
    >
      <main className="decorated-page login">
        <div className="decorated-page__decor" aria-hidden="true">
          <picture>
            <source type="image/webp" srcSet="img/content/maniac/maniac-size-m.webp, img/content/maniac/maniac-size-m@2x.webp 2x" /><img src="img/content/maniac/maniac-size-m.jpg" srcSet="img/content/maniac/maniac-size-m@2x.jpg 2x" width="1366" height="768" alt="" />
          </picture>
        </div>
        <div className="container container--size-l">
          <div className="login__form">

            <form className="login-form"
              action="https://echo.htmlacademy.ru/"
              method="post"
              onSubmit={handleSubmit(handleFormSubmit)}
            >
              <div className="login-form__inner-wrapper">
                <h1 className="title title--size-s login-form__title">Вход</h1>
                <div className="login-form__inputs">
                  <div className="custom-input login-form__input">
                    <label className="custom-input__label" htmlFor="email">E&nbsp;&ndash;&nbsp;mail</label>
                    <input type="email" id="email"
                      placeholder="Адрес электронной почты"
                      {...register('email', {
                        required: true,
                        pattern: REGEX_EMAIL
                      }
                      )}
                    />
                    {errors?.email && <p className={styles.notification} role="alert">Введите валидный email</p>}
                  </div>
                  <div className="custom-input login-form__input">
                    <label className="custom-input__label" htmlFor="password">Пароль</label>
                    <input type="password" id="password"
                      placeholder="Пароль"
                      {...register('password', {
                        required: true,
                        pattern: {
                          value: REGEX_PASSWORD,
                          message:'Пароль должен содержать цифры и буквы. От 3 до 15 символов'
                        }
                      })}
                    />
                    {errors?.password && <p className={styles.notification} role="alert">{errors.password?.message}</p>}
                  </div>
                </div>
                <button className="btn btn--accent btn--general login-form__submit"
                  type="submit"
                  disabled={!isValid || isLoginStatusLoading}
                  onClick={() => navigate(-1)}
                >
                  {isLoginStatusLoading ? 'В процессе...' : 'Войти'}
                </button>
              </div>
              <label className="custom-checkbox login-form__checkbox">
                <input type="checkbox" id="id-order-agreement" name="user-agreement" required />
                <span className="custom-checkbox__icon">
                  <svg width="20" height="17" aria-hidden="true">
                    <use xlinkHref="#icon-tick"></use>
                  </svg>
                </span>
                <span className="custom-checkbox__label">Я&nbsp;согласен с
                  <Link className="link link--active-silver link--underlined" to="#">правилами обработки персональных данных</Link>
                  &nbsp;и пользовательским соглашением
                </span>
              </label>
            </form>
          </div>
        </div>
      </main>
    </Layout>
  );
}

export default LoginScreen;
