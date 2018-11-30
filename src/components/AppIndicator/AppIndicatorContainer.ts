import { connect } from 'react-redux';

import { getAppStatusByName } from '../../redux/apps';
import { AppStatusStates } from '../../redux/apps/types';
import { State } from '../../redux/types';

import AppIndicator from './AppIndicator';

interface Props {
  appName: string;
}

const mapState = (state: State, { appName }: Props) => {
  const status = getAppStatusByName(state, appName);

  return {
    statusState: status ? status.state : AppStatusStates.Closed,
  };
};

export default connect(mapState)(AppIndicator);
