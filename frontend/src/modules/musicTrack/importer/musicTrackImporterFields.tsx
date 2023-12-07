import schemas from 'src/modules/shared/yup/yupImporterSchemas';
import { i18n } from 'src/i18n';

export default [
  {
    name: 'trackName',
    label: i18n('entities.musicTrack.fields.trackName'),
    schema: schemas.string(
      i18n('entities.musicTrack.fields.trackName'),
      {
        "required": true,
        "min": 2
      },
    ),
  },
  {
    name: 'artist',
    label: i18n('entities.musicTrack.fields.artist'),
    schema: schemas.string(
      i18n('entities.musicTrack.fields.artist'),
      {
        "required": true,
        "min": 2
      },
    ),
  },
  {
    name: 'album',
    label: i18n('entities.musicTrack.fields.album'),
    schema: schemas.string(
      i18n('entities.musicTrack.fields.album'),
      {
        "min": 2,
        "max": 100
      },
    ),
  },
  {
    name: 'cover',
    label: i18n('entities.musicTrack.fields.cover'),
    schema: schemas.images(
      i18n('entities.musicTrack.fields.cover'),
      {
        "min": 1
      },
    ),
  },
  {
    name: 'audioTrack',
    label: i18n('entities.musicTrack.fields.audioTrack'),
    schema: schemas.files(
      i18n('entities.musicTrack.fields.audioTrack'),
      {
        "max": 1
      },
    ),
  },
  {
    name: 'externalSourceUrl',
    label: i18n('entities.musicTrack.fields.externalSourceUrl'),
    schema: schemas.string(
      i18n('entities.musicTrack.fields.externalSourceUrl'),
      {},
    ),
  },
  {
    name: 'active',
    label: i18n('entities.musicTrack.fields.active'),
    schema: schemas.boolean(
      i18n('entities.musicTrack.fields.active'),
      {},
    ),
  },
];