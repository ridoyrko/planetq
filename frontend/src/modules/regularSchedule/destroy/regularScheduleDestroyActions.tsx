import listActions from 'src/modules/regularSchedule/list/regularScheduleListActions';
import RegularScheduleService from 'src/modules/regularSchedule/regularScheduleService';
import Errors from 'src/modules/shared/error/errors';
import { i18n } from 'src/i18n';
import { getHistory } from 'src/modules/store';
import Message from 'src/view/shared/message';

const prefix = 'REGULARSCHEDULE_DESTROY';

const regularScheduleDestroyActions = {
  DESTROY_STARTED: `${prefix}_DESTROY_STARTED`,
  DESTROY_SUCCESS: `${prefix}_DESTROY_SUCCESS`,
  DESTROY_ERROR: `${prefix}_DESTROY_ERROR`,

  DESTROY_ALL_STARTED: `${prefix}_DESTROY_ALL_STARTED`,
  DESTROY_ALL_SUCCESS: `${prefix}_DESTROY_ALL_SUCCESS`,
  DESTROY_ALL_ERROR: `${prefix}_DESTROY_ALL_ERROR`,

  doDestroy: (id) => async (dispatch) => {
    try {
      dispatch({
        type: regularScheduleDestroyActions.DESTROY_STARTED,
      });

      await RegularScheduleService.destroyAll([id]);

      dispatch({
        type: regularScheduleDestroyActions.DESTROY_SUCCESS,
      });

      Message.success(
        i18n('entities.regularSchedule.destroy.success'),
      );

      dispatch(listActions.doFetchCurrentFilter());

      getHistory().push('/regular-schedule');
    } catch (error) {
      Errors.handle(error);

      dispatch(listActions.doFetchCurrentFilter());

      dispatch({
        type: regularScheduleDestroyActions.DESTROY_ERROR,
      });
    }
  },

  doDestroyAll: (ids) => async (dispatch) => {
    try {
      dispatch({
        type: regularScheduleDestroyActions.DESTROY_ALL_STARTED,
      });

      await RegularScheduleService.destroyAll(ids);

      dispatch({
        type: regularScheduleDestroyActions.DESTROY_ALL_SUCCESS,
      });

      if (listActions) {
        dispatch(listActions.doClearAllSelected());
        dispatch(listActions.doFetchCurrentFilter());
      }

      Message.success(
        i18n('entities.regularSchedule.destroyAll.success'),
      );

      getHistory().push('/regular-schedule');
    } catch (error) {
      Errors.handle(error);

      dispatch(listActions.doFetchCurrentFilter());

      dispatch({
        type: regularScheduleDestroyActions.DESTROY_ALL_ERROR,
      });
    }
  },
};

export default regularScheduleDestroyActions;
