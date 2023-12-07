import React from 'react';
import { i18n } from 'src/i18n';
import MusicTrackListFilter from 'src/view/musicTrack/list/MusicTrackListFilter';
import MusicTrackListTable from 'src/view/musicTrack/list/MusicTrackListTable';
import MusicTrackListToolbar from 'src/view/musicTrack/list/MusicTrackListToolbar';
import Breadcrumb from 'src/view/shared/Breadcrumb';

function MusicTrackListPage(props) {
  return (
    <>
      <Breadcrumb
        items={[
          [i18n('dashboard.menu'), '/'],
          [i18n('entities.musicTrack.menu')],
        ]}
      />

      <div className="mt-4 p-6 bg-white dark:bg-gray-800 dark:border-gray-800 text-gray-900 dark:text-gray-200 border-gray-200 border rounded-md">
        <h1 className=" text-lg font-medium mb-6">
          {i18n('entities.musicTrack.list.title')}
        </h1>
        <MusicTrackListToolbar />
        <MusicTrackListFilter />
        <MusicTrackListTable />
      </div>
    </>
  );
}

export default MusicTrackListPage;
