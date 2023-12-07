import RegularScheduleService from 'src/modules/regularSchedule/regularScheduleService';
import Errors from 'src/modules/shared/error/errors';
import Message from 'src/view/shared/message';
import { getHistory } from 'src/modules/store';
import { i18n } from 'src/i18n';

const prefix = 'REGULARSCHEDULE_FORM';

const regularScheduleFormActions = {
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
        type: regularScheduleFormActions.INIT_STARTED,
      });

      let record = {};

      const isEdit = Boolean(id);

      if (isEdit) {
        record = await RegularScheduleService.find(id);
      }

      dispatch({
        type: regularScheduleFormActions.INIT_SUCCESS,
        payload: record,
      });
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: regularScheduleFormActions.INIT_ERROR,
      });

      getHistory().push('/regular-schedule');
    }
  },

  doCreate: (values) => async (dispatch) => {
    try {
      dispatch({
        type: regularScheduleFormActions.CREATE_STARTED,
      });

      await RegularScheduleService.create(values);

      dispatch({
        type: regularScheduleFormActions.CREATE_SUCCESS,
      });

      Message.success(
        i18n('entities.regularSchedule.create.success'),
      );

      getHistory().push('/regular-schedule');
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: regularScheduleFormActions.CREATE_ERROR,
      });
    }
  },

  doUpdate: (id, values) => async (dispatch, getState) => {
    try {
      dispatch({
        type: regularScheduleFormActions.UPDATE_STARTED,
      });

      await RegularScheduleService.update(id, values);

      dispatch({
        type: regularScheduleFormActions.UPDATE_SUCCESS,
      });

      Message.success(
        i18n('entities.regularSchedule.update.success'),
      );

      getHistory().push('/regular-schedule');
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: regularScheduleFormActions.UPDATE_ERROR,
      });
    }
  },
};

export default regularScheduleFormActions;
