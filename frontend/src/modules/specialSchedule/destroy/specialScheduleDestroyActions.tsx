import listActions from 'src/modules/specialSchedule/list/specialScheduleListActions';
import SpecialScheduleService from 'src/modules/specialSchedule/specialScheduleService';
import Errors from 'src/modules/shared/error/errors';
import { i18n } from 'src/i18n';
import { getHistory } from 'src/modules/store';
import Message from 'src/view/shared/message';

const prefix = 'SPECIALSCHEDULE_DESTROY';

const specialScheduleDestroyActions = {
  DESTROY_STARTED: `${prefix}_DESTROY_STARTED`,
  DESTROY_SUCCESS: `${prefix}_DESTROY_SUCCESS`,
  DESTROY_ERROR: `${prefix}_DESTROY_ERROR`,

  DESTROY_ALL_STARTED: `${prefix}_DESTROY_ALL_STARTED`,
  DESTROY_ALL_SUCCESS: `${prefix}_DESTROY_ALL_SUCCESS`,
  DESTROY_ALL_ERROR: `${prefix}_DESTROY_ALL_ERROR`,

  doDestroy: (id) => async (dispatch) => {
    try {
      dispatch({
        type: specialScheduleDestroyActions.DESTROY_STARTED,
      });

      await SpecialScheduleService.destroyAll([id]);

      dispatch({
        type: specialScheduleDestroyActions.DESTROY_SUCCESS,
      });

      Message.success(
        i18n('entities.specialSchedule.destroy.success'),
      );

      dispatch(listActions.doFetchCurrentFilter());

      getHistory().push('/special-schedule');
    } catch (error) {
      Errors.handle(error);

      dispatch(listActions.doFetchCurrentFilter());

      dispatch({
        type: specialScheduleDestroyActions.DESTROY_ERROR,
      });
    }
  },

  doDestroyAll: (ids) => async (dispatch) => {
    try {
      dispatch({
        type: specialScheduleDestroyActions.DESTROY_ALL_STARTED,
      });

      await SpecialScheduleService.destroyAll(ids);

      dispatch({
        type: specialScheduleDestroyActions.DESTROY_ALL_SUCCESS,
      });

      if (listActions) {
        dispatch(listActions.doClearAllSelected());
        dispatch(listActions.doFetchCurrentFilter());
      }

      Message.success(
        i18n('entities.specialSchedule.destroyAll.success'),
      );

      getHistory().push('/special-schedule');
    } catch (error) {
      Errors.handle(error);

      dispatch(listActions.doFetchCurrentFilter());

      dispatch({
        type: specialScheduleDestroyActions.DESTROY_ALL_ERROR,
      });
    }
  },
};

export default specialScheduleDestroyActions;
