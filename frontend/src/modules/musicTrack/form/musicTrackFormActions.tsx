import MusicTrackService from 'src/modules/musicTrack/musicTrackService';
import Errors from 'src/modules/shared/error/errors';
import Message from 'src/view/shared/message';
import { getHistory } from 'src/modules/store';
import { i18n } from 'src/i18n';

const prefix = 'MUSICTRACK_FORM';

const musicTrackFormActions = {
  INIT_STARTED: `${prefix}_INIT_STARTED`,
  INIT_SUCCESS: `${prefix}_INIT_SUCCESS`,
  INIT_ERROR: `${prefix}_INIT_ERROR`,

  CREATE_STARTED: `${prefix}_CREATE_STARTED`,
  CREATE_SUCCESS: `${prefix}_CREATE_SUCCESS`,
  CREATE_ERROR: `${prefix}_CREATE_ERROR`,

  UPDATE_STARTED: `${prefix}_UPDATE_STARTED`,
  UPDATE_SUCCESS: `${prefix}_UPDATE_SUCCESS`,
  UPDATE_ERROR: `${prefix}_UPDATE_ERROR`,

  doInit: (id) => async (dispatch) => {
    try {
      dispatch({
        type: musicTrackFormActions.INIT_STARTED,
      });

      let record = {};

      const isEdit = Boolean(id);

      if (isEdit) {
        record = await MusicTrackService.find(id);
      }

      dispatch({
        type: musicTrackFormActions.INIT_SUCCESS,
        payload: record,
      });
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: musicTrackFormActions.INIT_ERROR,
      });

      getHistory().push('/music-track');
    }
  },

  doCreate: (values) => async (dispatch) => {
    try {
      dispatch({
        type: musicTrackFormActions.CREATE_STARTED,
      });

      await MusicTrackService.create(values);

      dispatch({
        type: musicTrackFormActions.CREATE_SUCCESS,
      });

      Message.success(
        i18n('entities.musicTrack.create.success'),
      );

      getHistory().push('/music-track');
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: musicTrackFormActions.CREATE_ERROR,
      });
    }
  },

  doUpdate: (id, values) => async (dispatch, getState) => {
    try {
      dispatch({
        type: musicTrackFormActions.UPDATE_STARTED,
      });

      await MusicTrackService.update(id, values);

      dispatch({
        type: musicTrackFormActions.UPDATE_SUCCESS,
      });

      Message.success(
        i18n('entities.musicTrack.update.success'),
      );

      getHistory().push('/music-track');
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: musicTrackFormActions.UPDATE_ERROR,
      });
    }
  },
};

export default musicTrackFormActions;
