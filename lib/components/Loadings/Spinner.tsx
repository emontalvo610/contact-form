import { faSpinnerThird } from '@fortawesome/pro-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function Spinner() {
  return (
    <FontAwesomeIcon icon={faSpinnerThird} spin size="lg" className="mx-1" />
  );
}
