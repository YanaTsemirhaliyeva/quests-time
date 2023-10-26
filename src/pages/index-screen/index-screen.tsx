import { NavigationStatus } from '../../const';
import MemoQuestsThemeList from '../../components/quests-theme-list/quests-theme-list';
import MemoQuestLevelList from '../../components/quest-level-list/quest-level-list';
import { useAppSelector } from '../../hooks';
import { getActiveLevel, getActiveTheme, getQuests } from '../../store/quests/quests.selectors';
import MemoQuestCard from '../../components/quest-card/quest-card';
import { sortQuestsByLevel, sortQuestsByTheme } from '../../utils';
import Layout from '../../components/layout/layout';
import styles from './index-screen.module.css';

function IndexScreen(): JSX.Element {

  const quests = useAppSelector(getQuests);
  const currentLevel = useAppSelector(getActiveLevel);
  const currentTheme = useAppSelector(getActiveTheme);


  const questsByTheme = sortQuestsByTheme(quests, currentTheme);
  const questByFilters = sortQuestsByLevel(questsByTheme, currentLevel);


  return (
    <Layout navigation={NavigationStatus.Full} pageTitle='Квесты'>
      <main className="page-content">
        <div className="container">
          <div className="page-content__title-wrapper">
            <h1 className="subtitle page-content__subtitle">квесты в Санкт-Петербурге
            </h1>
            <h2 className="title title--size-m page-content__title">Выберите тематику</h2>
          </div>
          <div className="page-content__item">
            <form className="filter" action="#" method="get">
              <MemoQuestsThemeList activeTheme={currentTheme} />
              <MemoQuestLevelList activeLevel={currentLevel} />
            </form>
          </div>
          <h2 className="title visually-hidden">Выберите квест</h2>
          {questByFilters.length > 0 ?
            <div className="cards-grid">
              {questByFilters.map((quest) => <MemoQuestCard key={quest.id} quest={quest} />)}
            </div> :
            <p className={styles['not-filtering-quests']}>Уже скоро</p>}
        </div>
      </main>
    </Layout>
  );
}

export default IndexScreen;
