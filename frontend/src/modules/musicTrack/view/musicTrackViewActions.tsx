import MusicTrackService from 'src/modules/musicTrack/musicTrackService';
import Errors from 'src/modules/shared/error/errors';
import { getHistory } from 'src/modules/store';

const prefix = 'MUSICTRACK_VIEW';

const musicTrackViewActions = {
  FIND_STARTED: `${prefix}_FIND_STARTED`,
  FIND_SUCCESS: `${prefix}_FIND_SUCCESS`,
  FIND_ERROR: `${prefix}_FIND_ERROR`,

  doFind: (id) => async (dispatch) => {
    try {
      dispatch({
        type: musicTrackViewActions.FIND_STARTED,
      });

      const record = await MusicTrackService.find(id);

      dispatch({
        type: musicTrackViewActions.FIND_SUCCESS,
        payload: record,
      });
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: musicTrackViewActions.FIND_ERROR,
      });

      getHistory().push('/music-track');
    }
  },
};

export default musicTrackViewActions;
