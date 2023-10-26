import lcs from './spinner.module.css';

function Spinner(): JSX.Element {
  return (
    <div className={lcs.el}>
      <div className={lcs.container}>
        <div className={lcs.wrapper}>
          <div className={lcs.loader}>
            <div className={lcs.dot}/>
          </div>
          <div className={lcs.loader}>
            <div className={lcs.dot}/>
          </div>
          <div className={lcs.loader}>
            <div className={lcs.dot}/>
          </div>
          <div className={lcs.loader}>
            <div className={lcs.dot}/>
          </div>
          <div className={lcs.loader}>
            <div className={lcs.dot}/>
          </div>
          <div className={lcs.loader}>
            <div className={lcs.dot}/>
          </div>
        </div>
        <div className={lcs.text}>
          Loading...
        </div>
      </div>
    </div>
  );
}

export default Spinner;
