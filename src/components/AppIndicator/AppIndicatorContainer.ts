import { connect } from 'react-redux';

import { getAppStatusById } from '../../redux/apps';
import { AppStatusStates } from '../../redux/apps/types';
import { State } from '../../redux/types';

import AppIndicator from './AppIndicator';

interface Props {
  appId: string;
}

const mapState = (state: State, { appId }: Props) => {
  const status = getAppStatusById(state, appId);

  return {
    statusState: status ? status.state : AppStatusStates.Closed,
  };
};

export default connect(mapState)(AppIndicator);
