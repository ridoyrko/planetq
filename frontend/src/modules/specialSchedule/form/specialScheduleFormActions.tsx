import SpecialScheduleService from 'src/modules/specialSchedule/specialScheduleService';
import Errors from 'src/modules/shared/error/errors';
import Message from 'src/view/shared/message';
import { getHistory } from 'src/modules/store';
import { i18n } from 'src/i18n';

const prefix = 'SPECIALSCHEDULE_FORM';

const specialScheduleFormActions = {
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
        type: specialScheduleFormActions.INIT_STARTED,
      });

      let record = {};

      const isEdit = Boolean(id);

      if (isEdit) {
        record = await SpecialScheduleService.find(id);
      }

      dispatch({
        type: specialScheduleFormActions.INIT_SUCCESS,
        payload: record,
      });
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: specialScheduleFormActions.INIT_ERROR,
      });

      getHistory().push('/special-schedule');
    }
  },

  doCreate: (values) => async (dispatch) => {
    try {
      dispatch({
        type: specialScheduleFormActions.CREATE_STARTED,
      });

      await SpecialScheduleService.create(values);

      dispatch({
        type: specialScheduleFormActions.CREATE_SUCCESS,
      });

      Message.success(
        i18n('entities.specialSchedule.create.success'),
      );

      getHistory().push('/special-schedule');
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: specialScheduleFormActions.CREATE_ERROR,
      });
    }
  },

  doUpdate: (id, values) => async (dispatch, getState) => {
    try {
      dispatch({
        type: specialScheduleFormActions.UPDATE_STARTED,
      });

      await SpecialScheduleService.update(id, values);

      dispatch({
        type: specialScheduleFormActions.UPDATE_SUCCESS,
      });

      Message.success(
        i18n('entities.specialSchedule.update.success'),
      );

      getHistory().push('/special-schedule');
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: specialScheduleFormActions.UPDATE_ERROR,
      });
    }
  },
};

export default specialScheduleFormActions;
