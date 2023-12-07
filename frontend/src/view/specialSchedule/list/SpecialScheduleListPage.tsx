import React from 'react';
import { i18n } from 'src/i18n';
import SpecialScheduleListFilter from 'src/view/specialSchedule/list/SpecialScheduleListFilter';
import SpecialScheduleListTable from 'src/view/specialSchedule/list/SpecialScheduleListTable';
import SpecialScheduleListToolbar from 'src/view/specialSchedule/list/SpecialScheduleListToolbar';
import Breadcrumb from 'src/view/shared/Breadcrumb';

function SpecialScheduleListPage(props) {
  return (
    <>
      <Breadcrumb
        items={[
          [i18n('dashboard.menu'), '/'],
          [i18n('entities.specialSchedule.menu')],
        ]}
      />

      <div className="mt-4 p-6 bg-white dark:bg-gray-800 dark:border-gray-800 text-gray-900 dark:text-gray-200 border-gray-200 border rounded-md">
        <h1 className=" text-lg font-medium mb-6">
          {i18n('entities.specialSchedule.list.title')}
        </h1>
        <SpecialScheduleListToolbar />
        <SpecialScheduleListFilter />
        <SpecialScheduleListTable />
      </div>
    </>
  );
}

export default SpecialScheduleListPage;
