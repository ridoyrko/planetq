import importerActions from 'src/modules/shared/importer/importerActions';
import selectors from 'src/modules/musicTrack/importer/musicTrackImporterSelectors';
import MusicTrackService from 'src/modules/musicTrack/musicTrackService';
import fields from 'src/modules/musicTrack/importer/musicTrackImporterFields';
import { i18n } from 'src/i18n';

const musicTrackImporterActions = importerActions(
  'MUSICTRACK_IMPORTER',
  selectors,
  MusicTrackService.import,
  fields,
  i18n('entities.musicTrack.importer.fileName'),
);

export default musicTrackImporterActions;