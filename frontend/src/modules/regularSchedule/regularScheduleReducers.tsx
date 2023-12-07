import list from 'src/modules/regularSchedule/list/regularScheduleListReducers';
import form from 'src/modules/regularSchedule/form/regularScheduleFormReducers';
import view from 'src/modules/regularSchedule/view/regularScheduleViewReducers';
import destroy from 'src/modules/regularSchedule/destroy/regularScheduleDestroyReducers';
import importerReducer from 'src/modules/regularSchedule/importer/regularScheduleImporterReducers';
import { combineReducers } from 'redux';

export default combineReducers({
  list,
  form,
  view,
  destroy,
  importer: importerReducer,
});
