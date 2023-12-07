import listActions from 'src/modules/musicTrack/list/musicTrackListActions';
import MusicTrackService from 'src/modules/musicTrack/musicTrackService';
import Errors from 'src/modules/shared/error/errors';
import { i18n } from 'src/i18n';
import { getHistory } from 'src/modules/store';
import Message from 'src/view/shared/message';

const prefix = 'MUSICTRACK_DESTROY';

const musicTrackDestroyActions = {
  DESTROY_STARTED: `${prefix}_DESTROY_STARTED`,
  DESTROY_SUCCESS: `${prefix}_DESTROY_SUCCESS`,
  DESTROY_ERROR: `${prefix}_DESTROY_ERROR`,

  DESTROY_ALL_STARTED: `${prefix}_DESTROY_ALL_STARTED`,
  DESTROY_ALL_SUCCESS: `${prefix}_DESTROY_ALL_SUCCESS`,
  DESTROY_ALL_ERROR: `${prefix}_DESTROY_ALL_ERROR`,

  doDestroy: (id) => async (dispatch) => {
    try {
      dispatch({
        type: musicTrackDestroyActions.DESTROY_STARTED,
      });

      await MusicTrackService.destroyAll([id]);

      dispatch({
        type: musicTrackDestroyActions.DESTROY_SUCCESS,
      });

      Message.success(
        i18n('entities.musicTrack.destroy.success'),
      );

      dispatch(listActions.doFetchCurrentFilter());

      getHistory().push('/music-track');
    } catch (error) {
      Errors.handle(error);

      dispatch(listActions.doFetchCurrentFilter());

      dispatch({
        type: musicTrackDestroyActions.DESTROY_ERROR,
      });
    }
  },

  doDestroyAll: (ids) => async (dispatch) => {
    try {
      dispatch({
        type: musicTrackDestroyActions.DESTROY_ALL_STARTED,
      });

      await MusicTrackService.destroyAll(ids);

      dispatch({
        type: musicTrackDestroyActions.DESTROY_ALL_SUCCESS,
      });

      if (listActions) {
        dispatch(listActions.doClearAllSelected());
        dispatch(listActions.doFetchCurrentFilter());
      }

      Message.success(
        i18n('entities.musicTrack.destroyAll.success'),
      );

      getHistory().push('/music-track');
    } catch (error) {
      Errors.handle(error);

      dispatch(listActions.doFetchCurrentFilter());

      dispatch({
        type: musicTrackDestroyActions.DESTROY_ALL_ERROR,
      });
    }
  },
};

export default musicTrackDestroyActions;
