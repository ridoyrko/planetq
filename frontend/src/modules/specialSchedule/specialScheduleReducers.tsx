import list from 'src/modules/specialSchedule/list/specialScheduleListReducers';
import form from 'src/modules/specialSchedule/form/specialScheduleFormReducers';
import view from 'src/modules/specialSchedule/view/specialScheduleViewReducers';
import destroy from 'src/modules/specialSchedule/destroy/specialScheduleDestroyReducers';
import importerReducer from 'src/modules/specialSchedule/importer/specialScheduleImporterReducers';
import { combineReducers } from 'redux';

export default combineReducers({
  list,
  form,
  view,
  destroy,
  importer: importerReducer,
});
