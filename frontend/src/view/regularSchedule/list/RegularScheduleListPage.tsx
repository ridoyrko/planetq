import React from 'react';
import { i18n } from 'src/i18n';
import RegularScheduleListFilter from 'src/view/regularSchedule/list/RegularScheduleListFilter';
import RegularScheduleListTable from 'src/view/regularSchedule/list/RegularScheduleListTable';
import RegularScheduleListToolbar from 'src/view/regularSchedule/list/RegularScheduleListToolbar';
import Breadcrumb from 'src/view/shared/Breadcrumb';

function RegularScheduleListPage(props) {
  return (
    <>
      <Breadcrumb
        items={[
          [i18n('dashboard.menu'), '/'],
          [i18n('entities.regularSchedule.menu')],
        ]}
      />

      <div className="mt-4 p-6 bg-white dark:bg-gray-800 dark:border-gray-800 text-gray-900 dark:text-gray-200 border-gray-200 border rounded-md">
        <h1 className=" text-lg font-medium mb-6">
          {i18n('entities.regularSchedule.list.title')}
        </h1>
        <RegularScheduleListToolbar />
        <RegularScheduleListFilter />
        <RegularScheduleListTable />
      </div>
    </>
  );
}

export default RegularScheduleListPage;
