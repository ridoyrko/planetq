import React from 'react';
import { i18n } from 'src/i18n';
import Spinner from 'src/view/shared/Spinner';
import TextViewItem from 'src/view/shared/view/TextViewItem';
import MusicTrackViewItem from 'src/view/musicTrack/view/MusicTrackViewItem';

function RegularScheduleView(props) {
  const { record, loading } = props;

  if (loading || !record) {
    return <Spinner />;
  }

  return (
    <div>
      <TextViewItem
        label={i18n('entities.regularSchedule.fields.day')}
        value={
          record.day &&
          i18n(
            `entities.regularSchedule.enumerators.day.${record.day}`,
          )
        }
      />

      <MusicTrackViewItem
        label={i18n('entities.regularSchedule.fields.musicTrack')}
        value={record.musicTrack}
      />
    </div>
  );
}

export default RegularScheduleView;
