import avatar from '../assets/icons/missing.svg';
import Arrow from '../assets/icons/arrow.svg';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';

interface IProps {
  hideFilters: (arg0: boolean) => void;
}

const NotFound = (props: IProps) => {
  useEffect(() => {
    props.hideFilters(false);
  }, [props]);

  return (
    <div>
      <div className="position-relative">
        <Link to={'/'}>
          <img
            src={Arrow}
            alt="arrow"
            width={30}
            className="position-absolute top-0 arrow-left"
            style={{ left: '0%', transform: 'scaleX(-1)' }}
          />
        </Link>
      </div>
      <div className="row pokemon-wrapper justify-content-center align-items-center flex-column">
        <div>
          <img src={avatar} alt="avatar" width={200} className="mb-5" />
          <h2>No Pokémon found</h2>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
