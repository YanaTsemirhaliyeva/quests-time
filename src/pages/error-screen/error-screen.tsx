import styles from './error-screen.module.css';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { fetchQuestsAction } from '../../store/api-actions';
import { isQuestsStatusLoading } from '../../store/quests/quests.selectors';


function ErrorScreen(): JSX.Element {
  const dispatch = useAppDispatch();
  const isQuestionsStatusLoading = useAppSelector(isQuestsStatusLoading);

  return (
    <div className={styles['container__error']}>
      <section className={styles.error}>
        <h1 className={styles['error__title']}>Неизвестная ошибка</h1>
        <p className={styles['error__text']}>Квесты не найдены</p>
        <p className={styles['error__description']}>Не удалось загрузить список квестов. <br/>Пожалуйста, повторите попытку позже</p>
        <button
          onClick={() => {
            dispatch(fetchQuestsAction());
          }}
          disabled={isQuestionsStatusLoading}
          className={styles['error__button']}
        >Попробовать снова
        </button>
      </section>
    </div>
  );
}

export default ErrorScreen;
