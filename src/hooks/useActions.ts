import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import { authActionCreators, movieActionCreator } from '../state/action-creators';

export const useActions = () => {
  const dispatch = useDispatch();

  return bindActionCreators(Object.assign({}, authActionCreators, movieActionCreator), dispatch);
};
