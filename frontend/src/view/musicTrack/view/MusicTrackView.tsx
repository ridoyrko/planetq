import React from 'react';
import { i18n } from 'src/i18n';
import Spinner from 'src/view/shared/Spinner';
import TextViewItem from 'src/view/shared/view/TextViewItem';
import ImagesViewItem from 'src/view/shared/view/ImagesViewItem';
import FilesViewItem from 'src/view/shared/view/FilesViewItem';

function MusicTrackView(props) {
  const { record, loading } = props;

  if (loading || !record) {
    return <Spinner />;
  }

  return (
    <div>
      <TextViewItem
        label={i18n('entities.musicTrack.fields.trackName')}
        value={record.trackName}
      />

      <TextViewItem
        label={i18n('entities.musicTrack.fields.artist')}
        value={record.artist}
      />

      <TextViewItem
        label={i18n('entities.musicTrack.fields.album')}
        value={record.album}
      />

      <ImagesViewItem
        label={i18n('entities.musicTrack.fields.cover')}
        value={record.cover}
      />

      <FilesViewItem
        label={i18n(
          'entities.musicTrack.fields.audioTrack',
        )}
        value={record.audioTrack}
      />

      <TextViewItem
        label={i18n('entities.musicTrack.fields.externalSourceUrl')}
        value={record.externalSourceUrl}
      />

      <TextViewItem
        label={i18n('entities.musicTrack.fields.active')}
        value={
          record.active
            ? i18n('common.yes')
            : i18n('common.no')
        }
      />
    </div>
  );
}

export default MusicTrackView;
