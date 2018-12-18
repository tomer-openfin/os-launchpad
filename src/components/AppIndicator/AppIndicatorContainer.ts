import { connect } from 'react-redux';

import { getAppStatusByName } from '../../redux/apps';
import { AppStatusStates } from '../../redux/apps/types';
import { State } from '../../redux/types';

import AppIndicator from './AppIndicator';

interface Props {
  appId: string;
}

const mapState = (state: State, { appId }: Props) => {
  const status = getAppStatusByName(state, appId);

  return {
    statusState: status ? status.state : AppStatusStates.Closed,
  };
};

export default connect(mapState)(AppIndicator);
