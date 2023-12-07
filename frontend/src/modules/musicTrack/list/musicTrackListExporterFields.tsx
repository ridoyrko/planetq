import { i18n } from 'src/i18n';
import exporterRenders from 'src/modules/shared/exporter/exporterRenders';

export default [
  {
    name: 'id',
    label: i18n('entities.musicTrack.fields.id'),
  },
  {
    name: 'trackName',
    label: i18n('entities.musicTrack.fields.trackName'),
  },
  {
    name: 'artist',
    label: i18n('entities.musicTrack.fields.artist'),
  },
  {
    name: 'album',
    label: i18n('entities.musicTrack.fields.album'),
  },
  {
    name: 'cover',
    label: i18n('entities.musicTrack.fields.cover'),
    render: exporterRenders.filesOrImages(),
  },
  {
    name: 'audioTrack',
    label: i18n('entities.musicTrack.fields.audioTrack'),
    render: exporterRenders.filesOrImages(),
  },
  {
    name: 'externalSourceUrl',
    label: i18n('entities.musicTrack.fields.externalSourceUrl'),
  },
  {
    name: 'active',
    label: i18n('entities.musicTrack.fields.active'),
    render: exporterRenders.boolean(),
  },
  {
    name: 'createdAt',
    label: i18n('entities.musicTrack.fields.createdAt'),
    render: exporterRenders.datetime(),
  },
  {
    name: 'updatedAt',
    label: i18n('entities.musicTrack.fields.updatedAt'),
    render: exporterRenders.datetime(),
  },
];
