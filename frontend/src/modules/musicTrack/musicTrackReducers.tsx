import list from 'src/modules/musicTrack/list/musicTrackListReducers';
import form from 'src/modules/musicTrack/form/musicTrackFormReducers';
import view from 'src/modules/musicTrack/view/musicTrackViewReducers';
import destroy from 'src/modules/musicTrack/destroy/musicTrackDestroyReducers';
import importerReducer from 'src/modules/musicTrack/importer/musicTrackImporterReducers';
import { combineReducers } from 'redux';

export default combineReducers({
  list,
  form,
  view,
  destroy,
  importer: importerReducer,
});
